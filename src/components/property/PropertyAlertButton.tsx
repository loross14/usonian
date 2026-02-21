"use client";

import { useState, useRef, useEffect } from "react";
import { GeometricEyeIcon } from "@/components/icons/GeometricEyeIcon";

interface PropertyAlertButtonProps {
  propertyId: string;
  propertyName: string;
  variant?: "card" | "sidebar";
  className?: string;
}

type AlertState = "idle" | "expanded" | "loading" | "success" | "error";

export function PropertyAlertButton({
  propertyId,
  propertyName,
  variant = "card",
  className = "",
}: PropertyAlertButtonProps) {
  const [state, setState] = useState<AlertState>("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when expanded
  useEffect(() => {
    if (state === "expanded" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state]);

  // Auto-collapse success state after 3 seconds
  useEffect(() => {
    if (state === "success") {
      const timer = setTimeout(() => {
        setState("idle");
        setEmail("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleToggle = () => {
    if (state === "idle") {
      setState("expanded");
    } else if (state === "expanded" || state === "error") {
      setState("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Please enter your email");
      setState("error");
      return;
    }

    setState("loading");

    try {
      const response = await fetch("/api/property-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          property_id: propertyId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Something went wrong");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorMessage("Unable to connect. Please try again.");
      setState("error");
    }
  };

  const isSidebar = variant === "sidebar";

  // Success state
  if (state === "success") {
    return (
      <div
        className={`${className} ${isSidebar ? "text-center" : ""}`}
      >
        <div className="flex items-center gap-2 text-green-700">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">You&apos;re on the list!</span>
        </div>
        <p className="text-sm text-slate mt-1">
          We&apos;ll email you when this is listed
        </p>
      </div>
    );
  }

  return (
    <div className={`${className} ${isSidebar ? "" : "pt-3"}`}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleToggle}
        className={`
          group flex items-center gap-2 transition-colors
          ${state === "expanded" || state === "error" ? "mb-3" : ""}
          ${isSidebar
            ? "w-full justify-center py-2 text-base"
            : "text-sm"
          }
        `}
      >
        <GeometricEyeIcon
          size={isSidebar ? 22 : 18}
          className="text-gold group-hover:text-terracotta transition-colors"
        />
        <span className="text-terracotta group-hover:text-terracotta-dark transition-colors font-medium">
          Watch for Listing
        </span>
        {(state === "expanded" || state === "error") && (
          <svg
            className="w-4 h-4 text-slate ml-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {/* Expanded form */}
      {(state === "expanded" || state === "loading" || state === "error") && (
        <div className="alert-expand">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className={`flex gap-2 ${isSidebar ? "flex-col" : ""}`}>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={state === "loading"}
                className={`
                  flex-1 px-3 py-2 text-sm
                  bg-warm-white border border-sand-dark rounded
                  text-charcoal placeholder:text-slate-light
                  focus:outline-none focus:border-terracotta
                  transition-colors
                  disabled:opacity-50
                  ${isSidebar ? "w-full" : ""}
                `}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className={`
                  px-4 py-2 bg-terracotta text-warm-white text-sm font-medium rounded
                  hover:bg-terracotta-dark transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                  ${isSidebar ? "w-full" : ""}
                `}
              >
                {state === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Saving...</span>
                  </span>
                ) : (
                  <>
                    <span>Notify Me</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {state === "error" && errorMessage && (
              <p className="text-sm text-terracotta">{errorMessage}</p>
            )}

            <p className="text-xs text-slate">
              Get notified when {propertyName} is listed for sale
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
