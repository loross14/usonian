import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal text-warm-white py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl">
                Usonian
              </span>
            </Link>
            <p className="mt-4 text-slate-light text-sm max-w-md">
              A curated collection of exceptional architect-designed homes.
              Celebrating architectural heritage from master designers.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-gold text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/homes"
                  className="text-sm text-slate-light hover:text-warm-white transition-colors"
                >
                  Homes
                </Link>
              </li>
              <li>
                <Link
                  href="/architects"
                  className="text-sm text-slate-light hover:text-warm-white transition-colors"
                >
                  Learn
                </Link>
              </li>
              <li>
                <span className="text-sm text-slate-light/60">
                  Map <span className="text-xs">(coming soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-gold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <p className="text-sm text-slate-light">
              For inquiries about featured properties or to submit a listing.
            </p>
            <a
              href="mailto:hello@usonian.com"
              className="inline-block mt-2 text-sm text-terracotta hover:text-terracotta-dark transition-colors"
            >
              hello@usonian.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate">
          <p className="text-xs text-slate-light text-center">
            &copy; {new Date().getFullYear()} Usonian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
