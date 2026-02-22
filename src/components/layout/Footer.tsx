"use client";

import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Subscribed!");
        setEmail("");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 3000);
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.error || "Failed to subscribe");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  return (
    <footer className="footer-v2 relative z-10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          {/* Logo */}
          <div className="text-sm font-bold tracking-[0.1em] uppercase">
            USONIAN
          </div>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 flex-1 max-w-md w-full"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="footer-v2-input flex-1 px-4 py-3 text-xs font-mono tracking-wide"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="footer-v2-btn px-5 py-3 text-[11px] font-bold tracking-[0.1em] uppercase"
            >
              {status === "loading" ? "..." : status === "success" ? message : "Subscribe"}
            </button>
          </form>

          {/* Copyright */}
          <div className="text-[11px] tracking-wide opacity-80">
            &copy; {currentYear} Usonian
          </div>
        </div>
      </div>
    </footer>
  );
}
