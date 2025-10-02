import { Link } from 'react-router-dom'
import React, { useState } from 'react'

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  return (
    <header className="memo-header-container">
      <div className="memo-spiral">
        <div className="spiral-ring"></div>
        <div className="spiral-ring"></div>
        <div className="spiral-ring"></div>
        <div className="spiral-ring"></div>
        <div className="spiral-ring"></div>
      </div>
      <div className="memo-header-content">
        <div className="memo-brand">
          <span className="memo-icon">📝</span>
          <h1 className="memo-app-title">Shopping List App</h1>
          <div className="memo-underline"></div>
        </div>
      <nav className="memo-nav">
        <Link to="/" className="memo-nav-link">
        <span className="nav-icon">🏠</span>
          Home
        </Link>
        <span className="nav-divider">|</span>
        <Link to="/wishlist" className="memo-nav-link">
        <span className="nav-icon">⭐</span>
        Wishlist
        </Link>
      </nav>

      <button className="hamburger-btn" onClick={toggleMenu} aria-label="メニュー">
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link to="/wishlist" className="mobile-nav-link" onClick={closeMenu}>
            <span className="nav-icon">⭐</span>
            Wishlist
          </Link>
        </nav>
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      
    </div>
      
    <div className="memo-header-line"></div>
    </header>
  )
}
