import express from "express";
import fetch from "node-fetch";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/natlas", async (req, res) => {
  try {
    const { prompt, isDetailed, conversationHistory, systemPrompt, language } =
      req.body;

    if (!process.env.HF_API_KEY) {
      console.error("[N-ATLaS] Error: HF_API_KEY is missing in .env file");
      return res.status(500).json({
        success: false,
        error: "CONFIG_ERROR",
        message: "Server configuration error: API Key missing",
      });
    }

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: "Prompt is required",
      });
    }

    let formattedPrompt =
      "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n";
    formattedPrompt +=
      systemPrompt ||
      "You are AwaGPT, an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria.";
    formattedPrompt += "<|eot_id|>";

    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.slice(-6).forEach((msg) => {
        if (msg.role === "user") {
          formattedPrompt += `<|start_header_id|>user<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
        } else if (msg.role === "assistant") {
          formattedPrompt += `<|start_header_id|>assistant<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
        }
      });
    }

    formattedPrompt += `<|start_header_id|>user<|end_header_id|>\n\n${prompt}<|eot_id|>`;
    formattedPrompt += `<|start_header_id|>assistant<|end_header_id|>\n\n`;

    console.log(`[N-ATLaS] Processing request - Language: ${language || "en"}`);

    const response = await fetch(
      "https://router.huggingface.co/models/NCAIR1/N-ATLaS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: formattedPrompt,
          parameters: {
            max_new_tokens: isDetailed ? 800 : 250,
            temperature: 0.7,
            top_p: 0.9,
            repetition_penalty: 1.12,
            return_full_text: false,
            do_sample: true,
          },
          options: {
            wait_for_model: true,
            use_cache: false,
          },
        }),
      },
    );

    // console.log(`[N-ATLaS] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[N-ATLaS] API Error Body:", errorText);

      try {
        const errorData = JSON.parse(errorText);

        if (errorData.error && errorData.error.includes("loading")) {
          return res.status(503).json({
            success: false,
            error: "MODEL_LOADING",
            message: "N-ATLaS model is loading. Please wait 30 seconds.",
            estimatedTime: errorData.estimated_time || 30,
          });
        }

        if (response.status === 404) {
          return res.status(404).json({
            success: false,
            error: "MODEL_NOT_FOUND",
            message:
              "Model endpoint not found. Check model ID or API permissions.",
          });
        }

        return res.status(response.status).json({
          success: false,
          error: "HF_API_ERROR",
          message: errorData.error || "Unknown error from Hugging Face API",
        });
      } catch (parseError) {
        return res.status(response.status).json({
          success: false,
          error: "HF_API_ERROR",
          message: errorText,
        });
      }
    }

    const data = await response.json();
    console.log("[N-ATLaS] Successfully received response");

    let content = "";
    if (Array.isArray(data)) {
      content = data[0]?.generated_text || "";
    } else if (data.generated_text) {
      content = data.generated_text;
    } else if (typeof data === "string") {
      content = data;
    }

    content = content
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/<\|.*?\|>/g, "")
      .replace(/<\|eot_id\|>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (!content) {
      return res.status(500).json({
        success: false,
        error: "EMPTY_RESPONSE",
        message: "Model returned empty response",
      });
    }

    res.json({
      success: true,
      content: content,
      model: "N-ATLaS",
      language: language || "en",
    });
  } catch (error) {
    console.error("[N-ATLaS] Server Error:", error);
    res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: error.message || "Internal server error",
    });
  }
});

router.post("/groq", async (req, res) => {
  try {
    const { prompt, isDetailed, systemPrompt, language } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: "Prompt is required",
      });
    }

    console.log(`[Groq] Processing request - Language: ${language || "en"}`);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                systemPrompt ||
                "You are an agricultural assistant for AgroTrack.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: isDetailed ? 800 : 200,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Groq] API Error:", errorText);
      return res.status(response.status).json({
        success: false,
        error: "GROQ_API_ERROR",
        message: errorText,
      });
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    content = content
      .replace(/\|.*\|/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/---+/g, "")
      .replace(/#{1,6}\s*/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    res.json({
      success: true,
      content: content,
      model: "Groq Llama 3.3 70B",
      language: language || "en",
    });
  } catch (error) {
    console.error("[Groq] Server Error:", error);
    res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: error.message || "Internal server error",
    });
  }
});

