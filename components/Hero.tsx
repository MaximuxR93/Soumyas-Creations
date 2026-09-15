'use client';

import React from 'react';
import Image from 'next/image';

import {
  motion,
  useReducedMotion,
  Variants,
} from 'motion/react';

import {
  MessageCircle,
  ArrowDown,
  Sparkles,
} from 'lucide-react';

import { bakeryConfig } from '@/config/bakery';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Welcome to Soumya Chakroborty Bakery"
      className="
        relative
        h-screen
        overflow-hidden
        bg-ivory
      "
    >
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* ==================================================
                LEFT CONTENT
            =================================================== */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="
                lg:col-span-6
                flex
                flex-col
                justify-center
                text-left
              "
            >

              {/* Eyebrow */}

              <motion.div
                variants={itemVariants}
                className="
                  flex
                  items-center
                  space-x-2.5
                  mb-5
                "
              >
                <span className="
                  w-6
                  h-[1px]
                  bg-terracotta/70
                  inline-block
                " />

                <span className="
                  text-[11px]
                  sm:text-xs
                  uppercase
                  tracking-[0.26em]
                  text-terracotta
                  font-semibold
                ">
                  HOME BAKED WITH LOVE
                </span>
              </motion.div>

              {/* Heading */}

              <motion.h1
                variants={itemVariants}
                className="
                  font-serif
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[4.1rem]
                  leading-[1.08]
                  tracking-[-0.02em]
                  text-espresso
                  mb-6
                "
              >
                Sweet moments,
                <br />

                <span className="
                  italic
                  font-normal
                  text-terracotta-dark
                ">
                  made at home.
                </span>
              </motion.h1>

              {/* Description */}

              <motion.p
                variants={itemVariants}
                className="
                  text-base
                  sm:text-lg
                  text-espresso-muted
                  leading-relaxed
                  max-w-xl
                  mb-9
                  font-normal
                "
              >
                Handcrafted cakes and bakes made in
                small batches, with good ingredients,
                familiar flavours and a little extra love.
              </motion.p>

              {/* CTA BUTTONS */}

              <motion.div
                variants={itemVariants}
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3.5
                  sm:gap-4
                  mb-10
                "
              >
                <a
                  href="#menu"
                  id="hero-explore-btn"
                  className="
                    px-6
                    sm:px-8
                    py-3.5
                    rounded-full
                    bg-espresso
                    text-ivory
                    text-sm
                    font-medium
                    tracking-wide
                    hover:bg-espresso-light
                    active:scale-[0.98]
                    transition-all
                    duration-200
                    shadow-[0_4px_16px_rgba(39,30,25,0.12)]
                    flex
                    items-center
                    space-x-2
                    group
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-terracotta
                  "
                >
                  <span>
                    Explore Cakes
                  </span>

                  <motion.span
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: 3 }
                    }
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.span>
                </a>

                <a
                  href={`https://wa.me/${bakeryConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-whatsapp-btn"
                  className="
                    px-6
                    sm:px-7
                    py-3.5
                    rounded-full
                    border
                    border-espresso/25
                    bg-transparent
                    text-espresso
                    text-sm
                    font-medium
                    hover:bg-oat
                    hover:border-espresso/40
                    active:scale-[0.98]
                    transition-all
                    duration-200
                    flex
                    items-center
                    space-x-2
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-terracotta
                  "
                >
                  <MessageCircle
                    className="
                      w-4
                      h-4
                      text-terracotta
                    "
                  />

                  <span>
                    Order on WhatsApp
                  </span>
                </a>
              </motion.div>

              {/* LOCAL DETAILS */}

              <motion.div
                variants={itemVariants}
                className="
                  pt-6
                  border-t
                  border-oat-dark/70
                  flex
                  flex-wrap
                  items-center
                  gap-y-2
                  gap-x-6
                  text-xs
                  text-espresso-muted
                "
              >
                <div className="flex items-center space-x-2">
                  <Sparkles
                    className="
                      w-3.5
                      h-3.5
                      text-terracotta/80
                    "
                  />

                  <span>
                    Salt Lake & South Kolkata
                  </span>
                </div>

                <span className="hidden sm:inline text-oat-dark">
                  •
                </span>

                <div>
                  100% Pure Butter & Honest Ingredients
                </div>

                <span className="hidden sm:inline text-oat-dark">
                  •
                </span>

                <div>
                  24h Advance Notice for Fresh Baking
                </div>
              </motion.div>

            </motion.div>

            {/* ==================================================
                RIGHT HERO IMAGE
            =================================================== */}

            <div className="lg:col-span-6 relative">

              <motion.div
                initial={
                  shouldReduceMotion
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        scale: 1.04,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.95,
                  ease: [0.16, 1, 0.3, 1],
                  delay: shouldReduceMotion ? 0 : 0.2,
                }}
                className="
                  relative
                  w-full
                  aspect-[4/4.3]
                  sm:aspect-[4/3.8]
                  lg:aspect-[4/4.3]
                  rounded-[24px]
                  sm:rounded-[32px]
                  overflow-hidden
                  bg-oat
                  border
                  border-oat-dark/80
                  shadow-[0_20px_45px_rgba(39,30,25,0.06)]
                "
              >
                <Image
                  src="/images/instagram/vanilla-botanicals.jpg"
                  alt="Handcrafted artisanal vanilla and fresh botanical celebration cake on linen"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="
                    object-cover
                    object-center
                  "
                />

                {/* Vignette */}

                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-espresso/35
                  via-transparent
                  to-transparent
                  pointer-events-none
                " />

                {/* Bottom Plaque */}

                <motion.div
                  initial={
                    shouldReduceMotion
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.7,
                    delay: shouldReduceMotion ? 0 : 0.55,
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
                    sm:p-5
                    rounded-2xl
                    bg-ivory/95
                    backdrop-blur-md
                    border
                    border-oat-dark/70
                    flex
                    items-center
                    justify-between
                    shadow-sm
                  "
                >
                  <div>
                    <p className="
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-terracotta
                      font-semibold
                      mb-0.5
                    ">
                      Signature Centrepiece
                    </p>

                    <p className="
                      font-serif
                      text-base
                      sm:text-lg
                      text-espresso
                      font-medium
                      leading-tight
                    ">
                      Madagascar Vanilla Bean &
                      Fresh Botanicals
                    </p>
                  </div>

                  <div className="text-right pl-3">
                    <span className="
                      text-[11px]
                      text-espresso-subtle
                      block
                    ">
                      Made to Order
                    </span>

                    <span className="
                      font-medium
                      text-sm
                      text-espresso
                    ">
                      From ₹750
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative glow */}

              <div className="
                absolute
                -top-12
                -right-12
                w-64
                h-64
                rounded-full
                bg-blush/30
                blur-3xl
                -z-10
                pointer-events-none
              " />

            </div>

          </div>
        </div>
      </div>

      {/* Tiny scroll cue */}

      {!shouldReduceMotion && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.4,
            duration: 0.8,
          }}
          className="
            absolute
            bottom-7
            left-1/2
            -translate-x-1/2
            flex
            flex-col
            items-center
            gap-2
            text-espresso-subtle
            pointer-events-none
          "
        >
          <span className="
            text-[9px]
            uppercase
            tracking-[0.25em]
          ">
            Scroll
          </span>

          <motion.div
            animate={{
              y: [0, 5, 0],
              opacity: [0.45, 1, 0.45],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>
      )}

    </section>
  );
}