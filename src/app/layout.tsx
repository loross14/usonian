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
    icon: [
      { url: "/icons/usonian-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/usonian-favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/usonian-apple-touch-icon.png",
  },
};

const showHeader = false;

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
