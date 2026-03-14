"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}: AnimatedSectionProps) {
  
  const getInitialPosition = () => {
    switch(direction) {
      case "up": return { opacity: 0, y: 50 };
      case "down": return { opacity: 0, y: -50 };
      case "left": return { opacity: 0, x: 50 };
      case "right": return { opacity: 0, x: -50 };
      case "none": return { opacity: 0 };
      default: return { opacity: 0, y: 50 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoothness
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}