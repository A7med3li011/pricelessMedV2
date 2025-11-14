"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { useContext, useEffect, useTransition } from "react";
import { PaginationContext } from "../providers/pagination-provider";

interface PaginationProps {
  page?: number;
  pageLimit: number;
  totalRecords: number;
  currentPage?: number;
  totalPages?: number;
}

export default function Pagination({
  page,
  pageLimit,
  totalRecords,
  currentPage,
  totalPages: totalPagesProp,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const { setPendinggg } = useContext(PaginationContext);
  const t = useTranslations("pagination");
  const isRTL = locale === "ar";
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPendinggg(isPending);
    console.log(isPending, "from pagaination coponent");
  }, [isPending, setPendinggg]);

  // Use currentPage or page as the active page
  const activePage = currentPage || page || 1;

  // Calculate total pages (use prop if provided, otherwise calculate)
  const totalPages = totalPagesProp || Math.ceil(totalRecords / pageLimit);

  // Update URL with new page number
  const updatePage = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: true });
    });
  };

  // Generate page numbers with ellipsis
  const pages: (number | string)[] = [];
  const showEllipsis = totalPages > 7;

  if (!showEllipsis) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (activePage <= 3) {
      // Near the beginning
      pages.push(2, 3, 4, "ellipsis-end", totalPages);
    } else if (activePage >= totalPages - 2) {
      // Near the end
      pages.push(
        "ellipsis-start",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      // In the middle
      pages.push(
        "ellipsis-start",
        activePage - 1,
        activePage,
        activePage + 1,
        "ellipsis-end",
        totalPages
      );
    }
  }

  const pageNumbers = pages;

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {/* {isPending && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium text-gray-700">
              {t("loading") || "Loading..."}
            </p>
          </div>
        </div>
      )} */}

      <nav
        role="navigation"
        aria-label={t("ariaLabel")}
        className="flex items-center justify-center gap-2 py-8"
      >
        {/* Previous Button */}
        <button
          onClick={() => updatePage(activePage - 1)}
          disabled={activePage === 1 || isPending}
          aria-label={t("previous")}
          className={`
            flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
            text-sm font-medium transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${
              activePage === 1 || isPending
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95"
            }
          `}
        >
          <PrevIcon className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{t("previous")}</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNum, index) => {
            if (typeof pageNum === "string") {
              // Ellipsis
              return (
                <div
                  key={`${pageNum}-${index}`}
                  className="flex items-center justify-center w-9 h-9 text-gray-400"
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </div>
              );
            }

            const isActive = pageNum === activePage;

            return (
              <button
                key={pageNum}
                onClick={() => updatePage(pageNum)}
                disabled={isPending}
                aria-label={t("pageNumber", { page: pageNum })}
                aria-current={isActive ? "page" : undefined}
                className={`
                flex items-center justify-center min-w-[36px] h-9 px-3 rounded-lg
                text-sm font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95"
                }
                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
              `}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => updatePage(activePage + 1)}
          disabled={activePage === totalPages || isPending}
          aria-label={t("next")}
          className={`
          flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
          text-sm font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${
            activePage === totalPages || isPending
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95"
          }
        `}
        >
          <span className="hidden sm:inline">{t("next")}</span>
          <NextIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
