import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  MessageSquare,
  Bot,
  Menu,
  X,
  Tractor,
  Users,
  Map,
  Settings,
  Bell, 
  Phone, 
  Mail, 
  Smartphone, 
  User, 
  Edit, 
  Save
} from "lucide-react";
import GeoTracker from "../Cowtracking/GeoTracker";
import ChatBox from "../Cowtracking/ChatBox";
import AgroTrackChatBot from "../Cowtracking/AgroTrackChatBot";
import sideBarLogo from "../../assets/sidebar_logo_white.png";
import AdvancedSettingsPanel from "../settings/settings";

// Responsive wrapper for GeoTracker
const ResponsiveGeoTracker = ({ userRole }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center gap-2 mb-4">
      <Map className="text-green-600" size={24} />
      <h3 className="text-xl font-semibold">
        Livestock Tracking & Geo-fencing
      </h3>
    </div>
    <div className="rounded-lg overflow-hidden border">
      <GeoTracker userRole={userRole} />
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
  <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <Users className="text-green-600" size={24} />
      <h3 className="text-xl font-semibold">AgroTrack AI</h3>
    </div>
    <AgroTrackChatBot />
  </div>
);

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userId = "farmer-1";

  const tabs = [
    { id: "overview", label: "Overview", icon: Tractor },
    { id: "tracking", label: "Livestock Tracking", icon: MapPin },
    { id: "chat", label: "Community", icon: MessageSquare },
    { id: "ai-assistant", label: "AI Assistant", icon: Bot },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  //replace my name with the actual username
  const farmerUsername = "munachi";

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6 m-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
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

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
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
              <ResponsiveGeoTracker userRole="farmer" />
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Livestock detected in sector 7
                        </p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New grazing area approved
                        </p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Message from herder in your area
                        </p>
                        <p className="text-xs text-gray-500">3 hours ago</p>
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
          <div className="space-y-6 m-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Livestock Tracking & Geo-fencing
              </h2>
              <p className="text-gray-600 mb-6">
                Monitor livestock movements and manage grazing areas to prevent
                conflicts.
              </p>
            </div>
            <ResponsiveGeoTracker userRole="farmer" />
          </div>
        );

      case "chat":
        return (
          <div className="space-y-6 m-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Community Communication
              </h2>
              <p className="text-gray-600 mb-6">
                Connect with herders and other farmers in your area for better
                coordination.
              </p>
            </div>
            <div className="min-h-[400px]">
              <ResponsiveChatBox userId={userId} role="farmer" />
            </div>
          </div>
        );

      case "ai-assistant":
        return (
          <div className="space-y-6 m-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                AI Agricultural Assistant
              </h2>
              <p className="text-gray-600 mb-6">
                Get expert farming advice, pest control tips, and market
                information in multiple languages.
              </p>
            </div>
            <div className="min-h-[400px]">
              <ResponsiveAgroTrackChatBot />
            </div>
          </div>
        );

      case "settings":
  return (
    <div className="space-y-6 m-6">
      {/* Settings Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => {
              const currentState = activeTab;
              setActiveTab(currentState === "settings-notifications" ? "settings" : "settings-notifications");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === "settings-notifications"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Bell size={18} />
            Notifications
          </button>
          <button
            onClick={() => {
              const currentState = activeTab;
              setActiveTab(currentState === "settings-profiles" ? "settings" : "settings-profiles");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === "settings-profiles"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Users size={18} />
            Farmer Profiles
          </button>
        </div>
      </div>

      {/* Notifications Content */}
      {(activeTab === "settings-notifications" || activeTab === "settings") && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Notification Settings</h2>
            <p className="text-gray-600">
              Configure how you receive alerts and notifications from the system.
            </p>
          </div>

          {/* Notification Channels */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Notification Channels
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-green-600 bg-green-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} />
                    <span className="font-medium text-gray-800">SMS Alerts</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">Send SMS notifications for violations</p>
              </div>

              <div className="text-blue-600 bg-blue-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Phone size={20} />
                    <span className="font-medium text-gray-800">Voice Calls</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">Automated voice call alerts</p>
              </div>

              <div className="text-purple-600 bg-purple-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Mail size={20} />
                    <span className="font-medium text-gray-800">Email Notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">Email alerts and reports</p>
              </div>

              <div className="text-orange-600 bg-orange-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} />
                    <span className="font-medium text-gray-800">Push Notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">Mobile app notifications</p>
              </div>
            </div>
          </div>

          {/* Save Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-green-600">
                  Settings will be saved automatically
                </span>
              </div>
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                <Save size={16} />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Farmer Profiles Content */}
      {activeTab === "settings-profiles" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Farmer Profiles</h2>
            <p className="text-gray-600">
              Manage registered farmers and their information in the system.
            </p>
          </div>

          {/* Farmer List */}
          <div className="space-y-4">
            {/* Farmer 1 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">Adamu Ibrahim</h4>
                    <p className="text-sm text-gray-500">Registered: Jan 15, 2024</p>
                  </div>
                </div>
                <button className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                  <Edit size={16} />
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                    <User size={16} />
                    Personal Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">NIN:</span>
                      <span className="font-medium">12345678901</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">+2348123456789</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-xs">adamu.ibrahim@email.com</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin size={16} />
                    Farm Details
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-xs">Plateau State, Nigeria</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">50 hectares</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livestock:</span>
                      <span className="font-medium">25 animals</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Phone size={16} />
                    Additional Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency:</span>
                      <span className="font-medium">+2348987654321</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Account:</span>
                      <span className="font-medium">0123456789</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cooperative:</span>
                      <span className="font-medium text-xs">Plateau Cattle Farmers Association</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    View Animals
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Send Message
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    Contact Info
                  </button>
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                    View Reports
                  </button>
                </div>
              </div>
            </div>

            {/* Farmer 2 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">Musa Garba</h4>
                    <p className="text-sm text-gray-500">Registered: Feb 10, 2024</p>
                  </div>
                </div>
                <button className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                  <Edit size={16} />
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                    <User size={16} />
                    Personal Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">NIN:</span>
                      <span className="font-medium">98765432109</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">+2348234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-xs">musa.garba@email.com</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin size={16} />
                    Farm Details
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-xs">Kaduna State, Nigeria</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">75 hectares</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livestock:</span>
                      <span className="font-medium">40 animals</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Phone size={16} />
                    Additional Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency:</span>
                      <span className="font-medium">+2348876543210</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Account:</span>
                      <span className="font-medium">9876543210</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cooperative:</span>
                      <span className="font-medium text-xs">Kaduna Herders Union</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    View Animals
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Send Message
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    Contact Info
                  </button>
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:b-purple-600">
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
      default:
        return <div className="p-6">Select a tab to view content.</div>;
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 h-screen fixed top-0 left-0 overflow-y-hidden ${
          sidebarOpen ? "w-64" : "w-16"
        } lg:w-64 flex flex-col border-r border-gray-200/30`}
      >
        {/* Header */}
        <div className="p-1.5 border-b border-gray-200 flex items-center">
          <div className={`flex items-center ${sidebarOpen ? "gap-3" : ""}`}>
            <div className="w-11 h-10 bg-green-500 rounded-lg flex items-center justify-center p-2">
              <img src={sideBarLogo} alt="agrotrack_sidebar" />
            </div>
            <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
              <h1 className="font-bold text-lg leading-5 text-gray-800">
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
                      ? "bg-green-500 text-white shadow-lg"
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
        {/* //logout button here */}
          <a href="/login"> <button
            className={"sidebarOpen w-60 bg-red-100 flex m-3 items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"}
          >
            <X size={20} />
            <span className={`${sidebarOpen ? "block" : "hidden"} lg:block font-medium`}>Logout</span>
          </button></a>
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
        className={`flex-1 flex flex-col transition-all duration-300 ${
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
                Welcome back, Farmer{" "}
                <span className="capitalize">{farmerUsername}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Online</span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold uppercase">
                {farmerUsername[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
