"use client";

import { useState } from "react";

export function NewsletterCTA() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [alertStatus, setAlertStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        setNewsletterStatus("success");
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
      }
    } catch {
      setNewsletterStatus("error");
    }
  };

  const handleAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;

    setAlertStatus("loading");
    try {
      const res = await fetch("/api/property-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: alertEmail }),
      });
      if (res.ok) {
        setAlertStatus("success");
        setAlertEmail("");
      } else {
        setAlertStatus("error");
      }
    } catch {
      setAlertStatus("error");
    }
  };

  return (
    <section className="cta-section">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Newsletter Column */}
          <div>
            <h3 className="cta-heading">Weekly Newsletter</h3>
            <p className="text-[13px] text-white/70 leading-relaxed mb-6">
              Curated insights on mid-century modern architecture. New listings, market analysis, preservation news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="cta-input"
                placeholder="EMAIL ADDRESS"
                required
                disabled={newsletterStatus === "loading"}
              />
              <button
                type="submit"
                className="cta-btn whitespace-nowrap"
                disabled={newsletterStatus === "loading"}
              >
                {newsletterStatus === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
            {newsletterStatus === "success" && (
              <p className="text-[10px] text-gold mt-3 tracking-[0.1em]">SUBSCRIBED SUCCESSFULLY</p>
            )}
            {newsletterStatus === "error" && (
              <p className="text-[10px] text-red mt-3 tracking-[0.1em]">ERROR - PLEASE TRY AGAIN</p>
            )}
            <p className="text-[9px] text-white/40 mt-3 tracking-[0.1em]">
              NO SPAM // UNSUBSCRIBE ANYTIME
            </p>
          </div>

          {/* Property Alerts Column */}
          <div>
            <h3 className="cta-heading">Property Alerts</h3>
            <p className="text-[13px] text-white/70 leading-relaxed mb-6">
              Get notified when properties matching your criteria become available. Set alerts by architect, location, or price range.
            </p>
            <form onSubmit={handleAlertSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
                className="cta-input"
                placeholder="EMAIL ADDRESS"
                required
                disabled={alertStatus === "loading"}
              />
              <button
                type="submit"
                className="cta-btn whitespace-nowrap"
                disabled={alertStatus === "loading"}
              >
                {alertStatus === "loading" ? "..." : "Create Alert"}
              </button>
            </form>
            {alertStatus === "success" && (
              <p className="text-[10px] text-gold mt-3 tracking-[0.1em]">ALERT CREATED SUCCESSFULLY</p>
            )}
            {alertStatus === "error" && (
              <p className="text-[10px] text-red mt-3 tracking-[0.1em]">ERROR - PLEASE TRY AGAIN</p>
            )}
            <p className="text-[9px] text-white/40 mt-3 tracking-[0.1em]">
              INSTANT NOTIFICATIONS // CUSTOMIZABLE FILTERS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
