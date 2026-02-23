"use client";

import { useEffect, useState } from "react";

interface CountdownLoaderProps {
  /** Number of items currently loaded */
  loadedCount: number;
  /** Total number of items in the archive */
  totalCount: number;
  /** Number of items remaining */
  remainingCount: number;
  /** Whether items are currently loading */
  isLoading: boolean;
  /** Whether all items have been loaded */
  isComplete: boolean;
}

/**
 * CountdownLoader - "THE COUNTDOWN"
 *
 * Virgil Abloh-inspired infinite scroll indicator.
 * Treats pagination as an archive countdown, creating urgency
 * and collection awareness through descending counters.
 *
 * Design tokens:
 * - Red: #BF0A30
 * - Navy: #002868
 * - Gold: #D4B270
 * - Fonts: Playfair Display (headings), JetBrains Mono (UI/labels)
 * - Shadows: 2px 2px 0 / 4px 4px 0 / 6px 6px 0
 */
export function CountdownLoader({
  loadedCount,
  totalCount,
  remainingCount,
  isLoading,
  isComplete,
}: CountdownLoaderProps) {
  const [glitchFrame, setGlitchFrame] = useState(0);

  // Subtle glitch animation during loading
  useEffect(() => {
    if (!isLoading) return;

    // Reset frame when loading starts, then animate
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting animation state on prop change is valid
    setGlitchFrame(0);
    const interval = setInterval(() => {
      setGlitchFrame((prev) => (prev + 1) % 4);
    }, 150);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Format number with leading zeros for archive aesthetic
  const formatArchiveNumber = (num: number): string => {
    return num.toString().padStart(3, "0");
  };

  // Glitch text variations for loading state
  const glitchTexts = [
    '"RETRIEVING"',
    '"RETR13V1NG"',
    '"R3TRIEVING"',
    '"RETRIEVING"',
  ];

  if (isComplete) {
    return (
      <div className="countdown-loader countdown-loader--complete">
        <div className="countdown-archive-complete">
          <span className="countdown-bracket">[</span>
          <span className="countdown-label">ARCHIVE COMPLETE</span>
          <span className="countdown-bracket">]</span>
        </div>
        <div className="countdown-total">
          <span className="countdown-mono">{formatArchiveNumber(totalCount)}</span>
          <span className="countdown-label-small">PROPERTIES INDEXED</span>
        </div>

        <style jsx>{`
          .countdown-loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem 1.5rem;
            gap: 1rem;
          }

          .countdown-loader--complete {
            opacity: 0.7;
          }

          .countdown-archive-complete {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: "JetBrains Mono", monospace;
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            color: #002868;
          }

          .countdown-bracket {
            color: #D4B270;
            font-weight: 700;
          }

          .countdown-label {
            color: #002868;
          }

          .countdown-total {
            display: flex;
            align-items: baseline;
            gap: 0.75rem;
          }

          .countdown-mono {
            font-family: "JetBrains Mono", monospace;
            font-size: 1.5rem;
            font-weight: 700;
            color: #002868;
            letter-spacing: 0.1em;
          }

          .countdown-label-small {
            font-family: "JetBrains Mono", monospace;
            font-size: 0.625rem;
            letter-spacing: 0.2em;
            color: #666;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="countdown-loader countdown-loader--loading">
        <div className="countdown-loading-text">
          <span className="countdown-glitch">{glitchTexts[glitchFrame]}</span>
        </div>
        <div className="countdown-progress-bar">
          <div
            className="countdown-progress-fill"
            style={{ width: `${(loadedCount / totalCount) * 100}%` }}
          />
        </div>
        <div className="countdown-retrieving-detail">
          <span className="countdown-mono-small">
            {formatArchiveNumber(loadedCount)}
          </span>
          <span className="countdown-slash">/</span>
          <span className="countdown-mono-small countdown-mono-small--total">
            {formatArchiveNumber(totalCount)}
          </span>
        </div>

        <style jsx>{`
          .countdown-loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem 1.5rem;
            gap: 1rem;
          }

          .countdown-loader--loading {
            animation: pulse-subtle 1.5s ease-in-out infinite;
          }

          @keyframes pulse-subtle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.85; }
          }

          .countdown-loading-text {
            position: relative;
          }

          .countdown-glitch {
            font-family: "JetBrains Mono", monospace;
            font-size: 0.875rem;
            letter-spacing: 0.2em;
            color: #BF0A30;
            font-weight: 600;
            text-shadow:
              1px 1px 0 rgba(0, 40, 104, 0.1),
              -1px -1px 0 rgba(191, 10, 48, 0.1);
          }

          .countdown-progress-bar {
            width: 200px;
            height: 2px;
            background: rgba(0, 40, 104, 0.1);
            position: relative;
            overflow: hidden;
          }

          .countdown-progress-fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: linear-gradient(90deg, #002868, #BF0A30);
            transition: width 0.3s ease-out;
          }

          .countdown-retrieving-detail {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }

          .countdown-mono-small {
            font-family: "JetBrains Mono", monospace;
            font-size: 0.75rem;
            font-weight: 600;
            color: #002868;
            letter-spacing: 0.1em;
          }

          .countdown-mono-small--total {
            color: #999;
          }

          .countdown-slash {
            font-family: "JetBrains Mono", monospace;
            font-size: 0.75rem;
            color: #D4B270;
          }
        `}</style>
      </div>
    );
  }

  // Default state - showing countdown to trigger scroll
  return (
    <div className="countdown-loader countdown-loader--ready">
      <div className="countdown-remaining">
        <span className="countdown-guillemet">&laquo;</span>
        <span className="countdown-count">{remainingCount}</span>
        <span className="countdown-more">MORE</span>
        <span className="countdown-guillemet">&raquo;</span>
      </div>

      <div className="countdown-archive-status">
        <span className="countdown-bracket">[</span>
        <span className="countdown-status-text">
          ARCHIVED: {formatArchiveNumber(loadedCount)} OF {formatArchiveNumber(totalCount)}
        </span>
        <span className="countdown-bracket">]</span>
      </div>

      <div className="countdown-instruction">
        SCROLL TO CONTINUE INDEXING
      </div>

      <div className="countdown-scroll-indicator">
        <div className="countdown-scroll-line" />
        <div className="countdown-scroll-arrow" />
      </div>

      <style jsx>{`
        .countdown-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          gap: 1rem;
        }

        .countdown-loader--ready {
          cursor: pointer;
        }

        .countdown-remaining {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #002868;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .countdown-loader--ready:hover .countdown-remaining {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.15);
        }

        .countdown-guillemet {
          font-family: "Playfair Display", serif;
          font-size: 1.25rem;
          color: #D4B270;
          font-weight: 700;
        }

        .countdown-count {
          font-family: "JetBrains Mono", monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.05em;
        }

        .countdown-more {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: #D4B270;
          letter-spacing: 0.2em;
        }

        .countdown-archive-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.15em;
        }

        .countdown-bracket {
          color: #D4B270;
          font-weight: 700;
        }

        .countdown-status-text {
          color: #002868;
        }

        .countdown-instruction {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.625rem;
          letter-spacing: 0.25em;
          color: #BF0A30;
          opacity: 0.8;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }

        .countdown-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          margin-top: 0.5rem;
        }

        .countdown-scroll-line {
          width: 1px;
          height: 24px;
          background: linear-gradient(to bottom, #002868, transparent);
        }

        .countdown-scroll-arrow {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 6px solid #002868;
          animation: bounce 1.5s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
}
