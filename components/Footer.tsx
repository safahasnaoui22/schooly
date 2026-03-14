// app/footer.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fp-footer-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Parallax effect on scroll
    const handleParallax = () => {
      if (parallaxRef.current && footerRef.current) {
        const scrollPosition = window.scrollY;
        const footerPosition = footerRef.current.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition + windowHeight > footerPosition) {
          const speed = 0.3;
          const yOffset = (scrollPosition + windowHeight - footerPosition) * speed;
          parallaxRef.current.style.transform = `translateY(${yOffset * 0.5}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleParallax);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  // Canvas animation for dynamic background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = footerRef.current?.offsetHeight || 600;
    };

    const createParticles = () => {
      const particleCount = 50;
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 10, 20, 0.95)');
      gradient.addColorStop(0.5, 'rgba(30, 20, 40, 0.95)');
      gradient.addColorStop(1, 'rgba(20, 10, 30, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated grid lines
      ctx.strokeStyle = 'rgba(100, 108, 255, 0.1)';
      ctx.lineWidth = 1;
      const time = Date.now() * 0.001;
      
      // Horizontal lines with wave effect
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i + Math.sin(time + i * 0.01) * 10);
        for (let j = 0; j < canvas.width; j += 20) {
          ctx.lineTo(j, i + Math.sin(time + j * 0.01 + i * 0.01) * 10);
        }
        ctx.strokeStyle = `rgba(102, 126, 234, ${0.05 + Math.sin(time + i * 0.01) * 0.03})`;
        ctx.stroke();
      }

      // Vertical lines with wave effect
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i + Math.sin(time * 0.5) * 10, 0);
        for (let j = 0; j < canvas.height; j += 20) {
          ctx.lineTo(i + Math.sin(time + j * 0.01) * 10, j);
        }
        ctx.strokeStyle = `rgba(118, 75, 162, ${0.05 + Math.cos(time + i * 0.01) * 0.03})`;
        ctx.stroke();
      }

      // Draw floating particles
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulse effect
        const pulse = Math.sin(time * 2 + index) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity * pulse;
        ctx.fill();

        // Draw connecting lines between nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw glowing orbs
      const orbCount = 3;
      for (let i = 0; i < orbCount; i++) {
        const orbX = (canvas.width / (orbCount + 1)) * (i + 1) + Math.sin(time + i) * 50;
        const orbY = canvas.height / 2 + Math.cos(time * 0.5 + i) * 100;
        
        const gradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 200);
        gradient.addColorStop(0, `rgba(102, 126, 234, 0.1)`);
        gradient.addColorStop(0.5, `rgba(118, 75, 162, 0.05)`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(orbX - 200, orbY - 200, 400, 400);
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <footer className="fp-unique-footer-wrapper" ref={footerRef}>
      {/* Canvas for dynamic background */}
      <canvas 
        ref={canvasRef} 
        className="fp-footer-canvas"
      />
      
      {/* Animated gradient overlay */}
      <div className="fp-gradient-overlay"></div>
      
      {/* Floating particles (CSS version for extra effect) */}
      <div className="fp-footer-particles">
        <div className="fp-particle fp-particle-1"></div>
        <div className="fp-particle fp-particle-2"></div>
        <div className="fp-particle fp-particle-3"></div>
        <div className="fp-particle fp-particle-4"></div>
      </div>

      {/* Animated wave effect */}
      <div className="fp-wave-container">
        <div className="fp-wave fp-wave-1"></div>
        <div className="fp-wave fp-wave-2"></div>
        <div className="fp-wave fp-wave-3"></div>
      </div>

      {/* Parallax background */}
      <div className="fp-footer-parallax-bg" ref={parallaxRef}></div>

      <div className="fp-footer-container">
        {/* Main footer content with fade-in animation */}
        <div className="fp-footer-main">
          {/* Brand section */}
          <div className="fp-footer-brand">
            <h2 className="fp-footer-logo">
              <span className="fp-logo-text">AL</span>
              <span className="fp-logo-highlight">AMAD</span>
            </h2>
            <p className="fp-footer-description">
              Creating amazing digital experiences with passion and innovation.
            </p>
            
            {/* Social links with hover effects */}
            <div className="fp-footer-social">
              <a href="#" className="fp-social-link" aria-label="Facebook">
                <svg className="fp-social-icon" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="fp-social-link" aria-label="Twitter">
                <svg className="fp-social-icon" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="fp-social-link" aria-label="Instagram">
                <svg className="fp-social-icon" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="18" y1="6" x2="18" y2="6" strokeWidth="2"/>
                </svg>
              </a>
              <a href="#" className="fp-social-link" aria-label="LinkedIn">
                <svg className="fp-social-icon" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links sections with staggered animation */}
          <div className="fp-footer-links">
            <div className="fp-links-column">
              <h3 className="fp-column-title">Product</h3>
              <ul className="fp-link-list">
                <li><a href="#" className="fp-link">Features</a></li>
                <li><a href="#" className="fp-link">Pricing</a></li>
                <li><a href="#" className="fp-link">Integrations</a></li>
                <li><a href="#" className="fp-link">FAQ</a></li>
              </ul>
            </div>

            <div className="fp-links-column">
              <h3 className="fp-column-title">Company</h3>
              <ul className="fp-link-list">
                <li><a href="#" className="fp-link">About</a></li>
                <li><a href="#" className="fp-link">Blog</a></li>
                <li><a href="#" className="fp-link">Careers</a></li>
                <li><a href="#" className="fp-link">Press</a></li>
              </ul>
            </div>

            <div className="fp-links-column">
              <h3 className="fp-column-title">Resources</h3>
              <ul className="fp-link-list">
                <li><a href="#" className="fp-link">Documentation</a></li>
                <li><a href="#" className="fp-link">Support</a></li>
                <li><a href="#" className="fp-link">Legal</a></li>
                <li><a href="#" className="fp-link">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter signup with hover effect */}
          <div className="fp-footer-newsletter">
            <h3 className="fp-newsletter-title">Stay Updated</h3>
            <p className="fp-newsletter-text">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="fp-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="fp-newsletter-input"
                aria-label="Email for newsletter"
              />
              <button type="submit" className="fp-newsletter-button">
                <span>Subscribe</span>
                <svg className="fp-button-icon" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar with subtle animation */}
        <div className="fp-footer-bottom">
          <p className="fp-copyright">
            © 2026 Your Brand. All rights reserved.
          </p>
          <div className="fp-bottom-links">
            <a href="#" className="fp-bottom-link">Privacy Policy</a>
            <a href="#" className="fp-bottom-link">Terms of Service</a>
            <a href="#" className="fp-bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Unique footer wrapper - completely isolated */
        .fp-unique-footer-wrapper {
          position: relative;
          width: 100%;
          min-height: 500px;
          color: #ffffff;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
        }

        .fp-unique-footer-wrapper.fp-footer-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Canvas background */
        .fp-footer-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        /* Gradient overlay */
        .fp-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 50%, rgba(10, 10, 20, 0.7) 0%, rgba(20, 10, 30, 0.9) 100%);
          z-index: 1;
          pointer-events: none;
          animation: fp-pulse 8s ease-in-out infinite;
        }

        /* Wave animation */
        .fp-wave-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 150px;
          z-index: 2;
          pointer-events: none;
          opacity: 0.3;
        }

        .fp-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23667eea" fill-opacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/></svg>');
          background-size: cover;
          background-repeat: no-repeat;
          animation: fp-wave 10s linear infinite;
        }

        .fp-wave-1 {
          opacity: 0.5;
          animation: fp-wave 15s linear infinite;
          bottom: 0;
        }

        .fp-wave-2 {
          opacity: 0.3;
          animation: fp-wave 20s linear infinite reverse;
          bottom: 20px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23764ba2" fill-opacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/></svg>');
          background-size: cover;
        }

        .fp-wave-3 {
          opacity: 0.2;
          animation: fp-wave 12s linear infinite;
          bottom: 40px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.2" d="M0,64L48,85.3C96,107,192,149,288,154.7C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,138.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/></svg>');
          background-size: cover;
        }

        /* Parallax background */
        .fp-footer-parallax-bg {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 3;
          animation: fp-rotate 60s linear infinite;
        }

        /* Floating particles */
        .fp-footer-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 4;
        }

        .fp-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(20px);
          animation: fp-float 20s infinite linear;
        }

        .fp-particle-1 {
          width: 400px;
          height: 400px;
          top: -200px;
          right: -200px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
          animation: fp-rotate 40s infinite linear;
        }

        .fp-particle-2 {
          width: 300px;
          height: 300px;
          bottom: -150px;
          left: -150px;
          background: radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%);
          animation: fp-rotate 30s infinite reverse;
        }

        .fp-particle-3 {
          width: 200px;
          height: 200px;
          top: 20%;
          left: 10%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: fp-float 25s infinite ease-in-out;
        }

        .fp-particle-4 {
          width: 250px;
          height: 250px;
          bottom: 30%;
          right: 15%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          animation: fp-float 20s infinite reverse;
        }

        /* Container */
        .fp-footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 40px 30px;
          position: relative;
          z-index: 10;
        }

        /* Rest of your existing styles... */
        .fp-footer-main {
          display: grid;
          grid-template-columns: 1.5fr 2fr 1.5fr;
          gap: 60px;
          margin-bottom: 60px;
          position: relative;
          z-index: 10;
        }

        .fp-footer-brand {
          animation: fp-fadeInUp 0.6s ease forwards;
        }

        .fp-footer-logo {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          line-height: 1.2;
          position: relative;
          z-index: 10;
        }

        .fp-logo-text {
          color: #ffffff;
          opacity: 0.9;
        }

        .fp-logo-highlight {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 42px;
          animation: fp-shimmer 3s infinite;
        }

        .fp-footer-description {
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          margin-bottom: 30px;
          font-size: 16px;
          position: relative;
          z-index: 10;
        }

        .fp-footer-social {
          display: flex;
          gap: 15px;
          position: relative;
          z-index: 10;
        }

        .fp-social-link {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .fp-social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .fp-social-link:hover {
          transform: translateY(-5px) scale(1.1);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
          border-color: transparent;
        }

        .fp-social-link:hover::before {
          left: 100%;
        }

        .fp-social-icon {
          width: 20px;
          height: 20px;
          fill: white;
          transition: transform 0.3s;
        }

        .fp-social-link:hover .fp-social-icon {
          transform: scale(1.2);
        }

        .fp-footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          position: relative;
          z-index: 10;
        }

        .fp-links-column {
          animation: fp-fadeInUp 0.6s ease forwards;
          animation-delay: calc(0.1s * var(--column-index, 1));
        }

        .fp-links-column:nth-child(1) { --column-index: 1; }
        .fp-links-column:nth-child(2) { --column-index: 2; }
        .fp-links-column:nth-child(3) { --column-index: 3; }

        .fp-column-title {
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .fp-column-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s;
        }

        .fp-links-column:hover .fp-column-title::after {
          width: 50px;
        }

        .fp-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .fp-link-list li {
          margin-bottom: 12px;
        }

        .fp-link {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 15px;
          transition: all 0.3s;
          display: inline-block;
          position: relative;
        }

        .fp-link::before {
          content: '→';
          position: absolute;
          left: -20px;
          opacity: 0;
          transition: all 0.3s;
          color: #667eea;
        }

        .fp-link:hover {
          color: #ffffff;
          transform: translateX(20px);
        }

        .fp-link:hover::before {
          opacity: 1;
          left: -15px;
        }

        .fp-footer-newsletter {
          background: rgba(255,255,255,0.05);
          padding: 30px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          animation: fp-fadeInUp 0.6s ease forwards;
          animation-delay: 0.3s;
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .fp-footer-newsletter::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
          animation: fp-rotate 20s linear infinite;
          z-index: -1;
        }

        .fp-footer-newsletter:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .fp-newsletter-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .fp-newsletter-text {
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .fp-newsletter-form {
          display: flex;
          gap: 10px;
        }

        .fp-newsletter-input {
          flex: 1;
          padding: 12px 15px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          color: #ffffff;
          font-size: 14px;
          transition: all 0.3s;
          backdrop-filter: blur(5px);
        }

        .fp-newsletter-input:focus {
          outline: none;
          border-color: #667eea;
          background: rgba(255,255,255,0.15);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }

        .fp-newsletter-input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .fp-newsletter-button {
          padding: 12px 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }

        .fp-newsletter-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .fp-newsletter-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }

        .fp-newsletter-button:hover::before {
          left: 100%;
        }

        .fp-button-icon {
          width: 18px;
          height: 18px;
          stroke: white;
          stroke-width: 2;
          fill: none;
          transition: transform 0.3s;
        }

        .fp-newsletter-button:hover .fp-button-icon {
          transform: translateX(5px);
        }

        .fp-footer-bottom {
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: fp-fadeIn 0.6s ease forwards;
          animation-delay: 0.4s;
          opacity: 0;
          position: relative;
          z-index: 10;
        }

        .fp-copyright {
          color: rgba(255,255,255,0.6);
          font-size: 14px;
        }

        .fp-bottom-links {
          display: flex;
          gap: 30px;
        }

        .fp-bottom-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s;
          position: relative;
        }

        .fp-bottom-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s;
        }

        .fp-bottom-link:hover {
          color: #ffffff;
        }

        .fp-bottom-link:hover::after {
          width: 100%;
        }

        /* Animations */
        @keyframes fp-fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fp-fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fp-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-30px) rotate(5deg) scale(1.1);
          }
        }

        @keyframes fp-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fp-pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes fp-wave {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-25%) translateY(-10px);
          }
          100% {
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes fp-shimmer {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
            filter: brightness(1.2);
          }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .fp-footer-main {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .fp-footer-links {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .fp-footer-container {
            padding: 40px 20px 20px;
          }

          .fp-footer-links {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .fp-newsletter-form {
            flex-direction: column;
          }

          .fp-footer-bottom {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .fp-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;