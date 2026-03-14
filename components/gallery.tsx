// gallery.tsx
import React from 'react';

const Gallery = () => {
  const images = [
    {
      id: 1,
      src: "https://i.pinimg.com/736x/2e/07/e2/2e07e2c5bb09561035659bcb856f326f.jpg",
      alt: "safa"
    },
    {
      id: 2,
      src: "https://i.pinimg.com/736x/9e/fc/d8/9efcd8df7e43d4c57eb59d4992517ce8.jpg",
      alt: "safa"
    },
    {
      id: 3,
      src: "https://i.pinimg.com/1200x/79/4e/c7/794ec7afbdf347b8ed68c29a835ae3f0.jpg",
      alt: "safa"
    },
    {
      id: 4,
      src: "https://i.pinimg.com/736x/24/a3/af/24a3af682a1ce5ff90b130d68ef09ae6.jpg",
      alt: "safa"
    },
    {
      id: 5,
      src: "https://i.pinimg.com/1200x/7e/e6/b2/7ee6b2d2e3059366b1d8523df55ceed2.jpg",
      alt: "safa"
    },
    {
      id: 6,
      src: "https://i.pinimg.com/736x/bd/72/ab/bd72abb5894ce3b349213887eb9d03bd.jpg",
      alt: "safa"
    },
    {
      id: 7,
      src: "https://i.pinimg.com/736x/ba/f5/1e/baf51ee4aee9651495bb86365fd78ffa.jpg",
      alt: "safa"
    },
    {
      id: 8,
      src: "https://i.pinimg.com/736x/20/82/10/208210c2ed8284b28deff4e8be23cba0.jpg",
      alt: "safa"
    },
    {
      id: 9,
      src: "https://i.pinimg.com/736x/4b/43/88/4b4388256b1cd4324efb4153fc1c84d6.jpg",
      alt: "safa"
    },
    {
      id: 10,
      src: "https://i.pinimg.com/736x/f9/bf/3d/f9bf3db0089096ffbf3173952772dca4.jpg",
      alt: "safa"
    },
    {
      id: 11,
      src: "https://i.pinimg.com/736x/f4/64/f3/f464f39a7142b1e1430b76a7d7e6452a.jpg",
      alt: "safa"
    },
    {
      id: 12,
      src: "https://i.pinimg.com/736x/97/d5/3e/97d53e0a0574ddcd3a66a7e5aa7d2a7a.jpg",
      alt: "safa"
    }
  ];

  return (
    <>
      <style jsx>{`
        .gallery {
          height: 90vh;
  background: linear-gradient(135deg, #1e3c72 0%, #5786dc 50%, #ffffff 100%);

          position: relative;
          overflow: hidden;
        }

        .anim-3d-gallery-wrapper {
          width: 100%;
          height: 100%;
          margin-top: 32px;
          aspect-ratio: 16/9;
          overflow: hidden;
          position: relative;
        }

        .anim-3d-gallery-card {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotateY(calc((var(--position) - 1) * (360deg / var(--qty)))) translateZ(23vw);
        }

        .anim-3d-gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .anim-3d-gallery-wrap {
          position: absolute;
          transform-style: preserve-3d;
          aspect-ratio: 3 / 4;
          width: 100%;
          max-width: 12%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) perspective(22vw) scale(2) rotateY(0);
          animation: rotation3dcardZoom 60s linear infinite;
        }

        @keyframes rotation3dcardNormal {
          0% {
            transform: translate(-50%, -50%) perspective(22vw) rotateY(0);
          }
          100% {
            transform: translate(-50%, -50%) perspective(22vw) rotateY(360deg);
          }
        }
        
        @keyframes rotation3dcardZoom {
          0% {
            transform: translate(-50%, -50%) perspective(22vw) scale(2) rotateY(0);
          }
          100% {
            transform: translate(-50%, -50%) perspective(22vw) scale(2) rotateY(360deg);
          }
        }
      `}</style>

      <div className="gallery">
        {/* Add the missing wrapper div */}
        <div className="anim-3d-gallery-wrapper">
          <div className="anim-3d-gallery-wrap" style={{ '--qty': images.length } as React.CSSProperties}>
            {images.map((image, index) => (
              <div 
                key={image.id}
                className="anim-3d-gallery-card" 
                style={{ '--position': index + 1 } as React.CSSProperties}
              >
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;