'use client';

import React, { useState } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
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
  const [activeCategory, setActiveCategory] = useState<'All' | ProductCategory>('All');
  const { selectedProductForDetail, closeProductDetail } = useCart();

  const handleSelectCategory = (cat: 'All' | ProductCategory) => {
    setActiveCategory(cat);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-espresso selection:bg-blush selection:text-espresso">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Editorial Bakery Hero */}
        <Hero />

        {/* Featured Category Section */}
        <CategorySection onSelectCategory={handleSelectCategory} />

        {/* Main Product & Cake Menu */}
        <ProductGrid
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Editorial Story Section */}
        <StorySection />

        {/* 3-Step Ordering Information */}
        <OrderingInfoSection />

        {/* Instagram / Social Visuals */}
        <InstagramSection />

        {/* Contact & Custom Bake Inquiries */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Interactive Overlays & Drawers */}
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
      <BakeryApp />
    </CartProvider>
  );
}
