import React, { useState } from "react";
import {
  MapPin,
  MessageSquare,
  Bot,
  Menu,
  X,
  Tractor,
  Users,
  Map,
} from "lucide-react";
import GeoTracker from "../Cowtracking/GeoTracker";
import ChatBox from "../Cowtracking/ChatBox";
import AgroTrackChatBot from "../Cowtracking/AgroTrackChatBot";
import sideBarLogo from "../../assets/sidebar_logo_white.png";
import "./FarmerDashboard.css";

// Responsive wrapper for GeoTracker
const ResponsiveGeoTracker = ({ userRole }) => (
  <div className="bg-[#0f172a] rounded-lg shadow-lg p-6">
    <div className="flex items-center gap-2 mb-4">
      <Map className="text-[#22c55e]" size={24} />
      <h3 className="text-xl font-semibold text-[#e2e8f0]">
        Livestock Tracking & Geo-fencing
      </h3>
    </div>
    <div className="rounded-lg overflow-hidden border border-[#cbd5e1]">
      <GeoTracker userRole={userRole} />
    </div>
  </div>
);

// Responsive wrapper for ChatBox
const ResponsiveChatBox = ({ userId, role }) => (
  <div className="bg-[#0f172a] rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <Users className="text-[#3b82f6]" size={24} />
      <h3 className="text-xl font-semibold text-[#e2e8f0]">Community Chat</h3>
    </div>
    <div className="flex-1 min-h-0">
      <ChatBox userId={userId} role={role} />
    </div>
  </div>
);

// Responsive wrapper for AgroTrackChatBot
const ResponsiveAgroTrackChatBot = () => (
  <div className="bg-[#0f172a] rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <Bot className="text-[#22c55e]" size={24} />
      <h3 className="text-xl font-semibold text-[#e2e8f0]">AgroTrack AI</h3>
    </div>
    <div className="flex-1 min-h-0">
      <AgroTrackChatBot />
    </div>
  </div>
);

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userId = "farmer-1";

  //replace my name with the actual username
  const farmerUsername = "munachi";

  const tabs = [
    { id: "overview", label: "Overview", icon: Tractor },
    { id: "tracking", label: "Livestock Tracking", icon: MapPin },
    { id: "chat", label: "Community", icon: MessageSquare },
    { id: "ai-assistant", label: "AI Assistant", icon: Bot },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r bg-[#22c55e]/70 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Active Alerts</h3>
                    <p className="text-3xl font-bold mt-2">3</p>
                  </div>
                  <MapPin size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">
                  Livestock near restricted areas
                </p>
              </div>

              <div className="bg-gradient-to-r bg-[#22c55e]/70 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Grazing Areas</h3>
                    <p className="text-3xl font-bold mt-2">5</p>
                  </div>
                  <Tractor size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">Designated safe zones</p>
              </div>

              <div className="bg-gradient-to-r bg-[#22c55e]/70 text-white p-6 rounded-lg shadow-lg">
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

            {/* Activity + Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveGeoTracker userRole="farmer" />
              <div className="space-y-6">
                <div className="bg-[var(--color-bg-dark)] rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-[var(--color-gray-light)] mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[#e2e8f0]/95 rounded-lg">
                      <div className="w-2 h-2 bg-[var(--color-red)] rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                          Livestock detected in sector 7
                        </p>
                        <p className="text-xs text-[var(--color-gray-muted)]">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#e2e8f0]/95 rounded-lg">
                      <div className="w-2 h-2 bg-[var(--color-green)] rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                          New grazing area approved
                        </p>
                        <p className="text-xs text-[var(--color-gray-medium)]">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#e2e8f0]/95 rounded-lg">
                      <div className="w-2 h-2 bg-[var(--color-blue)] rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                          Message from herder in your area
                        </p>
                        <p className="text-xs text-[var(--color-gray-medium)]">
                          3 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "tracking":
        return (
          <div className="space-y-6">
            <div className="bg-[var(--color-bg-dark)] rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[var(--color-gray-light)] mb-4">
                Livestock Tracking & Geo-fencing
              </h2>
              <p className="text-[var(--color-gray-medium)] mb-6">
                Monitor livestock movements and manage grazing areas to prevent
                conflicts.
              </p>
            </div>
            <ResponsiveGeoTracker userRole="farmer" />
          </div>
        );

      case "chat":
        return (
          <div className="space-y-6">
            <div className="bg-[var(--color-bg-dark)] rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[var(--color-gray-light)] mb-4">
                Community Communication
              </h2>
              <p className="text-[var(--color-gray-medium)] mb-6">
                Connect with herders and other farmers in your area for better
                coordination.
              </p>
            </div>
            <div className="h-96">
              <ResponsiveChatBox userId={userId} role="farmer" />
            </div>
          </div>
        );

      case "ai-assistant":
        return (
          <div className="space-y-6">
            <div className="bg-[var(--color-bg-dark)] rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[var(--color-gray-light)] mb-4">
                AI Agricultural Assistant
              </h2>
              <p className="text-[var(--color-gray-medium)] mb-6">
                Get expert farming advice, pest control tips, and market
                information in multiple languages.
              </p>
            </div>
            <div className="h-96">
              <ResponsiveAgroTrackChatBot />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-darker)] flex">
      {/* Sidebar */}
      <div
        className={`bg-[var(--color-bg-dark)] shadow-lg transition-all duration-300 fixed top-0 left-0 h-screen ${
          sidebarOpen ? "w-64" : "w-16"
        } lg:w-64 flex flex-col`}
      >
        {/* Header */}
        <div className="p-1.5 border-b border-[#cbd5e1]/50 flex items-center">
          <div className={`flex items-center ${sidebarOpen ? "gap-3" : ""}`}>
            <div className="w-11 h-10 bg-[var(--color-green)] rounded-lg flex items-center justify-center p-2">
              <img src={sideBarLogo} alt="agrotrack_sidebar" />
            </div>
            <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
              <h1 className="font-bold text-lg text-[var(--color-gray-light)]">
                AgroTrack
              </h1>
              <p className="text-sm text-[var(--color-gray-medium)]">
                Farmer Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    sidebarOpen ? "w-full" : "w-fit"
                  } flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-[var(--color-green)] text-white shadow-lg"
                      : "text-[var(--color-gray-medium)] hover:bg-[var(--color-bg-darker)]"
                  }`}
                >
                  <Icon size={20} />
                  <span
                    className={`${
                      sidebarOpen ? "block" : "hidden"
                    } lg:block font-medium`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#cbd5e1]/50">
          <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <div className="text-center">
              <p className="text-xs text-[var(--color-gray-medium)]">
                AgroTrack v1.0
              </p>
              <p className="text-xs text-[var(--color-gray-muted)]">
                Peace through Technology
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        } lg:ml-64`}
      >
        {/* Top Bar */}
        <header
          className={`bg-[var(--color-bg-dark)] shadow-sm border-b border-[#cbd5e1]/50 px-4 ${
            sidebarOpen ? "py-1.5" : "py-0.5"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#2f3e55] text-[#fff]"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-gray-light)]">
                  {tabs.find((tab) => tab.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-[var(--color-gray-muted)]">
                  Welcome back, Farmer{" "}
                  <span className="capitalize">{farmerUsername}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-[var(--color-gray-medium)]">
                <div className="w-2 h-2 bg-[var(--color-green)] rounded-full"></div>
                <span>System Online</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-[var(--color-green)] to-[var(--color-green-dark)] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold uppercase">
                  {farmerUsername[0]}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
