import React from 'react'

export default function Footer() {
  return (
    <footer className="memo-footer-container">
      <div className="memo-footer-line"></div>

      <div className="memo-footer-content">
        <div className="memo-footer-doodles">
          <span className="doodle">✏️</span>
          <span className="doodle">📋</span>
          <span className="doodle">✨</span>
        </div>
        <p className="memo-copyright">
          <span className="copyright-icon">©</span>
          2025 Shopping List App
        </p>

        <div className="memo-footer-decoration">
          <div className="decoration-line"></div>
          <span className="decoration-heart">♡</span>
          <div className="decoration-line"></div>
        </div>
      </div>
      <div className="memo-bottom-shadow"></div>
    </footer>
  )
}
