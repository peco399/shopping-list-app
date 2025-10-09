import { Link } from 'react-router-dom'
import React, { useState } from 'react'

export default function Header({ lang, setLang, t }) {

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
        <span className="nav-divider">|</span>
        <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="memo-nav-link"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              color: 'inherit'
            }}
          >
            <option value="en">🇺🇸 English</option>
            <option value="ja">🇯🇵 日本語</option>
          </select>
      </nav>

      <button className="hamburger-btn" onClick={toggleMenu} aria-label="メニュー">
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
            <span className="nav-icon">🏠</span>
            {t('home')}
          </Link>
          <Link to="/wishlist" className="mobile-nav-link" onClick={closeMenu}>
            <span className="nav-icon">⭐</span>
            {t('wishlist')}
          </Link>
          <div className="mobile-nav-link" style={{ padding: '15px 30px', borderBottom: 'none' }}>
            <span className="nav-icon">🌐</span>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              style={{
                border: '1px solid #e8e8e8',
                borderRadius: '6px',
                padding: '8px 12px',
                fontFamily: 'inherit',
                fontSize: '16px',
                fontWeight: '600',
                color: '#74b9ff',
                background: 'white',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              <option value="en">🇺🇸 English</option>
              <option value="ja">🇯🇵 日本語</option>
            </select>
          </div>
        </nav>
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      
    </div>
      
    <div className="memo-header-line"></div>
    </header>
  )
}
