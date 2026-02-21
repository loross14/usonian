"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-sand">
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl md:text-2xl text-charcoal">
              Usonian
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/homes"
              className="text-sm font-medium text-charcoal hover:text-terracotta transition-colors"
            >
              Homes
            </Link>
            <Link
              href="/architects"
              className="text-sm font-medium text-charcoal hover:text-terracotta transition-colors"
            >
              Learn
            </Link>
            <span className="text-sm font-medium text-slate-light cursor-default">
              Map
              <span className="text-xs ml-1 opacity-60">(soon)</span>
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
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
          <div className="md:hidden py-4 border-t border-sand">
            <div className="flex flex-col gap-4">
              <Link
                href="/homes"
                className="text-base font-medium text-charcoal hover:text-terracotta transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Homes
              </Link>
              <Link
                href="/architects"
                className="text-base font-medium text-charcoal hover:text-terracotta transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Learn
              </Link>
              <span className="text-base font-medium text-slate-light">
                Map
                <span className="text-sm ml-1 opacity-60">(soon)</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
