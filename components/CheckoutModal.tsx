'use client';

import React, { useState, useEffect } from 'react';
import { X, MessageCircle, ArrowLeft, CheckCircle2, Calendar, MapPin, Phone, User, Clock, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CustomerInfo, Order } from '@/types/bakery';
import { bakeryConfig } from '@/config/bakery';
import { orderService } from '@/services/orderService';
import { getWhatsAppOrderUrl } from '@/utils/whatsapp';

export function CheckoutModal() {
  const { items, subtotal, isCheckoutOpen, closeCheckout, clearCart } = useCart();

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    deliveryMethod: 'delivery',
    address: '',
    landmark: '',
    pincode: '',
    preferredDate: '',
    preferredTimeSlot: 'Afternoon (2:00 PM – 5:00 PM)',
    orderNotes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleModalClose = () => {
    setConfirmedOrder(null);
    closeCheckout();
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!customer.name.trim()) errors.name = 'Please provide your full name.';
    if (!customer.phone.trim() || customer.phone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit Indian phone number.';
    }
    if (customer.deliveryMethod === 'delivery' && !customer.address.trim()) {
      errors.address = 'Please specify your Kolkata delivery address.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await orderService.submitOrder(customer, items);
      setConfirmedOrder(result.order);
      // Open WhatsApp automatically in a new window/tab
      const whatsappUrl = getWhatsAppOrderUrl(result.order);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      // Clear cart once order is structured
      clearCart();
    } catch (err) {
      console.error('Failed to submit order', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={handleModalClose}
    >
      <div
        id="checkout-modal-container"
        className="relative w-full max-w-2xl bg-ivory rounded-t-[28px] sm:rounded-[32px] border border-oat-dark shadow-2xl overflow-hidden max-h-[94vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-oat-dark flex items-center justify-between bg-oat-light/60">
          <div className="flex items-center space-x-2">
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-espresso">
              {confirmedOrder ? 'Order Ready for Confirmation' : 'Order & Delivery Details'}
            </h2>
          </div>
          <button
            onClick={handleModalClose}
            aria-label="Close checkout"
            className="p-2 text-espresso-muted hover:text-espresso rounded-full border border-oat-dark hover:bg-oat transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-grow">
          {confirmedOrder ? (
            /* Order Success State with WhatsApp Action */
            <div className="text-center py-6 sm:py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-sage/15 text-sage mx-auto flex items-center justify-center border border-sage/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-terracotta font-semibold block mb-1">
                  ORDER REFERENCE #{confirmedOrder.id}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-espresso font-medium">
                  We&apos;re ready to bake!
                </h3>
                <p className="text-xs sm:text-sm text-espresso-muted max-w-md mx-auto mt-2 leading-relaxed">
                  Your order details have been assembled. Since all our creations are made fresh in our home studio, we finalize delivery timing and payment directly on WhatsApp.
                </p>
              </div>

              {/* Order Quick Summary Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-oat border border-oat-dark text-left space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between text-xs text-espresso-muted border-b border-oat-dark pb-2">
                  <span>Customer:</span>
                  <span className="font-medium text-espresso">{confirmedOrder.customer.name}</span>
                </div>
                <div className="flex justify-between text-xs text-espresso-muted border-b border-oat-dark pb-2">
                  <span>Items:</span>
                  <span className="font-medium text-espresso">
                    {confirmedOrder.items.map((i) => `${i.product.name} (${i.selectedSize.label}) × ${i.quantity}`).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-espresso-muted border-b border-oat-dark pb-2">
                  <span>Fulfillment:</span>
                  <span className="font-medium text-espresso">
                    {confirmedOrder.customer.deliveryMethod === 'pickup'
                      ? 'Self Pickup (Salt Lake)'
                      : `Kolkata Delivery (${confirmedOrder.customer.address})`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-espresso pt-1">
                  <span className="font-serif font-medium">Order Total:</span>
                  <span className="font-serif text-lg font-bold">₹{confirmedOrder.total}</span>
                </div>
              </div>

              {/* Primary Action Button to Launch WhatsApp */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <a
                  href={getWhatsAppOrderUrl(confirmedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold tracking-wide flex items-center justify-center space-x-2.5 shadow-md hover:shadow-lg transition-all active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                  <span>Send Order to Soumya on WhatsApp</span>
                </a>

                <p className="text-[11px] text-espresso-subtle">
                  A pre-filled message with your selected bakes, address, and special cake message will open on your WhatsApp.
                </p>

                <button
                  onClick={handleModalClose}
                  className="text-xs text-espresso-muted hover:text-espresso underline underline-offset-4 pt-2"
                >
                  Back to Homepage
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Delivery or Pickup Toggle */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-2">
                  Fulfillment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, deliveryMethod: 'delivery' })}
                    className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                      customer.deliveryMethod === 'delivery'
                        ? 'bg-espresso text-ivory border-espresso shadow-xs'
                        : 'bg-oat-light border-oat-dark text-espresso-muted hover:border-espresso/40'
                    }`}
                  >
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold block">Kolkata Doorstep</span>
                      <span className="text-[10.5px] opacity-80 block mt-0.5">
                        Delivered fresh via Dunzo / Porter at actuals
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, deliveryMethod: 'pickup' })}
                    className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                      customer.deliveryMethod === 'pickup'
                        ? 'bg-espresso text-ivory border-espresso shadow-xs'
                        : 'bg-oat-light border-oat-dark text-espresso-muted hover:border-espresso/40'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold block">Self Pickup (Free)</span>
                      <span className="text-[10.5px] opacity-80 block mt-0.5">
                        Collect from Salt Lake, Sector 1
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1"
                  >
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-espresso-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="customer-name"
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="e.g. Priyadarshini Sen"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta focus:bg-ivory"
                    />
                  </div>
                  {formErrors.name && (
                    <span className="text-[10.5px] text-terracotta mt-1 block">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="customer-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1"
                  >
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-espresso-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="e.g. 98310 12345"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta focus:bg-ivory"
                    />
                  </div>
                  {formErrors.phone && (
                    <span className="text-[10.5px] text-terracotta mt-1 block">
                      {formErrors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery Address if doorstep is chosen */}
              {customer.deliveryMethod === 'delivery' && (
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="customer-address"
                      className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1"
                    >
                      Delivery Address (Kolkata) *
                    </label>
                    <textarea
                      id="customer-address"
                      rows={2}
                      required
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="Apartment / Flat number, Building name, Street, Locality (e.g. Salt Lake, Ballygunge, New Town, Alipore)"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta focus:bg-ivory"
                    />
                    {formErrors.address && (
                      <span className="text-[10.5px] text-terracotta mt-1 block">
                        {formErrors.address}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        value={customer.landmark || ''}
                        onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                        placeholder="Landmark (Optional)"
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta focus:bg-ivory"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={customer.pincode || ''}
                        onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                        placeholder="Pincode (e.g. 700091)"
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta focus:bg-ivory"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Date & Time Slot Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="preferred-date"
                    className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1"
                  >
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-espresso-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="preferred-date"
                      type="date"
                      value={customer.preferredDate}
                      onChange={(e) => setCustomer({ ...customer, preferredDate: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso focus:outline-none focus:border-terracotta focus:bg-ivory"
                    />
                  </div>
                  <span className="text-[10.5px] text-espresso-subtle mt-0.5 block">
                    Please allow minimum 24 hours notice.
                  </span>
                </div>

                <div>
                  <label
                    htmlFor="preferred-slot"
                    className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1"
                  >
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 text-espresso-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      id="preferred-slot"
                      value={customer.preferredTimeSlot}
                      onChange={(e) => setCustomer({ ...customer, preferredTimeSlot: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso focus:outline-none focus:border-terracotta focus:bg-ivory"
                    >
                      <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                      <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <label
                  htmlFor="order-notes"
                  className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1"
                >
                  Order Notes / Special Requests
                </label>
                <input
                  id="order-notes"
                  type="text"
                  value={customer.orderNotes || ''}
                  onChange={(e) => setCustomer({ ...customer, orderNotes: e.target.value })}
                  placeholder="e.g. Keep extra chilled, handle with delicate tier box, birthday candles please"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-oat-light border border-oat-dark text-espresso placeholder:text-espresso-subtle focus:outline-none focus:border-terracotta focus:bg-ivory"
                />
              </div>

              {/* Order Total Overview */}
              <div className="p-4 rounded-2xl bg-oat border border-oat-dark space-y-2">
                <div className="flex justify-between text-xs text-espresso-muted">
                  <span>Selected Bakes ({items.length} items):</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-espresso-muted">
                  <span>Delivery (Kolkata):</span>
                  <span>
                    {customer.deliveryMethod === 'pickup'
                      ? 'Free (Self Pickup)'
                      : 'Settled at actuals via Porter/Dunzo'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-espresso pt-2 border-t border-oat-dark">
                  <span className="font-serif text-base">Total Due to Bakery:</span>
                  <span className="font-serif text-xl font-bold">₹{subtotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  id="submit-order-whatsapp-btn"
                  className="w-full py-4 px-6 rounded-full bg-espresso hover:bg-espresso-light text-ivory text-sm font-medium tracking-wide flex items-center justify-center space-x-2.5 shadow-md active:scale-98 transition-all disabled:opacity-50"
                >
                  <MessageCircle className="w-4 h-4 text-terracotta" />
                  <span>
                    {submitting ? 'Generating Order Summary...' : 'Place Order & Connect on WhatsApp'}
                  </span>
                </button>
                <p className="text-center text-[11px] text-espresso-subtle mt-2">
                  No online payment is processed here. We verify availability with Soumya and share UPI/Bank details directly.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
