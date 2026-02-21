import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Usonian | Curated Architect-Designed Homes",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable}`}>
        <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
