'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Steps.module.css';

const Steps: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateIn);
          }
        });
      },
      { threshold: 0.2, triggerOnce: true }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Heading',
      icon: '💰',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae inventore velit similique, illum non ullam molestiae perferendis iusto tempora.'
    },
    {
      number: '02',
      title: 'Heading',
      icon: '⏰',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae inventore velit similique, illum non ullam molestiae perferendis iusto tempora.'
    },
    {
      number: '03',
      title: 'Heading',
      icon: '👥',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae inventore velit similique, illum non ullam molestiae perferendis iusto tempora.'
    },
    {
      number: '04',
      title: 'Heading',
      icon: '💳',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae inventore velit similique, illum non ullam molestiae perferendis iusto tempora.'
    },
    {
      number: '05',
      title: 'Heading',
      icon: '💡',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae inventore velit similique, illum non ullam molestiae perferendis iusto tempora.'
    }
  ];

  return (
    <div className={styles.stepsContainer}>
      <h1 className={styles.mainTitle}>
        Steps to Enrol
        <span className={styles.titleUnderline}></span>
      </h1>
      
      <div className={styles.blockContainer}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.card} ${styles[`cardColor${index + 1}`]}`}
            ref={(el) => { cardsRef.current[index] = el; }}
          >
            <div className={styles.title}>
              Step<span>{step.number}</span>
            </div>
            <div className={styles.content}>
              <h3>{step.title}</h3>
              <div className={styles.icon}>
                <span>{step.icon}</span>
              </div>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;