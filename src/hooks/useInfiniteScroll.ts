"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions<T> {
  /** All items to paginate through */
  items: T[];
  /** Number of items to load per batch */
  batchSize?: number;
  /** Root margin for intersection observer (triggers load before reaching end) */
  rootMargin?: string;
  /** Threshold for intersection observer */
  threshold?: number;
  /** Simulated loading delay in ms (for UX) */
  loadDelay?: number;
}

interface UseInfiniteScrollReturn<T> {
  /** Currently visible items */
  visibleItems: T[];
  /** Ref to attach to sentinel element */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  /** Whether more items are being loaded */
  isLoading: boolean;
  /** Whether all items have been loaded */
  isComplete: boolean;
  /** Number of items currently shown */
  loadedCount: number;
  /** Total number of items */
  totalCount: number;
  /** Number of remaining items */
  remainingCount: number;
  /** Reset pagination (e.g., when filters change) */
  reset: () => void;
}

export function useInfiniteScroll<T>({
  items,
  batchSize = 9,
  rootMargin = "200px",
  threshold = 0.1,
  loadDelay = 400,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [loadedCount, setLoadedCount] = useState(batchSize);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const totalCount = items.length;
  const isComplete = loadedCount >= totalCount;
  const remainingCount = Math.max(0, totalCount - loadedCount);
  const visibleItems = items.slice(0, loadedCount);

  // Reset when items array changes (e.g., filters applied)
  const reset = useCallback(() => {
    setLoadedCount(batchSize);
    setIsLoading(false);
  }, [batchSize]);

  // Reset pagination when items array reference changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reactive reset when data changes is valid
    reset();
  }, [items, reset]);

  // Load more items
  const loadMore = useCallback(() => {
    if (isLoading || isComplete) return;

    setIsLoading(true);

    // Simulate network delay for smooth UX
    setTimeout(() => {
      setLoadedCount((prev) => Math.min(prev + batchSize, totalCount));
      setIsLoading(false);
    }, loadDelay);
  }, [isLoading, isComplete, batchSize, totalCount, loadDelay]);

  // Set up Intersection Observer
  useEffect(() => {
    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Don't observe if complete
    if (isComplete) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading) {
          loadMore();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observerRef.current.observe(sentinel);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isComplete, isLoading, loadMore, rootMargin, threshold]);

  return {
    visibleItems,
    sentinelRef,
    isLoading,
    isComplete,
    loadedCount,
    totalCount,
    remainingCount,
    reset,
  };
}
