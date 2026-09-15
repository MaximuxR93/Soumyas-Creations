'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, MessageCircle, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { bakeryConfig } from '@/config/bakery';

export function Navbar() {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#menu' },
    { label: 'Categories', href: '#categories' },
    { label: 'Our Story', href: '#story' },
    { label: 'Ordering', href: '#how-to-order' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-oat-dark/60 py-3 shadow-[0_4px_20px_rgba(39,30,25,0.03)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="#hero"
            id="brand-logo"
            className="group flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm"
          >
            <span className="font-serif text-2xl sm:text-[1.7rem] tracking-[-0.01em] text-espresso font-semibold group-hover:text-terracotta transition-colors duration-200">
              {bakeryConfig.name}
            </span>
            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.24em] text-espresso-muted font-medium -mt-0.5">
              {bakeryConfig.descriptor}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[13.5px] tracking-[0.04em] uppercase text-espresso-light font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative py-1 text-espresso-light hover:text-terracotta transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-terracotta transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Area: WhatsApp quick badge & Cart Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href={`https://wa.me/${bakeryConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-medium text-espresso-muted hover:text-terracotta transition-colors px-3 py-1.5 rounded-full border border-oat-dark bg-oat-light/60 hover:border-terracotta/40"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-terracotta" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="header-cart-btn"
              aria-label={`Open Cart with ${totalItemsCount} items`}
              className="relative p-2.5 sm:px-3.5 sm:py-2 rounded-full border border-espresso/15 bg-oat/80 hover:bg-oat hover:border-espresso/30 text-espresso transition-all duration-200 flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-espresso" />
              <span className="hidden sm:inline text-xs font-medium uppercase tracking-wider">Cart</span>
              <span
                id="cart-badge-count"
                className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full transition-transform ${
                  totalItemsCount > 0
                    ? 'bg-terracotta text-ivory scale-100'
                    : 'bg-oat-dark text-espresso-muted scale-95'
                }`}
              >
                {totalItemsCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 text-espresso hover:text-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-0 z-50 md:hidden bg-espresso/40 backdrop-blur-sm flex flex-col justify-end transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-full bg-ivory rounded-t-[28px] p-6 sm:p-8 border-t border-oat-dark shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-5 border-b border-oat-dark">
              <div>
                <h3 className="font-serif text-xl font-medium text-espresso">{bakeryConfig.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-espresso-muted">
                  {bakeryConfig.descriptor}
                </p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                id="mobile-menu-close"
                className="p-2 text-espresso-muted hover:text-espresso rounded-full border border-oat-dark"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-espresso hover:text-terracotta transition-colors py-1 flex items-center justify-between border-b border-oat-light pb-2"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-sans text-espresso-subtle">→</span>
                </a>
              ))}
            </nav>

            <div className="pt-4 space-y-3 border-t border-oat-dark">
              <a
                href={`https://wa.me/${bakeryConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-terracotta text-ivory font-medium text-sm shadow-sm active:scale-98 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${bakeryConfig.displayPhone.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-espresso/20 text-espresso font-medium text-sm active:scale-98 transition-transform"
              >
                <Phone className="w-4 h-4" />
                <span>Call {bakeryConfig.displayPhone}</span>
              </a>

              <p className="text-center text-[11px] text-espresso-subtle pt-2">
                Freshly baked to order in Salt Lake, Kolkata.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
