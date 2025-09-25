import React, { useState, useEffect } from "react";
import {
  Settings,
  Phone,
  MessageSquare,
  Bell,
  Shield,
  Users,
  MapPin,
  Clock,
  Battery,
  Wifi,
  Volume2,
  Eye,
  Zap,
  AlertTriangle,
  Globe,
  Smartphone,
  Mail,
  Database,
  Cloud,
  Lock,
  Key,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Moon,
  Camera,
  Mic,
  Save,
  RefreshCw,
  Download,
  Upload,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Edit,
  Trash2,
  Check,
  X,
  Info,
  HelpCircle,
  FileText,
} from "lucide-react";

// Mock farmer data - replace with real database integration
const mockFarmers = [
  {
    id: "farmer_001",
    name: "Adamu Ibrahim",
    nin: "12345678901",
    phone: "+2348123456789",
    email: "adamu.ibrahim@email.com",
    location: "Plateau State, Nigeria",
    coordinates: { lat: 9.082, lng: 8.6753 },
    livestock_count: 25,
    farm_size: "50 hectares",
    registration_date: "2024-01-15",
    emergency_contact: "+2348987654321",
    bank_account: "0123456789",
    cooperative: "Plateau Cattle Farmers Association",
  },
  {
    id: "farmer_002",
    name: "Musa Garba",
    phone: "+2348234567890",
    nin: "98765432109",
    email: "musa.garba@email.com",
    location: "Kaduna State, Nigeria",
    coordinates: { lat: 10.5222, lng: 7.4383 },
    livestock_count: 40,
    farm_size: "75 hectares",
    registration_date: "2024-02-10",
    emergency_contact: "+2348876543210",
    bank_account: "9876543210",
    cooperative: "Kaduna Herders Union",
  },
];

