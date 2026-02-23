"use client";

import { useEffect, useState } from "react";

export function B2Bomber() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate rotation based on movement direction
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;

      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        setRotation(angle);
      }

      lastX = e.clientX;
      lastY = e.clientY;

      // Smooth follow with slight delay
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="b2-bomber"
      style={{
        position: "fixed",
        left: position.x - 40,
        top: position.y - 15,
        transform: `rotate(${rotation}deg)`,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "left 0.15s ease-out, top 0.15s ease-out, transform 0.1s ease-out",
      }}
    >
      <svg
        width="80"
        height="30"
        viewBox="0 0 120 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))" }}
      >
        {/* B-2 Spirit Stealth Bomber - Signature Flying Wing Shape */}
        {/* Main body/wing - the distinctive flying wing */}
        <path
          d="M60 22
             L15 18 L2 10 L0 12 L8 22 L0 32 L2 34 L15 26 L60 22
             L105 18 L118 10 L120 12 L112 22 L120 32 L118 34 L105 26 L60 22"
          fill="#1a1a1a"
        />
        {/* Center body bulge */}
        <ellipse cx="60" cy="22" rx="18" ry="6" fill="#2a2a2a" />
        {/* Cockpit windows */}
        <path d="M52 20 L60 18 L68 20 L60 21 Z" fill="#3a5a7a" opacity="0.8" />
        {/* Engine intakes */}
        <ellipse cx="45" cy="22" rx="4" ry="2" fill="#0a0a0a" />
        <ellipse cx="75" cy="22" rx="4" ry="2" fill="#0a0a0a" />
        {/* Wing edge highlights */}
        <path d="M15 18 L60 22 L105 18" stroke="#3a3a3a" strokeWidth="0.5" fill="none" />
        <path d="M15 26 L60 22 L105 26" stroke="#3a3a3a" strokeWidth="0.5" fill="none" />
        {/* Subtle panel lines */}
        <line x1="35" y1="20" x2="35" y2="24" stroke="#2a2a2a" strokeWidth="0.5" />
        <line x1="85" y1="20" x2="85" y2="24" stroke="#2a2a2a" strokeWidth="0.5" />
        {/* Exhaust glow */}
        <ellipse cx="60" cy="28" rx="8" ry="2" fill="#ff6600" opacity="0.3">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="0.3s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    </div>
  );
}
