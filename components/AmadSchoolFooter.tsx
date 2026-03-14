// components/AmadSchoolFooter.tsx
import React from 'react';
import Link from 'next/link';

const AmadSchoolFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #0b2b5c, #1a4a8a);
          color: white;
          padding: 3rem 2rem 1.5rem;
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        /* Animated wave background */
        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          background: linear-gradient(90deg, #ffd700, #ffb347, #ffd700);
          animation: wave 3s ease-in-out infinite;
          background-size: 200% 100%;
        }

        @keyframes wave {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }

        /* Floating shapes */
        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 50%;
          pointer-events: none;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          bottom: -150px;
          left: -100px;
          animation: float 8s ease-in-out infinite;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          top: -50px;
          right: -50px;
          animation: float 12s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          bottom: 50px;
          right: 20%;
          animation: float 10s ease-in-out infinite 2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }

        .footer-section {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .footer-section:nth-child(1) { animation-delay: 0.2s; }
        .footer-section:nth-child(2) { animation-delay: 0.4s; }
        .footer-section:nth-child(3) { animation-delay: 0.6s; }
        .footer-section:nth-child(4) { animation-delay: 0.8s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .school-name {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .school-logo {
          width: 60px;
          height: 60px;
          background: #ffd700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 2rem;
          font-weight: bold;
          color: #0b2b5c;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
        }

        .school-motto {
          font-style: italic;
          color: #ffd700;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: #ffd700;
          animation: titleLine 3s ease-in-out infinite;
        }

        @keyframes titleLine {
          0%, 100% { width: 50px; }
          50% { width: 80px; }
        }

        .links-list {
          list-style: none;
          padding: 0;
        }

        .links-list li {
          margin-bottom: 0.8rem;
        }

        .links-list a {
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
        }

        .links-list a::before {
          content: '→';
          opacity: 0;
          margin-right: 0.5rem;
          transition: all 0.3s ease;
          color: #ffd700;
        }

        .links-list a:hover {
          transform: translateX(5px);
          color: #ffd700;
        }

        .links-list a:hover::before {
          opacity: 1;
          margin-right: 0.5rem;
        }

        .contact-info {
          list-style: none;
          padding: 0;
        }

        .contact-info li {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        .contact-info li:hover {
          transform: translateX(5px);
        }

        .contact-icon {
          width: 35px;
          height: 35px;
          background: rgba(255, 215, 0, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffd700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        .contact-info li:hover .contact-icon {
          background: #ffd700;
          color: #0b2b5c;
          transform: rotate(360deg);
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.3rem;
          transition: all 0.3s ease;
          text-decoration: none;
          animation: socialPulse 2s ease-in-out infinite;
        }

        .social-icon:nth-child(1) { animation-delay: 0s; }
        .social-icon:nth-child(2) { animation-delay: 0.3s; }
        .social-icon:nth-child(3) { animation-delay: 0.6s; }
        .social-icon:nth-child(4) { animation-delay: 0.9s; }

        @keyframes socialPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .social-icon:hover {
          background: #ffd700;
          color: #0b2b5c;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
        }

        .newsletter {
          margin-top: 1rem;
        }

        .newsletter-input {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .newsletter-input input {
          flex: 1;
          padding: 0.8rem;
          border: none;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 215, 0, 0.3);
          transition: all 0.3s ease;
        }

        .newsletter-input input:focus {
          outline: none;
          border-color: #ffd700;
          background: rgba(255, 255, 255, 0.15);
        }

        .newsletter-input input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .newsletter-btn {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 25px;
          background: #ffd700;
          color: #0b2b5c;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: btnGlow 2s ease-in-out infinite;
        }

        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
        }

        .newsletter-btn:hover {
          transform: scale(1.05);
          background: #fff;
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.5);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          text-align: center;
          font-size: 0.95rem;
          position: relative;
          z-index: 2;
        }

        .footer-bottom p {
          margin: 0.5rem 0;
          color: rgba(255, 255, 255, 0.8);
        }

        .footer-bottom a {
          color: #ffd700;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .footer-bottom a:hover {
          text-decoration: underline;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .footer {
            padding: 2rem 1rem 1rem;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>

        <div className="footer-content">
          <div className="footer-grid">
            {/* School Info Section */}
            <div className="footer-section">
              <div className="school-logo">A</div>
              <h3 className="school-name">Amad School</h3>
              <p className="school-motto">"Nurturing Minds, Building Futures"</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                Providing quality education since 1995. We shape tomorrow's leaders through innovation, dedication, and excellence.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="footer-section">
              <h4 className="section-title">Quick Links</h4>
              <ul className="links-list">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/academics">Academics</Link></li>
                <li><Link href="/admissions">Admissions</Link></li>
                <li><Link href="/events">Events</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="footer-section">
              <h4 className="section-title">Contact Info</h4>
              <ul className="contact-info">
                <li>
                  <span className="contact-icon">📍</span>
                  <span>123 Education Street, Knowledge City, 12345</span>
                </li>
                <li>
                  <span className="contact-icon">📞</span>
                  <span>+1 234 567 890</span>
                </li>
                <li>
                  <span className="contact-icon">✉️</span>
                  <span>info@amadschool.edu</span>
                </li>
                <li>
                  <span className="contact-icon">⏰</span>
                  <span>Mon - Fri: 8:00 AM - 4:00 PM</span>
                </li>
              </ul>

              {/* Social Links */}
              <div className="social-links">
                <a href="#" className="social-icon" aria-label="Facebook">📘</a>
                <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
                <a href="#" className="social-icon" aria-label="Instagram">📷</a>
                <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="footer-section">
              <h4 className="section-title">Newsletter</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                Subscribe to get updates about events and news
              </p>
              <div className="newsletter">
                <div className="newsletter-input">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    aria-label="Email for newsletter"
                  />
                  <button className="newsletter-btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>© {currentYear} Amad School. All rights reserved.</p>
            <p>
              Designed with <span style={{ color: '#ffd700', animation: 'pulse 1.5s ease-in-out infinite', display: 'inline-block' }}>❤️</span> for education
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Use</Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AmadSchoolFooter;