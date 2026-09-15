'use client';

import React, { useState } from 'react';

import { CartProvider, useCart } from '@/context/CartContext';
import { SmoothScroll } from '@/components/SmoothScroll';

import { Navbar } from '@/components/Navbar';
import {Hero} from '@/components/Hero';

import { CategorySection } from '@/components/CategorySection';
import { ProductGrid } from '@/components/ProductGrid';
import { StorySection } from '@/components/StorySection';
import { OrderingInfoSection } from '@/components/OrderingInfoSection';
import { InstagramSection } from '@/components/InstagramSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProductDetailModal } from '@/components/ProductDetailModal';

import { ProductCategory } from '@/types/bakery';

function BakeryApp() {
  const [activeCategory, setActiveCategory] = useState<
    'All' | ProductCategory
  >('All');

  const {
    selectedProductForDetail,
    closeProductDetail,
  } = useCart();

  const handleSelectCategory = (
    category: 'All' | ProductCategory
  ) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-ivory text-espresso selection:bg-blush selection:text-espresso">

      <Navbar />

      <main>

        {/* =====================================================
            HOME
            Soft pinned-scroll Hero.
        ====================================================== */}

        <section
          id="home"
          className="relative h-[120vh]"
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            <Hero />
          </div>
        </section>

        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <section
          id="categories-wrap"
          className="relative z-10"
        >
          <CategorySection
            onSelectCategory={handleSelectCategory}
          />
        </section>

        {/* =====================================================
            MENU
        ====================================================== */}

        <section
          id="menu"
          className="relative z-10"
        >
          <ProductGrid
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />
        </section>

        {/* =====================================================
            STORY
        ====================================================== */}

        <StorySection />

        {/* =====================================================
            ORDERING
        ====================================================== */}

        <OrderingInfoSection />

        {/* =====================================================
            MOMENTS
        ====================================================== */}

        <InstagramSection />

        {/* =====================================================
            CONTACT
        ====================================================== */}

        <ContactSection />

      </main>

      {/* =======================================================
          FOOTER
      ======================================================== */}

      <Footer />

      {/* =======================================================
          COMMERCE OVERLAYS
      ======================================================== */}

      <CartDrawer />

      <CheckoutModal />

      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={closeProductDetail}
      />

    </div>
  );
}

export default function Page() {
  return (
    <CartProvider>
      <SmoothScroll>
        <BakeryApp />
      </SmoothScroll>
    </CartProvider>
  );
}