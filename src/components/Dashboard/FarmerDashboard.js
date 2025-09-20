import React, { useState, useEffect, useRef } from 'react';
import { MapPin, MessageSquare, Bot, Menu, X, Tractor, Users, Map } from 'lucide-react';

// Mock GeoTracker Component
const GeoTracker = ({ userRole }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center gap-2 mb-4">
      <Map className="text-green-600" size={24} />
      <h3 className="text-xl font-semibold">Livestock Tracking & Geo-fencing</h3>
    </div>
    <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="mx-auto mb-2 text-green-600" size={48} />
        <p className="text-gray-600">Interactive Map Component</p>
        <p className="text-sm text-gray-500 mt-1">Track livestock and manage grazing areas</p>
      </div>
    </div>
    <div className="mt-4 flex gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded"></div>
        <span>Grazing Areas</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded"></div>
        <span>Restricted Areas</span>
      </div>
    </div>
  </div>
);

// Mock ChatBox Component
const ChatBox = ({ userId, role }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { userId: 'farmer-2', role: 'farmer', message: 'Has anyone seen cattle near sector 3?', timestamp: new Date() },
    { userId: 'herder-1', role: 'herder', message: 'Yes, my cattle are grazing there. Moving them out now.', timestamp: new Date() },
    { userId: userId, role: role, message: 'Thank you for the update!', timestamp: new Date() }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setChatMessages([...chatMessages, {
      userId,
      role,
      message,
      timestamp: new Date()
    }]);
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-blue-600" size={24} />
        <h3 className="text-xl font-semibold">Community Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 min-h-64">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-xs ${
              msg.userId === userId
                ? 'bg-green-500 text-white ml-auto'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <div className="text-xs opacity-70 mb-1">{msg.role}</div>
            <div className="text-sm">{msg.message}</div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Mock AgroTrackChatBot Component
const AgroTrackChatBot = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <Bot className="text-purple-600" size={24} />
      <h3 className="text-xl font-semibold">AI Agricultural Assistant</h3>
    </div>
    
    <div className="flex-1 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 min-h-64 flex items-center justify-center">
      <div className="text-center">
        <Bot className="mx-auto mb-3 text-purple-600" size={48} />
        <p className="text-gray-600 mb-2">AI Chatbot Ready</p>
        <p className="text-sm text-gray-500">Get farming advice in multiple languages</p>
      </div>
    </div>
    
    <div className="mt-4">
      <input
        type="text"
        placeholder="Ask about farming, pests, livestock..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  </div>
);

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userId = "farmer-1";

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Tractor },
    { id: 'tracking', label: 'Livestock Tracking', icon: MapPin },
    { id: 'chat', label: 'Community', icon: MessageSquare },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Active Alerts</h3>
                    <p className="text-3xl font-bold mt-2">3</p>
                  </div>
                  <MapPin size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">Livestock near restricted areas</p>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Grazing Areas</h3>
                    <p className="text-3xl font-bold mt-2">5</p>
                  </div>
                  <Tractor size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">Designated safe zones</p>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Messages</h3>
                    <p className="text-3xl font-bold mt-2">12</p>
                  </div>
                  <MessageSquare size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">Community updates</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GeoTracker userRole="farmer" />
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Livestock detected in sector 7</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New grazing area approved</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Message from herder in your area</p>
                        <p className="text-xs text-gray-500">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tracking':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Livestock Tracking & Geo-fencing</h2>
              <p className="text-gray-600 mb-6">
                Monitor livestock movements and manage grazing areas to prevent conflicts.
              </p>
            </div>
            <GeoTracker userRole="farmer" />
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Community Communication</h2>
              <p className="text-gray-600 mb-6">
                Connect with herders and other farmers in your area for better coordination.
              </p>
            </div>
            <div className="h-96">
              <ChatBox userId={userId} role="farmer" />
            </div>
          </div>
        );

      case 'ai-assistant':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">AI Agricultural Assistant</h2>
              <p className="text-gray-600 mb-6">
                Get expert farming advice, pest control tips, and market information in multiple languages.
              </p>
            </div>
            <div className="h-96">
              <AgroTrackChatBot />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } lg:w-64 flex flex-col`}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Tractor className="text-white" size={20} />
            </div>
            <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
              <h1 className="font-bold text-lg text-gray-800">AgroTrack</h1>
              <p className="text-sm text-gray-500">Farmer Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className={`${sidebarOpen ? 'block' : 'hidden'} lg:block font-medium`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="text-center">
              <p className="text-xs text-gray-500">AgroTrack v1.0</p>
              <p className="text-xs text-gray-400">Peace through Technology</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-gray-500">Welcome back, Farmer</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">F</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;