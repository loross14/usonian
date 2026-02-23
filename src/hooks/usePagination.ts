"use client";

import { useMemo } from "react";

interface UsePaginationOptions<T> {
  /** All items to paginate through */
  items: T[];
  /** Number of items per page */
  itemsPerPage?: number;
  /** Current page number (1-indexed) */
  currentPage: number;
}

interface UsePaginationReturn<T> {
  /** Items visible on the current page */
  paginatedItems: T[];
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalCount: number;
  /** Whether there is a previous page */
  hasPrevious: boolean;
  /** Whether there is a next page */
  hasNext: boolean;
  /** First item index (1-indexed) for display */
  startIndex: number;
  /** Last item index (1-indexed) for display */
  endIndex: number;
}

export function usePagination<T>({
  items,
  itemsPerPage = 25,
  currentPage,
}: UsePaginationOptions<T>): UsePaginationReturn<T> {
  return useMemo(() => {
    const totalCount = items.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

    // Clamp current page to valid range
    const validPage = Math.max(1, Math.min(currentPage, totalPages));

    // Calculate slice indices
    const startIdx = (validPage - 1) * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, totalCount);

    const paginatedItems = items.slice(startIdx, endIdx);

    return {
      paginatedItems,
      totalPages,
      totalCount,
      hasPrevious: validPage > 1,
      hasNext: validPage < totalPages,
      startIndex: totalCount > 0 ? startIdx + 1 : 0,
      endIndex: endIdx,
    };
  }, [items, itemsPerPage, currentPage]);
}
