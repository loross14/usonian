import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.dwell.com" },
      { protocol: "https", hostname: "www.laconservancy.org" },
      { protocol: "https", hostname: "www.gettyimages.com" },
      { protocol: "https", hostname: "www.archdaily.com" },
      { protocol: "https", hostname: "en.wikiarquitectura.com" },
      { protocol: "https", hostname: "visitpalmsprings.com" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "www.instagram.com" },
      { protocol: "https", hostname: "en.wikipedia.org" },
      { protocol: "https", hostname: "www.flickr.com" },
      { protocol: "https", hostname: "www.zillow.com" },
      { protocol: "https", hostname: "www.redfin.com" },
      { protocol: "https", hostname: "www.moma.org" },
      { protocol: "https", hostname: "azarchitecture.com" },
      { protocol: "https", hostname: "www.petersmargedanthouse.com" },
      { protocol: "https", hostname: "www.eichlernetwork.com" },
      { protocol: "https", hostname: "tafelalbertlighthouse.com" },
      { protocol: "https", hostname: "phlf.org" },
      { protocol: "https", hostname: "iheartpgh.com" },
      { protocol: "https", hostname: "architizer.com" },
      { protocol: "https", hostname: "www.abdow.org" },
      { protocol: "https", hostname: "www.efayjonesconservancy.org" },
      { protocol: "https", hostname: "virtualglobetrotting.com" },
      { protocol: "https", hostname: "www.newsweek.com" },
      { protocol: "https", hostname: "jerseydigs.com" },
      { protocol: "http", hostname: "www.mcmtn.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
