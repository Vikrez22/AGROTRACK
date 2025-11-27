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
  return (
    <div className="space-y-6 m-6">
      {/* Farmer Profiles Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">User Settings</h2>
          <p className="text-gray-600">edit your profile information</p>
        </div>

        {/* Farmer List */}
        <div className="space-y-4">
          {/* Farmer 1 */}
          <div className="">
            <div className="space-y-6">
              <div className="space-y-3 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                <div className="font-semibold flex items-center gap-2 mb-3 text-green-400">
                  <div className="size-10 rounded-full flex items-center justify-center bg-green-400">
                    <User size={16} color="#fff" />
                  </div>
                  <p className="text-lg">Personal Information</p>
                </div>

                <div className="space-y-2 text-lg">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-nin"
                      className="text-gray-600 font-medium"
                    >
                      NIN:
                    </label>
                    <div>
                      <input
                        type="text"
                        name="change-nin"
                        id="change-nin"
                        defaultValue={12345678901}
                        className="h-10 w-full pl-3 rounded-lg border-green-400 border outline-none text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-name"
                      className="text-gray-600 font-medium"
                    >
                      Fullname:
                    </label>
                    <input
                      type="text"
                      name="change-name"
                      id="change-name"
                      defaultValue={"Onyebuchi Munachi"}
                      className="h-10 w-full pl-3 rounded-lg border-green-400 border outline-none text-sm font-medium"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-phone"
                      className="text-gray-600 font-medium"
                    >
                      Phone:
                    </label>
                    <input
                      type="text"
                      name="change-phone"
                      id="change-phone"
                      defaultValue={+2348123456789}
                      className="h-10 w-full pl-3 rounded-lg border-green-400 border outline-none text-sm font-medium"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-email"
                      className="text-gray-600 font-medium"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      name="change-email"
                      id="change-email"
                      defaultValue={"Munachi.Onyebuchi@email.com"}
                      className="h-10 w-full pl-3 rounded-lg border-green-400 border outline-none text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button className="px-2.5 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 whitespace-nowrap">
                    {/* <Edit size={16} /> */}
                    Save changes
                  </button>
                </div>
              </div>

              <div className="space-y-3 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                <div className="font-semibold flex items-center gap-2 mb-3 text-green-400">
                  <div className="size-10 rounded-full flex items-center justify-center bg-green-400">
                    <Phone size={16} color="#fff" />
                  </div>
                  <p className="text-lg">Additional Information</p>
                </div>
                <div className="space-y-2 text-lg">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-emergency-details"
                      className="text-gray-600 font-medium"
                    >
                      Emergency:
                    </label>
                    <input
                      type="phone"
                      name="change-emergency-details"
                      id="change-emergency-details"
                      defaultValue={+2348987654321}
                      className="h-10 w-full pl-3 rounded-lg border-green-400 border outline-none text-sm font-medium"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-home-address"
                      className="text-gray-600 font-medium"
                    >
                      Home Address:
                    </label>
                    <input
                      type="phone"
                      name="change-home-address"
                      id="change-home-address"
                      defaultValue={"no 12, sample street, sample city"}
                      className="h-10 w-full pl-3 rounded-lg border-green-400 border outline-none text-sm font-medium"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-cooperative-name"
                      className="text-gray-600 font-medium"
                    >
                      Cooperative:
                    </label>
                    <input
                      type="phone"
                      name="change-cooperative-name"
                      id="change-cooperative-name"
                      defaultValue={"Plateau Cattle Farmers Assoc."}
                      className="h-10 w-full pl-3 rounded-lg border-green-400 border outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button className="px-2.5 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 whitespace-nowrap">
                    {/* <Edit size={16} /> */}
                    Save changes
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6 mt-4">
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
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Automated voice call alerts
                    </p>
                  </div>

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
                </div>
              </div>
            </div>

            {/* <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Send a Report
                  </button>
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                    View Reports
                  </button>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
