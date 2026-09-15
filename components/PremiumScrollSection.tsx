'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PremiumScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export function PremiumScrollSection({
  children,
  className = '',
  height = '160vh',
}: PremiumScrollSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative ${className}`}
      style={{
        minHeight: height,
      }}
    >
      <div className="sticky top-0 min-h-screen overflow-hidden">
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}