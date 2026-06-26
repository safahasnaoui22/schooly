"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full"
      />

      <p className="absolute mt-32 text-lg font-semibold text-green-700">
        Chargement...
      </p>
    </div>
  );
}