import { useState, useEffect, useRef } from "react";
import {
  Send,
  Users,
  MessageCircle,
  Clock,
  User,
  Shield,
  CheckCheck,
  Check,
} from "lucide-react";
import { db } from "../../config/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ChatServices } from "../../services/chat";
import { useOnlineUsers } from "../../hooks/activity/useOnlineUsers";
import { useMessageReads } from "../../hooks/chat/useMessageReads";

const ChatBox = ({ userId, role, userLGA }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const { onlineCount } = useOnlineUsers(userLGA?.trim());
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Use the custom hook for read tracking
  const {
    unreadCount,
    markMessagesAsRead,
    markAllAsRead,
    isMessageRead,
    getReadCount,
  } = useMessageReads(chatMessages, userLGA, userId);

  // Fetch messages
  useEffect(() => {
    if (!userLGA) {
      console.log("No LGA found for user");
      return;
    }

    const q = query(
      collection(db, "lgas", userLGA, "chatMessages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatMessages(messages);
    });

    return () => unsubscribe();
  }, [userLGA]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Mark visible messages as read when scrolling or when new messages arrive
  useEffect(() => {
    const markVisibleMessagesAsRead = () => {
      if (!messagesContainerRef.current || chatMessages.length === 0) return;

      const container = messagesContainerRef.current;
      const containerRect = container.getBoundingClientRect();

      // Get all message elements
      const messageElements = container.querySelectorAll("[data-message-id]");
      const visibleMessageIds = [];

      messageElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        // Check if message is visible in viewport
        if (
          rect.top >= containerRect.top &&
          rect.bottom <= containerRect.bottom
        ) {
          const messageId = element.getAttribute("data-message-id");
          visibleMessageIds.push(messageId);
        }
      });

      // Mark visible messages as read
      if (visibleMessageIds.length > 0) {
        markMessagesAsRead(visibleMessageIds);
      }
    };

    // Use a slight delay to allow messages to render before marking as read
    const timeoutId = setTimeout(() => {
      markVisibleMessagesAsRead();
    }, 500);

    // Mark messages as read on scroll
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", markVisibleMessagesAsRead);
    }

    return () => {
      clearTimeout(timeoutId);
      if (container) {
        container.removeEventListener("scroll", markVisibleMessagesAsRead);
      }
    };
  }, [chatMessages, markMessagesAsRead]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsTyping(true);

    try {
      await ChatServices.sendMessage({ message });
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
          <div className="relative p-2 bg-green-500 rounded-lg">
            <MessageCircle className="text-white" size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Community Chat</h3>
            <p className="text-sm text-gray-500">{onlineCount} users online</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full transition-colors"
            >
              Mark all read
            </button>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 max-h-96"
      >
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
          chatMessages.map((msg) => {
            const isOwn = msg.userId === userId;
            const isRead = isMessageRead(msg.id);
            const readCount = getReadCount(msg.id);

            return (
              <div
                key={msg.id}
                data-message-id={msg.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
                    isOwn
                      ? "bg-green-500 text-white rounded-br-sm"
                      : `${
                          isRead ? "bg-white" : "bg-blue-50 border-blue-200"
                        } text-gray-800 rounded-bl-sm border border-gray-200`
                  }`}
                >
                  {!isOwn && (
                    <div
                      className={`flex items-center gap-2 mb-2 ${getRoleColor(
                        msg.role
                      )} px-2 py-1 rounded-full text-xs font-medium w-fit`}
                    >
                      {getRoleIcon(msg.role)}
                      <span className="capitalize">
                        {msg.role + " " + msg.displayName}
                      </span>
                      {!isRead && (
                        <span className="ml-1 px-1.5 py-0.5 bg-green-500 text-white rounded-full text-[10px] font-semibold">
                          NEW
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>

                  <div
                    className={`flex items-center justify-between gap-3 mt-2 text-xs ${
                      isOwn ? "text-green-100" : "text-gray-500"
                    }`}
                  >
                    <span>{formatTimestamp(msg.timestamp)}</span>

                    {isOwn && (
                      <div className="flex items-center gap-1 ">
                        {readCount > 1 ? (
                          <>
                            <CheckCheck size={14} className="text-blue-200" />
                            <span className="text-[10px]">{readCount}</span>
                          </>
                        ) : readCount === 1 ? (
                          <Check size={14} />
                        ) : (
                          <Check size={14} className="opacity-50" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
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
