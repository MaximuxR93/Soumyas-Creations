'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from 'motion/react';
import { ArrowRight, X } from 'lucide-react';

import { bakeryConfig } from '@/config/bakery';

export function StorySection() {
  const [isFullStoryOpen, setIsFullStoryOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="story"
      aria-label="The Story of Soumya Chakroborty Bakery"
      className="py-16 sm:py-24 lg:py-32 bg-ivory-warm border-y border-oat-dark"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* =====================================================
            MAIN STORY CONTENT
        ===================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          whileInView={{ opacity: 1 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >

          {/* =================================================
              LEFT — EDITORIAL IMAGE
          ================================================= */}

          <motion.div
            className="lg:col-span-6 relative"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    x: -28,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="
                relative
                w-full
                aspect-[4/4.4]
                sm:aspect-[4/3.8]
                lg:aspect-[4/4.5]
                rounded-[24px]
                sm:rounded-[32px]
                overflow-hidden
                bg-oat
                border
                border-oat-dark
                shadow-sm
              "
            >
              {/* Image */}
              <motion.div
                className="absolute inset-0"
                initial={
                  shouldReduceMotion
                    ? { scale: 1 }
                    : { scale: 1.04 }
                }
                whileInView={{ scale: 1 }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src="/images/story/soumya.jpg"
                  alt="Flour dusted wooden kitchen counter, eggs, and baking tools in morning sunlight"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Image gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />

              {/* =================================================
                  IMAGE LABEL
              ================================================= */}

              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : {
                        opacity: 0,
                        y: 12,
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
                  duration: 0.7,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  sm:bottom-6
                  sm:left-6
                  sm:right-6
                  p-4
                  rounded-2xl
                  bg-ivory/95
                  backdrop-blur-md
                  border
                  border-oat-dark/70
                "
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-terracotta font-semibold block mb-0.5">
                  THE KITCHEN COUNTER
                </span>

                <p className="font-serif text-sm sm:text-base text-espresso">
                  Small-batch, artisanal preparation in Salt Lake, Kolkata.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT — STORY CONTENT
          ================================================= */}

          <motion.div
            className="lg:col-span-6 flex flex-col justify-center text-left"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    x: 28,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.85,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* =================================================
                EYEBROW
            ================================================= */}

            <div className="flex items-center space-x-2.5 mb-4">
              <span className="w-5 h-[1px] bg-terracotta inline-block" />

              <span className="text-[11px] uppercase tracking-[0.24em] text-terracotta font-semibold">
                THE STORY
              </span>
            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.65rem] leading-[1.15] text-espresso font-normal tracking-[-0.01em] mb-6">
              Made at home.
              <br />
              <span className="italic text-terracotta-dark">
                Made with intention.
              </span>
            </h2>

            {/* =================================================
                NARRATIVE
            ================================================= */}

            <div className="space-y-4 text-sm sm:text-base text-espresso-muted leading-relaxed font-normal">
              <p>
                <strong className="font-medium text-espresso">
                  {bakeryConfig.name}
                </strong>{' '}
                is a home bakery built around the simple joy of making
                something special from scratch.
              </p>

              <p>
                What began as baking for family birthdays and quiet Sunday
                teas in Kolkata grew into an intimate studio dedicated to
                honest flavours. There are no industrial mixers, artificial
                cake premixes, or mass-produced sponges here.
              </p>

              <p>
                Every cake, brownie tray, and cookie tin is hand-measured,
                beaten, and frosted only after your order is confirmed.
                When you order from us, your dessert is baked specifically
                for your table.
              </p>
            </div>

            {/* =================================================
                CORE VALUES
            ================================================= */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 12 }
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
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                gap-3
                my-8
                pt-6
                border-t
                border-oat-dark
              "
            >
              {/* Value 01 */}
              <div>
                <span className="text-[10.5px] uppercase tracking-wider text-terracotta font-bold block mb-0.5">
                  01 • Honest Sourcing
                </span>

                <span className="text-xs text-espresso-light leading-snug block">
                  Pure dairy butter, real cocoa & vanilla pods
                </span>
              </div>

              {/* Value 02 */}
              <div>
                <span className="text-[10.5px] uppercase tracking-wider text-terracotta font-bold block mb-0.5">
                  02 • Handcrafted
                </span>

                <span className="text-xs text-espresso-light leading-snug block">
                  Wipped and decorated by hand, no shortcuts
                </span>
              </div>

              {/* Value 03 */}
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10.5px] uppercase tracking-wider text-terracotta font-bold block mb-0.5">
                  03 • Personal Care
                </span>

                <span className="text-xs text-espresso-light leading-snug block">
                  Custom dietary and hand-piped wishes
                </span>
              </div>
            </motion.div>

            {/* =================================================
                STORY CTA
            ================================================= */}

            <div>
              <motion.button
                onClick={() => setIsFullStoryOpen(true)}
                id="read-our-story-btn"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { x: 2 }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : { scale: 0.97 }
                }
                transition={{
                  duration: 0.2,
                }}
                className="
                  inline-flex
                  items-center
                  space-x-2
                  text-sm
                  font-medium
                  text-espresso
                  hover:text-terracotta
                  group
                  py-1.5
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-terracotta
                "
              >
                <span className="border-b border-espresso group-hover:border-terracotta transition-colors pb-0.5">
                  Read Our Story
                </span>

                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { x: 0 }
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { x: 4 }
                  }
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </div>

          </motion.div>
        </motion.div>
      </div>

      {/* =====================================================
          FULL STORY MODAL
      ===================================================== */}

      <AnimatePresence>
        {isFullStoryOpen && (
          <motion.div
            id="full-story-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
            className="
              fixed
              inset-0
              z-50
              bg-espresso/55
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
              sm:p-6
              overflow-y-auto
            "
            onClick={() => setIsFullStoryOpen(false)}
          >
            {/* =================================================
                MODAL PANEL
            ================================================= */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 20,
                      scale: 0.97,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 12,
                      scale: 0.985,
                    }
              }
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                w-full
                max-w-2xl
                bg-ivory
                rounded-[28px]
                sm:rounded-[32px]
                border
                border-oat-dark
                p-6
                sm:p-10
                shadow-2xl
                my-auto
                max-h-[90vh]
                overflow-y-auto
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* =================================================
                  CLOSE BUTTON
              ================================================= */}

              <motion.button
                onClick={() => setIsFullStoryOpen(false)}
                id="story-modal-close-btn"
                aria-label="Close story"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: 4,
                        scale: 1.05,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.92,
                      }
                }
                className="
                  absolute
                  top-5
                  right-5
                  p-2
                  rounded-full
                  border
                  border-oat-dark
                  text-espresso-muted
                  hover:text-espresso
                  hover:bg-oat
                  transition-colors
                "
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* =================================================
                  MODAL CONTENT
              ================================================= */}

              <span className="text-[11px] uppercase tracking-[0.24em] text-terracotta font-semibold block mb-2">
                A LETTER FROM SOUMYA
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl text-espresso font-medium mb-6 leading-tight">
                Baking with heart, memory, and patience.
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-espresso-muted leading-relaxed font-normal">
                <p>
                  Growing up in Kolkata, the kitchen was always the true
                  center of celebration. The arrival of winter meant the
                  comforting scent of cardamom, dates, and slow-boiled milk.
                  Later, discovering European pastry techniques showed me
                  that the very best bakes rely on a few uncomplicated
                  truths: generous patience, true butter, and respect for
                  temperature.
                </p>

                <p>
                  When I founded this home bakery, the promise was
                  straightforward: we would never freeze cakes in advance
                  to chase high-volume sales. If you order a cake for
                  Thursday 4:00 PM, the sponges are baked fresh that
                  morning and frosted with ganache whipped right before
                  packaging.
                </p>

                <p>
                  From our custom Korean-style bento cakes for quiet
                  two-person celebrations to full-tiered chocolate truffle
                  centerpieces and our seasonal Nolen Gur tea cakes, each
                  recipe is tuned to familiar, comforting sweetness without
                  artificial additives.
                </p>

                <p className="pt-3 font-serif text-base sm:text-lg text-espresso italic">
                  Thank you for inviting our bakes into your homes and
                  birthdays.
                  <br />

                  <span className="not-italic text-sm font-sans font-medium text-terracotta block mt-1">
                    — Soumya Chakroborty, Kolkata
                  </span>
                </p>
              </div>

              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div className="
                mt-8
                pt-6
                border-t
                border-oat-dark
                flex
                items-center
                justify-between
                gap-4
              ">
                <span className="text-xs text-espresso-subtle">
                  Home studio located in Salt Lake, Kolkata.
                </span>

                <motion.button
                  onClick={() => setIsFullStoryOpen(false)}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -1 }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.96 }
                  }
                  className="
                    px-5
                    py-2
                    rounded-full
                    bg-espresso
                    text-ivory
                    text-xs
                    font-medium
                    hover:bg-espresso-light
                    transition-colors
                    shrink-0
                  "
                >
                  Close Story
                </motion.button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}