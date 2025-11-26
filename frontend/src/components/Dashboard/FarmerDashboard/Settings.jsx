import {
  Bell,
  Edit,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Save,
  Smartphone,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [settingsTab, setSettingsTab] = useState("profiles");
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
            Farmer Profile
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
            <h2 className="text-2xl font-bold mb-2">Notification Settings</h2>
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
      {settingsTab === "profiles" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Farmer Profile</h2>
            <p className="text-gray-600">
              View registered farmer information in the system.
            </p>
          </div>

          {/* Farmer List */}
          <div className="space-y-4">
            {/* Farmer 1 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">
                      Munachi Onyebuchi
                    </h4>
                    <p className="text-sm text-gray-500">
                      Registered: Sep 15, 2025
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
                      <span className="font-medium">12345678901</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">+2348123456789</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-xs">
                        Munachi.Onyebuchi@email.com
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
                        Plateau State, Nigeria
                      </span>
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
                      <span className="font-medium text-xs">
                        Plateau Cattle Farmers Assoc.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
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
};
export default Settings;
