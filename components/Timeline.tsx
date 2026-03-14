'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import './Timeline.css';

// SVG Icons as separate components
const Icons = {
  Graduation: () => (
    <svg className="timeline__icon timeline__icon--default">
      <use href="#icon-graduation" />
    </svg>
  ),
  GraduationActive: () => (
    <svg className="timeline__icon timeline__icon--active">
      <use href="#icon-graduation" />
    </svg>
  ),
  Book: () => (
    <svg className="timeline__icon timeline__icon--default">
      <use href="#icon-book" />
    </svg>
  ),
  BookActive: () => (
    <svg className="timeline__icon timeline__icon--active">
      <use href="#icon-book" />
    </svg>
  ),
  Pencil: () => (
    <svg className="timeline__icon timeline__icon--default">
      <use href="#icon-pencil" />
    </svg>
  ),
  PencilActive: () => (
    <svg className="timeline__icon timeline__icon--active">
      <use href="#icon-pencil" />
    </svg>
  ),
  Microscope: () => (
    <svg className="timeline__icon timeline__icon--default">
      <use href="#icon-microscope" />
    </svg>
  ),
  MicroscopeActive: () => (
    <svg className="timeline__icon timeline__icon--active">
      <use href="#icon-microscope" />
    </svg>
  ),
  Laptop: () => (
    <svg className="timeline__icon timeline__icon--default">
      <use href="#icon-laptop" />
    </svg>
  ),
  LaptopActive: () => (
    <svg className="timeline__icon timeline__icon--active">
      <use href="#icon-laptop" />
    </svg>
  ),
  Diploma: () => (
    <svg className="timeline__icon timeline__icon--default">
      <use href="#icon-diploma" />
    </svg>
  ),
  DiplomaActive: () => (
    <svg className="timeline__icon timeline__icon--active">
      <use href="#icon-diploma" />
    </svg>
  ),
};

