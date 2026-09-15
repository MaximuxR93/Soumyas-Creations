'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { ProductCategory } from '@/types/bakery';
import { Search, Sparkles, Filter } from 'lucide-react';

interface ProductGridProps {
  activeCategory: 'All' | ProductCategory;
  onSelectCategory: (category: 'All' | ProductCategory) => void;
}

const filterTabs: Array<'All' | ProductCategory> = ['All', 'Cakes', 'Cupcakes', 'Brownies', 'Cookies'];

export function ProductGrid({ activeCategory, onSelectCategory }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyEggless, setOnlyEggless] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      if (activeCategory !== 'All' && product.category !== activeCategory) {
        return false;
      }
      // Eggless filter match
      if (onlyEggless && !product.egglessAvailable && !product.isEggless) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        const matchesIngredient = product.ingredientsHighlight.some((i) => i.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesTag || matchesIngredient;
      }
      return true;
    });
  }, [activeCategory, onlyEggless, searchQuery]);

  return (
    <section
      id="menu"
      aria-label="Bakery Menu and Available Cakes"
      className="py-16 sm:py-24 bg-ivory"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading & Subtitle */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-5 h-[1px] bg-terracotta inline-block" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-terracotta font-semibold">
              BAKEHOUSE MENU
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-espresso leading-tight tracking-[-0.01em] mb-3">
            Choose something sweet
          </h2>
          <p className="text-sm sm:text-base text-espresso-muted font-normal leading-relaxed">
            Browse the cakes and bakes currently available to order. Prepared in small batches with genuine dairy butter and uncompromised ingredients.
          </p>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-oat-dark">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab;
              const count =
                tab === 'All'
                  ? products.length
                  : products.filter((p) => p.category === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => onSelectCategory(tab)}
                  id={`filter-tab-${tab.toLowerCase()}`}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-wide transition-all duration-200 whitespace-nowrap flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                    isActive
                      ? 'bg-espresso text-ivory shadow-xs'
                      : 'bg-oat text-espresso-muted hover:text-espresso hover:bg-oat-dark/70 border border-oat-dark'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-ivory/20 text-ivory' : 'bg-oat-dark text-espresso-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: Eggless toggle & Quick Search */}
          <div className="flex items-center gap-3">
            {/* Eggless Friendly Toggle */}
            <button
              onClick={() => setOnlyEggless(!onlyEggless)}
              type="button"
              className={`px-3.5 py-2 rounded-full text-xs font-medium border flex items-center space-x-1.5 transition-colors focus:outline-none ${
                onlyEggless
                  ? 'bg-sage/15 text-sage border-sage font-semibold'
                  : 'bg-oat-light border-oat-dark text-espresso-muted hover:border-espresso/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Eggless Option</span>
            </button>

            {/* Quick Search */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-subtle" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bakes, flavours..."
                className="w-full pl-9 pr-3.5 py-2 rounded-full text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta/60 focus:bg-ivory transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-espresso-muted hover:text-espresso"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-3xl bg-oat-light border border-dashed border-oat-dark">
            <p className="font-serif text-2xl text-espresso mb-2">No bakes matched your selection</p>
            <p className="text-xs text-espresso-muted mb-5">
              Try clearing your search query or selecting &apos;All&apos; bakes.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setOnlyEggless(false);
                onSelectCategory('All');
              }}
              className="px-5 py-2 rounded-full bg-espresso text-ivory text-xs font-medium hover:bg-espresso-light transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Advance Notice Footnote */}
        <div className="mt-14 p-5 sm:p-6 rounded-2xl bg-oat border border-oat-dark/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-terracotta mt-1.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-espresso">
                Kolkata Home Bakery Notice
              </p>
              <p className="text-xs text-espresso-muted mt-0.5 leading-relaxed">
                All bakes are hand-prepared only after an order is confirmed. Standard cakes require 24 hours advance notice; custom tiered celebration cakes require 48 hours.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="text-xs font-medium text-terracotta hover:text-terracotta-dark whitespace-nowrap self-start sm:self-center underline underline-offset-4"
          >
            Ask about custom themes & dietary requests →
          </a>
        </div>
      </div>
    </section>
  );
}
