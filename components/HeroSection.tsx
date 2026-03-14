"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from "./HeroSection.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

import { usePathname } from "next/navigation";
// Register GSAP plugins once outside component
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll for anchor links
    const smoothScroll = () => {
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const href = link.getAttribute("href");
          if (href) {
            const target = document.querySelector(href);
            if (target) {
              gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, autoKill: true },
                ease: "power3.inOut",
              });
            }
          }
        });
      });
    };

    smoothScroll();

    // Optional: Add scroll animations for elements
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
const pathname = usePathname();
  return (
    <>
      <div className={styles.floatingShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
      </div>

      <div className={styles.heroContainer} ref={sectionRef}>
            
        <header className={styles.navbar}>
          <div className={styles.logo}>
            <a href="/">
              <Image
                src="/logosch.png"
                alt="Shifa School Logo"
                width={70}
                height={70}
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                  if (target.parentElement) {
                    target.parentElement.innerHTML = "🏫";
                  }
                }}
              />
            </a>
          </div>
         <nav>
  <ul>
<li>
  <Link
    href="/history-carousel"
    className={pathname === "/history-carousel" ? "active" : ""}
  >
    Admissions
  </Link>
</li>

    <li>
      <Link
        href="/academy"
        className={pathname === "/academy" ? "active" : ""}
      >
        Académie
      </Link>
    </li>

    <li>
      <Link
        href="/HistroryCrousel"
        className={pathname === "/HistroryCrousel" ? "active" : ""}
      >
        Admissions
      </Link>
    </li>

    <li>
      <Link
        href="/why-us"
        className={pathname === "/why-us" ? "active" : ""}
      >
        Pourquoi Nous Choisir
      </Link>
    </li>

    <li>
      <Link
        href="/method"
        className={pathname === "/method" ? "active" : ""}
      >
        Méthode Pédagogique
      </Link>
    </li>

    <li>
      <Link
        href="/contact"
        className={pathname === "/contact" ? "active" : ""}
      >
        Contact
      </Link>
    </li>
  </ul>
</nav>     <Link href="/login-register" passHref>
        <button className={styles.bookCallNav}>Connexion</button>
      </Link>
        </header>

        <main className={styles.heroSection}>
          <div className={styles.heroContentLeft}>
            <p className={styles.preHeading}>✨ École Privée Al Amad – Tunisie</p>
            <h1 >Excellence Académique & Éducation de Qualité en Tunisie</h1>
            <p className={styles.tagline}>
              L’École Al Amad accompagne les élèves du primaire dans un environnement éducatif moderne, sécurisé et
              stimulant. Notre mission est de développer les compétences académiques, les valeurs humaines et la
              confiance en soi afin de préparer chaque enfant à un avenir brillant.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.bookCallMain}>Planifier une visite</button>
            <Link href="/inscription" passHref>
  <button className={styles.appointmentMain}>
    Inscription en ligne
  </button>
</Link>
            </div>

            <div className={styles.ratingsInfo}>
              <div className={styles.avatars}></div>
              <p>★★★★★</p>
              <p style={{ fontSize: "18px" }}>+500 élèves accompagnés</p>
            </div>
          </div>

          <div className={styles.heroContentRight}>
            <div className={styles.robotGraphic}></div>

            <div className={`${styles.infoCard} ${styles.doctorsCard}`}>
              <p>30+</p>
              <p>Academic programs</p>
            </div>

            <div className={`${styles.infoCard} ${styles.treatmentCard}`}>
              <div className={styles.miniImage}></div>
              <p>95%</p>
              <p>Graduation success</p>
            </div>

            <div className={styles.socialIcons}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                📘
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                📷
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                🐦
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                🔗
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}