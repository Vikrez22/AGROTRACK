import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, Mail, Users } from "lucide-react";
import { useAuthMutations } from "../../hooks/useAuthMutations";
import sideBarLogo from "../../assets/logo_white.png";

const ROLES = [
  { value: 'farmer', label: 'Farmer' },
  { value: 'herder', label: 'Herder' },
  { value: 'admin', label: 'Law Enforcement Agency' },
];

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const { signInWithGoogle, signUpWithEmail } = useAuthMutations();

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

    signUpWithEmail.mutate({ email, password, role, isNew: true });
  };

  const handleGoogleSignUp = () => {
    setShowRoleSelect(true);
  };

  const handleGoogleSignUpWithRole = () => {
    signInWithGoogle.mutate({ role, isNew: true });
    setShowRoleSelect(false);
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

          {/* Google OAuth with Role Selection */}
          {!showRoleSelect ? (
            <button
              onClick={handleGoogleSignUp}
              disabled={signInWithGoogle.isPending}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 hover:border-green-400 transition-all duration-200 mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-gray-700">
                {signInWithGoogle.isPending ? 'Signing up...' : 'Sign up with Google'}
              </span>
            </button>
          ) : (
            <div className="space-y-4 p-4 border-2 border-green-300 rounded-lg mb-6 bg-green-50">
              <p className="text-sm font-medium text-gray-700">Select your role:</p>
              <div className="space-y-2">
                {ROLES.map((roleOption) => (
                  <label key={roleOption.value} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-green-100 transition-colors">
                    <input
                      type="radio"
                      name="googleRole"
                      value={roleOption.value}
                      checked={role === roleOption.value}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm text-gray-700">{roleOption.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleGoogleSignUpWithRole}
                  disabled={signInWithGoogle.isPending}
                  className="flex-1 bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 font-medium transition-colors"
                >
                  {signInWithGoogle.isPending ? 'Signing up...' : 'Continue'}
                </button>
                <button
                  onClick={() => setShowRoleSelect(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!showRoleSelect && (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              {signUpWithEmail.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{signUpWithEmail.error.error}</p>
                </div>
              )}

              <form onSubmit={handleEmailSignup} className="space-y-6">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;