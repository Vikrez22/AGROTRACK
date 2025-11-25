import React, { use, useState } from "react";
import {
  MapPin,
  MessageSquare,
  Bot,
  Menu,
  X,
  Tractor,
  SettingsIcon,
} from "lucide-react";
import sideBarLogo from "../../../assets/sidebar_logo_white.png";
import Overview from "./Overview";
import Tracking from "./Tracking";
import AiAssistant from "./AiAssistant";
import Chat from "./Chat";
import Settings from "./Settings";
import { useAuth } from "../../../context/AuthContext";
import { usePresence } from "../../../hooks/activity/usePresence";
import { useOnlineUsers } from "../../../hooks/activity/useOnlineUsers";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, profile } = useAuth();

  usePresence();

  const tabs = [
    { id: "overview", label: "Overview", icon: Tractor },
    { id: "tracking", label: "Livestock Tracking", icon: MapPin },
    { id: "chat", label: "Community", icon: MessageSquare },
    { id: "ai-assistant", label: "AI Assistant", icon: Bot },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  //replace my name with the actual username
  const farmerUsername = profile?.displayName;
  const firstLetters = farmerUsername
    .split(" ")
    .map((name) => name[0])
    .join("");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;

      case "tracking":
        return <Tracking />;

      case "chat":
        return <Chat />;

      case "ai-assistant":
        return <AiAssistant />;

      case "settings":
        return <Settings />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden transition-all duration-300">
      {/* Sidebar  */}
      <div
        className={`${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } lg:opacity-100 lg:pointer-events-none h-full bg-black/10 lg:bg-transparent fixed top-0 left-0 w-full z-2000! flex justify-between backdrop-blur-xs lg:backdrop-blur-none`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div
          className={`bg-white shadow-lg lg:shadow-none transition-all duration-300 flex flex-col border-r border-gray-200/30 h-full ${
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
                <h1 className="font-bold text-lg leading-5 text-gray-800">
                  AgroTrack
                </h1>
                <p className="text-sm text-gray-500">Farmer Dashboard</p>
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
                    setSidebarOpen(false);
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
          <div className="shrink-0">
            <a href="/login">
              <button
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
            </a>
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

      {/* Main */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden lg:ml-64">
        <header className="bg-white border-b border-gray-200 p-1.5 flex items-center justify-between z-20 shrink-0 px-2.5">
          <div className="flex items-center gap-4">
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
              <span>Online</span>
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
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
      </div>
    </div>
  );
};
export default FarmerDashboard;
