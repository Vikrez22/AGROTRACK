import React, { useState, useRef } from "react";
import {
  MapPin,
  Shield,
  AlertTriangle,
  Bot,
  Upload,
  Menu,
  X,
  Radio,
  Eye,
  TrendingUp,
  Wifi,
  ArrowRightIcon,
} from "lucide-react";
import sideBarLogo from "../../assets/logo.png";
import sideBarLogoW from "../../assets/logo_white.png";
import AgroTrackChatBot from "../Cowtracking/AgroTrackChatBot";
import heroImage from "../../assets/Gemini_Generated_Image_ikwgarikwgarikwg.png";

const AgroTrackLandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [reportForm, setReportForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    incidentType: "",
    description: "",
    evidence: null,
  });

  const fileInputRef = useRef(null);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log("Report submitted:", reportForm);
    alert(
      "Report submitted successfully! We will investigate and respond within 24 hours."
    );
    setReportModalOpen(false);
    setReportForm({
      name: "",
      phone: "",
      email: "",
      location: "",
      incidentType: "",
      description: "",
      evidence: null,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReportForm((prev) => ({ ...prev, evidence: file }));
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Smart Geo-Fencing",
      description:
        "Define grazing zones and prevent conflicts with intelligent boundary alerts",
    },
    {
      icon: MapPin,
      title: "Real-time GPS Tracking",
      description:
        "ESP32 & NEO6M GPS modules provide precise livestock location data",
    },
    {
      icon: AlertTriangle,
      title: "Conflict Prevention Alerts",
      description:
        "Instant notifications when animals enter restricted farming areas",
    },
    {
      icon: Bot,
      title: "AI-Powered Assistant",
      description:
        "Educational support and guidance for farmers and herders in multiple languages",
    },
    {
      icon: Radio,
      title: "Emergency Response",
      description:
        "Direct communication with law enforcement and emergency services",
    },
    {
      icon: Eye,
      title: "Live Monitoring Dashboard",
      description: "Real-time tracking and management of livestock movements",
    },
  ];

  const problemStats = [
    {
      number: "2,000+",
      label: "Deaths Annually",
      subtext: "Due to farmer-herder conflicts",
    },
    {
      number: "₦150B",
      label: "Economic Losses",
      subtext: "Annual crop destruction costs",
    },
    {
      number: "16 States",
      label: "Affected Regions",
      subtext: "Across Nigeria experiencing conflicts",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-green-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src={sideBarLogo}
                alt="agrotrack_sidebar"
                width={"150px"}
                height={"120px"}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#problem"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Problem
              </a>
              <a
                href="#solution"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Solution
              </a>
              <a
                href="#features"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Features
              </a>
              <div className="ml-8 flex items-center gap-4">
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                >
                  Report Incident
                </button>
                <a
                  href="/login"
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-green-100 py-4">
              <div className="flex flex-col space-y-3">
                <a
                  href="#problem"
                  className="text-gray-600 hover:text-green-600 px-4 py-2"
                >
                  Problem
                </a>
                <a
                  href="#solution"
                  className="text-gray-600 hover:text-green-600 px-4 py-2"
                >
                  Solution
                </a>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-green-600 px-4 py-2"
                >
                  Features
                </a>
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 mx-4"
                >
                  Report Incident
                </button>
                <a
                  href="/login"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mx-4 text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-green-50 to-white min-h-screen"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-6">
                Smart AgriTech Solution
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Ending Farmer-Herder
                <span className="text-green-700 block">
                  Conflicts with Technology
                </span>
              </h1>
              <p className="text-xl text-gray-800 mt-6 leading-relaxed">
                AgroTrack uses IoT technology to prevent conflicts before they
                start. Real-time livestock tracking, smart geofencing, and
                instant alerts protect crops and save lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href="/login"
                  className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700/90 transition-colors text-center inline-flex items-center gap-2 group justify-center"
                >
                  Get Started
                  <ArrowRightIcon
                    size={20}
                    className="group-hover:translate-x-1 duration-200"
                  />
                </a>
                <button
                  onClick={() => setChatBotOpen(true)}
                  className="border-2 border-green-600 text-white hover:text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-white/95 transition-colors flex items-center justify-center gap-2"
                >
                  <Bot size={20} />
                  Talk to AI Assistant
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900">
                      GPS Tracking
                    </h3>
                    <p className="text-sm text-gray-600">Real-time location</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900">Geo-Fencing</h3>
                    <p className="text-sm text-gray-600">Boundary protection</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900">
                      Smart Alerts
                    </h3>
                    <p className="text-sm text-gray-600">
                      Instant notifications
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Bot className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900">AI Support</h3>
                    <p className="text-sm text-gray-600">24/7 assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              The Crisis We're Solving
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Farmer-herder conflicts are devastating Nigerian communities,
              causing massive economic losses and tragic loss of life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {problemStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-xl shadow-lg"
              >
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-600">{stat.subtext}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  The Root Causes
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      Livestock straying into farmlands destroys crops worth
                      billions annually
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      Lack of communication between farming and herding
                      communities
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      No early warning systems to prevent boundary violations
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      Traditional methods fail to track livestock in real-time
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-8 rounded-xl">
                <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
                <h4 className="text-xl font-semibold text-red-900 mb-3">
                  Critical Impact
                </h4>
                <p className="text-red-800">
                  Without immediate technological intervention, these conflicts
                  will continue to escalate, threatening food security and
                  community safety across Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AgroTrack prevents conflicts through proactive monitoring and
              instant communication between all stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                IoT Hardware
              </h3>
              <p className="text-gray-700 mb-6">
                ESP32-powered GPS collars track livestock location in real-time,
                sending data to our cloud platform every 30 seconds.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Solar powered for long-term use
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Waterproof and durable design
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  GPS + cellular connectivity
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Smart Geofencing
              </h3>
              <p className="text-gray-700 mb-6">
                Define safe grazing areas and restricted zones. Get instant
                alerts when animals approach or enter forbidden areas.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Custom boundary creation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Multi-level alert system
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  SMS, call & app notifications
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Emergency Response
              </h3>
              <p className="text-gray-700 mb-6">
                Direct communication channels connect farmers, herders, and law
                enforcement for rapid conflict resolution.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  24/7 monitoring center
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Incident reporting system
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Evidence collection tools
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Advanced Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to prevent conflicts and protect your
              livelihood
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Marketplace Coming Soon */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
            <TrendingUp className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Secure Marketplace - Coming Soon
            </h3>
            <p className="text-green-100 max-w-2xl mx-auto">
              Connect farmers and herders for peaceful trade and collaboration.
              Pre-register now to be among the first to access our secure
              trading platform.
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold mt-6 hover:bg-green-50 transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Build Peace Through Technology?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Be among the first to experience AgroTrack and help us revolutionize
            how farmers and herders coexist peacefully across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Get Started
            </a>
            <button
              onClick={() => setReportModalOpen(true)}
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Report an Incident
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={sideBarLogoW}
                  alt="agrotrack_sidebar"
                  width={"150px"}
                  height={"120px"}
                />
              </div>
              <p className="text-gray-400">
                Smart AgriTech solution preventing farmer-herder conflicts
                through IoT technology.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="#problem"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  Problem
                </a>
                <a
                  href="#solution"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  Solution
                </a>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  Features
                </a>
                {/* <a href="/iot-dashboard" className="text-gray-400 hover:text-white transition-colors block">Dashboard</a> */}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>AGROTRACK</p>
                <p>teamagrotrack@gmail.com</p>
                <p>Enugu, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AgroTrack. Peace through Technology.</p>
          </div>
        </div>
      </footer>

      {/* Report Incident Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  Report an Incident
                </h3>
                <button
                  onClick={() => setReportModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                Help us prevent conflicts by reporting incidents with detailed
                evidence.
              </p>
            </div>

            <form onSubmit={handleReportSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reportForm.name}
                    onChange={(e) =>
                      setReportForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={reportForm.phone}
                    onChange={(e) =>
                      setReportForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+234..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={reportForm.email}
                  onChange={(e) =>
                    setReportForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Location *
                </label>
                <input
                  type="text"
                  required
                  value={reportForm.location}
                  onChange={(e) =>
                    setReportForm((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="State, LGA, Village/Area"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Type *
                </label>
                <select
                  required
                  value={reportForm.incidentType}
                  onChange={(e) =>
                    setReportForm((prev) => ({
                      ...prev,
                      incidentType: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select incident type</option>
                  <option value="crop_damage">Crop Damage by Livestock</option>
                  <option value="boundary_dispute">Boundary Dispute</option>
                  <option value="violence">Physical Violence/Conflict</option>
                  <option value="theft">Livestock Theft</option>
                  <option value="trespassing">
                    Illegal Grazing/Trespassing
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={reportForm.description}
                  onChange={(e) =>
                    setReportForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe what happened in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Evidence (Photo/Video/Document)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">
                    {reportForm.evidence
                      ? reportForm.evidence.name
                      : "Click to upload evidence"}
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Choose File
                  </button>
                </div>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Chat Bot Modal */}
      {chatBotOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">AI Assistant</h3>
              <button
                onClick={() => setChatBotOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow p-6 space-y-4">
              <div className="text-gray-700">
                <p>Hello! I'm your AI assistant. How can I help you today?</p>
              </div>
              <AgroTrackChatBot />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AgroTrackLandingPage;
