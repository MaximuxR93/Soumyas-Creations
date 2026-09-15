export interface BakeryConfig {
  name: string;
  descriptor: string;
  tagline: string;
  location: string;
  city: string;
  whatsapp: string; // international digits without plus, e.g. 919830124567
  displayPhone: string;
  instagram: string;
  instagramHandle: string;
  email: string;
  advanceNoticeHours: number;
  pickupStudio: string;
  deliveryAreas: string;
  orderHours: string;
  disclaimer: string;
}

export const bakeryConfig: BakeryConfig = {
  name: 'Soumya Chakroborty',
  descriptor: 'HOME BAKED • KOLKATA',
  tagline: 'Sweet moments, made at home.',
  location: 'Salt Lake & South Kolkata, West Bengal, India',
  city: 'Kolkata',
  whatsapp: '919830124567',
  displayPhone: '+91 98301 24567',
  instagram: 'https://instagram.com/soumyabakes.kolkata',
  instagramHandle: '@soumyabakes.kolkata',
  email: 'hello@soumyachakroborty.in',
  advanceNoticeHours: 24,
  pickupStudio: 'Salt Lake Sector 1, Kolkata 700064 (By Appointment)',
  deliveryAreas: 'Hand-delivered across Kolkata (Salt Lake, New Town, South Kolkata, Alipore, Ballygunge)',
  orderHours: 'Tuesday – Sunday, 10:00 AM – 7:30 PM',
  disclaimer: 'All bakes are prepared fresh to order in small batches. We recommend booking 24–48 hours in advance for celebration cakes.',
};
