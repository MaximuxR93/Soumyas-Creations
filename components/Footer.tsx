'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, MessageCircle, Phone, Heart } from 'lucide-react';
import { bakeryConfig } from '@/config/bakery';

export function Footer() {
  return (
    <footer
      id="main-footer"
      className="bg-ivory border-t border-oat-dark py-14 sm:py-16 text-espresso"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-oat-dark/70">
          {/* Brand & Descriptor */}
          <div className="max-w-sm">
            <Link
              href="#hero"
              className="font-serif text-2xl sm:text-[1.75rem] font-semibold text-espresso hover:text-terracotta transition-colors block"
            >
              {bakeryConfig.name}
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-espresso-muted mt-1 font-medium">
              Homemade cakes &amp; bakes • Kolkata
            </p>
            <p className="text-xs text-espresso-subtle mt-3 leading-relaxed">
              Small-batch handcrafted cakes, fudgy brownies, and artisanal bakes made with pure butter and honest intentions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-wider text-espresso-light font-medium">
            <a href="#hero" className="hover:text-terracotta transition-colors">
              Home
            </a>
            <a href="#menu" className="hover:text-terracotta transition-colors">
              Menu
            </a>
            <a href="#categories" className="hover:text-terracotta transition-colors">
              Categories
            </a>
            <a href="#story" className="hover:text-terracotta transition-colors">
              Our Story
            </a>
            <a href="#how-to-order" className="hover:text-terracotta transition-colors">
              Ordering
            </a>
            <a href="#contact" className="hover:text-terracotta transition-colors">
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href={`https://wa.me/${bakeryConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-oat border border-oat-dark flex items-center justify-center text-espresso-muted hover:text-terracotta hover:bg-oat-light transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={bakeryConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-oat border border-oat-dark flex items-center justify-center text-espresso-muted hover:text-terracotta hover:bg-oat-light transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`tel:${bakeryConfig.displayPhone.replace(/\s+/g, '')}`}
              className="w-9 h-9 rounded-full bg-oat border border-oat-dark flex items-center justify-center text-espresso-muted hover:text-terracotta hover:bg-oat-light transition-colors"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Small Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-espresso-subtle">
          <p>© 2026 {bakeryConfig.name}. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Handcrafted with</span>
            <Heart className="w-3 h-3 text-terracotta fill-terracotta inline" />
            <span>in Salt Lake, Kolkata</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
