import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, LogIn, Users } from "lucide-react";
import { useAuthMutations } from "../../hooks/useAuthMutations";
import sideBarLogo from "../../assets/logo_white.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';


const DEMO_ACCOUNTS = [
  { label: "Farmer", email: "farmer@gmail.com" },
  { label: "Herder", email: "herder@gmail.com" },
  { label: "Law Enforcement Agency", email: "admin@gmail.com" },
];

const Login = () => {

  const { user, role } = useAuth()

  const navigate = useNavigate()

  const redirectByRole = (role) => {
    if (role === 'herder') navigate('/herder-dashboard');
    else if (role === 'farmer') navigate('/farmer-dashboard');
    else if (role === 'admin') navigate('/admin-dashboard');
    else navigate('/404');
  };

  if (user && role) {
    redirectByRole(role)

  }


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithGoogle, signInWithEmail, sendPasswordReset } =
    useAuthMutations();

  const handleEmailLogin = (e) => {
    e.preventDefault();
    signInWithEmail.mutate({ email, password });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle.mutate({ isNew: false });
  };

  const handlePasswordReset = () => {
    if (email) {
      sendPasswordReset.mutate(email);
    } else {
      alert("Please enter your email address first");
    }
  };

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword("12345678");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex p-4">
      <div className="max-w-md sm:max-w-4xl w-full mx-auto my-auto flex gap-5 sm:flex-row flex-col">
        {/* Main Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 max-w-md flex-1">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-8">
            <div className="flex items-center justify-center mx-auto mb-4">
              <img
                src={sideBarLogo}
                alt="agrotrack_sidebar"
                width={"150px"}
                height={"120px"}
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignIn}
            disabled={signInWithGoogle.isPending}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 hover:border-green-400 transition-all duration-200 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium text-gray-700">
              {signInWithGoogle.isPending
                ? "Signing in..."
                : "Continue with Google"}
            </span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Error Messages */}
          {signInWithEmail.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">
                {signInWithEmail.error.error}
              </p>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-sm text-green-600 hover:text-green-700 hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={signInWithEmail.isPending}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signInWithEmail.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Accounts Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100 max-w-md flex-1">
          <div className="text-center mb-4">
            <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Demo Accounts
            </h3>
            <p className="text-sm text-gray-600">
              Click to auto-fill login credentials
            </p>
          </div>

          <div className="space-y-3">
            {DEMO_ACCOUNTS.map((account, index) => (
              <button
                key={index}
                onClick={() => handleDemoLogin(account)}
                className="w-full p-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-green-700">
                      {account.label}
                    </p>
                    <p className="text-sm text-gray-600">{account.email}</p>
                  </div>
                  <div className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <LogIn className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700 text-center">
              💡 These are demo accounts for testing purposes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
