"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (pathname) {
      setTransitioning(true);
      
      // Animate out
      gsap.to(".page-content", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setDisplayChildren(children);
          
          // Animate in
          gsap.fromTo(".page-content", 
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.6, 
              ease: "power2.out",
              onComplete: () => setTransitioning(false)
            }
          );
        }
      });
    }
  }, [pathname, children]);

  return (
    <div className={`page-content ${styles.pageContent}`}>
      {displayChildren}
      {transitioning && <div className={styles.transitionOverlay} />}
    </div>
  );
}