// components/SchoolStats.tsx
'use client';

import { useEffect, useRef } from 'react';

const SchoolStats = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const counters = document.querySelectorAll(".counter");

    function animateCounters() {
      counters.forEach(counter => {
        const target = Number(counter.getAttribute("data-target"));
        let count = 0;
        const step = target / 120;

        function update() {
          count += step;
          if (count < target) {
            counter.innerText = Math.ceil(count).toString();
            requestAnimationFrame(update);
          } else {
            counter.innerText = target + "+";
          }
        }
        update();
      });
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="school-stats" ref={sectionRef}>
      <div className="container">
   
     

        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="counter" data-target="500">0</h3>
            <span>Élèves accompagnés</span>
          </div>

          <div className="stat-card">
            <h3 className="counter" data-target="20">0</h3>
            <span>Enseignants qualifiés</span>
          </div>

          <div className="stat-card">
            <h3 className="counter" data-target="15">0</h3>
            <span>Classes modernes</span>
          </div>

          <div className="stat-card">
            <h3 className="counter" data-target="95">0</h3>
            <span>Réussite scolaire</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .school-stats {
          padding: 100px 0;
          text-align: center;
          background: linear-gradient(180deg, #f8fbff, #ffffff);
          height : 50vh ;
        }

        .stats-title {
          font-size: 38px;
          color: #0e4a67;
          margin-bottom: 10px;
        }

        .stats-subtitle {
          color: #6c7a86;
          margin-bottom: 60px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .stat-card {
          padding: 30px;
          border-radius: 18px;
        
          transition: all 0.4s ease;
        }

        .stat-card:hover {
          transform: translateY(-8px);
        }

        /* 3D numbers */
        .stat-card h3 {
          font-size: 60px;
          font-weight: 800;
          background: linear-gradient(135deg, #1c7fa6, #4fb3d8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 3px 0 rgba(0, 0, 0, 0.05),
                       0 6px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 10px;
        }

        .stat-card span {
          color: #6c7a86;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .stats-title {
            font-size: 28px;
          }
          
          .stat-card h3 {
            font-size: 40px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default SchoolStats;