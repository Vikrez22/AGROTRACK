import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Loader2, MessageSquare, Phone, User } from "lucide-react";
import { UserService } from "../../../services/user";

const Settings = () => {
  const { profile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lga, setLga] = useState("");
  const [state, setState] = useState("Enugu");
  const [homeAddress, setHomeAddress] = useState(
    "no 12, sample street, sample city"
  );
  const [profileLoading, setProfileLoading] = useState(false);
  const [additionalLoading, setAdditionalLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.displayName || "");
      setEmail(profile.email || "");
      setPhoneNumber(profile.phoneNumber || "");
      setLga(profile.LGA || "");
    }
  }, [profile]);

  //const userId = profile?.uid;

  async function onProfileSubmit(e) {
    e.preventDefault();
    setProfileLoading(true);

    try {
      const updates = {
        displayName: fullName,
        email: email,
        phoneNumber: phoneNumber,
      };

      await UserService.updateProfile(updates);

      setProfileLoading(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Check console for details.");
      setProfileLoading(false);
    }
  }

  console.log(profile);

  async function onAdditionalSubmit(e) {
    e.preventDefault();

    setAdditionalLoading(true);

    try {
      const updates = {
        LGA: lga,
      };

      await UserService.updateProfile(updates);

      setAdditionalLoading(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Check console for details.");
      setAdditionalLoading(false);
    }
  }

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
          <div className="space-y-6">
            <form onSubmit={onProfileSubmit}>
              <div className="space-y-3 bg-white border border-slate-200 rounded-lg shadow-sm p-6">
                <div className="font-semibold flex items-center gap-2 mb-3 text-green-500">
                  <div className="size-10 rounded-full flex items-center justify-center bg-green-100">
                    <User size={20} className="text-green-600" />
                  </div>
                  <p className="text-lg text-gray-800">Personal Information</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col w-full md:col-span-2">
                    <label
                      htmlFor="change-nin"
                      className="text-gray-600 font-medium mb-1"
                    >
                      NIN:
                    </label>
                    <input
                      type="text"
                      id="change-nin"
                      disabled
                      defaultValue={"12345678901"}
                      className="h-10 w-full pl-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 text-sm font-medium cursor-not-allowed"
                    />
                  </div>

                  {/* Full Name */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-name"
                      className="text-gray-600 font-medium mb-1"
                    >
                      Fullname:
                    </label>
                    <input
                      type="text"
                      id="change-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-10 w-full pl-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-phone"
                      className="text-gray-600 font-medium mb-1"
                    >
                      Phone:
                    </label>
                    <input
                      type="text"
                      id="change-phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-10 w-full pl-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col w-full md:col-span-2">
                    <label
                      htmlFor="change-email"
                      className="text-gray-600 font-medium mb-1"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="change-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 w-full pl-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 flex items-center gap-2 font-medium disabled:opacity-70 transition-all shadow-sm hover:shadow"
                  >
                    {profileLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Saving...
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <form onSubmit={onAdditionalSubmit}>
              <div className="space-y-3 bg-white border border-slate-200 rounded-lg shadow-sm p-6">
                <div className="font-semibold flex items-center gap-2 mb-3 text-green-500">
                  <div className="size-10 rounded-full flex items-center justify-center bg-green-100">
                    <Phone size={20} className="text-green-600" />
                  </div>
                  <p className="text-lg text-gray-800">
                    Additional Information
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* State */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-state"
                      className="text-gray-600 font-medium mb-1"
                    >
                      State:
                    </label>
                    <input
                      type="text"
                      id="change-state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="h-10 w-full pl-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  {/* LGA */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="change-lga"
                      className="text-gray-600 font-medium mb-1"
                    >
                      LGA:
                    </label>
                    <input
                      type="text"
                      id="change-lga"
                      value={lga}
                      onChange={(e) => setLga(e.target.value)}
                      className="h-10 w-full pl-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col w-full md:col-span-2">
                    <label
                      htmlFor="change-address"
                      className="text-gray-600 font-medium mb-1"
                    >
                      Home Address:
                    </label>
                    <input
                      type="text"
                      id="change-address"
                      value={homeAddress}
                      onChange={(e) => setHomeAddress(e.target.value)}
                      className="h-10 w-full pl-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={additionalLoading}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 flex items-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
                  >
                    {additionalLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Saving...
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </button>
                </div>
              </div>
            </form>

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