const AdvancedSettingsPanel = (props) => {
  const [activeSection, setActiveSection] = useState("notifications");
  const [settings, setSettings] = useState({
    // Notification Settings
    smsEnabled: true,
    callEnabled: true,
    emailEnabled: true,
    pushEnabled: true,
    webhookEnabled: false,

    // Alert Thresholds
    geoViolationThreshold: 1, // minutes before alert
    batteryLowThreshold: 20, // percentage
    movementThreshold: 100, // meters per hour for inactive alert
    temperatureThreshold: { min: -5, max: 45 }, // Celsius

    // Communication Settings
    smsProvider: "twilio",
    callProvider: "twilio",
    emergencyNumbers: ["+2348123456789", "+2348987654321"],

    // Advanced Features
    aiPredictionEnabled: true,
    weatherIntegration: true,
    marketPriceAlerts: true,
    healthMonitoring: true,
    automaticReporting: true,
    blockchainLogging: false,

    // Security Settings
    twoFactorAuth: true,
    apiEncryption: true,
    auditLogging: true,
    accessControl: "role-based",

    // Integration Settings
    satelliteImagery: true,
    droneIntegration: false,
    iotSensors: ["gps", "temperature", "humidity", "motion"],

    // Business Intelligence
    predictiveAnalytics: true,
    marketTrends: true,
    climateForecast: true,
    yieldOptimization: true,
  });

  const [expandedSections, setExpandedSections] = useState({
    notifications: true,
    alerts: false,
    communication: false,
    advanced: false,
    security: false,
    integration: false,
    business: false,
  });

  const [testMode, setTestMode] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = () => {
    // Simulate API call to save settings
    console.log("Saving settings:", settings);
    setLastSaved(new Date().toLocaleTimeString());
    // In real implementation, send to Firebase/backend
  };

  const sendTestAlert = async (farmer, alertType) => {
    if (!testMode) return;

    const alertMessage = `TEST ALERT: Animal from ${farmer.name} (NIN: ${farmer.nin}) has entered restricted area. Location: ${farmer.location}. Contact: ${farmer.phone}`;

    console.log(`Sending ${alertType} to ${farmer.phone}:`, alertMessage);

    // Simulate API calls to SMS/Call providers
    if (alertType === "sms" && settings.smsEnabled) {
      // Twilio/other SMS API integration would go here
      alert(`SMS Test Alert sent to ${farmer.name} at ${farmer.phone}`);
    }

    if (alertType === "call" && settings.callEnabled) {
      // Voice call API integration would go here
      alert(`Automated call initiated to ${farmer.name} at ${farmer.phone}`);
    }
  };

  const settingSections = [
    { id: "notifications", label: "Notification Settings", icon: Bell },
    { id: "alerts", label: "Alert Thresholds", icon: AlertTriangle },
    { id: "communication", label: "Communication", icon: Phone },
    { id: "advanced", label: "Advanced Features", icon: Zap },
    { id: "security", label: "Security & Privacy", icon: Lock },
    { id: "integration", label: "IoT Integration", icon: Wifi },
    { id: "business", label: "Business Intelligence", icon: TrendingUp },
  ];

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Notification Channels
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            key: "smsEnabled",
            label: "SMS Alerts",
            icon: MessageSquare,
            description: "Send SMS notifications for violations",
          },
          {
            key: "callEnabled",
            label: "Voice Calls",
            icon: Phone,
            description: "Automated voice call alerts",
          },
          {
            key: "emailEnabled",
            label: "Email Notifications",
            icon: Mail,
            description: "Email alerts and reports",
          },
          {
            key: "pushEnabled",
            label: "Push Notifications",
            icon: Smartphone,
            description: "Mobile app notifications",
          },
        ].map(({ key, label, icon: Icon, description }) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Icon className="text-green-600" size={20} />
                <span className="font-medium text-gray-800">{label}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={(e) => updateSetting(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none z-10 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-800 mb-3">
          Test Notifications
        </h4>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-yellow-800">
              Test Mode
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={testMode}
                onChange={(e) => setTestMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none z-10 peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
            </label>
          </div>
          {testMode && (
            <div className="space-y-3">
              {mockFarmers.map((farmer) => (
                <div
                  key={farmer.id}
                  className="bg-white p-3 rounded border border-yellow-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-800">{farmer.name}</p>
                      <p className="text-sm text-gray-600">
                        NIN: {farmer.nin} | Phone: {farmer.phone}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => sendTestAlert(farmer, "sms")}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-700"
                        disabled={!settings.smsEnabled}
                      >
                        Test SMS
                      </button>
                      <button
                        onClick={() => sendTestAlert(farmer, "call")}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        disabled={!settings.callEnabled}
                      >
                        Test Call
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAlertSettings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Alert Thresholds & Triggers
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Geofence Violation Delay (minutes)
          </label>
          <input
            type="number"
            min="0"
            max="60"
            value={settings.geoViolationThreshold}
            onChange={(e) =>
              updateSetting("geoViolationThreshold", parseInt(e.target.value))
            }
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
            value={settings.batteryLowThreshold}
            onChange={(e) =>
              updateSetting("batteryLowThreshold", parseInt(e.target.value))
            }
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
            value={settings.movementThreshold}
            onChange={(e) =>
              updateSetting("movementThreshold", parseInt(e.target.value))
            }
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
              value={settings.temperatureThreshold.min}
              onChange={(e) =>
                updateSetting("temperatureThreshold", {
                  ...settings.temperatureThreshold,
                  min: parseInt(e.target.value),
                })
              }
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Max"
              value={settings.temperatureThreshold.max}
              onChange={(e) =>
                updateSetting("temperatureThreshold", {
                  ...settings.temperatureThreshold,
                  max: parseInt(e.target.value),
                })
              }
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Environmental temperature alerts
          </p>
        </div>
      </div>
    </div>
  );

  const renderAdvancedFeatures = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Competitive Advanced Features
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            key: "aiPredictionEnabled",
            label: "AI Behavior Prediction",
            icon: Activity,
            description:
              "ML-powered animal behavior analysis and violation prediction",
          },
          {
            key: "weatherIntegration",
            label: "Weather Intelligence",
            icon: Cloud,
            description: "Correlate livestock behavior with weather patterns",
          },
          {
            key: "marketPriceAlerts",
            label: "Market Price Tracking",
            icon: TrendingUp,
            description: "Real-time livestock market price notifications",
          },
          {
            key: "healthMonitoring",
            label: "Health Analytics",
            icon: Activity,
            description:
              "Vital signs monitoring and disease outbreak prediction",
          },
          {
            key: 'automaticReporting',
            label: 'Auto Report Generation',
            icon: Activity,
            description: 'Automated compliance and insurance reports'
          },
          {
            key: "blockchainLogging",
            label: "Blockchain Audit Trail",
            icon: Database,
            description: "Immutable record keeping for traceability",
          },
        ].map(({ key, label, icon: Icon, description }) => (
          <div
            key={key}
            className="bg-gradient-to-br from-green-50 to-purple-50 p-4 rounded-lg border border-green-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Icon className="text-purple-600" size={20} />
                <span className="font-medium text-gray-800">{label}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={(e) => updateSetting(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none z-10 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-r from-green-100 to-green-100 p-6 rounded-lg border">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          🏆 Competitive Edge Features
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold text-gray-800 mb-2">
              Satellite Integration
            </h5>
            <p className="text-sm text-gray-600">
              Real-time satellite imagery for pasture quality assessment
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold text-gray-800 mb-2">
              Drone Coordination
            </h5>
            <p className="text-sm text-gray-600">
              Automated drone deployment for emergency response
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold text-gray-800 mb-2">
              Carbon Credit Tracking
            </h5>
            <p className="text-sm text-gray-600">
              Monitor grazing patterns for carbon offset programs
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold text-gray-800 mb-2">
              Insurance Integration
            </h5>
            <p className="text-sm text-gray-600">
              Automatic claim processing with verified location data
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFarmerProfiles = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Registered Farmers
      </h3>

      {mockFarmers.map((farmer) => (
        <div
          key={farmer.id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {farmer.name}
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>NIN:</strong> {farmer.nin}
                </p>
                <p>
                  <strong>Phone:</strong> {farmer.phone}
                </p>
                <p>
                  <strong>Email:</strong> {farmer.email}
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-2">Farm Details</h5>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Location:</strong> {farmer.location}
                </p>
                <p>
                  <strong>Size:</strong> {farmer.farm_size}
                </p>
                <p>
                  <strong>Livestock:</strong> {farmer.livestock_count} animals
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-2">
                Additional Info
              </h5>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Emergency:</strong> {farmer.emergency_contact}
                </p>
                <p>
                  <strong>Bank:</strong> {farmer.bank_account}
                </p>
                <p>
                  <strong>Cooperative:</strong> {farmer.cooperative}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-700">
              Edit Profile
            </button>
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
              View Animals
            </button>
            <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
              Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "notifications":
        return renderNotificationSettings();
      case "alerts":
        return renderAlertSettings();
      case "advanced":
        return renderAdvancedFeatures();
      case "farmers":
        return renderFarmerProfiles();
      default:
        return (
          <div className="text-gray-600">
            Select a section to configure settings.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div
        className={`px-4 py-3 fixed top-0 right-0 left-50 mt-[73px] z-50 ${
          props.sidebar ? "ml-64" : "ml-16"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {lastSaved && (
              <span className="text-sm text-green-600">
                Last saved: {lastSaved}
              </span>
            )}
            {/* <button
              onClick={saveSettings}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Save size={16} />
              Save Settings
            </button> */}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed top-[120px] bottom-0 w-64 bg-white shadow-sm overflow-y-auto`}
        >
          <nav className="p-4">
            <div className="space-y-2">
              {[
                ...settingSections,
                { id: "farmers", label: "Farmer Profiles", icon: Users },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === id
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 ml-[256px] pt-[98px]">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdvancedSettingsPanel;
