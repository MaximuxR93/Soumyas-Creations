'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Menu, X, MessageCircle, Phone } from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { bakeryConfig } from '@/config/bakery';

export function Navbar() {
  const { totalItemsCount, setIsCartOpen } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#menu' },
    { label: 'Categories', href: '#categories' },
    { label: 'Our Story', href: '#story' },
    { label: 'Ordering', href: '#how-to-order' },
    { label: 'Contact', href: '#contact' },
  ];

  // Keep the server-rendered value consistent with the initial client render.
  const safeCartCount = isHydrated ? totalItemsCount : 0;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-oat-dark/60 py-2.5 shadow-[0_4px_20px_rgba(39,30,25,0.04)]'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* -------------------------------------------------
                BRAND
            ------------------------------------------------- */}
            <a
              href="#hero"
              id="brand-logo"
              aria-label="Soumya Chakroborty Bakery - Home"
              className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-full"
            >
              <div
                className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'w-11 h-11'
                    : 'w-12 h-12 sm:w-[52px] sm:h-[52px]'
                }`}
              >
                <Image
                  src="/images/logo-mark.png"
                  alt="Soumya Chakroborty Bakery"
                  fill
                  priority
                  sizes="52px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              {/* Desktop-only small wordmark */}
              <div className="hidden lg:flex flex-col ml-3 leading-none">
                <span className="font-serif text-[17px] tracking-[0.01em] text-espresso group-hover:text-terracotta transition-colors duration-200">
                  Soumya's
                </span>

                <span className="mt-1 text-[8px] uppercase tracking-[0.24em] text-espresso-muted font-medium">
                  Homemade Bakery
                </span>
              </div>
            </a>

            {/* -------------------------------------------------
                DESKTOP NAVIGATION
            ------------------------------------------------- */}
            <nav
              className="
                hidden md:flex
                items-center
                gap-6 lg:gap-8
                text-[12px] lg:text-[12.5px]
                tracking-[0.08em]
                uppercase
                text-espresso-light
                font-medium
              "
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  id={`nav-link-${link.label
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                  className="
                    relative
                    py-2
                    text-espresso-light
                    hover:text-terracotta
                    transition-colors
                    duration-200
                    group
                  "
                >
                  {link.label}

                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      w-0
                      h-[1px]
                      bg-terracotta
                      transition-all
                      duration-300
                      group-hover:w-full
                      rounded-full
                    "
                  />
                </a>
              ))}
            </nav>

            {/* -------------------------------------------------
                RIGHT ACTIONS
            ------------------------------------------------- */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* WhatsApp — desktop only */}
              <a
                href={`https://wa.me/${bakeryConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                id="header-whatsapp-btn"
                className="
                  hidden lg:inline-flex
                  items-center
                  gap-1.5
                  text-[11px]
                  font-medium
                  text-espresso-muted
                  hover:text-terracotta
                  transition-colors
                  px-3
                  py-2
                  rounded-full
                  border
                  border-oat-dark
                  bg-oat-light/60
                  hover:border-terracotta/40
                "
                title="Chat directly on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-terracotta" />
                <span>WhatsApp</span>
              </a>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                id="header-cart-btn"
                aria-label={`Open Cart with ${safeCartCount} items`}
                className="
                  relative
                  p-2.5
                  sm:px-3.5
                  sm:py-2.5
                  rounded-full
                  border
                  border-espresso/15
                  bg-oat/80
                  hover:bg-oat
                  hover:border-espresso/30
                  text-espresso
                  transition-all
                  duration-200
                  flex
                  items-center
                  gap-2
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-terracotta
                  active:scale-95
                "
              >
                <ShoppingBag className="w-4 h-4" />

                <span className="hidden sm:inline text-[11px] font-medium uppercase tracking-[0.1em]">
                  Cart
                </span>

                <span
                  id="cart-badge-count"
                  className={`
                    flex
                    items-center
                    justify-center
                    min-w-[19px]
                    h-[19px]
                    px-1.5
                    text-[10px]
                    font-bold
                    rounded-full
                    transition-all
                    duration-200
                    ${
                      safeCartCount > 0
                        ? 'bg-terracotta text-ivory scale-100'
                        : 'bg-oat-dark text-espresso-muted scale-95'
                    }
                  `}
                >
                  {safeCartCount}
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                id="mobile-menu-toggle"
                aria-label={
                  isMobileMenuOpen
                    ? 'Close Navigation Menu'
                    : 'Open Navigation Menu'
                }
                aria-expanded={isMobileMenuOpen}
                className="
                  md:hidden
                  p-2.5
                  text-espresso
                  hover:text-terracotta
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-terracotta
                  rounded-full
                  transition-colors
                "
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------
          MOBILE MENU
      ------------------------------------------------------- */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="
            fixed
            inset-0
            z-50
            md:hidden
            bg-espresso/40
            backdrop-blur-sm
            flex
            flex-col
            justify-end
          "
          onClick={closeMobileMenu}
        >
          <div
            className="
              w-full
              bg-ivory
              rounded-t-[28px]
              p-6
              sm:p-8
              border-t
              border-oat-dark
              shadow-2xl
              max-h-[85vh]
              overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between pb-5 border-b border-oat-dark">
              <a
                href="#hero"
                onClick={closeMobileMenu}
                className="flex items-center gap-3"
              >
                <div className="relative w-11 h-11 overflow-hidden rounded-full">
                  <Image
                    src="/images/logo-mark.png"
                    alt="Soumya Chakroborty Bakery"
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="font-serif text-xl font-medium text-espresso">
                    Soumya's
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-espresso-muted">
                    Homemade Bakery
                  </span>
                </div>
              </a>

              <button
                onClick={closeMobileMenu}
                id="mobile-menu-close"
                className="
                  p-2
                  text-espresso-muted
                  hover:text-espresso
                  rounded-full
                  border
                  border-oat-dark
                  transition-colors
                "
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav
              className="flex flex-col py-6 space-y-3"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="
                    font-serif
                    text-[1.65rem]
                    text-espresso
                    hover:text-terracotta
                    transition-colors
                    py-2
                    flex
                    items-center
                    justify-between
                    border-b
                    border-oat-light
                    pb-3
                  "
                >
                  <span>{link.label}</span>

                  <span className="text-xs font-sans text-espresso-subtle">
                    →
                  </span>
                </a>
              ))}
            </nav>

            {/* Mobile actions */}
            <div className="pt-4 space-y-3 border-t border-oat-dark">
              <a
                href={`https://wa.me/${bakeryConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  px-4
                  rounded-xl
                  bg-terracotta
                  text-ivory
                  font-medium
                  text-sm
                  shadow-sm
                  active:scale-[0.98]
                  transition-transform
                "
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${bakeryConfig.displayPhone.replace(/\s+/g, '')}`}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  px-4
                  rounded-xl
                  border
                  border-espresso/20
                  text-espresso
                  font-medium
                  text-sm
                  active:scale-[0.98]
                  transition-transform
                "
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