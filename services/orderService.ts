import { Order, CustomerInfo, CartItem, Product } from '@/types/bakery';
import { products as localProducts } from '@/data/products';

/**
 * Service layer prepared for future backend endpoints:
 * - POST /api/orders
 * - GET /api/products
 * - POST /api/contact
 */

export interface OrderSubmissionResult {
  success: boolean;
  order: Order;
  orderId: string;
  message: string;
}

export const orderService = {
  /**
   * Fetches current available products (ready to switch to GET /api/products in production)
   */
  async getProducts(): Promise<Product[]> {
    // In production, this can call `fetch('/api/products')`
    return Promise.resolve(localProducts);
  },

  /**
   * Submits a structured order (ready to call POST /api/orders)
   */
  async submitOrder(customer: CustomerInfo, items: CartItem[]): Promise<OrderSubmissionResult> {
    const subtotal = items.reduce((sum, item) => sum + item.selectedSize.price * item.quantity, 0);
    const deliveryFeeEstimated = customer.deliveryMethod === 'delivery' ? 0 : 0; // delivery settled at actuals via Porter/Dunzo
    const total = subtotal + deliveryFeeEstimated;

    const orderId = `SC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const order: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      items,
      subtotal,
      deliveryFeeEstimated,
      total,
      status: 'pending_whatsapp',
    };

    // Save recent order locally so user can review it or re-open
    try {
      if (typeof window !== 'undefined') {
        const recentOrders = JSON.parse(localStorage.getItem('sc_recent_orders') || '[]');
        recentOrders.unshift(order);
        localStorage.setItem('sc_recent_orders', JSON.stringify(recentOrders.slice(0, 5)));
      }
    } catch {
      // ignore storage errors
    }

    // In a future backend iteration:
    // await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });

    return {
      success: true,
      order,
      orderId,
      message: 'Order created successfully. Ready for WhatsApp confirmation.',
    };
  },

  /**
   * Handles contact form submission (ready to call POST /api/contact)
   */
  async submitContact(inquiry: { name: string; phone: string; occasion?: string; message: string }) {
    // Future backend endpoint integration
    return Promise.resolve({ success: true, inquiryId: `INQ-${Date.now()}` });
  },
};
