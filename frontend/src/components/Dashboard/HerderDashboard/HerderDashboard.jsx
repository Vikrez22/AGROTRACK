import React, { useState } from "react";
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
  Bell,
  Phone,
  Mail,
  Smartphone,
  User,
  Edit,
  Save,
} from "lucide-react";
import GeoTrackerHerder from "../../Cowtracking/GeoTracker";
import ChatBox from "../../Cowtracking/ChatBox";
import AgroTrackChatBot from "../../Cowtracking/AgroTrackChatBot";
import sideBarLogo from "../../../assets/sidebar_logo_white.png";
import { useAuth } from "../../../context/AuthContext";
import { usePresence } from "../../../hooks/activity/usePresence";

// Responsive wrapper for GeoTrackerHerder
const ResponsiveGeoTrackerHerder = ({ userId, role }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center gap-2 mb-4">
      <Map className="text-green-600" size={24} />
      <h3 className="text-xl font-semibold">Live Location Tracking</h3>
    </div>
    <div className="rounded-lg overflow-hidden border">
      <GeoTrackerHerder userRole={role} userId={userId} />
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
const ResponsiveChatBox = ({ userId, role, LGA, herderUsername }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <Users className="text-green-600" size={24} />
      <h3 className="text-xl font-semibold">Community Chat</h3>
    </div>
    <div className="flex-1 min-h-0">
      <ChatBox userId={userId} role={role} userLGA={LGA} />
    </div>
  </div>
);

// Responsive wrapper for AgroTrackChatBot
const ResponsiveAgroTrackChatBot = () => (
  <div className="h-full flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
    <AgroTrackChatBot />
  </div>
);

const HerderDashboard = () => {
  const { role, loading, profile } = useAuth();

  usePresence();

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("profiles");

  const userId = profile?.uid;
  const herderUsername = profile?.displayName;
  const LGA = profile?.LGA;

  console.log("Herder Dashboard username", profile.displayName);

  const firstLetters = herderUsername
    .split(" ")
    .map((name) => name[0])
    .join("");

  console.log("this is the USERID: ", userId);
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
          <div className="space-y-6 m-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Location Status</h3>
                    <p className="text-3xl font-bold mt-2">Active</p>
                  </div>
                  <Navigation size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">GPS tracking enabled</p>
              </div>

              <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
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

              <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
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
              <ResponsiveGeoTrackerHerder role={role} userId={userId} />
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
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
                          Message from Herder nearby
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
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
          <div className="space-y-6 m-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Live Location Tracking
              </h2>
              <p className="text-gray-600 mb-6">
                Share your live location to help prevent conflicts and
                coordinate with farmers in your area.
              </p>
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
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
          <div className="space-y-6 m-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Community Communication
              </h2>
              <p className="text-gray-600 mb-6">
                Coordinate with farmers and other herders to prevent conflicts
                and share important updates.
              </p>
            </div>
            <ResponsiveChatBox userId={userId} role={role} LGA={LGA} />
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
                Get expert advice on livestock management, grazing practices,
                and conflict resolution.
              </p>
            </div>
            <ResponsiveAgroTrackChatBot />
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6 m-6">
            {/* Settings Navigation */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setSettingsTab("profiles")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                    settingsTab === "profiles"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Users size={18} />
                  Herder Profile
                </button>
                <button
                  onClick={() => setSettingsTab("notifications")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                    settingsTab === "notifications"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Bell size={18} />
                  Notifications
                </button>
              </div>
            </div>

            {/* Notifications Content */}
            {settingsTab === "notifications" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Notification Settings
                  </h2>
                  <p className="text-gray-600">
                    Configure how you receive alerts and notifications from the
                    system.
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
                          <span className="font-medium text-gray-800">
                            SMS Alerts
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Send SMS notifications for violations
                      </p>
                    </div>

                    <div className="text-blue-600 bg-blue-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Phone size={20} />
                          <span className="font-medium text-gray-800">
                            Voice Calls
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Automated voice call alerts
                      </p>
                    </div>

                    <div className="text-purple-600 bg-purple-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Mail size={20} />
                          <span className="font-medium text-gray-800">
                            Email Notifications
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Email alerts and reports
                      </p>
                    </div>

                    <div className="text-orange-600 bg-orange-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Smartphone size={20} />
                          <span className="font-medium text-gray-800">
                            Push Notifications
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Web app notifications
                      </p>
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

            {/* Herder Profiles Content */}
            {settingsTab === "profiles" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">Herder Profile</h2>
                  <p className="text-gray-600">
                    View registered Herder information in the system.
                  </p>
                </div>

                {/* Herder List */}
                <div className="space-y-4">
                  {/* Herder 1 */}
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800">
                            Alhaji Musa
                          </h4>
                          <p className="text-sm text-gray-500">
                            Registered: Sep 10, 2025
                          </p>
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
                            <span className="font-medium text-xs">
                              musa.garba@email.com
                            </span>
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
                            <span className="font-medium text-xs">
                              Kaduna State, Nigeria
                            </span>
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
                            <span className="font-medium text-xs">
                              Kaduna Herders Union
                            </span>
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
                </div>
              </div>
            )}
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
        } lg:w-64 flex flex-col border-r border-gray-200/30`}
      >
        {/* Header */}
        <div className="p-1.5 border-b border-gray-200 flex items-center">
          <div className="flex items-center">
            <a href="/">
              <div className="w-11 h-10 bg-green-500 rounded-lg flex items-center justify-center p-2 cursor-pointer">
                <img src={sideBarLogo} alt="agrotrack_sidebar" />
              </div>
            </a>
            <div
              className={`${sidebarOpen ? "block" : "hidden"} lg:block pl-3`}
            >
              <h1 className="font-bold text-lg text-green-500 leading-5">
                AgroTrack
              </h1>
              <p className="text-sm text-gray-500">Herder Dashboard</p>
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
                    sidebarOpen ? "w-full" : "w-full"
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
        <a href="/login">
          {" "}
          <button
            className={
              "sidebarOpen w-60 bg-red-100 flex m-3 items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            }
          >
            <X size={20} />
            <span
              className={`${
                sidebarOpen ? "block" : "hidden"
              } lg:block font-medium`}
            >
              Logout
            </span>
          </button>
        </a>
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
        <header className="bg-white border-b border-gray-200 px-4 py-0.5 sticky top-0 right-0 flex items-center justify-between z-50">
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
            <div className="w-8 h-8 bg-linear-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold uppercase">
                {firstLetters}
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

export default HerderDashboard;
