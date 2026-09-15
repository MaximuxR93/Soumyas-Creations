'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone, Instagram, MapPin, Send, Check } from 'lucide-react';
import { bakeryConfig } from '@/config/bakery';
import { getWhatsAppInquiryUrl } from '@/utils/whatsapp';

export function ContactSection() {
  const [inquiryName, setInquiryName] = useState('');
  const [occasion, setOccasion] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = [
      inquiryName ? `Name: ${inquiryName}` : '',
      occasion ? `Occasion: ${occasion}` : '',
      inquiryDate ? `Date: ${inquiryDate}` : '',
      inquiryMessage ? `Details: ${inquiryMessage}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const cleanNumber = bakeryConfig.whatsapp.replace(/[^0-9]/g, '');
    const text = `Hello Soumya! I would like to inquire about a custom bake:\n\n${details}\n\nCould you please share your availability?`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 2500);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Soumya Chakroborty Bakery"
      className="py-16 sm:py-24 lg:py-32 bg-ivory-warm border-t border-oat-dark"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Contact Details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center space-x-2.5 mb-3">
              <span className="w-5 h-[1px] bg-terracotta inline-block" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-terracotta font-semibold">
                GET IN TOUCH
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.12] text-espresso font-normal tracking-[-0.01em] mb-4">
              Let&apos;s bake something lovely.
            </h2>

            <p className="text-sm sm:text-base text-espresso-muted leading-relaxed font-normal mb-8 max-w-lg">
              Have a bespoke design in mind, a milestone anniversary, or looking for corporate holiday gift boxes in Kolkata? Reach out directly — we’d love to bake for you.
            </p>

            {/* Direct Contact Cards using centralized bakeryConfig */}
            <div className="space-y-3.5 max-w-md">
              {/* WhatsApp Link */}
              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-channel-whatsapp"
                className="p-4 rounded-2xl bg-ivory border border-oat-dark/80 hover:border-terracotta/50 flex items-center space-x-4 transition-all duration-200 group shadow-2xs"
              >
                <div className="w-10 h-10 rounded-full bg-oat flex items-center justify-center text-terracotta group-hover:bg-terracotta group-hover:text-ivory transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-espresso-subtle block font-semibold">
                    Instant Messaging
                  </span>
                  <span className="font-serif text-base sm:text-lg text-espresso group-hover:text-terracotta transition-colors font-medium">
                    WhatsApp Chat (+91 98301 24567)
                  </span>
                </div>
              </a>

              {/* Instagram Link */}
              <a
                href={bakeryConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-channel-instagram"
                className="p-4 rounded-2xl bg-ivory border border-oat-dark/80 hover:border-terracotta/50 flex items-center space-x-4 transition-all duration-200 group shadow-2xs"
              >
                <div className="w-10 h-10 rounded-full bg-oat flex items-center justify-center text-terracotta group-hover:bg-terracotta group-hover:text-ivory transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-espresso-subtle block font-semibold">
                    Instagram Portfolio
                  </span>
                  <span className="font-serif text-base sm:text-lg text-espresso group-hover:text-terracotta transition-colors font-medium">
                    {bakeryConfig.instagramHandle}
                  </span>
                </div>
              </a>

              {/* Direct Phone Call Link */}
              <a
                href={`tel:${bakeryConfig.displayPhone.replace(/\s+/g, '')}`}
                id="contact-channel-phone"
                className="p-4 rounded-2xl bg-ivory border border-oat-dark/80 hover:border-terracotta/50 flex items-center space-x-4 transition-all duration-200 group shadow-2xs"
              >
                <div className="w-10 h-10 rounded-full bg-oat flex items-center justify-center text-terracotta group-hover:bg-terracotta group-hover:text-ivory transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-espresso-subtle block font-semibold">
                    Direct Phone Line
                  </span>
                  <span className="font-serif text-base sm:text-lg text-espresso group-hover:text-terracotta transition-colors font-medium">
                    {bakeryConfig.displayPhone}
                  </span>
                </div>
              </a>

              {/* Studio Location Badge */}
              <div className="p-4 rounded-2xl bg-oat-light/60 border border-oat-dark/70 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-oat flex items-center justify-center text-espresso-muted">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-espresso-subtle block font-semibold">
                    Bakehouse Studio
                  </span>
                  <span className="text-xs text-espresso leading-snug block">
                    {bakeryConfig.pickupStudio}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Custom Bake Inquiry Form */}
          <div className="lg:col-span-6 bg-ivory p-6 sm:p-8 md:p-10 rounded-[28px] sm:rounded-[32px] border border-oat-dark shadow-sm">
            <span className="text-[11px] uppercase tracking-[0.2em] text-terracotta font-semibold block mb-1">
              CUSTOM INQUIRY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-medium mb-2">
              Share your celebration details
            </h3>
            <p className="text-xs text-espresso-muted mb-6 leading-relaxed">
              Fill out this quick note and we’ll immediately connect with you on WhatsApp to discuss design sketches, flavours, and guest servings.
            </p>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="inquiry-name"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-espresso mb-1"
                >
                  Your Name
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Sreya Mukherjee"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta focus:bg-ivory"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="inquiry-occasion"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-espresso mb-1"
                  >
                    Occasion / Event
                  </label>
                  <input
                    id="inquiry-occasion"
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="e.g. 50th Birthday, Wedding, High Tea"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta focus:bg-ivory"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-date"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-espresso mb-1"
                  >
                    Target Date
                  </label>
                  <input
                    id="inquiry-date"
                    type="date"
                    value={inquiryDate}
                    onChange={(e) => setInquiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso focus:outline-none focus:border-terracotta focus:bg-ivory"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-espresso mb-1"
                >
                  Cake Flavours, Dietary Needs & Ideas
                </label>
                <textarea
                  id="inquiry-message"
                  rows={3}
                  required
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="e.g. Looking for a 1.5kg dark chocolate cake with eggless sponge and fresh floral piping for 15 guests..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta focus:bg-ivory"
                />
              </div>

              <button
                type="submit"
                id="send-inquiry-btn"
                className="w-full py-3.5 px-6 rounded-full bg-espresso hover:bg-espresso-light text-ivory text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center space-x-2 transition-all active:scale-98 shadow-sm"
              >
                {sentSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-sage" />
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-terracotta" />
                    <span>Send Inquiry to Soumya via WhatsApp</span>
                  </>
                )}
              </button>

              <p className="text-center text-[10.5px] text-espresso-subtle pt-1">
                Typical response time within 1–2 hours during bakery hours ({bakeryConfig.orderHours}).
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
