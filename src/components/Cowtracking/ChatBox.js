import React, { useState, useEffect, useRef } from "react";
import { Send, Users, MessageCircle, Clock, User, Shield } from "lucide-react";

// Mock Firebase functions for demo - replace with your actual imports
const mockDb = {};
const mockCollection = () => ({});
const mockAddDoc = async (collection, data) => {
  console.log("Mock: Adding document:", data);
  return Promise.resolve();
};
const mockOnSnapshot = (query, callback) => {
  // Mock some initial messages
  const mockMessages = [
    {
      userId: "farmer-2",
      role: "farmer",
      message: "Has anyone seen cattle near sector 3?",
      timestamp: { toDate: () => new Date(Date.now() - 300000) },
    },
    {
      userId: "herder-1",
      role: "herder",
      message: "Yes, my cattle are grazing there. Moving them out now.",
      timestamp: { toDate: () => new Date(Date.now() - 120000) },
    },
    {
      userId: "admin-1",
      role: "admin",
      message: "Thank you for the quick coordination!",
      timestamp: { toDate: () => new Date(Date.now() - 60000) },
    },
  ];

  setTimeout(() => {
    callback({
      docs: mockMessages.map((msg) => ({ data: () => msg })),
    });
  }, 100);

  return () => {};
};
const mockOrderBy = () => ({});
const mockQuery = () => ({});
const mockServerTimestamp = () => new Date();

const ChatBox = ({ userId, role }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers] = useState(3);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = mockQuery(
      mockCollection(mockDb, "chatMessages"),
      mockOrderBy("timestamp", "asc")
    );
    const unsubscribe = mockOnSnapshot(q, (snapshot) => {
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
      await mockAddDoc(mockCollection(mockDb, "chatMessages"), {
        userId,
        role,
        message: message.trim(),
        timestamp: mockServerTimestamp(),
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
        return "text-[#16a34a] bg-[#22c55e]/10";
      case "herder":
        return "text-[#3b82f6] bg-[#3b82f6]/10";
      case "admin":
        return "text-[#ef4444] bg-[#ef4444]/10";
      default:
        return "text-[#64748b] bg-[#cbd5e1]/20";
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
    <div className="flex flex-col h-full bg-[var(--color-bg-dark)] rounded-lg shadow-lg border border-[#cbd5e1]/50">
      {/* Header */}
      <div className="flex items-center justify-between p-2 px-2 sm:px-4 bg-[#15203a] rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--color-green-dark)] rounded-lg">
            <MessageCircle className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-gray-light)]">
              Community Chat
            </h3>
            <p className="text-sm text-[var(--color-gray-muted)]">
              {onlineUsers} users online
            </p>
          </div>
        </div>
        <div className="sm:flex items-center gap-2 text-sm text-[var(--color-gray-medium)] hidden">
          <div className="w-2 h-2 bg-[var(--color-green)] rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 bg-[var(--color-bg-darker)]">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[var(--color-gray-muted)]">
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
                className={`max-w-xs lg:max-w-md px-3 py-3 rounded-lg shadow-sm ${
                  msg.userId === userId
                    ? "bg-[var(--color-green)] text-white rounded-br-sm"
                    : "bg-[var(--color-bg-dark)] text-[var(--color-gray-light)] rounded-bl-sm"
                }`}
              >
                {msg.userId !== userId && (
                  <div
                    className={`flex items-center gap-2 mb-2 ${getRoleColor(
                      msg.role
                    )} px-2 py-1 rounded-full text-xs font-medium w-fit`}
                  >
                    {getRoleIcon(msg.role)}
                    <span className="capitalize">{msg.role + " munachi"}</span>
                  </div>
                )}

                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>

                <div
                  className={`flex items-center gap-2 mt-2 text-xs ${
                    msg.userId === userId
                      ? "text-[var(--color-green-rgb)]/70"
                      : "text-[var(--color-gray-muted)]"
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
            <div className="bg-[var(--color-bg-dark)] px-4 py-3 rounded-lg shadow-sm border border-[var(--color-gray-soft)] rounded-bl-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[var(--color-gray-medium)] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[var(--color-gray-medium)] rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-[var(--color-gray-medium)] rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-xs text-[var(--color-gray-muted)]">
                  Sending...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-[var(--color-bg-dark)] rounded-b-lg">
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send)"
              className="w-full px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#22c55e]/70 transition-all focus:border-transparent text-xs sm:text-sm bg-[var(--color-bg-darker)] text-[var(--color-gray-light)] min-h-8"
              rows="1"
              disabled={isTyping}
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={!message.trim() || isTyping}
            className="px-0.5 py-1.5 sm:p-3 bg-[#1b753d] hover:bg-[#14582e] disabled:bg-[#0d3b1f] disabled:text-white/70 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center min-w-[44px]"
            title="Send message"
          >
            {isTyping ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-gray-muted)]">
          <span>Press Enter to send • Shift+Enter for new line</span>
          <span
            className={`px-2 py-1 rounded-full ${getRoleColor(
              role
            )} flex items-center`}
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
