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
  SettingsIcon,
} from "lucide-react";
import GeoTrackerHerder from "../../Cowtracking/GeoTracker";
import ChatBox from "../../Cowtracking/ChatBox";
import AgroTrackChatBot from "../../Cowtracking/AgroTrackChatBot";
import sideBarLogo from "../../../assets/sidebar_logo_white.png";
import { useAuth } from "../../../context/AuthContext";
import { usePresence } from "../../../hooks/activity/usePresence";
import { useAuthMutations } from "../../../hooks/useAuthMutations";
import Settings from "./Settings";

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

  const { signOut } = useAuthMutations();

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
    { id: "settings", label: "Settings", icon: SettingsIcon },
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
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden transition-all duration-300">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } lg:opacity-100 lg:pointer-events-none lg:bg-transparent h-full bg-black/10 fixed top-0 left-0 w-full z-2000! flex justify-between backdrop-blur-xs lg:backdrop-blur-none`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div
          className={`bg-white shadow-lg lg:shadow-none transition-all duration-300 flex flex-col border-r border-gray-200/30 h-full pointer-events-auto ${
            sidebarOpen
              ? "w-64 translate-x-0"
              : "w-0 -translate-x-full lg:translate-x-0 lg:w-64"
          } overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-2.5 border-b border-gray-200 flex items-center shrink-0">
            <div className="flex items-center">
              <a href="/">
                <div className="w-11 h-10 bg-green-500 rounded-lg flex items-center justify-center p-2 cursor-pointer">
                  <img src={sideBarLogo} alt="agrotrack_sidebar" />
                </div>
              </a>
              <div
                className={`${
                  sidebarOpen ? "block" : "hidden"
                } lg:block pl-3 whitespace-nowrap`}
              >
                <h1 className="font-bold text-lg text-green-500 leading-5">
                  AgroTrack
                </h1>
                <p className="text-sm text-gray-500">Herder Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false); // Close sidebar on selection (mobile UX)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-green-50 text-green-600 font-semibold shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-colors ${
                      isActive
                        ? "text-green-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          {/* //logout button here */}
          <div className="shrink-0">
            <button
              onClick={() => signOut.mutate()}
              className={`w-full bg-red-100 flex mb-3 items-center gap-3 px-3 py-2 ${
                sidebarOpen ? "rounded-lg" : "rounded-none"
              } text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap`}
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

            <div className="p-4 border-t border-gray-200">
              <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
                <div className="text-center">
                  <p className="text-xs text-gray-500">AgroTrack v1.0</p>
                  <p className="text-xs text-gray-400">
                    Peace through Technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-white p-2 h-fit m-2 rounded-lg cursor-pointer hover:bg-white/80 transition-colors block lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <X size={25} className="text-red-600" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 p-1.5 flex items-center justify-between z-50 shrink-0 px-2.5">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-gray-500">
                Welcome back, Herder{" "}
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
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default HerderDashboard;
