import React, { useState, useEffect, useRef } from "react";
import { Send, Users, MessageCircle, Clock, User, Shield } from "lucide-react";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const ChatBox = ({ userId, role }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers] = useState(3); // You can implement real online user count later
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Real Firebase query
    const q = query(
      collection(db, "chatMessages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setChatMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsTyping(true);

    try {
      // Real Firebase addDoc call
      await addDoc(collection(db, "chatMessages"), {
        userId,
        role,
        message: message.trim(),
        timestamp: serverTimestamp(),
      });

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getRoleColor = (userRole) => {
    switch (userRole) {
      case "farmer":
        return "text-green-600 bg-green-50";
      case "herder":
        return "text-green-600 bg-green-50";
      case "admin":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getRoleIcon = (userRole) => {
    switch (userRole) {
      case "farmer":
        return <Users size={12} />;
      case "herder":
        return <User size={12} />;
      case "admin":
        return <Shield size={12} />;
      default:
        return <MessageCircle size={12} />;
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500 rounded-lg">
            <MessageCircle className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Community Chat</h3>
            <p className="text-sm text-gray-500">{onlineUsers} users online</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 max-h-96">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageCircle size={48} className="mb-3 opacity-50" />
            <p className="text-lg font-medium">Welcome to Community Chat</p>
            <p className="text-sm text-center">
              Connect with farmers and herders in your area for better
              coordination
            </p>
          </div>
        ) : (
          chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.userId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
                  msg.userId === userId
                    ? "bg-green-500 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                }`}
              >
                {msg.userId !== userId && (
                  <div
                    className={`flex items-center gap-2 mb-2 ${getRoleColor(
                      msg.role
                    )} px-2 py-1 rounded-full text-xs font-medium w-fit`}
                  >
                    {getRoleIcon(msg.role)}
                    <span className="capitalize">{msg.role}</span>
                  </div>
                )}

                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>

                <div
                  className={`flex items-center gap-2 mt-2 text-xs ${
                    msg.userId === userId ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  <Clock size={10} />
                  <span>{formatTimestamp(msg.timestamp)}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 rounded-bl-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-xs text-gray-500">Sending...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              rows="1"
              style={{ maxHeight: "120px", minHeight: "44px" }}
              disabled={isTyping}
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={!message.trim() || isTyping}
            className="p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center min-w-[44px]"
            title="Send message"
          >
            {isTyping ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>Press Enter to send • Shift+Enter for new line</span>
          <span
            className={`px-2 py-1 flex items-center rounded-full ${getRoleColor(
              role
            )}`}
          >
            {getRoleIcon(role)}
            <span className="ml-1 capitalize">{role}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;