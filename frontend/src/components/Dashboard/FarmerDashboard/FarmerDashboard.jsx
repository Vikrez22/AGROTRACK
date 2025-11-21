import { useState } from "react";
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

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: Tractor },
    { id: "tracking", label: "Livestock Tracking", icon: MapPin },
    { id: "chat", label: "Community", icon: MessageSquare },
    { id: "ai-assistant", label: "AI Assistant", icon: Bot },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  //replace my name with the actual username
  const farmerUsername = "Munachi Onyebuchi";
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
        className={`flex-1 flex flex-col transition-all duration-300 ${
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
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};
export default FarmerDashboard;
