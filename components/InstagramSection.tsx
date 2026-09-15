'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, ExternalLink } from 'lucide-react';
import { bakeryConfig } from '@/config/bakery';

export function InstagramSection() {
  const instagramGallery = [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      alt: 'Chocolate ganache dripping over layered cake',
      caption: 'Dark chocolate ganache dripping on Sunday afternoon bakes.',
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80',
      alt: 'Pastel Korean bento cake in sugarcane box',
      caption: 'Bento celebration cake packed for a couple’s anniversary.',
    },
    {
      id: 'ig-3',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      alt: 'Maldon flaky sea salt brownies out of oven',
      caption: 'Fresh batch of Callebaut fudge brownies cooling on wire rack.',
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80',
      alt: 'Artisan cupcakes topped with lemon curd and vanilla cream',
      caption: 'Meyer lemon curd cupcakes for an intimate garden tea.',
    },
    {
      id: 'ig-5',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
      alt: 'Brown butter toasted almond cookies on baking parchment',
      caption: '48-hour chilled brown butter cookie dough baked to golden edges.',
    },
    {
      id: 'ig-6',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
      alt: 'Vanilla bean cake with delicate botanical touches',
      caption: 'Minimalist celebration cake with real vanilla bean caviar.',
    },
  ];

  return (
    <section
      id="instagram-feed"
      aria-label="Instagram Gallery"
      className="py-16 sm:py-24 bg-ivory"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-5 h-[1px] bg-terracotta inline-block" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-terracotta font-semibold">
                DAILY KITCHEN LOG
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal tracking-[-0.01em]">
              Fresh from the kitchen
            </h2>
          </div>

          <a
            href={bakeryConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-cta-btn"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-espresso/20 bg-oat-light hover:bg-oat text-espresso text-xs font-medium tracking-wide transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            <Instagram className="w-4 h-4 text-terracotta group-hover:scale-105 transition-transform" />
            <span>Follow {bakeryConfig.instagramHandle}</span>
            <ExternalLink className="w-3.5 h-3.5 text-espresso-subtle ml-0.5" />
          </a>
        </div>

        {/* 6 Square Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramGallery.map((item) => (
            <a
              key={item.id}
              href={bakeryConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[18px] sm:rounded-[22px] overflow-hidden bg-oat border border-oat-dark shadow-2xs block focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-espresso/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-ivory">
                <Instagram className="w-4 h-4 mb-1 text-ivory" />
                <p className="text-[10px] leading-tight line-clamp-2 text-ivory/90 font-normal">
                  {item.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
