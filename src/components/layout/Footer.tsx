"use client";

import { useState } from "react";
import Link from "next/link";

function RisingBalloons() {
  return (
    <svg
      viewBox="0 0 320 100"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
    >
      <style>
        {`
          @keyframes balloonFloat1 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          @keyframes balloonFloat2 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes balloonFloat3 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes stringSway1 {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(2deg); }
            75% { transform: rotate(-2deg); }
          }
          @keyframes stringSway2 {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-2deg); }
            75% { transform: rotate(2deg); }
          }
          .balloon-grp-1 { animation: balloonFloat1 3s ease-in-out infinite; transform-origin: center bottom; }
          .balloon-grp-2 { animation: balloonFloat2 4s ease-in-out infinite 0.5s; transform-origin: center bottom; }
          .balloon-grp-3 { animation: balloonFloat3 3.5s ease-in-out infinite 1s; transform-origin: center bottom; }
          .str-1 { animation: stringSway1 4s ease-in-out infinite; transform-origin: 50px 95px; }
          .str-2 { animation: stringSway2 4.5s ease-in-out infinite 0.3s; transform-origin: 85px 95px; }
          .str-3 { animation: stringSway1 3.8s ease-in-out infinite 0.6s; transform-origin: 150px 95px; }
          .str-4 { animation: stringSway2 4.2s ease-in-out infinite 0.9s; transform-origin: 175px 95px; }
          .str-5 { animation: stringSway1 4s ease-in-out infinite 1.2s; transform-origin: 235px 95px; }
          .str-6 { animation: stringSway2 3.7s ease-in-out infinite 1.5s; transform-origin: 265px 95px; }
        `}
      </style>
      {/* Strings */}
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15">
        <path className="str-1" d="M50,95 Q52,75 50,58" />
        <path className="str-2" d="M85,95 Q88,70 85,49" />
        <path className="str-3" d="M150,95 Q148,65 150,48" />
        <path className="str-4" d="M175,95 Q177,70 175,52" />
        <path className="str-5" d="M235,95 Q233,68 235,50" />
        <path className="str-6" d="M265,95 Q267,72 265,56" />
      </g>
      {/* Balloon Group 1 */}
      <g className="balloon-grp-1" opacity="0.12">
        <g stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="38" r="20" fill="currentColor" opacity="0.3" />
          <ellipse cx="50" cy="57" rx="4" ry="2.5" fill="currentColor" opacity="0.3" />
        </g>
        <g stroke="currentColor" strokeWidth="1.5">
          <circle cx="175" cy="35" r="16" fill="currentColor" opacity="0.25" />
          <ellipse cx="175" cy="50" rx="3" ry="2" fill="currentColor" opacity="0.25" />
        </g>
      </g>
      {/* Balloon Group 2 */}
      <g className="balloon-grp-2" opacity="0.12">
        <g stroke="currentColor" strokeWidth="1.5">
          <circle cx="85" cy="30" r="18" fill="currentColor" opacity="0.3" />
          <ellipse cx="85" cy="47" rx="3.5" ry="2.5" fill="currentColor" opacity="0.3" />
        </g>
        <g stroke="currentColor" strokeWidth="1.5">
          <circle cx="235" cy="30" r="19" fill="currentColor" opacity="0.25" />
          <ellipse cx="235" cy="48" rx="3.5" ry="2.5" fill="currentColor" opacity="0.25" />
        </g>
      </g>
      {/* Balloon Group 3 */}
      <g className="balloon-grp-3" opacity="0.12">
        <g stroke="currentColor" strokeWidth="1.5">
          <circle cx="150" cy="26" r="22" fill="currentColor" opacity="0.3" />
          <ellipse cx="150" cy="47" rx="4.5" ry="2.5" fill="currentColor" opacity="0.3" />
        </g>
        <g stroke="currentColor" strokeWidth="1.5">
          <circle cx="265" cy="38" r="17" fill="currentColor" opacity="0.25" />
          <ellipse cx="265" cy="54" rx="3" ry="2" fill="currentColor" opacity="0.25" />
        </g>
      </g>
      {/* Decorative flags */}
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.5" opacity="0.08">
        <polygon points="15,22 25,17 25,27" />
        <polygon points="305,22 295,17 295,27" />
        <polygon points="115,18 125,13 125,23" />
        <polygon points="205,18 215,13 215,23" />
        <polygon points="25,78 35,73 35,83" />
        <polygon points="285,73 295,68 295,78" />
        <rect x="10" y="84" width="8" height="8" />
        <rect x="302" y="84" width="8" height="8" />
      </g>
    </svg>
  );
}

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
    <footer className="footer-v2 relative z-10 overflow-hidden">
      {/* Rising Balloons Animation Layer */}
      <RisingBalloons />
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          {/* Logo */}
          <div className="text-sm font-bold tracking-[0.1em] uppercase">
            USONIAN
          </div>

          {/* Navigation */}
          <nav className="flex gap-6 text-[11px] font-bold tracking-[0.1em] uppercase">
            <Link href="/homes" className="hover:opacity-70 transition-opacity">
              Homes
            </Link>
            <Link href="/architects" className="hover:opacity-70 transition-opacity">
              Architects
            </Link>
          </nav>

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
