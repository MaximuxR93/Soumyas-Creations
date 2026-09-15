'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useActiveChapter } from '@/hooks/useScrollExperience';

const chapters = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'categories', label: 'Categories' },
  { id: 'story', label: 'Story' },
  { id: 'instagram', label: 'Moments' },
];

export function ScrollChapter() {
  const activeChapter = useActiveChapter();
  const shouldReduceMotion = useReducedMotion();

  const scrollToChapter = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <motion.nav
      aria-label="Page sections"
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, x: 12 }
      }
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.7,
        delay: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        fixed
        right-5
        lg:right-8
        top-1/2
        -translate-y-1/2
        z-40
        hidden
        md:flex
        flex-col
        items-end
        gap-3
      "
    >
      {chapters.map((chapter, index) => {
        const isActive = activeChapter === chapter.id;

        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollToChapter(chapter.id)}
            aria-label={`Go to ${chapter.label}`}
            className="
              group
              flex
              items-center
              gap-2
              py-1
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-terracotta
              rounded
            "
          >
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : 4,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.25,
              }}
              className="
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-espresso
                font-medium
              "
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>

            <motion.span
              animate={{
                width: isActive ? 22 : 6,
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                h-[1px]
                bg-terracotta
                block
              "
            />

            <span
              className="
                absolute
                right-0
                w-20
                h-5
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-200
              "
            />

            <span
              className={`
                text-[9px]
                uppercase
                tracking-[0.16em]
                transition-all
                duration-300
                ${
                  isActive
                    ? 'text-espresso'
                    : 'text-espresso-subtle group-hover:text-espresso'
                }
              `}
            >
              {chapter.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}