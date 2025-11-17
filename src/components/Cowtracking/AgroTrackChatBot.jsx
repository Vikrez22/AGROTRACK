import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  Send,
  Globe,
  Plus,
} from "lucide-react";

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

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const languages = {
    en: { name: "English", code: "en-US", flag: "🇺🇸" },
    ig: { name: "Igbo", code: "ig-NG", flag: "🇳🇬" },
    yo: { name: "Yoruba", code: "yo-NG", flag: "🇳🇬" },
    ha: { name: "Hausa", code: "ha-NG", flag: "🇳🇬" },
  };

  // Groq AI API integration with improved prompting
  const fetchAIResponse = async (userMessage, isDetailed = false) => {
    try {
      const systemPrompt = isDetailed
        ? `You are an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria. Respond in ${languages[language].name}. Provide detailed, step-by-step information about farming techniques, pest control, livestock management, market information, and conflict resolution. Use simple, clear language that farmers can understand. Avoid complex tables, formatting, or technical jargon. Break information into numbered steps when helpful.`
        : `You are an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria. Respond in ${languages[language].name}. Give SHORT, SIMPLE answers (2-3 sentences maximum) using basic words that farmers can understand. Focus on practical advice. Avoid tables, formatting, and complex explanations. If the topic needs more detail, mention that more information is available if they ask.`;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b",
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: userMessage,
              },
            ],
            max_tokens: isDetailed ? 800 : 200,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content;

      // Clean up any markdown formatting that might slip through
      content = content
        .replace(/\|.*\|/g, "") // Remove table rows
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold formatting
        .replace(/\*(.*?)\*/g, "$1") // Remove italic formatting
        .replace(/---+/g, "") // Remove horizontal rules
        .replace(/#{1,6}\s*/g, "") // Remove headers
        .replace(/\n{3,}/g, "\n\n") // Reduce multiple newlines
        .trim();

      return content;
    } catch (error) {
      console.error("Groq API error:", error);

      // Fallback responses based on language
      const fallbackResponses = {
        en: "I'm having trouble connecting right now. Please try again. AgroTrack helps prevent farmer-herder conflicts through smart tracking.",
        ig: "Enwere m nsogbu ijikọ ugbu a. Biko nwaa ọzọ. AgroTrack na-enyere aka igbochi esemokwu ndị ọrụ ugbo na ndị ọzụzụ anụmanụ.",
        yo: "Mo ni wahala lati so ni bayi. Jọwọ gbiyanju lẹẹkansi. AgroTrack ṣe iranlọwọ lati ṣe idiwọ awọn ija agbe-darandaran.",
        ha: "Ina da matsala ta haɗuwa a yanzu. Da fatan za a sake gwadawa. AgroTrack yana taimakawa wajen hana rikice-rikice tsakanin manoma da makiyaya.",
      };

      return fallbackResponses[language] || fallbackResponses.en;
    }
  };

  const sendMessage = async (isDetailed = false) => {
    if (!input.trim() && !isDetailed) return;

    setError("");

    let userMessage;
    if (isDetailed) {
      // For detailed requests, use the last user message
      const lastUserMessage = messages
        .filter((m) => m.role === "user")
        .slice(-1)[0];
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
      const response = await fetchAIResponse(userMessage.content, isDetailed);
      const aiMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
        hasMoreInfo: !isDetailed, // Show "More Info" button for simple responses
      };
      setMessages([...newMessages, aiMessage]);

      // Text-to-speech
      speak(response);
    } catch (error) {
      setError("Failed to get response. Please try again.");
      console.error("AI Response error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDetailedResponse = async (messageIndex) => {
    const message = messages[messageIndex];
    if (message.role !== "assistant") return;

    // Find the user message that prompted this response
    let userMessage = null;
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        userMessage = messages[i];
        break;
      }
    }

    if (!userMessage) return;

    setLoading(true);
    try {
      const detailedResponse = await fetchAIResponse(userMessage.content, true);

      // Update the specific message to show detailed info
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = {
        ...message,
        content: detailedResponse,
        hasMoreInfo: false,
        isDetailed: true,
      };
      setMessages(updatedMessages);

      // Speak the detailed response
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
      // Stop any currently speaking utterances
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

  // Quick suggestion buttons for common topics
  const quickSuggestions = {
    en: [
      "How to plant corn?",
      "Best cattle feed",
      "Market prices today",
      "Prevent crop diseases",
    ],
    ig: [
      "Kedu ka esi akụ ọka?",
      "Nri ehi kacha mma",
      "Ọnụ ahịa taa",
      "Gbochie ọrịa ihe ọkụkụ",
    ],
    yo: [
      "Bawo ni a ṣe gbin agbado?",
      "Ounje malu to dara ju",
      "Awọn idiyele oja oni",
      "Ṣe idiwọ arun oko",
    ],
    ha: [
      "Yaya ake shuka masara?",
      "Abincin shanu mafi kyau",
      "Farashin kasuwa yau",
      "Hana cututtukan amfanin gona",
    ],
  };

  return (
    <div className="flex flex-col min-h-[600px] bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle size={24} />
            <h3 className="font-bold text-lg">AgroTrack AI</h3>
          </div>
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
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {msg.content}
              </p>

              {/* More Info Button */}
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
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
                <span className="text-sm ml-2">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">
          {error}
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
          Powered by AgroTrack AI • Multilingual Agricultural Assistant
        </div>
      </div>
    </div>
  );
};

export default AgroTrackChatBot;
