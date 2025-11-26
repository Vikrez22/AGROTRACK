import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, Mail, Users, Phone, MapPin } from "lucide-react";
import { useAuthMutations } from "../../hooks/useAuthMutations";
import sideBarLogo from "../../assets/logo_white.png";
import { NIGERIAN_STATES, LGA_BY_STATE } from "../../data/nigerianStatesData"; 

const ROLES = [
  { value: 'farmer', label: 'Farmer' },
  { value: 'herder', label: 'Herder' },
  { value: 'admin', label: 'Law Enforcement Agency' },
];

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [role, setRole] = useState("farmer");

  const { signUpWithEmail } = useAuthMutations();

  
  const availableLGAs = state ? (LGA_BY_STATE[state] || []) : [];

  const handleEmailSignup = (e) => {
    e.preventDefault();
    
    

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (!displayName.trim()) {
      alert("Please enter your display name");
      return;
    }

    if (!phoneNumber.trim()) {
      alert("Please enter your phone number");
      return;
    }

    if (!state) {
      alert("Please select your state");
      return;
    }

    // ⭐ Check if LGA is required AND the list is not empty
    if (availableLGAs.length > 0 && !lga) {
      alert("Please select your LGA");
      return;
    }

    signUpWithEmail.mutate({ 
      email, 
      password, 
      role, 
      displayName,
      phoneNumber,
      state,
      lga,
      isNew: true 
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex p-4">
      <div className="max-w-md w-full mx-auto my-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-8">
            <div className="flex items-center justify-center mx-auto mb-4">
              <img src={sideBarLogo} alt="agrotrack_sidebar" width={"150px"} height={"120px"} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          {signUpWithEmail.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{signUpWithEmail.error.code}</p>
            </div>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-4">
            {/* ... [Role, Name, Email, Phone Number fields] ... */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  required
                >
                  {ROLES.map((roleOption) => (
                    <option key={roleOption.value} value={roleOption.value}>
                      {roleOption.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* State Select (Uses imported NIGERIAN_STATES) */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setLga(""); // Reset LGA when state changes
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  required
                >
                  <option value="">Select State</option>
                  {NIGERIAN_STATES.map((stateOption) => (
                    <option key={stateOption.value} value={stateOption.value}>
                      {stateOption.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LGA Select (Uses imported LGA_BY_STATE) */}
            <div>
              <label htmlFor="lga" className="block text-sm font-medium text-gray-700 mb-2">
                Local Government Area (LGA)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="lga"
                  value={lga}
                  onChange={(e) => setLga(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  required={availableLGAs.length > 0} // Make LGA required only if there are options
                  disabled={!state || availableLGAs.length === 0}
                >
                  <option value="">
                    {availableLGAs.length > 0 ? "Select LGA" : "Select State First"}
                  </option>
                  {availableLGAs.map((lgaOption) => (
                    <option key={lgaOption.value} value={lgaOption.value}>
                      {lgaOption.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* ... [Password fields and button] ... */}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Create a password (min 8 characters)"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Confirm your password"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={signUpWithEmail.isPending}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signUpWithEmail.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;