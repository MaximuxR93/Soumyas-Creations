'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, Product, ProductSize } from '@/types/bakery';

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: Product,
    selectedSize: ProductSize,
    quantity?: number,
    cakeMessage?: string,
    specialInstructions?: string
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sc_bakery_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error('Failed to load cart from storage', e);
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Sync to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items]);

  const addItem = (
    product: Product,
    selectedSize: ProductSize,
    quantity: number = 1,
    cakeMessage?: string,
    specialInstructions?: string
  ) => {
    setItems((prevItems) => {
      // Find matching item with identical size & identical customization
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedSize.id === selectedSize.id &&
          (item.cakeMessage || '') === (cakeMessage || '') &&
          (item.specialInstructions || '') === (specialInstructions || '')
      );

      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      const newItem: CartItem = {
        id: `${product.id}-${selectedSize.id}-${Date.now()}`,
        productId: product.id,
        product,
        selectedSize,
        quantity,
        cakeMessage: cakeMessage?.trim() || undefined,
        specialInstructions: specialInstructions?.trim() || undefined,
      };

      return [...prevItems, newItem];
    });

    // Gently open cart drawer to give user immediate feedback
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.selectedSize.price * item.quantity, 0);
  }, [items]);

  const totalItemsCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const openProductDetail = (product: Product) => {
    setSelectedProductForDetail(product);
  };

  const closeProductDetail = () => {
    setSelectedProductForDetail(null);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        openProductDetail,
        closeProductDetail,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
