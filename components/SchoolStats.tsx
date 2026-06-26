// components/SchoolStats.tsx
'use client';

import { useEffect, useRef } from 'react';

const SchoolStats = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('.counter');

    function animateCounters() {
      counters.forEach((counter) => {
        const target = Number(counter.getAttribute('data-target'));
        let count = 0;
        const step = target / 120;

        function update() {
          count += step;
          if (count < target) {
            counter.innerText = Math.ceil(count).toString();
            requestAnimationFrame(update);
          } else {
            counter.innerText = target.toString();
          }
        }
        update();
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const styles = `
    /* ---------- STATISTICS BAR (Redesigned) ---------- */
    .stats-bar {
      margin-top: -20px;
      position: relative;
      z-index: 2;
      padding-bottom: 20px;
    }

    .stats-bar .stats-wrapper {
      background: linear-gradient(145deg, #0b1a3a, #112a5a);
      border-radius: 20px;
      padding: 24px 30px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      box-shadow: 0 20px 60px rgba(7, 27, 74, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(2px);
      transition: box-shadow 0.3s ease;
    }

    .stats-bar .stats-wrapper:hover {
      box-shadow: 0 24px 70px rgba(7, 27, 74, 0.5);
    }

    .stat-item {
      text-align: center;
      color: #ffffff;
      padding: 12px 8px;
      border-right: 1px solid rgba(255, 255, 255, 0.07);
      transition: transform 0.25s ease, background 0.25s ease;
      border-radius: 12px;
      cursor: default;
    }

    .stat-item:last-child {
      border-right: none;
    }

    .stat-item:hover {
      transform: translateY(-4px) scale(1.02);
      background: rgba(255, 215, 0, 0.06);
      border-right-color: transparent;
    }

    .stat-item:last-child:hover {
      border-right: none;
    }

    .stat-item .stat-icon {
      font-size: 24px;
      color: #c9a84c;
      margin-bottom: 6px;
      display: block;
      opacity: 0.8;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .stat-item:hover .stat-icon {
      opacity: 1;
      transform: scale(1.1) rotate(-2deg);
    }

    .stat-item .number {
      font-family: 'Playfair Display', serif;
      font-size: clamp(28px, 3vw, 38px);
      font-weight: 700;
      display: block;
      line-height: 1.1;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #ffffff 60%, #f0e6c5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-item .number .gold {
      color: #c9a84c;
      -webkit-text-fill-color: #c9a84c;
      font-weight: 700;
    }

    .stat-item .label {
      font-size: 12px;
      opacity: 0.7;
      font-weight: 400;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 4px;
      display: block;
      color: rgba(255, 255, 255, 0.8);
      transition: opacity 0.3s ease;
    }

    .stat-item:hover .label {
      opacity: 1;
    }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 768px) {
      .stats-bar .stats-wrapper {
        grid-template-columns: repeat(2, 1fr);
        padding: 16px 20px;
        gap: 12px;
      }

      .stat-item {
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        padding: 12px 6px;
      }

      .stat-item:nth-last-child(-n+2) {
        border-bottom: none;
      }

      .stat-item .number {
        font-size: clamp(24px, 5vw, 32px);
      }
    }

    @media (max-width: 480px) {
      .stats-bar .stats-wrapper {
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        padding: 12px 12px;
      }

      .stat-item {
        padding: 10px 4px;
      }

      .stat-item .stat-icon {
        font-size: 20px;
      }

      .stat-item .number {
        font-size: 22px;
      }

      .stat-item .label {
        font-size: 10px;
        letter-spacing: 0.2px;
      }
    }

    /* ---------- (Optional) container class if not globally defined ---------- */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
  `;

  return (
    <>
      <section className="stats-bar" ref={sectionRef}>
        <div className="container">
          <div className="stats-wrapper">
            <div className="stat-item">
              <span className="stat-icon">
                <i className="fas fa-award"></i>
              </span>
              <span className="number">
                <span className="counter" data-target="18">0</span>
                <span className="gold">+</span>
              </span>
              <span className="label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">
                <i className="fas fa-users"></i>
              </span>
              <span className="number">
                <span className="counter" data-target="620">0</span>
                <span className="gold">+</span>
              </span>
              <span className="label">Happy Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </span>
              <span className="number">
                <span className="counter" data-target="48">0</span>
                <span className="gold">+</span>
              </span>
              <span className="label">Certified Teachers</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">
                <i className="fas fa-user-friends"></i>
              </span>
              <span className="number">
                <span className="counter" data-target="12">0</span>
                <span className="gold">:1</span>
              </span>
              <span className="label">Student-Teacher Ratio</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">
                <i className="fas fa-heart"></i>
              </span>
              <span className="number">
                <span className="counter" data-target="98">0</span>
                <span className="gold">%</span>
              </span>
              <span className="label">Parent Satisfaction</span>
            </div>
          </div>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
};

export default SchoolStats;