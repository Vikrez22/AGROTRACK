import { Plus } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Users Profiles */}
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

      {/* Communication Settings */}
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
      </div>

      {/* Security Settings */}
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
      </div>
    </div>
  );
};
export default Settings;
