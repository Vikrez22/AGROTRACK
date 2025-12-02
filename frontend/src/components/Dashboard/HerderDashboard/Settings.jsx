import { Edit, Loader2, MessageSquare, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { NIGERIAN_STATES } from "../../../data/nigerianStatesData";
import { LGA_BY_STATE } from "../../../data/nigerianStatesData";
import { UserService } from "../../../services/user";

const Settings = () => {
  const { profile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileEdit, setProfileEdit] = useState(true);
  const [additionalLoading, setAdditionalLoading] = useState(false);
  const [additionalEdit, setAdditionalEdit] = useState(true);

  console.log("userProfile: ", profile);
  useEffect(() => {
    if (profile) {
      setFullName(profile.displayName);
      setPhoneNumber(profile.phoneNumber);
      setEmail(profile.email);
      setState(profile.state);
      setLga(profile.LGA);
    }
  }, [profile]);

  const availableLGAs = state ? LGA_BY_STATE[state.toLowerCase()] || [] : [];

  async function onProfileSubmit(e) {
    e.preventDefault();

    const isNameChanged = fullName !== profile.displayName;
    const isPhoneChanged = phoneNumber !== profile.phoneNumber;
    const isEmailChanged = email !== profile.email;

    if (!isNameChanged && !isPhoneChanged && !isEmailChanged) {
      alert("No changes made to profile information.");
      return;
    }

    setProfileLoading(true);

    try {
      const updates = {
        displayName: fullName,
        email: email,
        phoneNumber: phoneNumber,
      };

      await UserService.updateProfile(updates);

      setProfileLoading(false);
      setProfileEdit(true);

      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Check console for details.");
      setProfileLoading(false);
    }
  }

  async function onAdditionalSubmit(e) {
    e.preventDefault();

    const isLgaChanged = lga !== profile.LGA;
    const isStateChanged = state !== profile.state;

    if (!isLgaChanged && !isStateChanged) {
      alert("No changes made to additional information.");
      return;
    }
    setAdditionalLoading(true);

    try {
      const updates = {
        LGA: lga,
        state: state,
      };

      await UserService.updateProfile(updates);

      setAdditionalLoading(false);
      setAdditionalEdit(true);

      alert("Additional information updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update information. Check console for details.");
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

        <div className="space-y-6">
          <form onSubmit={onProfileSubmit}>
            <div className="space-y-3 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="font-semibold flex items-center gap-2 mb-3 text-green-400">
                <div className="size-10 rounded-full flex items-center justify-center bg-green-400">
                  <User size={16} color="#fff" />
                </div>
                <p className="text-lg">Personal Information</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col w-full md:col-span-2">
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
                      disabled
                      defaultValue={9876543210}
                      className="h-10 w-full pl-3 rounded-lg border disabled:bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
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
                    disabled={profileEdit}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 w-full pl-3 rounded-lg border disabled:bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
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
                    disabled={profileEdit}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-10 w-full pl-3 rounded-lg border disabled:bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                  />
                </div>
                <div className="flex flex-col w-full md:col-span-2">
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
                    disabled={profileEdit}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 w-full pl-3 rounded-lg border disabled:bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100 gap-2">
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 flex items-center gap-2 font-medium disabled:opacity-70 disabled:hover:bg-green-500 transition-all shadow-sm hover:shadow justify-center"
                  type="button"
                  onClick={() => setProfileEdit(false)}
                  disabled={!profileEdit}
                >
                  <Edit size={18} /> Edit Profile
                </button>

                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 flex items-center gap-2 font-medium disabled:opacity-70 disabled:bg-green-500 transition-all shadow-sm hover:shadow"
                  type="submit"
                  disabled={profileLoading}
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
            <div className="space-y-3 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="font-semibold flex items-center gap-2 mb-3 text-green-400">
                <div className="size-10 rounded-full flex items-center justify-center bg-green-400">
                  <Phone size={16} color="#fff" />
                </div>
                <p className="text-lg">Additional Information</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col w-full md:col-span-2">
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
                    disabled
                    className="h-10 w-full pl-3 rounded-lg border disabled:bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="change-state"
                    className="text-gray-600 font-medium"
                  >
                    State:
                  </label>
                  <select
                    type="text"
                    name="change-state"
                    id="change-state"
                    disabled={additionalEdit}
                    onChange={(e) => {
                      setState(e.target.value), setLga("");
                    }}
                    className="h-10 w-full pl-3 rounded-lg border disabled:bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                  >
                    <option>{state}</option>
                    {NIGERIAN_STATES.map((stateOption) => (
                      <option key={stateOption.value} value={stateOption.value}>
                        {stateOption.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="change-lga"
                    className="text-gray-600 font-medium"
                  >
                    LGA:
                  </label>
                  <select
                    type="text"
                    name="change-lga"
                    disabled={
                      additionalEdit || !state || availableLGAs.length === 0
                    }
                    required={availableLGAs.length > 0}
                    id="change-lga"
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    className="h-10 w-full pl-3 rounded-lg border disabled:bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                  >
                    <option>{lga}</option>
                    {availableLGAs.map((lgaOption) => (
                      <option key={lgaOption.value} value={lgaOption.value}>
                        {lgaOption.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full md:col-span-2">
                  <label
                    htmlFor="change-home-address"
                    className="text-gray-600 font-medium"
                  >
                    Home Address:
                  </label>
                  <input
                    type="phone"
                    name="change-home-address"
                    disabled
                    id="change-home-address"
                    defaultValue={"no 12, sample street, sample city"}
                    className="h-10 w-full pl-3 rounded-lg border disabled:bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                  />
                </div>
                <div className="flex flex-col w-full md:col-span-2">
                  <label
                    htmlFor="change-cooperative-name"
                    className="text-gray-600 font-medium"
                  >
                    Cooperative:
                  </label>
                  <input
                    type="phone"
                    name="change-cooperative-name"
                    disabled
                    id="change-cooperative-name"
                    defaultValue={"Plateau Cattle Farmers Assoc."}
                    className="h-10 w-full pl-3 rounded-lg border disabled:bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100 gap-2">
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 flex items-center gap-2 font-medium disabled:opacity-70 disabled:hover:bg-green-500 transition-all shadow-sm hover:shadow justify-center"
                  onClick={() => setAdditionalEdit(false)}
                  disabled={!additionalEdit}
                >
                  <Edit size={18} /> Edit Profile
                </button>

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
        </div>

        <div className="space-y-6 mt-4">
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Send SMS notifications for violations
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-600">
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

              <div className="bg-green-50 p-4 rounded-lg border border-green-600">
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

              <div className="bg-green-50 p-4 rounded-lg border border-green-600">
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

        <div className="mt-6 pt-4 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send a Report
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
