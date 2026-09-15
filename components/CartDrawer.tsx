'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { bakeryConfig } from '@/config/bakery';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalItemsCount,
    openCheckout,
  } = useCart();

  // Prevent background scroll when cart drawer is active
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-espresso/50 backdrop-blur-xs flex justify-end transition-opacity duration-300"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md md:max-w-lg bg-ivory h-full shadow-2xl flex flex-col justify-between border-l border-oat-dark animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-oat-dark flex items-center justify-between bg-oat-light/60">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-5 h-5 text-terracotta" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-espresso">
                Your Bakes Box
              </h2>
              <p className="text-[11px] text-espresso-muted">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            id="cart-close-btn"
            aria-label="Close cart"
            className="p-2 text-espresso-muted hover:text-espresso rounded-full border border-oat-dark hover:bg-oat transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="bg-oat px-5 py-2.5 border-b border-oat-dark flex items-center space-x-2 text-[11px] text-espresso-muted">
          <Info className="w-3.5 h-3.5 text-terracotta shrink-0" />
          <span>Freshly baked on order. Please book 24h before your celebration.</span>
        </div>

        {/* Cart Item List */}
        <div className="flex-grow overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-oat border border-oat-dark flex items-center justify-center mb-4 text-espresso-subtle">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-espresso mb-1">Your cart is empty</h3>
              <p className="text-xs text-espresso-muted max-w-xs mb-6">
                Explore our fresh cakes, fudgy brownies, and handcrafted tea bakes.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-full bg-espresso text-ivory text-xs font-medium hover:bg-espresso-light transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="p-3.5 sm:p-4 rounded-2xl bg-oat-light border border-oat-dark flex gap-3.5 items-start"
              >
                {/* Thumb Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-oat shrink-0 border border-oat-dark">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-base sm:text-lg text-espresso font-medium leading-snug truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-espresso-subtle hover:text-terracotta p-1 transition-colors"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11.5px] text-terracotta font-medium">
                    {item.selectedSize.label} • ₹{item.selectedSize.price} each
                  </p>

                  {/* Custom Cake Message Inscription if specified */}
                  {item.cakeMessage && (
                    <p className="text-[11px] text-espresso-muted italic mt-1 bg-ivory/80 px-2 py-0.5 rounded border border-oat-dark/70">
                      Message: &ldquo;{item.cakeMessage}&rdquo;
                    </p>
                  )}

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-oat-dark/60">
                    <div className="flex items-center border border-espresso/20 rounded-full bg-ivory px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="p-1 text-espresso-muted hover:text-espresso"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-espresso">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        className="p-1 text-espresso-muted hover:text-espresso"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif text-base font-semibold text-espresso">
                      ₹{item.selectedSize.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Proceed to Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-oat-light border-t border-oat-dark space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-espresso-muted">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-espresso-muted">
                <span>Kolkata Delivery / Pickup</span>
                <span className="text-[11px] text-espresso-subtle">
                  Calculated at actuals / Free pickup
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-oat-dark">
                <span className="font-serif text-lg text-espresso font-medium">Estimated Total</span>
                <span className="font-serif text-2xl text-espresso font-bold">₹{subtotal}</span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              id="cart-checkout-cta"
              className="w-full py-3.5 px-6 rounded-full bg-espresso text-ivory text-sm font-medium tracking-wide flex items-center justify-center space-x-2 hover:bg-espresso-light active:scale-98 transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <span>Proceed to Delivery & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-espresso-subtle pt-1">
              <span>Orders confirmed via WhatsApp</span>
              <button
                onClick={clearCart}
                className="hover:text-terracotta underline underline-offset-2 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
