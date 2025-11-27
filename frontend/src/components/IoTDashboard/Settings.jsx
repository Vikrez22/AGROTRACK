import {
  AlertTriangle,
  Bell,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [adminSettingsTab, setAdminSettingsTab] = useState("notifications");
  return (
    <div className="space-y-6">
      {/* Admin Settings Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg justify-between">
          <button
            onClick={() => setAdminSettingsTab("farmers")}
            className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
              adminSettingsTab === "farmers"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Users size={16} />
            User Profiles
          </button>
          <button
            onClick={() => setAdminSettingsTab("notifications")}
            className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
              adminSettingsTab === "notifications"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Bell size={16} />
            Notifications
          </button>
          <button
            onClick={() => setAdminSettingsTab("alerts")}
            className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
              adminSettingsTab === "alerts"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <AlertTriangle size={16} />
            Alert Thresholds
          </button>
          <button
            onClick={() => setAdminSettingsTab("communication")}
            className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
              adminSettingsTab === "communication"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Phone size={16} />
            Communication
          </button>
          <button
            onClick={() => setAdminSettingsTab("advanced")}
            className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
              adminSettingsTab === "advanced"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Zap size={16} />
            Advanced
          </button>
          <button
            onClick={() => setAdminSettingsTab("security")}
            className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
              adminSettingsTab === "security"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Lock size={16} />
            Security
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      {adminSettingsTab === "notifications" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Notification Settings</h2>
            <p className="text-gray-600">
              Configure system-wide notification preferences
            </p>
          </div>

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
                <p className="text-sm text-gray-600">Web app notifications</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Thresholds */}
      {adminSettingsTab === "alerts" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">
              Alert Thresholds & Triggers
            </h2>
            <p className="text-gray-600">
              Configure system alert parameters and thresholds
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              System Thresholds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Geofence Violation Delay (minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  defaultValue="1"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Alert delay to avoid false positives
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Low Battery Alert (%)
                </label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  defaultValue="20"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Battery percentage threshold
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inactivity Alert (meters/hour)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  defaultValue="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum movement for health check
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature Range (°C)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    defaultValue="-5"
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    defaultValue="45"
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Environmental temperature alerts
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communication Settings */}
      {adminSettingsTab === "communication" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Communication Settings</h2>
            <p className="text-gray-600">
              Configure communication providers and emergency contacts
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Provider Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMS Provider
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="twilio">Twilio</option>
                    <option value="nexmo">Nexmo/Vonage</option>
                    <option value="aws">AWS SNS</option>
                    <option value="custom">Custom Provider</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    placeholder="Enter API Key"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice Call Provider
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="twilio">Twilio Voice</option>
                    <option value="plivo">Plivo</option>
                    <option value="aws">AWS Connect</option>
                    <option value="custom">Custom Provider</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auth Token
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Auth Token"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Emergency Contacts{" "}
              <small className="text-red-500">(Coming Soon)</small>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="tel"
                  placeholder="+234 xxx xxx xxxx"
                  defaultValue="+2348123456789"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <button className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="tel"
                  placeholder="+234 xxx xxx xxxx"
                  defaultValue="+2348987654321"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <button className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Remove
                </button>
              </div>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
                <Plus size={16} />
                Add Emergency Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Features */}
      {adminSettingsTab === "advanced" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Advanced Features</h2>
            <p className="text-gray-600">
              Configure AI, integrations, and advanced analytics
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              AI & Analytics{" "}
              <small className="text-red-500">(Coming Soon)</small>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "AI Behavior Prediction",
                  description: "ML-powered animal behavior analysis",
                  color: "from-green-50 to-purple-50 border-green-200",
                },
                {
                  label: "Weather Intelligence",
                  description: "Correlate behavior with weather patterns",
                  color: "from-blue-50 to-cyan-50 border-blue-200",
                },
                {
                  label: "Market Price Tracking",
                  description: "Real-time livestock market prices",
                  color: "from-orange-50 to-red-50 border-orange-200",
                },
                {
                  label: "Health Monitoring",
                  description: "Vital signs and disease prediction",
                  color: "from-red-50 to-pink-50 border-red-200",
                },
                {
                  label: "Automatic Reporting",
                  description: "Automated compliance reports",
                  color: "from-purple-50 to-indigo-50 border-purple-200",
                },
                {
                  label: "Blockchain Logging",
                  description: "Immutable audit trail",
                  color: "from-gray-50 to-slate-50 border-gray-200",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`bg-linear-to-br ${feature.color} p-4 rounded-lg border`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">
                      {feature.label}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Integration Settings{" "}
              <small className="text-red-500">(Coming Soon)</small>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Satellite Integration
                </h4>
                <p className="text-sm text-blue-600 mb-3">
                  Real-time satellite imagery
                </p>
                <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Configure Satellite API
                </button>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  Drone Integration
                </h4>
                <p className="text-sm text-green-600 mb-3">
                  Automated drone deployment
                </p>
                <button className="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Setup Drone Fleet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings */}
      {adminSettingsTab === "security" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">
              Security & Privacy Settings
            </h2>
            <p className="text-gray-600">
              Configure system security and data protection
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Access Control
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-600">
                    Require 2FA for admin access
                  </p>
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

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">API Encryption</h4>
                  <p className="text-sm text-gray-600">
                    Encrypt all API communications
                  </p>
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

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Audit Logging</h4>
                  <p className="text-sm text-gray-600">
                    Log all system activities
                  </p>
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
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Data Protection{" "}
              <small className="text-red-500">(Coming Soon)</small>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">
                  Data Retention
                </h4>
                <select className="w-full p-2 border border-gray-300 rounded-md mb-2">
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="365">1 year</option>
                  <option value="forever">Indefinite</option>
                </select>
                <button className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Purge Old Data
                </button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Backup Settings
                </h4>
                <select className="w-full p-2 border border-gray-300 rounded-md mb-2">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Create Backup Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Profiles */}
      {adminSettingsTab === "farmers" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Users Management</h2>
            <p className="text-gray-600">
              Manage registered Users and their information
            </p>
          </div>

          {/* Farmer Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Active Farmers</h3>
              <p className="text-3xl font-bold">2</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Active Herders</h3>
              <p className="text-3xl font-bold">1</p>
            </div>
            <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Suspended Accounts</h3>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>
          {/* Users List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Registered Users
              </h3>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                <Plus size={16} />
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Contact
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Location
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Role
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Munachi Onyebuchi",
                      contact: "+2348123456789",
                      location: "Lagos, Nigeria",
                      role: "Farmer",
                      status: "Active",
                    },
                    {
                      name: "Alhaji Musa",
                      contact: "+2348987654321",
                      location: "Abuja, Nigeria",
                      role: "Herder",
                      status: "Active",
                    },
                    {
                      name: "Samuel Eze",
                      contact: "+2348012345678",
                      location: "Kano, Nigeria",
                      role: "Farmer",
                      status: "Active",
                    },
                  ].map((farmer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {farmer.name}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {farmer.contact}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {farmer.location}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {farmer.role}
                      </td>
                      <td className="px-4 py-2 border-b text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            farmer.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : farmer.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {farmer.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b text-sm">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Settings;
