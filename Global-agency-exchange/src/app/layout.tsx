import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "../../styles/flaticon.css";
import "swiper/css";
import "swiper/css/bundle";

// Globals Styles
import "../../styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GoTop from "@/components/Layout/GoTop";
import Settings from "@/components/Layout/Settings";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expa - React Nextjs Currency Exchange & Money Transfer Template",
  description:
    "Expa is a modern React and Next.js template designed for currency exchange and money transfer websites. It offers a clean design, fast performance, and all the essential features to build secure and professional fintech platforms.",
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
