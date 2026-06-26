"use client";

import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import Swiper modules
import { Autoplay, Navigation } from 'swiper/modules';

const HistoryCarousel = () => {
  const swiperRef = useRef<any>(null);
  const fixedTitleRef = useRef<HTMLDivElement>(null);
  const fixedInfoRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Define updateSlideContent function first
    const updateSlideContent = () => {
      const activeSlide = document.querySelector(".swiper-slide-active");
      if (!activeSlide) return;

      const slideLink = activeSlide.querySelector("a")?.getAttribute("href") || "#";
      const slideTitle = activeSlide.querySelector("h1")?.textContent || "";
      const slideSubtitle = activeSlide.querySelector("h2")?.textContent || "";
      const additionalInfo = activeSlide.querySelector(".additional-info")?.innerHTML || "";

      const fixedTitle = fixedTitleRef.current;
      const fixedInfo = fixedInfoRef.current;

      if (fixedTitle) {
        const slideLinkElement = fixedTitle.querySelector("a");
        const slideTitleElement = fixedTitle.querySelector("h1");
        const slideSubtitleElement = fixedTitle.querySelector("h2");

        if (slideLinkElement) slideLinkElement.setAttribute("href", slideLink);
        if (slideTitleElement) slideTitleElement.textContent = slideTitle;
        if (slideSubtitleElement) {
          slideSubtitleElement.textContent = slideSubtitle;
          slideSubtitleElement.setAttribute("data-title", slideSubtitle);
        }
      }

      if (fixedInfo) {
        fixedInfo.innerHTML = additionalInfo;
      }
    };

    // Initialize Swiper only when section is visible
    if (isVisible && !swiperRef.current) {
      // Register Swiper modules
      Swiper.use([Autoplay, Navigation]);

      const swiper = new Swiper(".slider-carousel", {
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: true,
        loopedSlides: 7,
        simulateTouch: true,
        grabCursor: true,
        touchRatio: 1,
        mousewheel: {
          invert: false,
        },
        breakpoints: {
          640: {
            spaceBetween: 60,
          },
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          stopOnLastSlide: false,
        },
        navigation: {
          nextEl: '.slider-carousel-next',
          prevEl: '.slider-carousel-prev',
        },
        on: {
          init: function () {
            console.log('Swiper initialized with autoplay (3 seconds)');
            updateSlideContent();

            setTimeout(() => {
              fixedTitleRef.current?.classList.add("eltdf-fixed-title-animate-in");
              fixedInfoRef.current?.classList.add("eltdf-fixed-info-animate-in");
            }, 300);
          },
          slideChangeTransitionStart: function () {
            fixedTitleRef.current?.classList.remove("eltdf-fixed-title-animate-in");
            fixedInfoRef.current?.classList.remove("eltdf-fixed-info-animate-in");

            setTimeout(() => {
              updateSlideContent();
            }, 700);

            setTimeout(() => {
              fixedTitleRef.current?.classList.add("eltdf-fixed-title-animate-in");
              fixedInfoRef.current?.classList.add("eltdf-fixed-info-animate-in");
            }, 800);
          }
        }
      });

      swiperRef.current = swiper;

      // Safely start autoplay if available
      setTimeout(() => {
        if (swiperRef.current && swiperRef.current.autoplay) {
          try {
            swiperRef.current.autoplay.start();
          } catch (error) {
            console.log('Autoplay start error:', error);
          }
        }
      }, 1000);
    }

    // Destroy Swiper when section is not visible
    if (!isVisible && swiperRef.current) {
      try {
        if (swiperRef.current.autoplay) {
          swiperRef.current.autoplay.stop();
        }
      } catch (error) {
        console.log('Autoplay stop error:', error);
      }
      swiperRef.current.destroy();
      swiperRef.current = null;
    }

    return () => {
      if (swiperRef.current) {
        try {
          if (swiperRef.current.autoplay) {
            swiperRef.current.autoplay.stop();
          }
        } catch (error) {
          console.log('Autoplay cleanup error:', error);
        }
        swiperRef.current.destroy();
        swiperRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <div ref={sectionRef}>
      <style jsx>{`
        .slider-carousel-holder {
          position: relative;
          height: 100vh;
          padding-left: 15%;
          display: flex;
          align-items: center;
          overflow: hidden;
          opacity: ${isVisible ? 1 : 0};
          transition: opacity 0.5s ease;
        }

        .slider-carousel :global(.swiper-slide) {
          width: 50% !important;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .slider-carousel :global(.swiper-slide-active) {
          opacity: 1;
        }

        .slider-carousel-navigation {
          display: none !important;
        }

        .slider-carousel-next,
        .slider-carousel-prev {
          position: static !important;
          margin: 5px 0 !important;
          cursor: pointer;
        }

        :global(.swiper) {
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          list-style: none;
          padding: 0;
          z-index: 1;
          width: 100%;
          height: auto;
          left: 130px;
        }

        :global(.swiper-wrapper) {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          transition-property: transform;
          box-sizing: content-box;
        }

        :global(.swiper-slide) {
          -webkit-flex-shrink: 0;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          width: 100%;
          height: 100%;
          position: relative;
          transition-property: transform;
          transform: scale(0.85);
          transition: transform 0.6s ease;
        }

        :global(.swiper-slide-active) {
          transform: scale(1);
        }

        .slider-carousel-holder :global(.swiper) {
          width: 100%;
          height: auto;
          left: 130px;
        }

        .slider-carousel-holder.eltdf-slider-nav-disabled .slider-carousel-navigation {
          display: none;
        }

        .slider-carousel:before,
        .slider-carousel:after {
          content: "";
          position: absolute;
          top: 0;
          width: 180px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .slider-carousel:before {
          left: 0;
          background: linear-gradient(to right, white 0%, transparent 100%);
        }

        .slider-carousel:after {
          right: 0;
          background: linear-gradient(to left, white 0%, transparent 100%);
        }

        .slider-carousel-holder {
          position: relative;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100vh;
          padding-left: 15%;
          align-items: center;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
        }

        .slider-carousel-holder .slider-carousel-next,
        .slider-carousel-holder .slider-carousel-prev {
          margin: 0;
          height: 27px;
          font-size: 22px;
          background: 0 0;
        }

        .slider-carousel-holder .slider-carousel-next {
          margin-bottom: 10px;
        }

        .slider-carousel-navigation {
          position: fixed;
          right: 60px;
          bottom: 65px;
          z-index: 30;
        }

        .slider-carousel-navigation > * {
          position: static;
        }

        .slider-carousel :global(.swiper-wrapper) {
          transition: 1.5s cubic-bezier(0.79, 0.36, 0.29, 1.03) !important;
        }

        .slider-carousel :global(.swiper-slide) {
          position: relative;
          width: 50%;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .slider-carousel-navigation {
          position: fixed;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
        }

        .slider-carousel :global(.swiper-slide) .title {
          display: none;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          opacity: 0;
          margin-top: 15px;
          transition: opacity 0.2s ease-in-out, margin-top 0.3s ease-in-out;
        }

        .slider-carousel :global(.swiper-slide) .title a > * {
          font-size: 75px;
          margin: 0;
          padding: 0;
          font-weight: 700;
        }

        .slider-carousel :global(.swiper-slide) img {
          -o-object-fit: cover;
          object-fit: cover;
          font-family: "object-fit: cover";
          width: 100%;
          height: 450px;
          -webkit-transform: scale(1.05) translateX(20px);
          -moz-transform: scale(1.05) translateX(20px);
          transform: scale(1.05) translateX(20px);
          -webkit-transition: 1.5s 1s;
          -moz-transition: 1.5s 1s;
          transition: 1.5s 1s;
          filter: grayscale(30%);
        }

        .slider-carousel :global(.swiper-slide) .additional-info {
          display: none;
        }

        :global(.swiper-slide) img {
          transition: transform 1.5s, filter 0.6s ease;
        }

        .eltdf-sc-fixed-title h1 {
          background: linear-gradient(270deg, #0b2f4e, #0077b6, #00b4d8, #0b2f4e);
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 8s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .eltdf-sc-fixed-title h1,
        .eltdf-sc-fixed-title h2 {
          font-size: 64px;
          letter-spacing: -1px;
        }

        :global(.swiper-slide-active) img {
          filter: grayscale(0%);
        }

        :global(.swiper-slide:hover) img {
          transform: scale(1.08);
        }

        .slider-carousel :global(.swiper-slide.swiper-slide-active) img {
          -webkit-transform: scale(1) translateX(0) !important;
          -moz-transform: scale(1) translateX(0) !important;
          transform: scale(1) translateX(0) !important;
        }

        .slider-carousel :global(.swiper-slide.swiper-slide-prev) img {
          -webkit-transform: scale(1) translateX(0) !important;
          -moz-transform: scale(1) translateX(0) !important;
          transform: scale(1) translateX(0) !important;
        }

        .eltdf-sc-fixed-title {
          position: fixed;
          left: 15%;
          top: 42%;
          z-index: 1234;
          opacity: ${isVisible ? 1 : 0};
          transition: opacity 0.5s ease;
          pointer-events: ${isVisible ? 'auto' : 'none'};
        }

        .eltdf-sc-fixed-title.eltdf-fixed-title-animate-in .eltdf-sc-fixed-title-link h1,
        .eltdf-sc-fixed-title.eltdf-fixed-title-animate-in .eltdf-sc-fixed-title-link h2 {
          -webkit-transform: translateY(0);
          -moz-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
        }

        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link:hover h2:after {
          clip-path: inset(0 0 0 0);
          -webkit-clip-path: inset(0 0 0 0);
        }

        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link div {
          overflow: hidden;
        }

        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link h1,
        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link h2 {
          font-size: 70px;
          margin: 0;
          padding: 0;
          font-weight: 700;
          opacity: 0;
        }

        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link h1 {
          -webkit-transition: 0.7s 50ms cubic-bezier(0.79, 0.07, 0.43, 0.86);
          -moz-transition: 0.7s 50ms cubic-bezier(0.79, 0.07, 0.43, 0.86);
          transition: 0.7s 50ms cubic-bezier(0.79, 0.07, 0.43, 0.86);
          -webkit-transform: translateY(100%);
          -moz-transform: translateY(100%);
          transform: translateY(100%);
        }

        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link h2,
        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link h2:after {
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
          text-stroke: 1px currentColor;
          -webkit-text-stroke: 1px currentColor;
          color: currentColor;
          -webkit-text-fill-color: transparent;
          font-weight: 700 !important;
        }

        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link h2:after > *,
        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link h2 > * {
          font-weight: 700;
        }

        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link h2 {
          position: relative;
          text-stroke: 1px #0b2f4e;
          -webkit-text-stroke: 1px #0b2f4e;
          -webkit-transition: 0.7s cubic-bezier(0.79, 0.07, 0.43, 0.86);
          -moz-transition: 0.7s cubic-bezier(0.79, 0.07, 0.43, 0.86);
          transition: 0.7s cubic-bezier(0.79, 0.07, 0.43, 0.86);
          -webkit-transform: translateY(100%);
          -moz-transform: translateY(100%);
          transform: translateY(100%);
        }

        .eltdf-sc-fixed-title .eltdf-sc-fixed-title-link h2:after {
          content: attr(data-title);
          -webkit-text-fill-color: #0077b6;
          clip-path: inset(100% 0 0 0);
          -webkit-clip-path: inset(100% 0 0 0);
          -webkit-transition: 1s;
          -moz-transition: 1s;
          transition: 1s;
        }

        .eltdf-sc-fixed-info {
          position: fixed;
          bottom: 50px;
          left: 415px;
          opacity: 0;
          -webkit-transition: 0.7s cubic-bezier(0.79, 0.07, 0.43, 0.86);
          -moz-transition: 0.7s cubic-bezier(0.79, 0.07, 0.43, 0.86);
          transition: 0.7s cubic-bezier(0.79, 0.07, 0.43, 0.86);
          z-index: 2;
        }

        .eltdf-sc-fixed-info.eltdf-fixed-info-animate-in {
          opacity: 1;
        }

        .slider-carousel-holder a {
          color: #000;
          text-decoration: none;
          -webkit-transition: color 0.2s ease-out;
          -moz-transition: color 0.2s ease-out;
          transition: color 0.2s ease-out;
        }

        .shooltitle {
          text-align: center;
          font-size: 48px;
          background: linear-gradient(270deg, #0b2f4e, #0077b6, #00b4d8, #0b2f4e);
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 8s ease infinite;
          margin-top: 50px;
          margin-bottom: 30px;
          opacity: ${isVisible ? 1 : 0};
          transition: opacity 0.5s ease;
        }

        .shooltitle::after {
          content: "";
          display: block;
          width: 80px;
          height: 4px;
          background: #007aff;
          margin: 15px auto 0 auto;
          border-radius: 2px;
        }

        .history {
          font-family: 'Playfair Display', serif;
          background: #f7f7f7;
          cursor: grab;
          margin: 0;
          padding: 0;
        }

        .history::before,
        .history::after {
          content: "";
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          z-index: -1;
        }

        .history:active {
          cursor: grabbing;
        }

       .history::before {
          top: -100px;
          right: -100px;
          background: rgba(0, 119, 255, 0.15);
        }

        .history::after {
          bottom: -100px;
          left: -100px;
          background: rgba(255, 120, 0, 0.15);
        }
      `}</style>
      <div className='history'>
        <h1 className="shooltitle">Historique de l’école</h1>
        <div className="slider-carousel-holder">
          <div className="slider-carousel swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="title">
                  <a href="">
                    <h1>Notre école. 2001</h1>
                    <h2>Ouverture des portes</h2>
                  </a>
                </div>
                <img 
                  itemProp="image" 
                  src="https://i.pinimg.com/1200x/e9/ca/e6/e9cae62d172be32a477a3ec14d182d7f.jpg" 
                  alt="Notre école 2001" 
                />
              </div>

              <div className="swiper-slide">
                <div className="title">
                  <a href="https://amedeo.qodeinteractive.com/portfolio-item/and-breathe/">
                    <h1>Première promotion. 2008</h1>
                    <h2>100% réussite</h2>
                  </a>
                </div>
                <img 
                  itemProp="image" 
                  src="https://i.pinimg.com/736x/49/ca/46/49ca461d5e1dcbaba633721a79a374e6.jpg" 
                  alt="Première promotion 2008" 
                />
              </div>

              <div className="swiper-slide">
                <div className="title">
                  <a href="https://amedeo.qodeinteractive.com/portfolio-item/art-world/">
                    <h1>Prix d'excellence. 2010</h1>
                    <h2>Meilleure école de la région</h2>
                  </a>
                </div>
                <img 
                  itemProp="image" 
                  src="https://i.pinimg.com/1200x/cd/5f/43/cd5f431d8ad5d2b827fe11d0de6440a6.jpg" 
                  alt="Prix d'excellence 2010" 
                />
              </div>

              <div className="swiper-slide">
                <div className="title">
                  <a href="https://amedeo.qodeinteractive.com/portfolio-item/old-works/">
                    <h1>École numérique. 2016</h1>
                    <h2>Tablettes pour tous</h2>
                  </a>
                </div>
                <img 
                  itemProp="image" 
                  src="https://i.pinimg.com/1200x/8b/59/d3/8b59d37fc2a0008a6fadc2ab867c104a.jpg" 
                  alt="École numérique 2016" 
                />
              </div>

              <div className="swiper-slide">
                <div className="title">
                  <a href="https://amedeo.qodeinteractive.com/portfolio-item/new-mockup/">
                    <h1>25 ans. 2026</h1>
                    <h2>Fierté et excellence</h2>
                  </a>
                </div>
                <img 
                  itemProp="image" 
                  src="https://i.pinimg.com/736x/cd/66/f9/cd66f913b424b4da6b1813d09ba7f0b9.jpg" 
                  alt="25 ans 2026" 
                />
              </div>
            </div>
          </div>

          <div className="eltdf-sc-fixed-title" ref={fixedTitleRef}>
            <a className="eltdf-sc-fixed-title-link" href="#">
              <div>
                <h1>&nbsp;</h1>
              </div>
              <div>
                <h2>&nbsp;</h2>
              </div>
            </a>
          </div>

          <h6 className="eltdf-sc-fixed-info" ref={fixedInfoRef}>
            &nbsp;<br />
            &nbsp;
          </h6>

          <div className="slider-carousel-navigation">
            <div className="slider-carousel-next swiper-button-next"></div>
            <div className="slider-carousel-prev swiper-button-prev"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCarousel;