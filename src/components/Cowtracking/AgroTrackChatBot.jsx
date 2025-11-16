import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Mic, MicOff, Volume2, Send, Globe, Plus, AlertCircle } from "lucide-react";

const AgroTrackChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to AgroTrack! I'm here to help with farming questions, livestock management, and market information. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const [apiProvider, setApiProvider] = useState("natlas");
  const [modelStatus, setModelStatus] = useState("ready"); // "ready", "loading", "error"

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const languages = {
    en: { name: "English", code: "en-US", flag: "🇺🇸" },
    ig: { name: "Igbo", code: "ig-NG", flag: "🇳🇬" },
    yo: { name: "Yoruba", code: "yo-NG", flag: "🇳🇬" },
    ha: { name: "Hausa", code: "ha-NG", flag: "🇳🇬" },
  };

  // N-ATLaS API integration - CORRECTED VERSION
  const fetchNATLaSResponse = async (userMessage, isDetailed = false, conversationHistory = []) => {
    try {
      const systemPrompt = isDetailed 
        ? `You are AwaGPT, an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria. Respond in ${languages[language].name}. Provide detailed, step-by-step information about farming techniques, pest control, livestock management, market information, and conflict resolution between farmers and herders. Use simple, clear language that farmers can understand. Break information into numbered steps when helpful.`
        : `You are AwaGPT, an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria. Respond in ${languages[language].name}. Give SHORT, SIMPLE answers (2-3 sentences maximum) using basic words that farmers can understand. Focus on practical advice. If the topic needs more detail, mention that more information is available if they ask.`;

      // Build the prompt in chat format
      let prompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${systemPrompt}<|eot_id|>`;
      
      // Add conversation history (last 6 messages for context)
      conversationHistory.slice(-6).forEach(msg => {
        if (msg.role === 'user') {
          prompt += `<|start_header_id|>user<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
        } else if (msg.role === 'assistant') {
          prompt += `<|start_header_id|>assistant<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
        }
      });
      
      // Add current user message
      prompt += `<|start_header_id|>user<|end_header_id|>\n\n${userMessage}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`;

      console.log("Sending request to Hugging Face...");

      const HF_API_KEY = process.env.REACT_APP_HF_API_KEY;
      
      const response = await fetch(
        "https://api-inference.huggingface.co/models/NCAIR1/N-ATLaS",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
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
          }),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          
          // Handle model loading
          if (errorData.error && errorData.error.includes("loading")) {
            setModelStatus("loading");
            const estimatedTime = errorData.estimated_time || 20;
            throw new Error(`MODEL_LOADING:${estimatedTime}`);
          }
          
          throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
        } catch (e) {
          if (e.message.startsWith("MODEL_LOADING")) {
            throw e;
          }
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
      }

      const data = await response.json();
      console.log("API Response:", data);
      
      setModelStatus("ready");
      
      // Extract the generated text
      let content = "";
      
      if (Array.isArray(data)) {
        content = data[0]?.generated_text || "";
      } else if (data.generated_text) {
        content = data.generated_text;
      } else if (typeof data === 'string') {
        content = data;
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("Unexpected response format from API");
      }

      // Clean up the response
      content = content
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      // Remove any chat template markers if they leaked through
      content = content
        .replace(/<\|.*?\|>/g, '')
        .replace(/<\|eot_id\|>/g, '')
        .trim();

      if (!content) {
        throw new Error("Empty response from model");
      }

      return content;

    } catch (error) {
      console.error("N-ATLaS API error:", error);

      // Handle model loading
      if (error.message.startsWith("MODEL_LOADING")) {
        const time = error.message.split(":")[1] || "20";
        setModelStatus("loading");
        return getLoadingMessage(language, time);
      }

      setModelStatus("error");

      // Better error messages
      if (error.message.includes("Failed to fetch")) {
        return getConnectionErrorMessage(language);
      }

      // Fallback responses
      const fallbackResponses = {
        en: "I'm having trouble connecting to N-ATLaS. This could be due to: 1) Model is loading (first use takes ~30sec), 2) API key issue, or 3) Network problem. Try again in a moment.",
        ig: "Enwere m nsogbu ijikọ na N-ATLaS. Nke a nwere ike ịbụ: 1) Ụdị ahụ na-ebu (ojiji mbụ na-ewe ~30sec), 2) Nsogbu igodo API, ma ọ bụ 3) Nsogbu netwọk. Nwaa ọzọ n'oge na-adịghị anya.",
        yo: "Mo ni wahala lati so pẹlu N-ATLaS. Eyi le jẹ nitori: 1) Awọsanma n bu (lilo akọkọ gba ~30sec), 2) Iṣoro bọtini API, tabi 3) Iṣoro nẹtiwọọki. Gbiyanju lẹẹkansi laipẹ.",
        ha: "Ina da matsala ta haɗuwa da N-ATLaS. Wannan na iya zama saboda: 1) Ana ɗaukar samfurin (amfani na farko yana ɗaukar ~30sec), 2) Matsalar maɓallin API, ko 3) Matsalar cibiyar sadarwa. Sake gwadawa nan ba da jimawa ba.",
      };

      return fallbackResponses[language] || fallbackResponses.en;
    }
  };

  const getLoadingMessage = (lang, seconds) => {
    const messages = {
      en: `N-ATLaS is starting up (estimated ${seconds} seconds). This only happens on first use. Please wait...`,
      ig: `N-ATLaS na-amalite (atụmatụ sekọnd ${seconds}). Nke a na-eme naanị na ojiji mbụ. Biko chere...`,
      yo: `N-ATLaS n bẹrẹ (aṣoju iṣẹju ${seconds}). Eyi ṣẹlẹ nikan ni lilo akọkọ. Jọwọ duro...`,
      ha: `N-ATLaS yana farawa (kimanin daƙiƙa ${seconds}). Wannan yana faruwa ne kawai a amfani na farko. Don Allah jira...`,
    };
    return messages[lang] || messages.en;
  };

  const getConnectionErrorMessage = (lang) => {
    const messages = {
      en: "Cannot connect to N-ATLaS server. Please check: 1) Your internet connection, 2) API key is set correctly in .env file (REACT_APP_HF_API_KEY), 3) Try switching to Groq model temporarily.",
      ig: "Enweghị ike ijikọ na sava N-ATLaS. Biko lelee: 1) Njikọ intanetị gị, 2) Igodo API edobere nke ọma na faịlụ .env (REACT_APP_HF_API_KEY), 3) Gbalịa ịgbanwee na ụdị Groq nwa oge.",
      yo: "Ko le so si olupin N-ATLaS. Jọwọ ṣayẹwo: 1) Asopọ intanẹẹti rẹ, 2) Bọtini API ti ṣeto daradara ninu faili .env (REACT_APP_HF_API_KEY), 3) Gbiyanju yipada si awoṣe Groq fun igba diẹ.",
      ha: "Ba za a iya haɗuwa da sabar N-ATLaS ba. Da fatan za a duba: 1) Haɗin intanet ɗinku, 2) Maɓallin API an saita daidai a cikin fayil ɗin .env (REACT_APP_HF_API_KEY), 3) Gwada canzawa zuwa ƙirar Groq na ɗan lokaci.",
    };
    return messages[lang] || messages.en;
  };

  // Groq API (fallback/alternative)
  const fetchGroqResponse = async (userMessage, isDetailed = false) => {
    try {
      const systemPrompt = isDetailed 
        ? `You are an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria. Respond in ${languages[language].name}. Provide detailed, step-by-step information about farming techniques, pest control, livestock management, market information, and conflict resolution. Use simple, clear language that farmers can understand. Avoid complex tables, formatting, or technical jargon. Break information into numbered steps when helpful.`
        : `You are an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria. Respond in ${languages[language].name}. Give SHORT, SIMPLE answers (2-3 sentences maximum) using basic words that farmers can understand. Focus on practical advice. Avoid tables, formatting, and complex explanations. If the topic needs more detail, mention that more information is available if they ask.`;

      const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userMessage },
            ],
            max_tokens: isDetailed ? 800 : 200,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
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

      return content;
    } catch (error) {
      console.error("Groq API error:", error);
      throw error;
    }
  };

  const sendMessage = async (isDetailed = false) => {
    if (!input.trim() && !isDetailed) return;

    setError("");
    
    let userMessage;
    if (isDetailed) {
      const lastUserMessage = messages.filter(m => m.role === 'user').slice(-1)[0];
      if (!lastUserMessage) return;
      
      userMessage = {
        role: "user",
        content: `Please give me more detailed information about: ${lastUserMessage.content}`,
        timestamp: new Date(),
      };
    } else {
      userMessage = {
        role: "user",
        content: input.trim(),
        timestamp: new Date(),
      };
    }

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!isDetailed) setInput("");
    setLoading(true);

    try {
      let response;
      
      if (apiProvider === "natlas") {
        const conversationHistory = messages
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .map(m => ({ role: m.role, content: m.content }));
        
        response = await fetchNATLaSResponse(userMessage.content, isDetailed, conversationHistory);
      } else {
        response = await fetchGroqResponse(userMessage.content, isDetailed);
      }

      const aiMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
        hasMoreInfo: !isDetailed,
      };
      setMessages([...newMessages, aiMessage]);

      speak(response);
    } catch (error) {
      setError(`Failed to get response: ${error.message}`);
      console.error("AI Response error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDetailedResponse = async (messageIndex) => {
    const message = messages[messageIndex];
    if (message.role !== 'assistant') return;

    let userMessage = null;
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        userMessage = messages[i];
        break;
      }
    }

    if (!userMessage) return;

    setLoading(true);
    try {
      let detailedResponse;
      
      if (apiProvider === "natlas") {
        const conversationHistory = messages
          .slice(0, messageIndex)
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .map(m => ({ role: m.role, content: m.content }));
        
        detailedResponse = await fetchNATLaSResponse(userMessage.content, true, conversationHistory);
      } else {
        detailedResponse = await fetchGroqResponse(userMessage.content, true);
      }
      
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = {
        ...message,
        content: detailedResponse,
        hasMoreInfo: false,
        isDetailed: true
      };
      setMessages(updatedMessages);
      
      speak(detailedResponse);
    } catch (error) {
      setError("Failed to get detailed response. Please try again.");
      console.error("Detailed response error:", error);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languages[language].code;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = languages[language].code;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickSuggestions = {
    en: [
      "How to plant corn?",
      "Best cattle feed",
      "Market prices today",
      "Prevent crop diseases"
    ],
    ig: [
      "Kedu ka esi akụ ọka?",
      "Nri ehi kacha mma",
      "Ọnụ ahịa taa",
      "Gbochie ọrịa ihe ọkụkụ"
    ],
    yo: [
      "Bawo ni a ṣe gbin agbado?",
      "Ounje malu to dara ju",
      "Awọn idiyele oja oni",
      "Ṣe idiwọ arun oko"
    ],
    ha: [
      "Yaya ake shuka masara?",
      "Abincin shanu mafi kyau",
      "Farashin kasuwa yau",
      "Hana cututtukan amfanin gona"
    ]
  };

  return (
    <div className="flex flex-col min-h-[600px] bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle size={24} />
            <h3 className="font-bold text-lg">AgroTrack AI</h3>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={apiProvider}
              onChange={(e) => setApiProvider(e.target.value)}
              className="bg-green-800 text-white rounded px-2 py-1 text-xs border-none outline-none"
              title="AI Model"
            >
              <option value="natlas">🇳🇬 N-ATLaS</option>
              <option value="groq">⚡ Groq</option>
            </select>
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-green-800 text-white rounded px-2 py-1 text-sm border-none outline-none"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Model status indicator */}
        {apiProvider === "natlas" && modelStatus === "loading" && (
          <div className="mt-2 text-xs bg-yellow-500 bg-opacity-20 px-2 py-1 rounded flex items-center gap-1">
            <AlertCircle size={12} />
            <span>Model is loading... First request may take 30 seconds</span>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="p-4 bg-gray-50 border-b">
          <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions[language]?.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setInput(suggestion)}
                className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-300 hover:bg-green-50 hover:border-green-300 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-h-[400px] p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md ${
                msg.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
              
              {msg.role === "assistant" && msg.hasMoreInfo && (
                <button
                  onClick={() => getDetailedResponse(idx)}
                  className="mt-2 px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors flex items-center gap-1"
                  disabled={loading}
                >
                  <Plus size={12} />
                  More Details
                </button>
              )}
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs opacity-70">
                  {msg.timestamp?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {msg.role === "assistant" && (
                  <button
                    onClick={() => speak(msg.content)}
                    className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors"
                    title="Read aloud"
                  >
                    <Volume2 size={12} className="text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <span className="text-sm ml-2">
                  {modelStatus === "loading" ? "Loading model..." : "Thinking..."}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !loading && sendMessage()}
            placeholder={`Ask about farming, livestock, markets... (${languages[language].name})`}
            className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            disabled={loading}
          />

          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
            title="Send message"
          >
            <Send size={18} />
          </button>
        </div>

        <div className="mt-2 text-xs text-gray-500 text-center">
          Powered by {apiProvider === 'natlas' ? 'N-ATLaS (Awarri AI)' : 'Groq AI'} • Multilingual Agricultural Assistant
        </div>
      </div>
    </div>
  );
};

export default AgroTrackChatBot;