// --- SPITCH AI ROUTES ---

// Spitch Text-to-Speech (TTS)
router.post("/spitch/tts", async (req, res) => {
  try {
    const { text, language = "en" } = req.body;

    if (
      !process.env.SPITCH_API_KEY ||
      process.env.SPITCH_API_KEY === "YOUR_SPITCH_API_KEY"
    ) {
      return res.status(500).json({
        success: false,
        message: "Spitch API Key is not configured.",
      });
    }

    // MAP LANGUAGES TO CORRESPONDING SPITCH VOICES
    const voiceMapping = {
      en: "john",
      yo: "sade",
      ha: "amina",
      ig: "ngozi",
      pcm: "ufoma",
      am: "selam",
    };

    const voice = voiceMapping[language] || "john";
    console.log(
      `[Spitch TTS] Synthesizing (${language} -> ${voice}): "${text.substring(0, 50)}..."`,
    );

    const response = await fetch("https://api.spi-tch.com/v1/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SPITCH_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voice,
        text,
        format: "mp3",
        language,
        // style: "conversational", // Removed for maximum compatibility across voices
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ detail: "Unknown error" }));
      console.error("[Spitch TTS] API Error:", errorData);
      return res.status(response.status).json({
        success: false,
        message: errorData.detail || "Spitch API error",
      });
    }

    // GET BINARY AUDIO DATA
    const buffer = await response.buffer();
    const base64Audio = buffer.toString("base64");

    res.json({
      success: true,
      audioContent: base64Audio,
    });
  } catch (error) {
    console.error("[Spitch TTS] Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Spitch Speech-to-Text (STT)
router.post("/spitch/stt", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No audio file provided" });
    }

    if (
      !process.env.SPITCH_API_KEY ||
      process.env.SPITCH_API_KEY === "YOUR_SPITCH_API_KEY"
    ) {
      return res.status(500).json({
        success: false,
        message: "Spitch API Key is not configured.",
      });
    }

    const { language = "en" } = req.body;
    // mansa_v1 is English-only. Use legacy for other languages.
    const model = language === "en" ? "mansa_v1" : "legacy";

    console.log(
      `[Spitch STT] Transcribing audio (${req.file.size} bytes, lang: ${language}, model: ${model})`,
    );

    // Manual boundary construction for node-fetch v2
    const boundary =
      "----AgroTrackBoundary" + Math.random().toString(16).slice(2);

    // Detect format from mimetype if possible, or default to wav
    const mimeType = req.file.mimetype || "audio/wav";
    const extension = mimeType.split("/")[1] || "wav";

    const bodyParts = [
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="language"\r\n\r\n${language}\r\n`,
      ),
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\n${model}\r\n`,
      ),
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="content"; filename="recording.${extension}"\r\nContent-Type: ${mimeType}\r\n\r\n`,
      ),
      req.file.buffer,
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ];

    const combinedBody = Buffer.concat(bodyParts);

    const response = await fetch("https://api.spi-tch.com/v1/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SPITCH_API_KEY}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
      body: combinedBody,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ detail: "Unknown transcription error" }));
      console.error("[Spitch STT] API Error:", errorData);
      return res
        .status(response.status)
        .json({
          success: false,
          message: errorData.detail || "Spitch API error",
        });
    }

    const data = await response.json();
    res.json({
      success: true,
      text: data.text,
    });
  } catch (error) {
    console.error("[Spitch STT] Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "AI routes are working",
    endpoints: {
      natlas: "/api/ai/natlas",
      groq: "/api/ai/groq",
      spitch_tts: "/api/ai/spitch/tts",
      spitch_stt: "/api/ai/spitch/stt",
    },
  });
});

export default router;
