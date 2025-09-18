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

  // Mock AI response function - Replace with your chosen API
  const fetchAIResponse = async (userMessage) => {
    // This is a mock function - replace with actual API call
    const mockResponses = {
      en: {
        greeting: "Hello! I can help you with farming techniques, pest control, livestock management, and market prices. What would you like to know?",
        pest: "For pest control, I recommend integrated pest management (IPM). Start with crop rotation, use beneficial insects, and apply organic pesticides only when necessary.",
        livestock: "For livestock management, ensure proper grazing rotation, regular health checks, and GPS tracking to prevent conflicts with farmers.",
        market: "Current market prices vary by region. I can help you find the best markets for your produce and connect you with buyers through our platform."
      },
      ig: {
        greeting: "Ndewo! Enwere m ike inyere gị aka na usoro ọrụ ugbo, nlekọta anụmanụ, na ọnụahịa ahịa. Gịnị ka ị chọrọ ịmata?",
        pest: "Maka ịchụ ahụhụ, a na-akwado usoro njikwa ahụhụ jikọrọ ọnụ. Malite site na ntụgharị ihe ọkụkụ, jiri ụmụ ahụhụ bara uru, ma tinye ọgwụ ahụhụ naanị mgbe ọ dị mkpa.",
        livestock: "Maka nlekọta anụmanụ, hụ na ntụgharị ịta nri, nlele ahụike mgbe niile, na GPS tracking iji gbochie esemokwu na ndị ọrụ ugbo."
      },
      yo: {
        greeting: "Bawo! Mo le ran e lowo pelu awon ona ogbin, itoju ọsin, ati awon idiyele ọja. Kini o fe mo?",
        pest: "Fun iṣakoso kokoro, Mo ṣeduro iṣakoso kokoro amuṣọpọ (IPM). Bẹrẹ pẹlu yiyi irugbin, lo awọn kokoro to wulo, ki o si lo awọn oogun kokoro alaye nikan nigba ti o ba ṣe pataki.",
        livestock: "Fun iṣakoso ẹranko, rii daju pe o yi ibijẹun, ayẹwo ilera deede, ati GPS tracking lati ṣe idiwọ ija pẹlu awọn agbe."
      },
      ha: {
        greeting: "Sannu! Zan iya taimaka muku da fasahar noma, kula da dabbobi, da farashin kasuwa. Me kike so ka sani?",
        pest: "Don magance kwari, ina ba da shawarar tsarin sarrafa kwari (IPM). Fara da juyar amfanin gona, yi amfani da kwari masu amfani, kuma ka shafa magungunan kwari na halitta kawai idan ya cancanta.",
        livestock: "Don kula da dabbobi, tabbatar da jujjuyawar kiwo na yau da kullun, bincike na kiwon lafiya na yau da kullun, da bin diddigin GPS don hana rikici da manoma."
      }
    };

    // Simple keyword matching for demo
    const userLower = userMessage.toLowerCase();
    let response = mockResponses[language]?.greeting || mockResponses.en.greeting;
    
    if (userLower.includes('pest') || userLower.includes('kwari') || userLower.includes('kokoro') || userLower.includes('ahụhụ')) {
      response = mockResponses[language]?.pest || mockResponses.en.pest;
    } else if (userLower.includes('livestock') || userLower.includes('animal') || userLower.includes('dabbobi') || userLower.includes('ẹranko')) {
      response = mockResponses[language]?.livestock || mockResponses.en.livestock;
    } else if (userLower.includes('market') || userLower.includes('price') || userLower.includes('kasuwa') || userLower.includes('ọja')) {
      response = mockResponses[language]?.market || mockResponses.en.market;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    return response;
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
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl">
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
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
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