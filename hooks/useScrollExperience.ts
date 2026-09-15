'use client';

import { useEffect, useState } from 'react';
import { useScroll, useSpring, useTransform } from 'motion/react';

export function useScrollExperience() {
  const { scrollYProgress } = useScroll();

  /*
   * Smooth the raw scroll value.
   * This prevents the UI from feeling twitchy when the user
   * moves the mouse wheel quickly.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.25,
  });

  /*
   * Used for the subtle hero movement.
   */
  const heroScale = useTransform(
    smoothProgress,
    [0, 0.18],
    [1, 1.045]
  );

  const heroY = useTransform(
    smoothProgress,
    [0, 0.18],
    [0, 35]
  );

  const heroOpacity = useTransform(
    smoothProgress,
    [0, 0.14],
    [1, 0.72]
  );

  return {
    scrollYProgress: smoothProgress,
    heroScale,
    heroY,
    heroOpacity,
  };
}

/**
 * Returns the currently visible homepage chapter.
 */
export function useActiveChapter() {
  const [activeChapter, setActiveChapter] = useState('home');

  useEffect(() => {
    const sections = [
      'home',
      'menu',
      'categories',
      'story',
      'instagram',
      'footer',
    ];

    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);

      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveChapter(id);
          }
        },
        {
          threshold: 0.35,
          rootMargin: '-15% 0px -50% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return activeChapter;
}