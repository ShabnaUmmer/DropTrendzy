// src/components/Navbar/Navbar.js
import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false,
      isMenuOpen: false,
      searchQuery: '',
      hoveredLink: null
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== this.state.isScrolled) {
      this.setState({ isScrolled });
    }
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery.trim() && this.props.navigateTo) {
      this.props.navigateTo('products');
    }
  };

  handleNavClick = (page) => {
    this.setState({ isMenuOpen: false });
    if (this.props.navigateTo) {
      this.props.navigateTo(page);
    }
  };

  handleMouseEnter = (link) => {
    this.setState({ hoveredLink: link });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredLink: null });
  };

  render() {
    const { isMenuOpen, searchQuery, hoveredLink } = this.state;
    const { wishlistCount = 0, currentPage = 'home' } = this.props;

    const navItems = [
      { id: 'home', icon: 'fas fa-home', label: 'Home' },
      { id: 'products', icon: 'fas fa-shopping-bag', label: 'Products' },
      { id: 'about', icon: 'fas fa-info-circle', label: 'About' },
      { id: 'contact', icon: 'fas fa-envelope', label: 'Contact' },
      { id: 'refund-policy', icon: 'fas fa-file-contract', label: 'Refund' }
    ];

    return (
      <nav className={`navbar-modern ${this.state.isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          
          {/* Left Side - Logo */}
          <div className="nav-left">
            <div 
              className="nav-logo-modern"
              onClick={() => this.handleNavClick('home')}
              onMouseEnter={() => this.handleMouseEnter('logo')}
              onMouseLeave={this.handleMouseLeave}
            >
              <div className={`logo-icon ${hoveredLink === 'logo' ? 'pulse' : ''}`}>
                <i className="fas fa-bolt"></i>
              </div>
              <div className="logo-text">
                <span className="logo-main">DROPTRENDZY</span>
                <span className="logo-sub">Curated Trends</span>
              </div>
              <div className="logo-glow"></div>
            </div>
          </div>

          {/* Right Side - Navigation, Search, Actions */}
          <div className="nav-right">
            <div className="nav-actions">
              
              {/* Compact Navigation */}
              <div className={`nav-links-modern ${isMenuOpen ? 'active' : ''}`}>
                {navItems.map((item) => (
                  <div key={item.id} className="nav-item-wrapper">
                    <button 
                      className={`nav-link-modern ${currentPage === item.id ? 'active' : ''} ${hoveredLink === item.id ? 'hovered' : ''}`}
                      onClick={() => this.handleNavClick(item.id)}
                      onMouseEnter={() => this.handleMouseEnter(item.id)}
                      onMouseLeave={this.handleMouseLeave}
                      title={item.label}
                    >
                      <i className={item.icon}></i>
                      <span className="link-label">{item.label}</span>
                      <div className="link-border"></div>
                      <div className="link-glow"></div>
                      <div className="link-dot"></div>
                    </button>
                    
                    <div className={`nav-tooltip ${hoveredLink === item.id ? 'show' : ''}`}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Search Container */}
              <div className="search-container-wrapper">
                <form onSubmit={this.handleSearchSubmit} className="search-form-modern">
                  <div className={`search-box ${searchQuery ? 'filled' : ''}`}>
                    <input
                      type="text"
                      placeholder="Search trends..."
                      value={searchQuery}
                      onChange={this.handleSearchChange}
                      className="search-input-modern"
                    />
                    <button type="submit" className="search-btn-modern">
                      <i className="fas fa-search"></i>
                      <span className="search-wave"></span>
                    </button>
                    <div className="search-underline"></div>
                  </div>
                </form>
              </div>

              {/* Wishlist Button */}
              <div className="wishlist-wrapper">
                <button 
                  className={`nav-icon-btn-modern  ${currentPage === 'wishlist' ? 'active' : ''} ${hoveredLink === 'wishlist' ? 'heartbeat' : ''}`}
                  onClick={() => this.handleNavClick('wishlist')}
                  onMouseEnter={() => this.handleMouseEnter('wishlist')}
                  onMouseLeave={this.handleMouseLeave}
                  title="Wishlist"
                >
                  <i className="fas fa-heart"></i>
                  {wishlistCount > 0 && (
                    <span className="icon-badge">
                      {wishlistCount > 99 ? '99+' : wishlistCount}
                    </span>
                  )}
                  <div className="wishlist-pulse"></div>
                </button>
                <div className={`wishlist-tooltip ${hoveredLink === 'wishlist' ? 'show' : ''}`}>
                  Wishlist ({wishlistCount})
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className={`menu-toggle-modern ${isMenuOpen ? 'active' : ''}`}
                onClick={this.toggleMenu}
                onMouseEnter={() => this.handleMouseEnter('menu')}
                onMouseLeave={this.handleMouseLeave}
                aria-label="Toggle menu"
              >
                <span className="line line-1"></span>
                <span className="line line-2"></span>
                <span className="line line-3"></span>
                <div className="menu-circle"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;