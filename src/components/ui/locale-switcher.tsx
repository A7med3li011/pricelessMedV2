"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState, useTransition, useCallback } from "react";
import { Languages, Loader2, Check } from "lucide-react";
import { usePathname, useRouter } from "@/src/i18n/navigation";

// Types
interface LocaleOption {
  value: string;
  label: string;
  nativeLabel?: string;
}

// Constants
const AVAILABLE_LOCALES: LocaleOption[] = [
  { value: "en", label: "English", nativeLabel: "English" },
  { value: "ar", label: "العربية", nativeLabel: "Arabic" },
];

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown handler
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  // Toggle dropdown handler
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Switch locale handler
  const switchLocale = useCallback(
    (newLocale: string) => {
      if (newLocale === currentLocale) {
        closeDropdown();
        return;
      }

      // Save language to cookies
      document.cookie = `lang=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year

      startTransition(() => {
        router.push(pathname, { locale: newLocale });
        closeDropdown();
      });
    },
    [currentLocale, pathname, router, closeDropdown]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, closeDropdown]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          closeDropdown();
          buttonRef.current?.focus();
          break;
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          // Focus first/last menu item
          const items = dropdownRef.current?.querySelectorAll(
            '[role="menuitem"]:not([disabled])'
          );
          if (items && items.length > 0) {
            const index = event.key === "ArrowDown" ? 0 : items.length - 1;
            (items[index] as HTMLElement)?.focus();
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, closeDropdown]);

  // Get current locale label
  const currentLocaleLabel =
    AVAILABLE_LOCALES.find((loc) => loc.value === currentLocale)?.label ||
    currentLocale.toUpperCase();

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        aria-label={`Switch language - Current: ${currentLocaleLabel}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        disabled={isPending}
        className={`
          group relative text-sm px-3 py-2 rounded-lg 
          flex items-center justify-center gap-1.5
          font-medium shadow-lg transition-all duration-300 ease-in-out 
          min-w-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${
            isPending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer active:scale-95"
          }
          text-white
        `}
      >
        <span className="sr-only">Switch language</span>

        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            <Languages
              className="h-3 w-3 text-white/90 group-hover:text-white transition-transform group-hover:rotate-12"
              aria-hidden="true"
            />
            <span className="uppercase">{currentLocale}</span>
          </>
        )}

        {/* Shine effect */}
        <span
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-10 md:hidden bg-black/20 backdrop-blur-sm"
            onClick={closeDropdown}
            aria-hidden="true"
          />

          {/* Dropdown Content */}
          <div
            className={`
              absolute right-0 mt-2 min-w-[180px] 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              rounded-lg shadow-xl overflow-hidden
              animate-in fade-in slide-in-from-top-2 duration-200
              z-50
            `}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu"
          >
            {AVAILABLE_LOCALES.map((loc) => {
              const isActive = currentLocale === loc.value;
              const isDisabled = isPending || isActive;

              return (
                <button
                  key={loc.value}
                  onClick={() => switchLocale(loc.value)}
                  disabled={isDisabled}
                  role="menuitem"
                  aria-current={isActive ? "true" : undefined}
                  className={`
                    w-full px-4 py-3 flex items-center gap-3 text-left text-sm
                    transition-colors duration-150
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
                    ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                    ${
                      isDisabled
                        ? "cursor-not-allowed opacity-75"
                        : "cursor-pointer"
                    }
                  `}
                >
                  <Languages
                    className={`h-4 w-4 flex-shrink-0 transition-colors ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{loc.label}</span>
                  {isActive && (
                    <Check
                      className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
