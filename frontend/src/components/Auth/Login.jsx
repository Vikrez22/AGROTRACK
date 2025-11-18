import { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn, Users } from "lucide-react";
import sideBarLogo from "../../assets/logo_white.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const demoAccounts = [
    {
      role: "Farmer",
      email: "farmer@gmail.com",
      password: "12345678",
      dashboard: "/farmer-dashboard",
    },
    {
      role: "Herder",
      email: "herder@gmail.com",
      password: "12345678",
      dashboard: "/herder-dashboard",
    },
    {
      role: "Law Enforcement Agency",
      email: "admin@gmail.com",
      password: "12345678",
      dashboard: "/admin-dashboard",
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Check if it's the law enforcement demo account for direct redirect
      if (email === "admin@gmail.com" && password === "12345678") {
        navigate("/admin-dashboard");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const role = userDoc.data()?.role;

      localStorage.setItem("userId", user.uid);

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "herder") {
        navigate("/herder-dashboard");
      } else if (role === "farmer") {
        navigate("/farmer-dashboard");
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      setError("Invalid credentials or error occurred.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex p-4">
      <div className="max-w-md sm:max-w-4xl w-full mx-auto my-auto flex gap-5 sm:flex-row flex-col">
        {/* Main Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 max-w-md flex-1">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-8">
            <div className="flex items-center justify-center mx-auto mb-4">
              {/* <LogIn className="w-8 h-8 text-white" /> */}
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

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
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
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => handleDemoLogin(account)}
                className="w-full p-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-green-700">
                      {account.role}
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
