const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Make sure to install: npm install node-fetch@2

// N-ATLaS API endpoint
router.post('/natlas', async (req, res) => {
  try {
    const { prompt, isDetailed, conversationHistory } = req.body;

    // Validate input
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Build the N-ATLaS prompt format
    let formattedPrompt = "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n";
    formattedPrompt += req.body.systemPrompt || "You are AwaGPT, an agricultural assistant for AgroTrack.";
    formattedPrompt += "<|eot_id|>";

    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.slice(-6).forEach(msg => {
        if (msg.role === 'user') {
          formattedPrompt += `<|start_header_id|>user<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
        } else if (msg.role === 'assistant') {
          formattedPrompt += `<|start_header_id|>assistant<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
        }
      });
    }

    // Add current prompt
    formattedPrompt += `<|start_header_id|>user<|end_header_id|>\n\n${prompt}<|eot_id|>`;
    formattedPrompt += `<|start_header_id|>assistant<|end_header_id|>\n\n`;

    console.log('Calling Hugging Face API...');

    // Call Hugging Face API
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HF API Error:', errorText);
      
      // Handle model loading
      if (errorText.includes('loading')) {
        return res.status(503).json({ 
          error: 'MODEL_LOADING',
          message: 'Model is loading, please try again in 20-30 seconds',
          estimatedTime: 30
        });
      }

      return res.status(response.status).json({ 
        error: 'HF_API_ERROR',
        message: errorText 
      });
    }

    const data = await response.json();
    console.log('HF API Response received');

    // Extract generated text
    let content = '';
    if (Array.isArray(data)) {
      content = data[0]?.generated_text || '';
    } else if (data.generated_text) {
      content = data.generated_text;
    } else {
      content = typeof data === 'string' ? data : '';
    }

    // Clean up response
    content = content
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/<\|.*?\|>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (!content) {
      return res.status(500).json({ 
        error: 'EMPTY_RESPONSE',
        message: 'Model returned empty response' 
      });
    }

    res.json({ 
      success: true,
      content: content 
    });

  } catch (error) {
    console.error('N-ATLaS API Error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: error.message 
    });
  }
});

// Groq API endpoint (fallback)
router.post('/groq', async (req, res) => {
  try {
    const { prompt, isDetailed, systemPrompt } = req.body;

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
              content: systemPrompt || 'You are an agricultural assistant for AgroTrack.' 
            },
            { role: 'user', content: prompt }
          ],
          max_tokens: isDetailed ? 800 : 200,
          temperature: 0.7,
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        error: 'GROQ_API_ERROR',
        message: errorText 
      });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    res.json({ 
      success: true,
      content: content 
    });

  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: error.message 
    });
  }
});

module.exports = router;