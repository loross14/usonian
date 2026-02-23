"use client";

interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Total count of items */
  totalCount: number;
  /** First visible item index (1-indexed) */
  startIndex: number;
  /** Last visible item index (1-indexed) */
  endIndex: number;
}

/**
 * Pagination - Minimal Numbered Style
 *
 * Brutalist pagination component: ← 1 2 3 4 5 ... 12 →
 *
 * Design tokens:
 * - Font: JetBrains Mono
 * - Active: Black background, red offset shadow
 * - Colors: Black (#000), Red (#BF0A30), Navy (#002868)
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  startIndex,
  endIndex,
}: PaginationProps) {
  // Don't render if only one page or no items
  if (totalPages <= 1 || totalCount === 0) {
    return null;
  }

  // Generate page numbers with ellipsis logic
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsisThreshold = 7;

    if (totalPages <= showEllipsisThreshold) {
      // Show all pages if few enough
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Format number with leading zeros for archive aesthetic
  const formatNumber = (num: number): string => {
    return num.toString().padStart(3, "0");
  };

  return (
    <nav className="pagination" aria-label="Archive pagination">
      <div className="pagination-info">
        <span className="pagination-bracket">[</span>
        <span className="pagination-count">
          {formatNumber(startIndex)}-{formatNumber(endIndex)} OF {formatNumber(totalCount)}
        </span>
        <span className="pagination-bracket">]</span>
      </div>

      <div className="pagination-controls">
        {/* Previous Arrow */}
        <button
          className="pagination-arrow"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ←
        </button>

        {/* Page Numbers */}
        <div className="pagination-numbers">
          {pageNumbers.map((page, idx) =>
            page === "ellipsis" ? (
              <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-page ${currentPage === page ? "pagination-page--active" : ""}`}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Arrow */}
        <button
          className="pagination-arrow"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      <style jsx>{`
        .pagination {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 2.5rem 1rem;
        }

        .pagination-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.15em;
        }

        .pagination-bracket {
          color: #D4B270;
          font-weight: 700;
        }

        .pagination-count {
          color: #002868;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .pagination-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: transparent;
          border: 1px solid #000;
          font-family: "JetBrains Mono", monospace;
          font-size: 1rem;
          color: #000;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pagination-arrow:hover:not(:disabled) {
          background: #000;
          color: #fff;
          transform: translate(-2px, -2px);
          box-shadow: 2px 2px 0 #BF0A30;
        }

        .pagination-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .pagination-numbers {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin: 0 0.5rem;
        }

        .pagination-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          padding: 0 0.5rem;
          background: transparent;
          border: 1px solid transparent;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          font-weight: 500;
          color: #000;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pagination-page:hover:not(.pagination-page--active) {
          border-color: #000;
        }

        .pagination-page--active {
          background: #000;
          color: #fff;
          border-color: #000;
          transform: translate(-2px, -2px);
          box-shadow: 2px 2px 0 #BF0A30;
          font-weight: 700;
        }

        .pagination-ellipsis {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 36px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.875rem;
          color: #666;
          letter-spacing: 0.1em;
        }

        /* Mobile adjustments */
        @media (max-width: 480px) {
          .pagination-page {
            min-width: 32px;
            height: 32px;
            font-size: 0.6875rem;
          }

          .pagination-arrow {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </nav>
  );
}
