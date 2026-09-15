import { bakeryConfig } from '@/config/bakery';
import { Order } from '@/types/bakery';

/**
 * Generates a cleanly structured WhatsApp order message matching the requested format.
 */
export function createWhatsAppOrderMessage(order: Order): string {
  const itemsText = order.items
    .map((item) => {
      const sizeDetail = item.selectedSize?.label ? ` (${item.selectedSize.label})` : '';
      const messageDetail = item.cakeMessage ? `\n    • Inscription: "${item.cakeMessage}"` : '';
      const specialInstructions = item.specialInstructions ? `\n    • Note: ${item.specialInstructions}` : '';
      return `• ${item.product.name}${sizeDetail} × ${item.quantity} — ₹${item.selectedSize.price * item.quantity}${messageDetail}${specialInstructions}`;
    })
    .join('\n');

  const deliveryMethodLabel =
    order.customer.deliveryMethod === 'pickup'
      ? `Self Pickup from ${bakeryConfig.pickupStudio}`
      : `Doorstep Delivery to: ${order.customer.address}${
          order.customer.landmark ? ` (Landmark: ${order.customer.landmark})` : ''
        }${order.customer.pincode ? `, Kolkata - ${order.customer.pincode}` : ''}`;

  const message = `Hello Soumya! I would like to place an order.

Order:
${itemsText}

Subtotal: ₹${order.subtotal}
Total: ₹${order.total}

Name: ${order.customer.name}
Phone: ${order.customer.phone}
Fulfillment: ${deliveryMethodLabel}
Preferred Date: ${order.customer.preferredDate || 'Earliest available'}
Preferred Time: ${order.customer.preferredTimeSlot || 'Standard afternoon'}
${order.customer.orderNotes ? `Special instructions: ${order.customer.orderNotes}\n` : ''}
Thank you!`;

  return message;
}

/**
 * Builds the direct WhatsApp click-to-chat URL with the encoded message
 */
export function getWhatsAppOrderUrl(order: Order): string {
  const message = createWhatsAppOrderMessage(order);
  const cleanNumber = bakeryConfig.whatsapp.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a friendly general inquiry WhatsApp link
 */
export function getWhatsAppInquiryUrl(topic?: string): string {
  const cleanNumber = bakeryConfig.whatsapp.replace(/[^0-9]/g, '');
  const text = topic
    ? `Hello Soumya! I would like to inquire about: ${topic}. Could you share your availability?`
    : `Hello Soumya! I was browsing your bakery website and would love to ask about your bakes and custom orders.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
