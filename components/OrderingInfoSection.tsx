'use client';

import React from 'react';
import { bakeryConfig } from '@/config/bakery';
import { MessageCircle } from 'lucide-react';

export function OrderingInfoSection() {
  const steps = [
    {
      number: '01',
      title: 'Choose your bake',
      description:
        'Explore our seasonal cakes, fudgy brownies, cupcakes, or cookies. Select your preferred size and enter any custom message for the cake.',
    },
    {
      number: '02',
      title: 'Send your order',
      description:
        'Proceed to checkout or message us directly on WhatsApp. Share your preferred date, delivery time slot, and delivery address in Kolkata.',
    },
    {
      number: '03',
      title: 'Enjoy something homemade',
      description:
        'Your bake is freshly made from scratch on your chosen day, packaged in eco-conscious bakery boxes, and handed over ready for celebration.',
    },
  ];

  return (
    <section
      id="how-to-order"
      aria-label="How to Order from Soumya Chakroborty Bakery"
      className="py-16 sm:py-24 bg-oat-light/40 border-b border-oat-dark"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-xl mb-14 sm:mb-16">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-5 h-[1px] bg-terracotta inline-block" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-terracotta font-semibold">
              SIMPLE ORDERING
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal tracking-[-0.01em]">
            How we bake for you.
          </h2>
          <p className="mt-2 text-sm text-espresso-muted">
            Because every cake is prepared fresh to order, our process is simple, direct, and transparent.
          </p>
        </div>

        {/* 3 Steps Row using pure typography and generous spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col text-left border-t border-espresso/15 pt-6 relative"
            >
              {/* Minimalist Editorial Step Number */}
              <span className="font-serif text-4xl sm:text-5xl text-terracotta font-light tracking-tight mb-3">
                {step.number}
              </span>

              {/* Step Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-espresso mb-2">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-xs sm:text-[13.5px] text-espresso-muted leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Helper Note */}
        <div className="mt-14 pt-8 border-t border-oat-dark/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-espresso-muted">
          <p>
            Have an urgent celebration or custom tiered cake inquiry?
          </p>
          <a
            href={`https://wa.me/${bakeryConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-terracotta hover:text-terracotta-dark font-medium underline underline-offset-4"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat directly with Soumya on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
