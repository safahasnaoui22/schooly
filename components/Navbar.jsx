"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/about', label: 'À Propos' },
    { href: '/academy', label: 'Académie' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/why-us', label: 'Pourquoi Nous Choisir' },
    { href: '/method', label: 'Méthode Pédagogique' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          margin: 20px auto;
          max-width: 1400px;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 60px;
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 10px 20px -8px rgba(0,32,64,0.1);
          position: relative;
          z-index: 20;
          animation: navReveal 0.8s ease-out;
        }

        @keyframes navReveal {
          0% { opacity: 0; transform: translateY(-25px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .logo img {
          height: 70px;
          width: auto;
          display: block;
          transition: transform 0.4s ease;
        }

        .logo img:hover {
          transform: scale(1.05) rotate(-1deg);
        }

        .navbar nav ul {
          list-style: none;
          display: flex;
          gap: 32px;
          margin: 0;
          padding: 0;
        }

        .navbar nav a {
          text-decoration: none;
          color: var(--text-dark, #333);
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s;
          position: relative;
          padding-bottom: 5px;
        }

        .navbar nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 3px;
          background: var(--secondary, #0077b6);
          border-radius: 6px;
          transition: width 0.25s ease;
        }

        .navbar nav a:hover {
          color: var(--primary, #0b2f4e);
        }

        .navbar nav a:hover::after {
          width: 100%;
        }

        .navbar nav a.active {
          color: var(--primary, #0b2f4e);
        }

        .navbar nav a.active::after {
          width: 100%;
        }

        .bookCallNav {
          background: linear-gradient(145deg, var(--primary, #0b2f4e), #235b8c);
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 40px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 10px 15px -6px var(--primary, #0b2f4e);
          transition: all 0.25s;
          position: relative;
          z-index: 5;
        }

        .bookCallNav:hover {
          transform: scale(1.05) translateY(-3px);
          box-shadow: 0 20px 25px -8px #0b2f4e;
          background: linear-gradient(145deg, #123b5e, #1e5f8e);
        }

        /* Mobile responsiveness */
        @media (max-width: 1024px) {
          .navbar nav ul {
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            padding: 15px;
            border-radius: 30px;
          }

          .logo img {
            height: 50px;
            margin-bottom: 10px;
          }

          .navbar nav ul {
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin: 10px 0;
          }

          .bookCallNav {
            padding: 10px 25px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .navbar nav ul {
            gap: 10px;
          }

          .navbar nav a {
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className="navbar">
        <Link href="/" className="logo">
          <img 
            src="/logo.png" 
            alt="École Logo" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150x70?text=Logo";
            }}
          />
        </Link>

        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={pathname === item.href ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="bookCallNav">
          Réserver un appel
        </button>
      </div>
    </>
  );
};

export default Navbar;