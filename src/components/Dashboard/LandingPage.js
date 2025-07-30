import React, { useEffect, useState } from 'react';
import landingImg from '../../assets/logo.jpeg';
import logo from '../../assets/logo_white.png';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use react-router-dom
  };
  const [animate, setAnimate] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setAnimate(true), 300);
    
    // Mouse tracking for interactive background
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      "icon": "🛡️",
      "title": "Smart Geo-Fencing",
      "description": "Define grazing zones and prevent conflicts with intelligent boundary alerts"
    },
    {
      "icon": "📡",
      "title": "Real-time GPS Tracking",
      "description": "ESP32 & NEO6M GPS modules provide precise livestock location data"
    },
    {
      "icon": "🚨",
      "title": "Conflict Prevention Alerts",
      "description": "Instant notifications when animals enter restricted farming areas"
    },
    {
      "icon": "🤖",
      "title": "AI-Powered Chatbot",
      "description": "Educational support and guidance for farmers and herders"
    },
    {
      "icon": "🛒",
      "title": "Secure Marketplace",
      "description": "Connect farmers and herders for peaceful trade and collaboration"
    },
    {
      "icon": "📊",
      "title": "Analytics Dashboard",
      "description": "Comprehensive insights for sustainable livestock management"
    },
    {
      "icon": "🌱",
      "title": "Sustainable Farming",
      "description": "Promote eco-friendly practices and land use optimization"
    },
    {
      "icon": "🤝",
      "title": "Peace Building",
      "description": "Technology-driven solutions to foster harmony between communities"
    },
    {
      "icon": "🔒",
      "title": "Blockchain Security",
      "description": "Immutable records and secure transactions for all stakeholders"
    }
  ];

  return (
    <div className="landing-container">
      {/* Animated background gradient */}
      <div 
        className="background-gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(34, 139, 34, 0.15) 0%,   /* Forest green with 15% opacity */
            rgba(107, 142, 35, 0.1) 25%,   /* Olive drab with 10% opacity */
            rgba(154, 205, 50, 0.05) 50%, /* Yellow green with 5% opacity */
            transparent 70%)`
        }}
      />
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Navigation Header */}
      <nav className="nav-header">
        <div className="nav-brand">
          <div className="mr-3 logo-container">
            <span className="logo-text">AgroTrack</span>
            <span className="logo-tagline">Smart AgriTech</span>
          </div>
        </div>
        <div className="nav-buttons">
          <button>
            <a href="/login" 
              className="nav-button secondary"
            >
              Login
            </a> 
          </button>
          <button>
            <a href="/signup" 
              className="nav-button primary"
            >
              signup
            </a>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <div className={`hero-text ${animate ? 'animate-slide-up' : ''}`}>
            <div className="hero-badge">
              <span className="badge-text">Building Tomorrow Today</span>
            </div>
            <h1 className="hero-title">
              Ending Farmer-Herder
              <span className="gradient-text"> Conflicts with Technology</span>
            </h1>
            <p className="hero-subtitle">
              AgroTrack uses smart geo-fencing, real-time GPS tracking, and AI to prevent conflicts between farmers and herders. Our ESP32-powered wearable devices monitor livestock and trigger alerts when animals enter restricted areas, promoting peace and sustainable agriculture.
            </p>
            
            {/* <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">85%</span>
                <span className="stat-label">Conflict Reduction</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Animals Tracked</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Communities Served</span>
              </div>
            </div> */}

            <div className="hero-actions">
              <button> 
               <a 
                  href="/iot-dashboard" 
                  className="cta-button primary"
                >
                  IoT Dashboard
                  <span className="button-arrow">→</span>
                </a>
              </button>
              <button>
                <a 
                  href="/marketplace" 
                  className="cta-button secondary"
                >
                  Marketplace
                  <span className="button-arrow">🛒</span>
                </a>
              </button>
            </div>
          </div>

          <div className={`hero-image ${animate ? 'animate-float' : ''}`}>
            <div className="tech-showcase">
              <div className="device-card">
                <div className="device-icon">📡</div>
                <h3>ESP32 GPS Tracker</h3>
                <p>Real-time location monitoring</p>
              </div>
              <div className="device-card">
                <div className="device-icon">🛡️</div>
                <h3>Geo-Fence Alerts</h3>
                <p>Instant boundary notifications</p>
              </div>
              <div className="device-card">
                <div className="device-icon">🤖</div>
                <h3>AI Chatbot</h3>
                <p>Educational support system</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Problem Statement Section */}
      <section className="problem-section">
        <div className="problem-content">
          <h2 className="section-title">The Challenge We're Solving</h2>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">⚡</div>
              <h3>Escalating Conflicts</h3>
              <p>Livestock straying into farmlands causes billions in losses and hundreds of casualties annually in Nigeria</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🌾</div>
              <h3>Crop Destruction</h3>
              <p>Uncontrolled grazing destroys crops, leading to food insecurity and economic hardship for farmers</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🤝</div>
              <h3>Broken Communication</h3>
              <p>Lack of coordination between farming and herding communities fuels mistrust and violence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">How AgroTrack Creates Peace</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${animate ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="tech-section">
        <div className="tech-content">
          <h2 className="section-title">Built with Cutting-Edge Technology</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon">🔧</div>
              <h3>ESP32 Microcontroller</h3>
              <p>Powerful, low-energy processor for real-time data collection and transmission</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">📍</div>
              <h3>NEO6M GPS Module</h3>
              <p>Precise location tracking with satellite accuracy for livestock monitoring</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🌐</div>
              <h3>IoT Connectivity</h3>
              <p>Seamless data transmission to cloud dashboard for real-time monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Build Peace Through Technology?</h2>
          <p className="cta-subtitle">
            Be among the first to experience AgroTrack and help us revolutionize how farmers and herders coexist peacefully across Nigeria.
          </p>
          <button 
            className="cta-button large primary" 
            onClick={() => navigate('/signup')}
          >
            Get Started with AgroTrack
            <span className="button-sparkle">✨</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-container">
              <span className="logo-text">AgroTrack</span>
              <span className="logo-tagline">Smart AgriTech for Peace</span>
            </div>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#support">Support</a>
            <a href="#about">About</a>
          </div>

          <p className='text-white'>Built with 💝 by Agrotrack Team.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;