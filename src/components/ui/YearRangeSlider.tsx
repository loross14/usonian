"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface YearRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function YearRangeSlider({
  min,
  max,
  value,
  onChange,
}: YearRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Sync with external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((clientX - rect.left) / rect.width) * 100)
      );
      const value = Math.round(min + (percentage / 100) * (max - min));
      return value;
    },
    [min, max]
  );

  const handleMouseDown = (handle: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newValue = getValueFromPosition(e.clientX);

      setLocalValue((prev) => {
        if (isDragging === "min") {
          const newMin = Math.min(newValue, prev[1] - 1);
          return [Math.max(min, newMin), prev[1]];
        } else {
          const newMax = Math.max(newValue, prev[0] + 1);
          return [prev[0], Math.min(max, newMax)];
        }
      });
    },
    [isDragging, getValueFromPosition, min, max]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      onChange(localValue);
      setIsDragging(null);
    }
  }, [isDragging, localValue, onChange]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minPercent = getPercentage(localValue[0]);
  const maxPercent = getPercentage(localValue[1]);

  return (
    <div className="year-range-slider">
      <div className="year-range-labels">
        <span className="year-range-value">{localValue[0]}</span>
        <span className="year-range-separator">—</span>
        <span className="year-range-value">{localValue[1]}</span>
      </div>
      <div className="year-range-track" ref={trackRef}>
        {/* Background track */}
        <div className="year-range-track-bg" />
        {/* Active range */}
        <div
          className="year-range-track-active"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        {/* Min handle */}
        <div
          className={`year-range-handle ${isDragging === "min" ? "dragging" : ""}`}
          style={{ left: `${minPercent}%` }}
          onMouseDown={handleMouseDown("min")}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={localValue[1]}
          aria-valuenow={localValue[0]}
          tabIndex={0}
        />
        {/* Max handle */}
        <div
          className={`year-range-handle ${isDragging === "max" ? "dragging" : ""}`}
          style={{ left: `${maxPercent}%` }}
          onMouseDown={handleMouseDown("max")}
          role="slider"
          aria-valuemin={localValue[0]}
          aria-valuemax={max}
          aria-valuenow={localValue[1]}
          tabIndex={0}
        />
      </div>
    </div>
  );
}
