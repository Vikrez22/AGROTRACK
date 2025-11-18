import React, { useState, useEffect } from 'react';
import './marketplace.css';

const Marketplace = () => {
  const [animate, setAnimate] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛒' },
    { id: 'livestock', name: 'Livestock', icon: '🐄' },
    { id: 'crops', name: 'Crops & Produce', icon: '🌾' },
    { id: 'equipment', name: 'Farm Equipment', icon: '🚜' },
    { id: 'technology', name: 'AgriTech', icon: '📡' },
    { id: 'services', name: 'Services', icon: '🤝' }
  ];

  const products = [
    {
      id: 1,
      name: "Holstein Dairy Cow",
      category: "livestock",
      price: 450000,
      image: "🐄",
      seller: "Musa Farms",
      location: "Kaduna State",
      rating: 4.8,
      reviews: 23,
      description: "Healthy Holstein dairy cow, excellent milk production record",
      availability: "Available",
      featured: true
    },
    {
      id: 2,
      name: "Premium Rice (50kg)",
      category: "crops",
      price: 35000,
      image: "🌾",
      seller: "Ebonyi Rice Cooperative",
      location: "Ebonyi State",
      rating: 4.9,
      reviews: 156,
      description: "High-quality locally grown rice, perfect for wholesale",
      availability: "In Stock",
      featured: true
    },
    {
      id: 3,
      name: "ESP32 GPS Livestock Tracker",
      category: "technology",
      price: 15000,
      image: "📡",
      seller: "AgroTrack Store",
      location: "Lagos State",
      rating: 5.0,
      reviews: 87,
      description: "Smart GPS tracking device for real-time livestock monitoring",
      availability: "Available",
      featured: true
    },
    {
      id: 4,
      name: "Goats (Pair)",
      category: "livestock",
      price: 120000,
      image: "🐐",
      seller: "Ahmadu Livestock",
      location: "Kano State",
      rating: 4.7,
      reviews: 34,
      description: "Healthy breeding pair of West African Dwarf goats",
      availability: "Available",
      featured: false
    },
    {
      id: 5,
      name: "Cassava Tubers (100kg)",
      category: "crops",
      price: 25000,
      image: "🥔",
      seller: "Cross River Farms",
      location: "Cross River State",
      rating: 4.6,
      reviews: 67,
      description: "Fresh cassava tubers, perfect for processing",
      availability: "In Stock",
      featured: false
    },
    {
      id: 6,
      name: "Solar Water Pump",
      category: "equipment",
      price: 185000,
      image: "💧",
      seller: "Green Energy Solutions",
      location: "Abuja FCT",
      rating: 4.8,
      reviews: 29,
      description: "Efficient solar-powered water pump for irrigation",
      availability: "Available",
      featured: false
    },
    {
      id: 7,
      name: "Veterinary Services",
      category: "services",
      price: 12000,
      image: "🏥",
      seller: "Dr. Adebayo Veterinary",
      location: "Ogun State",
      rating: 4.9,
      reviews: 142,
      description: "Professional livestock health consultation and treatment",
      availability: "Available",
      featured: false
    },
    {
      id: 8,
      name: "Organic Fertilizer (25kg)",
      category: "crops",
      price: 8500,
      image: "🌱",
      seller: "Organic Solutions Ltd",
      location: "Oyo State",
      rating: 4.7,
      reviews: 91,
      description: "Natural organic fertilizer for improved crop yield",
      availability: "In Stock",
      featured: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartValue = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="marketplace-container">
      {/* Animated background gradient */}
      <div 
        className="background-gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(34, 139, 34, 0.15) 0%,
            rgba(107, 142, 35, 0.1) 25%,
            rgba(154, 205, 50, 0.05) 50%,
            transparent 70%)`
        }}
      />

      {/* Floating particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
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
          <div className="logo-container">
            <span className="logo-text">AgroTrack</span>
            <span className="logo-tagline">Marketplace</span>
          </div>
        </div>
        <div className="nav-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products, sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
        </div>
        <div className="nav-buttons">
          <button 
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            🛒 
            {getTotalCartItems() > 0 && (
              <span className="cart-badge">{getTotalCartItems()}</span>
            )}
          </button>
          <button className="nav-button primary">Sell Products</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="marketplace-hero">
        <div className={`hero-content-m ${animate ? 'animate-slide-up' : ''}`}>
          <div className="hero-badge">
            <span className="badge-text">Secure & Trusted</span>
          </div>
          <h1 className="hero-title">
            AgroTrack
            <span className="gradient-text"> Marketplace</span>
          </h1>
          <p className="hero-subtitle">
            Connect directly with farmers and herders. Trade livestock, crops, equipment, and services in a secure, blockchain-powered marketplace designed for peace and prosperity.
          </p>
          {/* <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Active Sellers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2,000+</span>
              <span className="stat-label">Products Listed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div> */}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-container">
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`category-card ${activeCategory === category.id ? 'active' : ''} ${animate ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-header">
          <h2 className="section-title">
            {activeCategory === 'all' ? 'All Products' : categories.find(c => c.id === activeCategory)?.name}
          </h2>
          <p className="products-count">{filteredProducts.length} products found</p>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`product-card ${animate ? 'animate-fade-in' : ''} ${product.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProduct(product)}
            >
              {product.featured && <div className="featured-badge">⭐ Featured</div>}
              <div className="product-image">{product.image}</div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-seller">By {product.seller}</p>
                <p className="product-location">📍 {product.location}</p>
                <div className="product-rating">
                  <span className="rating-stars">⭐ {product.rating}</span>
                  <span className="rating-reviews">({product.reviews} reviews)</span>
                </div>
                <div className="product-price">{formatPrice(product.price)}</div>
                <div className="product-availability">
                  <span className={`availability-badge ${product.availability.toLowerCase().replace(' ', '-')}`}>
                    {product.availability}
                  </span>
                </div>
              </div>
              <div className="product-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>
            <div className="modal-content">
              <div className="modal-image">{selectedProduct.image}</div>
              <div className="modal-info">
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <p className="modal-seller">Sold by {selectedProduct.seller}</p>
                <p className="modal-location">📍 {selectedProduct.location}</p>
                <div className="modal-rating">
                  <span className="rating-stars">⭐ {selectedProduct.rating}</span>
                  <span className="rating-reviews">({selectedProduct.reviews} reviews)</span>
                </div>
                <p className="modal-description">{selectedProduct.description}</p>
                <div className="modal-price">{formatPrice(selectedProduct.price)}</div>
                <div className="modal-actions">
                  <button 
                    className="modal-add-to-cart"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button className="modal-contact-seller">Contact Seller</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Shopping Cart</h3>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">{item.image}</div>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.seller}</p>
                      <div className="cart-item-controls">
                        <span>Qty: {item.quantity}</span>
                        <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: {formatPrice(getTotalCartValue())}</strong>
                </div>
                <button className="checkout-button">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trust & Security Section */}
      <section className="trust-section">
        <div className="trust-content">
          <h2 className="section-title">Trade with Confidence</h2>
          <div className="trust-features">
            <div className="trust-feature">
              <div className="trust-icon">🔒</div>
              <h3>Blockchain Security</h3>
              <p>All transactions are secured with immutable blockchain technology</p>
            </div>
            <div className="trust-feature">
              <div className="trust-icon">✅</div>
              <h3>Verified Sellers</h3>
              <p>Every seller is verified through our rigorous authentication process</p>
            </div>
            <div className="trust-feature">
              <div className="trust-icon">🛡️</div>
              <h3>Purchase Protection</h3>
              <p>Your money is protected until you confirm delivery satisfaction</p>
            </div>
            <div className="trust-feature">
              <div className="trust-icon">🤝</div>
              <h3>Dispute Resolution</h3>
              <p>Fair mediation system to resolve any transaction disputes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-container">
              <span className="logo-text">AgroTrack</span>
              <span className="logo-tagline">Marketplace for Peace</span>
            </div>
          </div>
          <div className="footer-links">
            <a href="#seller-guide">Seller Guide</a>
            <a href="#buyer-protection">Buyer Protection</a>
            <a href="#support">Support</a>
            <a href="#terms">Terms</a>
          </div>
          <p className="footer-text">Built with 💝 by AgroTrack Team</p>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;