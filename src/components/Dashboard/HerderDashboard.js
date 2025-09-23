import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  MessageSquare,
  Bot,
  Menu,
  X,
  Navigation,
  Users,
  Map,
  AlertTriangle,
  Settings,
} from "lucide-react";
import GeoTrackerHerder from "../Cowtracking/GeotrackerHerder";
import ChatBox from "../Cowtracking/ChatBox";
import AgroTrackChatBot from "../Cowtracking/AgroTrackChatBot";
import sideBarLogo from "../../assets/sidebar_logo_blue.png";

// Responsive wrapper for GeoTrackerHerder
const ResponsiveGeoTrackerHerder = ({ userId }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center gap-2 mb-4">
      <Map className="text-blue-600" size={24} />
      <h3 className="text-xl font-semibold">Live Location Tracking</h3>
    </div>
    <div className="rounded-lg overflow-hidden border">
      <GeoTrackerHerder userRole="herder" userId={userId} />
    </div>
    <div className="mt-4 flex gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded"></div>
        <span>Safe Grazing Areas</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded"></div>
        <span>Restricted Areas</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-blue-500 rounded"></div>
        <span>Your Location</span>
      </div>
    </div>
  </div>
);

// Responsive wrapper for ChatBox
const ResponsiveChatBox = ({ userId, role }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <Users className="text-green-600" size={24} />
      <h3 className="text-xl font-semibold">Community Chat</h3>
    </div>
    <div className="flex-1 min-h-0">
      <ChatBox userId={userId} role={role} />
    </div>
  </div>
);

// Responsive wrapper for AgroTrackChatBot
const ResponsiveAgroTrackChatBot = () => (
  <div className="h-full flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
    <AgroTrackChatBot />
  </div>
);      

const HerderDashboard = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const herderUsername = "munachi";

  const tabs = [
    { id: "overview", label: "Overview", icon: Navigation },
    { id: "tracking", label: "Location Tracking", icon: MapPin },
    { id: "chat", label: "Community", icon: MessageSquare },
    { id: "ai-assistant", label: "AI Assistant", icon: Bot },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Location Status</h3>
                    <p className="text-3xl font-bold mt-2">Active</p>
                  </div>
                  <Navigation size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">GPS tracking enabled</p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Safe Zones</h3>
                    <p className="text-3xl font-bold mt-2">5</p>
                  </div>
                  <MapPin size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">
                  Available grazing areas
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Alerts</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                  </div>
                  <AlertTriangle size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">No active warnings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveGeoTrackerHerder userId={userId} />
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Location shared successfully
                        </p>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Entered safe grazing zone
                        </p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Message from farmer nearby
                        </p>
                        <p className="text-xs text-gray-500">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Safety Guidelines
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium">Keep GPS enabled</p>
                        <p className="text-gray-600">
                          Allow location sharing for conflict prevention
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium">Stay in green zones</p>
                        <p className="text-gray-600">
                          Use designated grazing areas when possible
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium">Communicate with farmers</p>
                        <p className="text-gray-600">
                          Use community chat for coordination
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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Live Location Tracking
              </h2>
              <p className="text-gray-600 mb-6">
                Share your live location to help prevent conflicts and
                coordinate with farmers in your area.
              </p>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Navigation className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-medium">GPS Tracking Active</p>
                  <p className="text-sm text-gray-600">
                    Your location is being shared for safety monitoring
                  </p>
                </div>
              </div>
            </div>
            <ResponsiveGeoTrackerHerder userId={userId} />
          </div>
        );

      case "chat":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Community Communication
              </h2>
              <p className="text-gray-600 mb-6">
                Coordinate with farmers and other herders to prevent conflicts
                and share important updates.
              </p>
            </div>
            <ResponsiveChatBox userId={userId} role="herder" />
          </div>
        );

      case "ai-assistant":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                AI Agricultural Assistant
              </h2>
              <p className="text-gray-600 mb-6">
                Get expert advice on livestock management, grazing practices,
                and conflict resolution.
              </p>
            </div>
            <ResponsiveAgroTrackChatBot />
          </div>
        );

      case "settings":
        return (
          <div>
            <h1>The Settings Page</h1>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 h-screen fixed top-0 left-0 overflow-y-hidden ${
          sidebarOpen ? "w-64" : "w-16"
        } lg:w-64 flex flex-col`}
      >
        {/* Header */}
        <div className="p-1.5 border-b border-gray-200 flex items-center">
          <div className={`flex items-center ${sidebarOpen ? "gap-3" : ""}`}>
            <div className="w-11 h-10 bg-sky-200 rounded-lg flex items-center justify-center p-2">
              <img src={sideBarLogo} alt="agrotrack_sidebar" />
            </div>
            <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
              <h1 className="font-bold text-lg text-blue-500 leading-5">
                AgroTrack
              </h1>
              <p className="text-sm text-gray-500">Farmer Dashboard</p>
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
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
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
        <div className="p-4 border-t border-gray-200">
          <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <div className="text-center">
              <p className="text-xs text-gray-500">AgroTrack v1.0</p>
              <p className="text-xs text-gray-400">Peace through Technology</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 relative ${
          sidebarOpen ? "ml-64" : "ml-16"
        } lg:ml-64`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-0.5 sticky top-0 right-0 flex items-center justify-between z-50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-gray-500">
                Welcome back,
                <span className="capitalize">{herderUsername}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>GPS Active</span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold uppercase">
                {herderUsername[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default HerderDashboard;
