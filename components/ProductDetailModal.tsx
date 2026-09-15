'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Check, Clock, MessageSquare } from 'lucide-react';
import { Product, ProductSize } from '@/types/bakery';
import { useCart } from '@/context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

function ProductDetailContent({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    () => product.sizes.find((s) => s.isDefault) || product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [cakeMessage, setCakeMessage] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice = selectedSize.price * quantity;

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity, cakeMessage, specialInstructions);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      id="product-detail-card"
      className="relative w-full max-w-3xl bg-ivory rounded-t-[28px] sm:rounded-[32px] border border-oat-dark shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Close Button */}
      <button
        onClick={onClose}
        id="product-modal-close-btn"
        aria-label="Close product details"
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-ivory/90 backdrop-blur-md text-espresso hover:text-terracotta border border-oat-dark shadow-sm transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Scrollable Content Container */}
      <div className="overflow-y-auto flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Image Section */}
          <div className="md:col-span-6 relative aspect-square sm:aspect-[4/4.5] md:aspect-auto md:min-h-full bg-oat">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent md:hidden" />

            {/* Category pill on image */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-ivory/95 backdrop-blur-sm text-xs font-semibold text-terracotta uppercase tracking-wider border border-oat-dark">
                {product.category}
              </span>
              {product.egglessAvailable && (
                <span className="px-3 py-1 rounded-full bg-ivory/95 backdrop-blur-sm text-xs font-semibold text-sage uppercase tracking-wider border border-oat-dark">
                  Eggless Available
                </span>
              )}
            </div>
          </div>

          {/* Right Product Details Section */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Title & Tagline */}
              <h2 className="font-serif text-2xl sm:text-3xl text-espresso font-medium leading-snug mb-1">
                {product.name}
              </h2>
              <p className="text-xs sm:text-[13px] text-terracotta font-medium mb-4">
                {product.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-espresso-muted leading-relaxed mb-6 font-normal">
                {product.longDescription || product.description}
              </p>

              {/* Ingredients Highlights */}
              <div className="mb-6 p-3.5 rounded-2xl bg-oat-light border border-oat-dark">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-espresso-subtle block mb-1.5">
                  Honest Ingredients
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredientsHighlight.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-ivory text-espresso-muted border border-oat-dark/70"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-espresso">
                    Select Size / Quantity
                  </span>
                  {selectedSize.servings && (
                    <span className="text-[11px] text-espresso-subtle">
                      {selectedSize.servings}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize.id === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-espresso text-ivory border-espresso shadow-xs'
                            : 'bg-oat-light border-oat-dark text-espresso-light hover:border-espresso/40'
                        }`}
                      >
                        <span className="text-xs font-semibold block">{size.label}</span>
                        <span
                          className={`text-[10.5px] block ${
                            isSelected ? 'text-ivory/80' : 'text-espresso-muted'
                          }`}
                        >
                          ₹{size.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Cake Message (especially valuable for cakes & celebration bakes) */}
              <div className="mb-5">
                <label
                  htmlFor="cake-custom-message"
                  className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-espresso mb-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-terracotta" />
                  <span>Piping Message on Cake (Optional)</span>
                </label>
                <input
                  id="cake-custom-message"
                  type="text"
                  maxLength={35}
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  placeholder="e.g. Happy 30th Ananya! / Best Wishes"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta/60 focus:bg-ivory transition-colors"
                />
                <span className="text-[10px] text-espresso-subtle block mt-1">
                  Hand-piped on chocolate plaque or cake surface.
                </span>
              </div>

              {/* Special Dietary / Instructions */}
              <div className="mb-5">
                <label
                  htmlFor="special-instructions"
                  className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1.5"
                >
                  Baker&apos;s Notes / Eggless Preference
                </label>
                <input
                  id="special-instructions"
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Please make 100% eggless / less sweet"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta/60 focus:bg-ivory transition-colors"
                />
              </div>

              {/* Notice & Lead Time */}
              <div className="flex items-center space-x-2 text-[11.5px] text-espresso-muted mb-6">
                <Clock className="w-3.5 h-3.5 text-terracotta shrink-0" />
                <span>Requires {product.leadTimeHours}h advance notice for fresh preparation.</span>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-oat-dark flex items-center justify-between gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center border border-espresso/20 rounded-full bg-oat-light px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="p-1.5 text-espresso-muted hover:text-espresso disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-espresso">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="p-1.5 text-espresso-muted hover:text-espresso"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                id="modal-add-to-cart-btn"
                className={`flex-grow py-3 px-6 rounded-full text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 active:scale-98 shadow-sm ${
                  isAdded
                    ? 'bg-sage text-ivory border border-sage'
                    : 'bg-espresso text-ivory hover:bg-espresso-light'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Your Bakes</span>
                  </>
                ) : (
                  <>
                    <span>Add to Cart</span>
                    <span>•</span>
                    <span className="font-semibold">₹{currentPrice}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 bg-espresso/55 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <ProductDetailContent
        key={product.id}
        product={product}
        onClose={onClose}
      />
    </div>
  );
}
