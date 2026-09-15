import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Soumya Chakroborty — Handcrafted Homemade Bakery, Kolkata',
  description:
    'Handcrafted cakes, fudgy brownies, and artisanal celebration bakes made in small batches in Kolkata with honest ingredients and familiar flavours.',
  openGraph: {
    title: 'Soumya Chakroborty — Handcrafted Homemade Bakery, Kolkata',
    description:
      'Handcrafted cakes, fudgy brownies, and artisanal celebration bakes made in small batches in Kolkata with honest ingredients and familiar flavours.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soumya Chakroborty — Handcrafted Homemade Bakery, Kolkata',
    description:
      'Handcrafted cakes, fudgy brownies, and artisanal celebration bakes made in small batches in Kolkata with honest ingredients and familiar flavours.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ivory text-espresso font-sans selection:bg-blush selection:text-espresso" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
