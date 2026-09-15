'use client';

import React from 'react';
import Image from 'next/image';

import {
  motion,
  useReducedMotion,
} from 'motion/react';

import { ArrowUpRight } from 'lucide-react';

import { ProductCategory } from '@/types/bakery';

interface CategorySectionProps {
  onSelectCategory?: (
    cat: ProductCategory
  ) => void;
}

interface CategoryItem {
  id: ProductCategory;
  title: string;
  subtitle: string;
  count: string;
  image: string;
  alt: string;
}

const categories: CategoryItem[] = [
  {
    id: 'Cakes',
    title: 'Cakes',
    subtitle: 'Celebration layers & tea loaves',
    count: '6 creations',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    alt: 'Handmade chocolate truffle cake with rich ganache',
  },
  {
    id: 'Brownies',
    title: 'Brownies',
    subtitle: 'Fudgy squares with sea salt',
    count: '3 assortments',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    alt: 'Crackly crinkle top dark chocolate brownies',
  },
  {
    id: 'Cupcakes',
    title: 'Cupcakes',
    subtitle: 'Petits swirls & filled centers',
    count: 'Boxes of 4, 6 & 12',
    image:
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    alt: 'Artisanal piped cupcakes with creamy frosting',
  },
  {
    id: 'Cookies',
    title: 'Cookies',
    subtitle: 'Brown butter & chunky chocolate',
    count: 'Tins of 6 & 10',
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    alt: 'Roasted almond and sea salt brown butter cookies',
  },
];

export function CategorySection({
  onSelectCategory,
}: CategorySectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (
    category: ProductCategory
  ) => {
    onSelectCategory?.(category);

    const menuEl =
      document.getElementById('menu');

    if (!menuEl) return;

    menuEl.scrollIntoView({
      behavior: shouldReduceMotion
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      id="categories"
      aria-label="Bakery Categories"
      className="
        relative
        bg-oat-light/50
        border-y
        border-oat-dark/50
        py-16
        sm:py-24
        lg:py-28
      "
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 20,
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
            duration: shouldReduceMotion
              ? 0
              : 0.75,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            justify-between
            mb-12
            sm:mb-14
          "
        >
          <div>

            <div className="
              flex
              items-center
              gap-2
              mb-3
            ">
              <span
                className="
                  w-5
                  h-px
                  bg-terracotta
                "
              />

              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.24em]
                  text-terracotta
                  font-semibold
                "
              >
                OUR RANGE
              </span>
            </div>

            <h2
              className="
                font-serif
                text-3xl
                sm:text-4xl
                md:text-[2.6rem]
                text-espresso
                leading-tight
                tracking-[-0.01em]
              "
            >
              Baked for every little occasion.
            </h2>

          </div>

          <p
            className="
              mt-3
              sm:mt-0
              text-sm
              text-espresso-muted
              max-w-sm
              sm:text-right
              font-normal
              leading-relaxed
            "
          >
            From birthday centrepieces to
            afternoon tea companions,
            prepared with care in small batches.
          </p>
        </motion.div>

        {/* =====================================================
            CATEGORY CARDS
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            sm:gap-6
          "
        >
          {categories.map(
            (cat, index) => (
              <motion.button
                key={cat.id}
                type="button"
                id={`category-card-${cat.id.toLowerCase()}`}
                onClick={() =>
                  handleClick(cat.id)
                }

                initial={
                  shouldReduceMotion
                    ? {
                        opacity: 1,
                        y: 0,
                      }
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
                  amount: 0.12,
                }}

                transition={{
                  duration: shouldReduceMotion
                    ? 0
                    : 0.7,

                  delay: shouldReduceMotion
                    ? 0
                    : index * 0.08,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}

                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                      }
                }

                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.985,
                      }
                }

                className="
                  group
                  relative
                  flex
                  flex-col
                  text-left
                  rounded-[22px]
                  sm:rounded-[26px]
                  bg-ivory
                  border
                  border-oat-dark/80
                  overflow-hidden
                  hover:border-espresso/20
                  shadow-[0_5px_18px_rgba(39,30,25,0.03)]
                  hover:shadow-[0_16px_34px_rgba(39,30,25,0.07)]
                  transition-shadow
                  duration-500
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-terracotta
                "
              >

                {/* Image */}

                <div
                  className="
                    relative
                    w-full
                    aspect-[4/3.8]
                    overflow-hidden
                    bg-oat
                  "
                >
                  <motion.div
                    className="
                      absolute
                      inset-0
                    "
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.045,
                          }
                    }
                    transition={{
                      duration: 0.8,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        25vw
                      "
                      className="
                        object-cover
                        object-center
                      "
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>

                  {/* Image wash */}

                  <motion.div
                    className="
                      absolute
                      inset-0
                      bg-espresso/10
                      pointer-events-none
                    "
                    initial={{
                      opacity: 1,
                    }}
                    whileHover={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />

                  {/* Count */}

                  <span
                    className="
                      absolute
                      top-3.5
                      right-3.5
                      px-2.5
                      py-1
                      rounded-full
                      bg-ivory/90
                      backdrop-blur-sm
                      text-[10px]
                      font-medium
                      text-espresso-light
                      border
                      border-oat-dark
                    "
                  >
                    {cat.count}
                  </span>
                </div>

                {/* Info */}

                <div
                  className="
                    p-5
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <div>

                    <h3
                      className="
                        font-serif
                        text-xl
                        sm:text-[1.35rem]
                        font-medium
                        text-espresso
                        group-hover:text-terracotta
                        transition-colors
                        duration-300
                      "
                    >
                      {cat.title}
                    </h3>

                    <p
                      className="
                        text-xs
                        text-espresso-muted
                        mt-0.5
                      "
                    >
                      {cat.subtitle}
                    </p>

                  </div>

                  {/* Arrow */}

                  <motion.div
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-oat-light
                      border
                      border-oat-dark/70
                      flex
                      items-center
                      justify-center
                      text-espresso-muted
                      group-hover:bg-terracotta
                      group-hover:text-ivory
                      group-hover:border-terracotta
                      transition-colors
                      duration-300
                      ml-2
                      shrink-0
                    "
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            x: 2,
                            y: -2,
                            rotate: 4,
                          }
                    }
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>

                </div>

              </motion.button>
            )
          )}
        </div>

      </div>
    </section>
  );
}