const timelineSteps = [
  {
    id: 'enroll',
    title: ['Enroll &', 'orient'],
    icon: <Icons.Graduation />,
    iconActive: <Icons.GraduationActive />,
    slide: {
      title: '🎯 Enroll & orientation',
      content:
        'Welcome to the first step! Choose your major, meet academic advisors, and build your study plan. Orientation helps you navigate campus life and digital learning tools.',
    },
  },
  {
    id: 'core',
    title: ['Core', 'courses'],
    icon: <Icons.Book />,
    iconActive: <Icons.BookActive />,
    slide: {
      title: '📚 Core courses',
      content:
        'Foundational classes in mathematics, sciences, and humanities. These courses build critical thinking and prepare you for upper‑division subjects.',
    },
  },
  {
    id: 'assignments',
    title: ['Assignments', '& labs'],
    icon: <Icons.Pencil />,
    iconActive: <Icons.PencilActive />,
    slide: {
      title: '✏️ Assignments & labs',
      content:
        'Hands‑on projects, problem sets, and lab sessions. Apply theoretical knowledge, work in teams, and get feedback from instructors.',
    },
  },
  {
    id: 'research',
    title: ['Research', 'project'],
    icon: <Icons.Microscope />,
    iconActive: <Icons.MicroscopeActive />,
    slide: {
      title: '🔬 Research project',
      content:
        'Conduct independent or guided research. Formulate hypotheses, analyze data, and present findings — a cornerstone of academic growth.',
    },
  },
  {
    id: 'electives',
    title: ['Online', 'electives'],
    icon: <Icons.Laptop />,
    iconActive: <Icons.LaptopActive />,
    slide: {
      title: '💻 Online electives',
      content:
        'Explore interdisciplinary topics: from data science to creative writing. Flexible online modules let you customize your degree.',
    },
  },
  {
    id: 'graduation',
    title: ['Graduation', '& beyond'],
    icon: <Icons.Diploma />,
    iconActive: <Icons.DiplomaActive />,
    slide: {
      title: '🎓 Graduation & beyond',
      content:
        'Complete your capstone, celebrate commencement, and step into your career. Alumni networks and career services support your future.',
    },
  },
];

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [containerHeight, setContainerHeight] = React.useState(0);

  // DOM class names (matching original)
  const DOM = {
    timelineStepActive: 'is-active',
    timelineStepActiveMarker: 'timeline__step-active-marker',
    timelineSlideActive: 'is-active',
  };

  const STEP_ACTIVE_MARKER_CUSTOM_PROPS = {
    width: '--slide-width',
    posX: '--slide-pos-x',
    posY: '--slide-pos-y',
  };

  const SLIDES_CONTAINER_CUSTOM_PROPS = {
    height: '--slides-container-height',
  };

  // Get step active marker position
  const getStepActiveMarkerPosY = useCallback(() => {
    const stepTitles = document.querySelectorAll('.timeline__step-title');
    if (stepTitles.length === 0 || !stepperRef.current) return null;
    const titlePos = stepTitles[0]?.getBoundingClientRect().top;
    const stepperPos = stepperRef.current.getBoundingClientRect().top;
    if (titlePos === undefined || stepperPos === undefined) return null;
    return titlePos - stepperPos;
  }, []);

  const getStepActiveMarkerPosX = useCallback(
    (currentStep: Element) => {
      if (!stepperRef.current) return null;
      const stepperLeft = stepperRef.current.getBoundingClientRect().left;
      const stepLeft = currentStep.getBoundingClientRect().left;
      return stepLeft - stepperLeft;
    },
    []
  );

  const getElementWidth = (elem: Element) => elem.clientWidth;

  const getStepActiveMarkerProps = useCallback(() => {
    const currentStep = document.querySelectorAll('.timeline__step')[activeStep];
    if (!currentStep) return null;

    const width = getElementWidth(currentStep);
    const posX = getStepActiveMarkerPosX(currentStep);
    const posY = getStepActiveMarkerPosY();
    if (posX === null || posY === null) return null;
    return { posX, posY, width };
  }, [activeStep, getStepActiveMarkerPosX, getStepActiveMarkerPosY]);

  const setStepActiveMarkerProps = useCallback(
    ({
      stepActiveMarker,
      posX,
      posY,
      width,
    }: {
      stepActiveMarker: HTMLElement;
      posX: number;
      posY: number;
      width: number;
    }) => {
      stepActiveMarker.style.setProperty(STEP_ACTIVE_MARKER_CUSTOM_PROPS.width, width + 'px');
      stepActiveMarker.style.setProperty(STEP_ACTIVE_MARKER_CUSTOM_PROPS.posX, posX + 'px');
      stepActiveMarker.style.setProperty(STEP_ACTIVE_MARKER_CUSTOM_PROPS.posY, posY + 'px');
    },
    []
  );

  const recalcStepActiveMarkerProps = useCallback(() => {
    if (!markerRef.current) return;
    const props = getStepActiveMarkerProps();
    if (props) setStepActiveMarkerProps({ stepActiveMarker: markerRef.current, ...props });
  }, [getStepActiveMarkerProps, setStepActiveMarkerProps]);

  // Create marker on mount
  useEffect(() => {
    if (!stepperRef.current || markerRef.current) return;

    const marker = document.createElement('div');
    marker.classList.add(DOM.timelineStepActiveMarker);
    stepperRef.current.appendChild(marker);
    markerRef.current = marker;

    const props = getStepActiveMarkerProps();
    if (props) setStepActiveMarkerProps({ stepActiveMarker: marker, ...props });
  }, [getStepActiveMarkerProps, setStepActiveMarkerProps, DOM.timelineStepActiveMarker]);

  // Update container height based on active slide
  useEffect(() => {
    const activeSlide = document.querySelector('.timeline__slide.is-active');
    if (activeSlide && slidesContainerRef.current) {
      const height = activeSlide.clientHeight;
      setContainerHeight(height);
      slidesContainerRef.current.style.setProperty(
        SLIDES_CONTAINER_CUSTOM_PROPS.height,
        height + 'px'
      );
    }
  }, [activeStep]);

  // Handle step click
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    // Update marker position after state change
    setTimeout(() => {
      recalcStepActiveMarkerProps();
    }, 0);
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      recalcStepActiveMarkerProps();
      const activeSlide = document.querySelector('.timeline__slide.is-active');
      if (activeSlide && slidesContainerRef.current) {
        slidesContainerRef.current.style.setProperty(
          SLIDES_CONTAINER_CUSTOM_PROPS.height,
          activeSlide.clientHeight + 'px'
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [recalcStepActiveMarkerProps]);

  return (
    <>
      {/* SVG Definitions */}
      <svg aria-hidden="true" focusable="false" style={{ width: 0, height: 0, position: 'absolute' }}>
        <linearGradient id="icon-gradient-education" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6a4ff0" />
          <stop offset="100%" stopColor="#2f80ed" />
        </linearGradient>
        <defs>
          <symbol id="icon-graduation" viewBox="0 0 64 64">
            <path d="M52 30.5V42c0 .8-.4 1.5-1.1 1.8L33 52.8c-1.2.6-2.8.6-4 0l-18-9c-.7-.3-1-1-1-1.8v-11l-2.5-1.2c-1.3-.6-1.3-2.4 0-3L31 16.2c1.2-.6 2.8-.6 4 0l21 10.5c1.3.6 1.3 2.4 0 3L52 30.5zm-20 9L16 32v8.5l14 7 14-7V32l-12 5.5c-.6.3-1.4.3-2 0z" />
          </symbol>
          <symbol id="icon-book" viewBox="0 0 64 64">
            <path d="M20 12c-4 0-8 2-8 6v28c0 4 4 6 8 6h30V16H20c-2 0-4-1-4-2s2-2 4-2h28V8H20c-4 0-8 2-8 6v32c0 4 4 6 8 6h32V12H20z" />
            <circle cx="26" cy="24" r="2" />
            <circle cx="26" cy="34" r="2" />
            <circle cx="26" cy="44" r="2" />
            <path d="M38 24h8v2h-8zM38 34h8v2h-8zM38 44h8v2h-8z" />
          </symbol>
          <symbol id="icon-pencil" viewBox="0 0 64 64">
            <path d="M47.2 10.2l-4.8 4.8 8.6 8.6 4.8-4.8c1.6-1.6 1.6-4.2 0-5.8l-2.8-2.8c-1.6-1.6-4.2-1.6-5.8 0zM39 18.4L16 41.4V48h6.6l23-23-6.6-6.6z" />
          </symbol>
          <symbol id="icon-microscope" viewBox="0 0 64 64">
            <path d="M40 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-8 8l-8 20h16l-8-20zm8 24v8h-8v-8h8z" />
            <path d="M20 52h24v4H20zM48 36c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
          </symbol>
          <symbol id="icon-laptop" viewBox="0 0 64 64">
            <path d="M52 16H12c-2.2 0-4 1.8-4 4v24h48V20c0-2.2-1.8-4-4-4zM8 48v4c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4v-4H8z" />
          </symbol>
          <symbol id="icon-diploma" viewBox="0 0 64 64">
            <path d="M48 8H16c-4 0-8 4-8 8v24c0 4 4 8 8 8h12l4 6 4-6h12c4 0 8-4 8-8V16c0-4-4-8-8-8zM20 24h24v4H20v-4zm0 8h24v4H20v-4z" />
          </symbol>
        </defs>
      </svg>

      <header className="header">
        <h1 className="header__title">🎓 Education path · timeline</h1>
      </header>

      <div className="content">
        <div className="container">
          <div className="timeline" ref={timelineRef}>
            <div className="timeline__stepper" ref={stepperRef}>
              {timelineSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`timeline__step ${index === activeStep ? DOM.timelineStepActive : ''}`}
                  onClick={() => handleStepClick(index)}
                >
                  {step.icon}
                  {step.iconActive}
                  <p className="timeline__step-title">
                    {step.title[0]} <br />
                    {step.title[1]}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="timeline__slides"
              ref={slidesContainerRef}
              style={{ height: containerHeight ? `${containerHeight}px` : 'auto' }}
            >
              {timelineSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`timeline__slide ${index === activeStep ? DOM.timelineSlideActive : ''}`}
                >
                  <h3 className="timeline__slide-title">{step.slide.title}</h3>
                  <div className="timeline__slide-content">
                    <p>{step.slide.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;