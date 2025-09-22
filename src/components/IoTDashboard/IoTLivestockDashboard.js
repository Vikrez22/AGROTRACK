import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  MapPin, MessageSquare, Bot, Menu, X, Shield, Users, Map, 
  AlertTriangle, Activity, Wifi, Navigation, Volume2, Eye,
  Bell, Settings, Radio, Car, FileText, Clock
} from 'lucide-react';

// Mock components - replace with your actual imports
const IoTLivestockMap = ({ userRole }) => (
  <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center border">
    <div className="text-center">
      <Map className="mx-auto mb-2 text-gray-600" size={48} />
      <p className="text-gray-600">Real-time Livestock Tracking Map</p>
      <p className="text-sm text-gray-500 mt-1">IoT devices and geofencing zones</p>
    </div>
  </div>
);

const AgroTrackChatBot = () => (
  <div className="h-full w-full bg-gray-50 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <Bot className="mx-auto mb-2 text-purple-600" size={48} />
      <p className="text-gray-600">AI Assistant Ready</p>
      <p className="text-sm text-gray-500">Get agricultural insights</p>
    </div>
  </div>
);

const ChatBox = ({ userId, role }) => (
  <div className="h-full w-full bg-gray-50 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <MessageSquare className="mx-auto mb-2 text-blue-600" size={48} />
      <p className="text-gray-600">Community Communication</p>
      <p className="text-sm text-gray-500">Coordinate with stakeholders</p>
    </div>
  </div>
);

// Responsive wrapper components
const ResponsiveIoTMap = ({ userRole }) => (
  <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Eye className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Real-time Monitoring</h3>
            <p className="text-sm text-gray-500">Live livestock tracking & alerts</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>
    </div>
    <div className="h-96">
      <IoTLivestockMap userRole={userRole} />
    </div>
  </div>
);

const ResponsiveChatBox = ({ userId, role }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <Radio className="text-orange-600" size={24} />
      <h3 className="text-xl font-semibold">Command Center</h3>
    </div>
    <div className="flex-1 min-h-0">
      <ChatBox userId={userId} role={role} />
    </div>
  </div>
);

const ResponsiveAgroTrackChatBot = () => (
  <div className="h-full flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
    <AgroTrackChatBot />
  </div>
);

const LawEnforcementDashboard = ({ userId = "law-enforcement-001" }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'conflict', message: 'Potential conflict reported in Sector 7', priority: 'high', time: '2 min ago' },
    { id: 2, type: 'livestock', message: 'Livestock in restricted area - Zone B', priority: 'medium', time: '5 min ago' }
  ]);

  // Mock statistics
  const stats = {
    activeIncidents: 3,
    livestockTracked: 147,
    alertsToday: 8,
    patrolUnits: 5
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'monitoring', label: 'Live Monitoring', icon: Eye },
    { id: 'communications', label: 'Communications', icon: Radio },
    { id: 'ai-support', label: 'AI Support', icon: Bot },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Active Incidents</h3>
                    <p className="text-3xl font-bold mt-2">{stats.activeIncidents}</p>
                  </div>
                  <AlertTriangle size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">Requiring immediate attention</p>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Livestock Tracked</h3>
                    <p className="text-3xl font-bold mt-2">{stats.livestockTracked}</p>
                  </div>
                  <Users size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">IoT devices active</p>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Alerts Today</h3>
                    <p className="text-3xl font-bold mt-2">{stats.alertsToday}</p>
                  </div>
                  <Bell size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">System notifications</p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Patrol Units</h3>
                    <p className="text-3xl font-bold mt-2">{stats.patrolUnits}</p>
                  </div>
                  <Car size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">Currently deployed</p>
              </div>
            </div>

            {/* Active Alerts Panel */}
            {alerts.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                    Active Alerts ({alerts.length})
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {alerts.map(alert => (
                    <div key={alert.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          alert.priority === 'high' ? 'bg-red-500 animate-pulse' : 
                          alert.priority === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-800">{alert.message}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Clock size={12} />
                            {alert.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Respond
                        </button>
                        <button className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ResponsiveIoTMap userRole="law-enforcement" />
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full p-3 text-left bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="text-red-600" size={20} />
                        <div>
                          <p className="font-medium text-red-800">Emergency Response</p>
                          <p className="text-sm text-red-600">Deploy immediate assistance</p>
                        </div>
                      </div>
                    </button>
                    <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <Radio className="text-blue-600" size={20} />
                        <div>
                          <p className="font-medium text-blue-800">Dispatch Units</p>
                          <p className="text-sm text-blue-600">Coordinate patrol deployment</p>
                        </div>
                      </div>
                    </button>
                    <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="text-green-600" size={20} />
                        <div>
                          <p className="font-medium text-green-800">Generate Report</p>
                          <p className="text-sm text-green-600">Create incident documentation</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">GPS Tracking</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Online</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Communication Network</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Stable</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">IoT Sensors</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-yellow-600">147/150 Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Live Monitoring Center</h2>
              <p className="text-gray-600 mb-6">
                Real-time tracking of livestock movements, geofencing violations, and potential conflict zones.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="text-blue-600" size={20} />
                    <span className="font-medium text-blue-800">Active Monitoring</span>
                  </div>
                  <p className="text-sm text-blue-600">147 devices being tracked</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="text-green-600" size={20} />
                    <span className="font-medium text-green-800">Safe Zones</span>
                  </div>
                  <p className="text-sm text-green-600">12 designated areas</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-red-600" size={20} />
                    <span className="font-medium text-red-800">Alert Zones</span>
                  </div>
                  <p className="text-sm text-red-600">5 restricted areas</p>
                </div>
              </div>
            </div>
            <ResponsiveIoTMap userRole="law-enforcement" />
          </div>
        );

      case 'communications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Command Center Communications</h2>
              <p className="text-gray-600 mb-6">
                Coordinate with patrol units, farmers, herders, and other stakeholders for effective conflict prevention.
              </p>
            </div>
            <div className="h-96">
              <ResponsiveChatBox userId={userId} role="law-enforcement" />
            </div>
          </div>
        );

      case 'ai-support':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">AI-Powered Analysis & Support</h2>
              <p className="text-gray-600 mb-6">
                Get intelligent insights for conflict prediction, resource allocation, and strategic decision making.
              </p>
            </div>
            <div className="h-96">
              <ResponsiveAgroTrackChatBot />
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Incident Reports & Analytics</h2>
              <p className="text-gray-600 mb-6">
                Generate comprehensive reports and analyze patterns for improved conflict prevention strategies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <FileText className="text-blue-600 mb-2" size={24} />
                  <h3 className="font-medium text-gray-800">Daily Incident Report</h3>
                  <p className="text-sm text-gray-600">Summary of today's activities</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Activity className="text-green-600 mb-2" size={24} />
                  <h3 className="font-medium text-gray-800">Trend Analysis</h3>
                  <p className="text-sm text-gray-600">Pattern recognition insights</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <MapPin className="text-purple-600 mb-2" size={24} />
                  <h3 className="font-medium text-gray-800">Geographic Analysis</h3>
                  <p className="text-sm text-gray-600">Location-based statistics</p>
                </div>
              </div>
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
      } lg:w-64 flex flex-col border-r border-gray-200`}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={20} />
            </div>
            <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
              <h1 className="font-bold text-lg text-gray-800">AgroTrack</h1>
              <p className="text-sm text-gray-500">Law Enforcement</p>
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
                      ? 'bg-blue-600 text-white shadow-lg'
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
                <p className="text-sm text-gray-500">Law Enforcement Command Center</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Systems Online</span>
              </div>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings size={20} />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">LE</span>
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

export default LawEnforcementDashboard;