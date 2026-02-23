"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SiteHeaderProps {
  /** Override automatic breadcrumb with custom items */
  breadcrumbs?: BreadcrumbItem[];
  /** Current page title (last item in breadcrumb, not clickable) */
  title?: string;
}

/**
 * Site header with 3-column layout:
 * - Left: Logo
 * - Center: Breadcrumb/Title (clickable navigation)
 * - Right: Animated flag + subtitle
 */
export function SiteHeader({ breadcrumbs, title }: SiteHeaderProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if not provided
  const generatedBreadcrumbs = breadcrumbs || generateBreadcrumbs(pathname, title);

  return (
    <header className="site-header">
      <div className="container py-6 md:py-8">
        <div className="site-header-grid">
          {/* Left: Logo */}
          <div className="site-header-col site-header-col--left">
            <Link href="/" className="site-header-logo-link">
              <img
                src="/icons/Usonian-Logo.png"
                alt="Usonian"
                className="site-header-logo animate-fade-up"
              />
            </Link>
          </div>

          {/* Center: Breadcrumb/Title */}
          <div className="site-header-col site-header-col--center">
            <nav className="site-breadcrumb animate-fade-up" aria-label="Breadcrumb">
              {generatedBreadcrumbs.map((item, index) => (
                <span key={index} className="site-breadcrumb-item">
                  {index > 0 && <span className="site-breadcrumb-slash">/</span>}
                  {item.href ? (
                    <Link href={item.href} className="site-breadcrumb-link">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="site-breadcrumb-current">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Right: Flag + Subtitle */}
          <div className="site-header-col site-header-col--right">
            <div className="site-header-flag-group animate-fade-up">
              <div className="site-header-flag">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" className="w-full h-full">
                  <defs>
                    <radialGradient id="sh-redBalloon" cx="30%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="#FF6B6B"/>
                      <stop offset="100%" stopColor="#E63946"/>
                    </radialGradient>
                    <radialGradient id="sh-whiteBalloon" cx="30%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="#FFFFFF"/>
                      <stop offset="100%" stopColor="#F0F0F0"/>
                    </radialGradient>
                    <radialGradient id="sh-blueBalloon" cx="30%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="#6B9FC4"/>
                      <stop offset="100%" stopColor="#457B9D"/>
                    </radialGradient>
                    <style>{`
                      .sh-stripe{opacity:0.9}
                      .sh-star{opacity:0.95}
                      .sh-float1{animation:sh-float1 4s ease-in-out infinite}
                      .sh-float2{animation:sh-float2 5s ease-in-out infinite}
                      .sh-float3{animation:sh-float3 4.5s ease-in-out infinite}
                      .sh-float4{animation:sh-float4 3.8s ease-in-out infinite}
                      .sh-sway{animation:sh-sway 6s ease-in-out infinite}
                      @keyframes sh-float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
                      @keyframes sh-float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
                      @keyframes sh-float3{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
                      @keyframes sh-float4{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
                      @keyframes sh-sway{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}}
                    `}</style>
                  </defs>
                  <g className="sh-sway" style={{transformOrigin:'320px 100px'}}>
                    <g className="sh-stripes">
                      <g className="sh-float1"><rect className="sh-stripe" x="180" y="30" width="280" height="12" rx="6" fill="url(#sh-redBalloon)"/></g>
                      <g className="sh-float2"><rect className="sh-stripe" x="190" y="48" width="260" height="12" rx="6" fill="url(#sh-whiteBalloon)"/></g>
                      <g className="sh-float3"><rect className="sh-stripe" x="200" y="66" width="240" height="12" rx="6" fill="url(#sh-redBalloon)"/></g>
                      <g className="sh-float1"><rect className="sh-stripe" x="210" y="84" width="220" height="12" rx="6" fill="url(#sh-whiteBalloon)"/></g>
                      <g className="sh-float4"><rect className="sh-stripe" x="220" y="102" width="200" height="12" rx="6" fill="url(#sh-redBalloon)"/></g>
                      <g className="sh-float2"><rect className="sh-stripe" x="230" y="120" width="180" height="12" rx="6" fill="url(#sh-whiteBalloon)"/></g>
                      <g className="sh-float3"><rect className="sh-stripe" x="240" y="138" width="160" height="12" rx="6" fill="url(#sh-redBalloon)"/></g>
                    </g>
                    <g className="sh-union">
                      <rect x="180" y="30" width="90" height="66" rx="8" fill="url(#sh-blueBalloon)" className="sh-float1"/>
                      <g className="sh-stars">
                        <polygon className="sh-star sh-float2" points="198,38 199.5,40.5 202.2,41 200.1,43 200.6,45.8 198,44.4 195.4,45.8 195.9,43 193.8,41 196.5,40.5" fill="white"/>
                        <polygon className="sh-star sh-float3" points="218,38 219.5,40.5 222.2,41 220.1,43 220.6,45.8 218,44.4 215.4,45.8 215.9,43 213.8,41 216.5,40.5" fill="white"/>
                        <polygon className="sh-star sh-float4" points="238,38 239.5,40.5 242.2,41 240.1,43 240.6,45.8 238,44.4 235.4,45.8 235.9,43 233.8,41 236.5,40.5" fill="white"/>
                        <polygon className="sh-star sh-float1" points="255,38 256.5,40.5 259.2,41 257.1,43 257.6,45.8 255,44.4 252.4,45.8 252.9,43 250.8,41 253.5,40.5" fill="white"/>
                        <polygon className="sh-star sh-float4" points="208,51 209.5,53.5 212.2,54 210.1,56 210.6,58.8 208,57.4 205.4,58.8 205.9,56 203.8,54 206.5,53.5" fill="white"/>
                        <polygon className="sh-star sh-float2" points="228,51 229.5,53.5 232.2,54 230.1,56 230.6,58.8 228,57.4 225.4,58.8 225.9,56 223.8,54 226.5,53.5" fill="white"/>
                        <polygon className="sh-star sh-float3" points="248,51 249.5,53.5 252.2,54 250.1,56 250.6,58.8 248,57.4 245.4,58.8 245.9,56 243.8,54 246.5,53.5" fill="white"/>
                        <polygon className="sh-star sh-float1" points="198,64 199.5,66.5 202.2,67 200.1,69 200.6,71.8 198,70.4 195.4,71.8 195.9,69 193.8,67 196.5,66.5" fill="white"/>
                        <polygon className="sh-star sh-float3" points="218,64 219.5,66.5 222.2,67 220.1,69 220.6,71.8 218,70.4 215.4,71.8 215.9,69 213.8,67 216.5,66.5" fill="white"/>
                        <polygon className="sh-star sh-float2" points="238,64 239.5,66.5 242.2,67 240.1,69 240.6,71.8 238,70.4 235.4,71.8 235.9,69 233.8,67 236.5,66.5" fill="white"/>
                        <polygon className="sh-star sh-float4" points="255,64 256.5,66.5 259.2,67 257.1,69 257.6,71.8 255,70.4 252.4,71.8 252.9,69 250.8,67 253.5,66.5" fill="white"/>
                        <polygon className="sh-star sh-float2" points="208,77 209.5,79.5 212.2,80 210.1,82 210.6,84.8 208,83.4 205.4,84.8 205.9,82 203.8,80 206.5,79.5" fill="white"/>
                        <polygon className="sh-star sh-float1" points="228,77 229.5,79.5 232.2,80 230.1,82 230.6,84.8 228,83.4 225.4,84.8 225.9,82 223.8,80 226.5,79.5" fill="white"/>
                        <polygon className="sh-star sh-float4" points="248,77 249.5,79.5 252.2,80 250.1,82 250.6,84.8 248,83.4 245.4,84.8 245.9,82 243.8,80 246.5,79.5" fill="white"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <p className="site-header-subtitle">
                CELEBRATING 250 YEARS OF<br />AMERICAN ARCHITECTURE.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Generate breadcrumbs from pathname
 */
function generateBreadcrumbs(pathname: string, title?: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return [{ label: "USONIAN" }];
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "USONIAN", href: "/" },
  ];

  // Build path progressively
  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Format segment label
    let label = segment.toUpperCase().replace(/-/g, " ");

    // Use provided title for last segment if available
    if (isLast && title) {
      label = title.toUpperCase();
    }

    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  });

  return breadcrumbs;
}
