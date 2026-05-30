import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import '../../styles/flaticon.css';
import 'swiper/css';
import 'swiper/css/bundle';

import '../../styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GoTop from '@/components/Layout/GoTop';
import Settings from '@/components/Layout/Settings';

const interSans = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Send Money | Fast & Secure Money Transfer',
  description:
    'Send money worldwide with fast, secure, and low-cost international money transfer services. Trusted global payments and currency exchange.',

  keywords:
    'send money, international money transfer, fast money transfer, secure money transfer, low-cost money transfer, global payments, currency exchange, remittance services, online money transfer',

  authors: [{ name: 'The Send Money Team', url: 'https://thesendmoney.com' }],
  openGraph: {
    title: 'The Send Money | International Money Transfer',
    description:
      'Send money worldwide with fast, secure, and low-cost international money transfer services. Trusted global payments and currency exchange.',
    url: 'https://thesendmoney.com',
    siteName: 'The Send Money',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable}`}>
        {children}

        <GoTop />

        <Settings />
      </body>
    </html>
  );
}
