import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Mic, MicOff, Volume2, Send, Globe } from 'lucide-react';

const AgroTrackChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to AgroTrack! I\'m here to help with farming questions, livestock management, and market information. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const languages = {
    en: { name: 'English', code: 'en-US', flag: '🇺🇸' },
    ig: { name: 'Igbo', code: 'ig-NG', flag: '🇳🇬' },
    yo: { name: 'Yoruba', code: 'yo-NG', flag: '🇳🇬' },
    ha: { name: 'Hausa', code: 'ha-NG', flag: '🇳🇬' }
  };

  // Groq AI API integration
  const fetchAIResponse = async (userMessage) => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b', // Good multilingual model
          messages: [
            {
              role: 'system',
              content: `You are an agricultural assistant for AgroTrack, helping farmers and herders in Nigeria. Respond in ${languages[language].name}. Focus on farming techniques, pest control, livestock management, market information, and conflict resolution between farmers and herders. Keep responses concise and practical.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Groq API error:', error);
      
      // Fallback responses based on language
      const fallbackResponses = {
        en: "I'm having trouble connecting to my AI service right now. Please try again in a moment. In the meantime, remember that AgroTrack helps prevent farmer-herder conflicts through smart geo-fencing and livestock tracking.",
        ig: "Enwere m nsogbu ijikọ na ọrụ AI m ugbu a. Biko nwaa ọzọ n'oge na-adịghị anya. Ka a na-eche, cheta na AgroTrack na-enyere aka igbochi esemokwu ndị ọrụ ugbo na ndị ọzụzụ anụmanụ site na geo-fencing amamihe na nsoso anụmanụ.",
        yo: "Mo ni wahala lati so si iṣẹ AI mi ni bayi. Jọwọ gbiyanju lẹẹkansi ni akoko diẹ. Lakoko yii, ranti pe AgroTrack ṣe iranlọwọ lati ṣe idiwọ awọn ija agbe-darandaran nipasẹ geo-fencing ati wiwa ẹranko.",
        ha: "Ina da matsala ta haɗuwa da sabis na AI a yanzu. Da fatan za a sake gwadawa nan ba da jimawa ba. A yayin da, ku tuna cewa AgroTrack yana taimakawa wajen hana rikice-rikice tsakanin manoma da makiyaya ta hanyar geo-fencing da bin diddigin dabbobi."
      };
      
      return fallbackResponses[language] || fallbackResponses.en;
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setError('');
    const userMessage = { 
      role: 'user', 
      content: input.trim(),
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetchAIResponse(userMessage.content);
      const aiMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages([...newMessages, aiMessage]);
      
      // Text-to-speech
      speak(response);
    } catch (error) {
      setError('Failed to get response. Please try again.');
      console.error('AI Response error:', error);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languages[language].code;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = languages[language].code;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg">
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md ${
              msg.role === 'user'
                ? 'bg-green-500 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs opacity-70">
                  {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.role === 'assistant' && (
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
            onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder={`Ask about farming, livestock, markets... (${languages[language].name})`}
            className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            disabled={loading}
          />
          
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          
          <button
            onClick={sendMessage}
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