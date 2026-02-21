import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 pb-10 border-b border-white/10 mb-10">
          {/* Logo */}
          <div className="footer-logo">USONIAN</div>

          {/* Navigation */}
          <nav className="footer-nav flex flex-wrap gap-5 md:gap-10">
            <Link href="/homes">Homes</Link>
            <Link href="/architects">Architects</Link>
            <Link href="mailto:hello@usonian.com">Contact</Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">
            USONIAN / Architect-Designed Homes
          </div>
          <div className="text-[10px] uppercase tracking-[0.1em] text-gold/70">
            v.3.0.1 / {currentYear}
          </div>
        </div>
      </div>
    </footer>
  );
}
