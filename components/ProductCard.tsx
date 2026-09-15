'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Check, Eye } from 'lucide-react';
import { Product, ProductSize } from '@/types/bakery';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, openProductDetail } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes.find((s) => s.isDefault) || product.sizes[0]
  );
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedSize, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleCardClick = () => {
    openProductDetail(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group cursor-pointer relative flex flex-col rounded-[22px] sm:rounded-[26px] bg-ivory border border-oat-dark/90 hover:border-espresso/25 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_16px_rgba(39,30,25,0.02)] hover:shadow-[0_12px_28px_rgba(39,30,25,0.06)] overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3.7] overflow-hidden bg-oat">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 pointer-events-none">
          {product.egglessAvailable && (
            <span className="px-2.5 py-0.5 rounded-full bg-ivory/95 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold text-sage border border-oat-dark">
              Eggless Avail.
            </span>
          )}
          {product.tags.includes('Bestseller') && (
            <span className="px-2.5 py-0.5 rounded-full bg-terracotta text-ivory text-[10px] uppercase tracking-wider font-semibold shadow-xs">
              Favourite
            </span>
          )}
        </div>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 bg-espresso/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-ivory text-espresso text-xs font-medium shadow-md">
            <Eye className="w-3.5 h-3.5 text-terracotta" />
            <span>View Details</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Category Eyebrow */}
          <span className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-terracotta/90 block mb-1">
            {product.category}
          </span>

          {/* Product Title */}
          <h3 className="font-serif text-xl sm:text-[1.35rem] font-medium text-espresso leading-snug group-hover:text-terracotta-dark transition-colors mb-2">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-[13px] text-espresso-muted line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Size Selector Pills (if multiple sizes exist) */}
        <div className="pt-2 border-t border-oat-dark/60">
          {product.sizes.length > 1 && (
            <div
              className="flex items-center gap-1.5 mb-3.5 overflow-x-auto pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {product.sizes.map((size) => {
                const isCurrent = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium transition-all ${
                      isCurrent
                        ? 'bg-espresso text-ivory border-espresso'
                        : 'bg-oat-light/80 text-espresso-muted border-oat-dark hover:border-espresso/30'
                    }`}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Price & Add to Cart Action */}
          <div className="flex items-center justify-between mt-1">
            <div>
              <span className="text-[11px] text-espresso-subtle block -mb-0.5">
                {selectedSize.label ? `${selectedSize.label}` : 'Price'}
              </span>
              <span className="font-serif text-xl sm:text-[1.35rem] font-semibold text-espresso">
                ₹{selectedSize.price}
              </span>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleQuickAdd}
              type="button"
              id={`quick-add-${product.id}`}
              className={`px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-xs font-medium tracking-wide flex items-center space-x-1.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta active:scale-95 ${
                justAdded
                  ? 'bg-sage text-ivory border border-sage'
                  : 'bg-espresso text-ivory hover:bg-espresso-light shadow-xs'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
