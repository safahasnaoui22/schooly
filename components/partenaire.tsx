// app/partenaire.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const Partenaire = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeItemsRef = useRef<HTMLDivElement>(null);

  const images = [
    {
      src: "/l1.png",
      alt: "Image 1"
    },
    {
      src: "/l2.png",
      alt: "Image 2"
    },
    {
      src: "/l3.png",
      alt: "Image 3"
    },
    {
      src: "/l4.png",
      alt: "Image 4"
    },
    {
      src: "/l5.png",
      alt: "Image 5"
    },
      {
      src: "/l6.png",
      alt: "Image 5"
    },
      {
      src: "/l7.png",
      alt: "Image 5"
    },
      {
      src: "/l8.png",
      alt: "Image 5"
    },
      {
      src: "/l9.png",
      alt: "Image 5"
    },
  ];

  useEffect(() => {
    const setMarqueeAnimation = () => {
      if (marqueeItemsRef.current && marqueeRef.current) {
        const contentWidth = marqueeItemsRef.current.offsetWidth / 2; // Divide by 2 since we have duplicate
        const duration = contentWidth / 50;
        marqueeRef.current.style.animationDuration = `${duration}s`;
      }
    };

    setMarqueeAnimation();
    window.addEventListener('resize', setMarqueeAnimation);

    return () => {
      window.removeEventListener('resize', setMarqueeAnimation);
    };
  }, []);

  return (
    <div className="partenaire-section">
      <div className="marquee-wrapper">
        <div className="marquee-content" ref={marqueeRef}>
          <div className="marquee-items" ref={marqueeItemsRef}>
            {/* First set */}
            {images.map((image, index) => (
              <div key={`img-${index}`} className="marquee-image-wrapper">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={60}
                  className="marquee-image"
                  priority={index < 2}
                />
              </div>
            ))}
            
            {/* Duplicate set */}
            {images.map((image, index) => (
              <div key={`img-duplicate-${index}`} className="marquee-image-wrapper">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={60}
                  className="marquee-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .partenaire-section {
          width: 100%;
          overflow-x: hidden; /* Prevent horizontal scroll */
          overflow-y: visible; /* Don't interfere with vertical scroll */
          position: relative;
          z-index: 1;
        }

        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          background: #FDFBF7;
          padding: 10px 0;
          position: relative;
          transform: translateZ(0); /* Force GPU acceleration */
          will-change: transform;
        }

        .marquee-content {
          display: flex;
          width: max-content;
          animation: scroll linear infinite;
          backface-visibility: hidden; /* Prevent flickering */
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
        }

        .marquee-items {
          display: flex;
          align-items: center;
          flex-shrink: 0; /* Prevent shrinking */
        }

        .marquee-image-wrapper {
          margin: 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0; /* Prevent shrinking */
        }

        .marquee-image {
          height: 60px;
          width: auto;
          object-fit: contain;
          display: block; /* Remove extra space */
        }

        /* Pause on hover - but only if not on mobile */
        @media (hover: hover) {
          .marquee-wrapper:hover .marquee-content {
            animation-play-state: paused;
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .marquee-wrapper {
            padding: 8px 0;
          }
          
          .marquee-image-wrapper {
            margin: 0 12px;
          }
          
          .marquee-image {
            height: 40px;
          }
        }

        /* Prevent scroll interference on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .marquee-content {
            animation-play-state: running !important;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Partenaire;