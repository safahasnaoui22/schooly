// components/WhyChooseUs.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionRef.current?.classList.add(styles.showUniverse);

            cardsRef.current.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add(styles.showCard);
              }, i * 200);
            });
          } else {
            sectionRef.current?.classList.remove(styles.showUniverse);
            cardsRef.current.forEach((card) => card.classList.remove(styles.showCard));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      title: "Excellence Académique",
      description: "Programme conforme au ministère tunisien avec un suivi pédagogique rigoureux.",
      image: "https://i.pinimg.com/736x/36/38/b3/3638b366f5fc4aa0d663b222a0a8fdef.jpg",
    },
    {
      title: "Environnement Sécurisé",
      description: "Un cadre moderne, sécurisé et adapté au bien-être des enfants.",
      image: "https://i.pinimg.com/1200x/e9/7c/fc/e97cfc921feb5fdf0537c6ca6fccf9c7.jpg",
    },
    {
      title: "Activités Parascolaires",
      description: "Clubs, sport, arts et ateliers pour développer les talents et la créativité",
      image: "https://i.pinimg.com/1200x/63/60/eb/6360ebe8c175e7e5b348054ad75f69b6.jpg",
    },
    {
      title: "Suivi Personnalisé",
      description: "Un accompagnement individualisé pour garantir la réussite de chaque élève.",
      image: "https://i.pinimg.com/736x/41/76/4c/41764c2b9a93217cca91c7f360acaca7.jpg",
    },
  ];

  return (
    <div className={styles.Universe} ref={sectionRef}>
      <h1 className={styles.h1universe}>Pourquoi Choisir École Privée Al Amad ?</h1>
      <div className={styles.containeruniverse}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${styles.boxuniverse} ${index % 2 === 0 ? styles.leftCard : styles.rightCard}`}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
          >
            <div className={styles.imgBx}>
              <Image src={card.image} alt={card.title} width={250} height={275} />
            </div>
            <div className={styles.contentuniverse}>
              <div>
                <h2 className={styles.h2universe}>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}