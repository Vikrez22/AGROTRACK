import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/natlas', async (req, res) => {
  try {
    const { prompt, isDetailed, conversationHistory, systemPrompt, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Prompt is required' 
      });
    }

    let formattedPrompt = "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n";
    formattedPrompt += systemPrompt || "You are AwaGPT, an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria.";
    formattedPrompt += "<|eot_id|>";

    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.slice(-6).forEach(msg => {
        if (msg.role === 'user') {
          formattedPrompt += `<|start_header_id|>user<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
        } else if (msg.role === 'assistant') {
          formattedPrompt += `<|start_header_id|>assistant<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
        }
      });
    }

    formattedPrompt += `<|start_header_id|>user<|end_header_id|>\n\n${prompt}<|eot_id|>`;
    formattedPrompt += `<|start_header_id|>assistant<|end_header_id|>\n\n`;

    console.log(`[N-ATLaS] Processing request - Language: ${language || 'en'}, Detailed: ${isDetailed}`);

    const response = await fetch(
      'https://api-inference.huggingface.co/models/NCAIR1/N-ATLaS',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: formattedPrompt,
          parameters: {
            max_new_tokens: isDetailed ? 800 : 250,
            temperature: 0.7,
            top_p: 0.9,
            repetition_penalty: 1.12,
            return_full_text: false,
            do_sample: true
          },
          options: {
            wait_for_model: true,
            use_cache: false
          }
        })
      }
    );

    console.log(`[N-ATLaS] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[N-ATLaS] API Error:', errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        
        if (errorData.error && errorData.error.includes('loading')) {
          return res.status(503).json({ 
            success: false,
            error: 'MODEL_LOADING',
            message: 'N-ATLaS model is loading. This takes 20-30 seconds on first use.',
            estimatedTime: errorData.estimated_time || 30
          });
        }

        if (errorData.error && errorData.error.includes('rate limit')) {
          return res.status(429).json({ 
            success: false,
            error: 'RATE_LIMIT',
            message: 'Too many requests. Please try again in a moment.'
          });
        }

        return res.status(response.status).json({ 
          success: false,
          error: 'HF_API_ERROR',
          message: errorData.error || 'Unknown error from Hugging Face API'
        });
      } catch (parseError) {
        return res.status(response.status).json({ 
          success: false,
          error: 'HF_API_ERROR',
          message: errorText
        });
      }
    }

    const data = await response.json();
    console.log('[N-ATLaS] Successfully received response');

    let content = '';
    if (Array.isArray(data)) {
      content = data[0]?.generated_text || '';
    } else if (data.generated_text) {
      content = data.generated_text;
    } else if (typeof data === 'string') {
      content = data;
    }

    content = content
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1') 
      .replace(/<\|.*?\|>/g, '') 
      .replace(/<\|eot_id\|>/g, '')
      .replace(/\n{3,}/g, '\n\n') 
      .trim();

    if (!content) {
      return res.status(500).json({ 
        success: false,
        error: 'EMPTY_RESPONSE',
        message: 'Model returned empty response' 
      });
    }

    res.json({ 
      success: true,
      content: content,
      model: 'N-ATLaS',
      language: language || 'en'
    });

  } catch (error) {
    console.error('[N-ATLaS] Server Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'SERVER_ERROR',
      message: error.message || 'Internal server error'
    });
  }
});

router.post('/groq', async (req, res) => {
  try {
    const { prompt, isDetailed, systemPrompt, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Prompt is required' 
      });
    }

    console.log(`[Groq] Processing request - Language: ${language || 'en'}, Detailed: ${isDetailed}`);

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            { 
              role: 'system', 
              content: systemPrompt || 'You are an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria.' 
            },
            { role: 'user', content: prompt }
          ],
          max_tokens: isDetailed ? 800 : 200,
          temperature: 0.7,
        })
      }
    );

    console.log(`[Groq] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Groq] API Error:', errorText);
      
      return res.status(response.status).json({ 
        success: false,
        error: 'GROQ_API_ERROR',
        message: errorText
      });
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    content = content
      .replace(/\|.*\|/g, '') 
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/---+/g, '')
      .replace(/#{1,6}\s*/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    console.log('[Groq] Successfully received response');

    res.json({ 
      success: true,
      content: content,
      model: 'Groq Llama 3.1 70B',
      language: language || 'en'
    });

  } catch (error) {
    console.error('[Groq] Server Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'SERVER_ERROR',
      message: error.message || 'Internal server error'
    });
  }
});

router.get('/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'AI routes are working',
    endpoints: {
      natlas: '/api/ai/natlas',
      groq: '/api/ai/groq'
    }
  });
});

export default router;