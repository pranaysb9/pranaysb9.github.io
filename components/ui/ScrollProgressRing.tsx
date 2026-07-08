"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollProgressRing() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      if (scrollHeight > 0) {
        setProgress(currentScroll / scrollHeight);
      }
      
      // Show button after scrolling down 300px
      setIsVisible(currentScroll > 300);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 group flex h-14 w-14 items-center justify-center rounded-full bg-surface/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl border border-line transition-transform hover:scale-105 active:scale-95"
          aria-label="Scroll to top"
        >
          {/* SVG Ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90 transform text-ink" viewBox="0 0 60 60">
            {/* Background ring */}
            <circle
              className="text-line opacity-50"
              strokeWidth="2"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="30"
              cy="30"
            />
            {/* Progress ring */}
            <circle
              className="text-ink transition-all duration-300 ease-out"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="30"
              cy="30"
            />
          </svg>
          <ArrowUp size={20} className="text-ink opacity-70 transition-opacity group-hover:opacity-100" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
