// src/components/common/pagination.tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

/**
 * Props for the PaginationComponent
 */
interface PaginationComponentProps {
  /** Current active page number */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback function triggered when page changes */
  onPageChange: (page: number) => void;
}

/**
 * A reusable pagination component that displays page numbers and navigation controls
 *
 * @component
 * @example
 * ```tsx
 * <PaginationComponent
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(`Navigating to page ${page}`)}
 * />
 * ```
 *
 * @remarks
 * - Displays all page numbers if total pages is 5 or less
 * - Shows ellipsis (...) for large page ranges
 * - Always shows first and last page numbers
 * - Displays pages adjacent to current page
 * - Includes Previous/Next navigation buttons
 */
export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange
}: PaginationComponentProps) {
  const getPageNumbers = () => {
    // If total pages is 5 or less, show all pages
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: number[] = [];

    // Always show first page
    pages.push(1);

    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    // Add last page if not already included
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    // Add ellipsis indicators if needed
    const sortedPages = [...new Set(pages)].sort((a, b) => a - b);
    const result: (number | string)[] = [];

    for (let i = 0; i < sortedPages.length - 1; i++) {
      result.push(sortedPages[i]);
      if (sortedPages[i + 1] - sortedPages[i] > 1) {
        result.push('...');
      }
    }
    result.push(sortedPages[sortedPages.length - 1]);

    return result;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            data-testid="prev-button"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {getPageNumbers().map((pageNumber, index) => (
          <PaginationItem key={index}>
            {typeof pageNumber === 'number' ? (
              <PaginationLink
                data-testid={`page-${pageNumber}`}
                href="#"
                isActive={pageNumber === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNumber);
                }}
                aria-current={pageNumber === currentPage ? "page" : undefined}
              >
                {pageNumber}
              </PaginationLink>
            ) : (
              <span className="px-4">...</span>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            data-testid="next-button"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
