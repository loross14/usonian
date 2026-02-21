"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get current date for terminal display
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black">
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Terminal Style */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-[0.3em] uppercase">
              <span className="opacity-40">&gt; </span>USONIAN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/homes"
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-black opacity-50 hover:opacity-100 transition-opacity"
            >
              Homes
            </Link>
            <Link
              href="/architects"
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-black opacity-50 hover:opacity-100 transition-opacity"
            >
              Architects
            </Link>
          </div>

          {/* Coordinates Display - Desktop Only */}
          <div className="hidden lg:block text-[10px] tracking-[0.1em] opacity-40">
            SYS.ACTIVE // {dateStr}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-black">
            <div className="flex flex-col gap-4">
              <Link
                href="/homes"
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-black opacity-60 hover:opacity-100 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                Homes
              </Link>
              <Link
                href="/architects"
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-black opacity-60 hover:opacity-100 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                Architects
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
