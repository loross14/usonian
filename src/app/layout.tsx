import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Usonian",
  description:
    "Discover exceptional architect-designed homes by master architects. A curated collection of architectural landmarks.",
  keywords: [
    "architecture",
    "architect-designed homes",
    "homes for sale",
    "John Lautner",
    "E. Fay Jones",
    "Frank Lloyd Wright",
    "organic architecture",
  ],
  icons: {
    icon: "/icons/Usonian-Logo.png",
    apple: "/icons/Usonian-Logo.png",
  },
};

const showHeader = process.env.NEXT_PUBLIC_DISABLE_HEADER !== 'true';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} ${playfair.variable}`}>
        <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />
        <div className="grid-overlay" />
        {showHeader && <Header />}
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
