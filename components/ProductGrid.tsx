'use client';

import React, {
  useMemo,
  useRef,
  useState,
} from 'react';

import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { ProductCategory } from '@/types/bakery';

import {
  Search,
  Sparkles,
  Filter,
} from 'lucide-react';

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react';

interface ProductGridProps {
  activeCategory: 'All' | ProductCategory;
  onSelectCategory: (
    category: 'All' | ProductCategory
  ) => void;
}

const filterTabs: Array<
  'All' | ProductCategory
> = [
  'All',
  'Cakes',
  'Cupcakes',
  'Brownies',
  'Cookies',
];

export function ProductGrid({
  activeCategory,
  onSelectCategory,
}: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyEggless, setOnlyEggless] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  /*
   * Observe the whole menu section so the entrance choreography
   * starts only when the user naturally reaches the menu.
   */
  const menuRef = useRef<HTMLElement>(null);

  const menuInView = useInView(menuRef, {
    once: true,
    amount: 0.12,
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      if (
        activeCategory !== 'All' &&
        product.category !== activeCategory
      ) {
        return false;
      }

      // Eggless filter match
      if (
        onlyEggless &&
        !product.egglessAvailable &&
        !product.isEggless
      ) {
        return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();

        const matchesName = product.name
          .toLowerCase()
          .includes(query);

        const matchesDesc = product.description
          .toLowerCase()
          .includes(query);

        const matchesTag = product.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

        const matchesIngredient =
          product.ingredientsHighlight.some((ingredient) =>
            ingredient.toLowerCase().includes(query)
          );

        return (
          matchesName ||
          matchesDesc ||
          matchesTag ||
          matchesIngredient
        );
      }

      return true;
    });
  }, [
    activeCategory,
    onlyEggless,
    searchQuery,
  ]);

  return (
    <section
      ref={menuRef}
      id="menu"
      className="
        relative
        py-20
        sm:py-24
        lg:py-28
        bg-ivory
        overflow-hidden
      "
    >
      {/* =====================================================
          SUBTLE AMBIENT LAYER
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -top-32
          right-[-10rem]
          w-[28rem]
          h-[28rem]
          rounded-full
          bg-blush/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          top-[35%]
          left-[-14rem]
          w-[30rem]
          h-[30rem]
          rounded-full
          bg-oat/30
          blur-3xl
        "
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* =====================================================
            MENU INTRO
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
                  y: 34,
                }
          }
          animate={
            menuInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-2xl mb-10 sm:mb-12"
        >
          {/* Eyebrow */}

          <motion.div
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {
                    opacity: 0,
                    x: -16,
                  }
            }
            animate={
              menuInView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : undefined
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.65,
              delay: shouldReduceMotion ? 0 : 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center space-x-2 mb-3"
          >
            <span className="w-5 h-[1px] bg-terracotta inline-block" />

            <span className="text-[11px] uppercase tracking-[0.24em] text-terracotta font-semibold">
              BAKEHOUSE MENU
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h2
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={
              menuInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : undefined
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.75,
              delay: shouldReduceMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              font-serif
              text-3xl
              sm:text-4xl
              md:text-[2.75rem]
              text-espresso
              leading-tight
              tracking-[-0.01em]
              mb-3
            "
          >
            Choose something sweet
          </motion.h2>

          {/* Description */}

          <motion.p
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            animate={
              menuInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : undefined
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-sm
              sm:text-base
              text-espresso-muted
              font-normal
              leading-relaxed
            "
          >
            Browse the cakes and bakes currently available to order.
            Prepared in small batches with genuine dairy butter and
            uncompromised ingredients.
          </motion.p>
        </motion.div>

        {/* =====================================================
            FILTERS & SEARCH
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
                  y: 24,
                }
          }
          animate={
            menuInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.75,
            delay: shouldReduceMotion ? 0 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            justify-between
            gap-4
            pb-8
            mb-10
            border-b
            border-oat-dark
          "
        >
          {/* Category Tabs */}

          <div className="
            flex
            items-center
            gap-2
            overflow-x-auto
            pb-2
            lg:pb-0
            scrollbar-none
          ">
            {filterTabs.map((tab) => {
              const isActive =
                activeCategory === tab;

              const count =
                tab === 'All'
                  ? products.length
                  : products.filter(
                      (product) =>
                        product.category === tab
                    ).length;

              return (
                <button
                  key={tab}
                  onClick={() =>
                    onSelectCategory(tab)
                  }
                  id={`filter-tab-${tab.toLowerCase()}`}
                  type="button"
                  className={`
                    relative
                    px-4
                    sm:px-5
                    py-2
                    rounded-full
                    text-xs
                    sm:text-[13px]
                    font-medium
                    tracking-wide
                    transition-all
                    duration-300
                    whitespace-nowrap
                    flex
                    items-center
                    space-x-2
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-terracotta
                    overflow-hidden
                    ${
                      isActive
                        ? 'text-ivory'
                        : 'bg-oat text-espresso-muted hover:text-espresso hover:bg-oat-dark/70 border border-oat-dark'
                    }
                  `}
                >
                  {/* Active pill background */}

                  {isActive && (
                    <motion.span
                      layoutId="active-menu-filter"
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-espresso
                      "
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {tab}
                  </span>

                  <span
                    className={`
                      relative
                      z-10
                      text-[10px]
                      px-1.5
                      py-0.5
                      rounded-full
                      font-bold
                      ${
                        isActive
                          ? 'bg-ivory/20 text-ivory'
                          : 'bg-oat-dark text-espresso-muted'
                      }
                    `}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Controls */}

          <div className="
            flex
            flex-col
            sm:flex-row
            items-stretch
            sm:items-center
            gap-3
          ">
            {/* Eggless Friendly Toggle */}

            <motion.button
              type="button"
              onClick={() =>
                setOnlyEggless((current) => !current)
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                    }
              }
              transition={{
                duration: 0.2,
              }}
              className={`
                px-3.5
                py-2
                rounded-full
                text-xs
                font-medium
                border
                flex
                items-center
                justify-center
                space-x-1.5
                transition-colors
                duration-200
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-terracotta
                ${
                  onlyEggless
                    ? 'bg-sage/15 text-sage border-sage font-semibold'
                    : 'bg-oat-light border-oat-dark text-espresso-muted hover:border-espresso/30'
                }
              `}
            >
              <Sparkles className="w-3.5 h-3.5" />

              <span>
                Eggless Option
              </span>
            </motion.button>

            {/* Quick Search */}

            <div className="relative flex-grow sm:flex-grow-0 sm:w-60">
              <Search
                className="
                  w-3.5
                  h-3.5
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-espresso-subtle
                "
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search bakes, flavours..."
                className="
                  w-full
                  pl-9
                  pr-3.5
                  py-2
                  rounded-full
                  text-xs
                  bg-oat-light
                  border
                  border-oat-dark
                  text-espresso
                  placeholder:text-espresso-subtle
                  focus:outline-none
                  focus:border-terracotta/60
                  focus:bg-ivory
                  transition-colors
                  duration-200
                "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchQuery('')
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[10px]
                    text-espresso-muted
                    hover:text-espresso
                    transition-colors
                  "
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            PRODUCTS
        ====================================================== */}

        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${onlyEggless}-${searchQuery}`}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : 0.35,
              }}
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
                sm:gap-7
                lg:gap-8
              "
            >
              {filteredProducts.map(
                (product, index) => (
                  <motion.div
                    key={product.id}
                    initial={
                      shouldReduceMotion
                        ? {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }
                        : {
                            opacity: 0,
                            y: 34,
                            scale: 0.985,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: shouldReduceMotion
                        ? 0
                        : 0.65,
                      delay: shouldReduceMotion
                        ? 0
                        : 0.08 + index * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    layout
                  >
                    <ProductCard
                      product={product}
                    />
                  </motion.div>
                )
              )}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={
                shouldReduceMotion
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                py-16
                text-center
                rounded-3xl
                bg-oat-light
                border
                border-dashed
                border-oat-dark
              "
            >
              <p className="
                font-serif
                text-2xl
                text-espresso
                mb-2
              ">
                No bakes matched your selection
              </p>

              <p className="
                text-xs
                text-espresso-muted
                mb-5
              ">
                Try clearing your search query or selecting
                &apos;All&apos; bakes.
              </p>

              <motion.button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setOnlyEggless(false);
                  onSelectCategory('All');
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -1,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
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
                "
              >
                Reset Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            ADVANCE NOTICE
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
                  y: 22,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-14
            p-5
            sm:p-6
            rounded-2xl
            bg-oat
            border
            border-oat-dark/80
            flex
            flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-4
          "
        >
          <div className="flex items-start space-x-3">
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-terracotta
                mt-1.5
                shrink-0
              "
            />

            <div>
              <p className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-espresso
              ">
                Kolkata Home Bakery Notice
              </p>

              <p className="
                text-xs
                text-espresso-muted
                mt-0.5
                leading-relaxed
              ">
                All bakes are hand-prepared only after an order is
                confirmed. Standard cakes require 24 hours advance
                notice; custom tiered celebration cakes require 48 hours.
              </p>
            </div>
          </div>

          <motion.a
            href="#contact"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    x: 2,
                  }
            }
            className="
              text-xs
              font-medium
              text-terracotta
              hover:text-terracotta-dark
              whitespace-nowrap
              self-start
              sm:self-center
              underline
              underline-offset-4
            "
          >
            Ask about custom themes & dietary requests →
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}