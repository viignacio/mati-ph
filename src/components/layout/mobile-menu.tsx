"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Destinations", href: "/destinations" },
  { label: "Activities", href: "/activities" },
  { label: "Culture", href: "/culture" },
  { label: "Food & Dining", href: "/food" },
  { label: "Travel Guide", href: "/travel-guide" },
  { label: "About Mati", href: "/about" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  logoUrl?: string;
}

export function MobileMenu({ isOpen, onClose, logoUrl }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-on-surface/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-surface flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/15">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <span className="font-serif text-xl font-semibold text-on-surface">
                Mati City
              </span>
            )}
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-highest transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-1 px-4 py-6">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "font-sans text-lg font-medium text-on-surface px-4 py-3 rounded-2xl",
                "hover:bg-surface-highest hover:text-primary transition-colors duration-150",
                // Stagger entrance via CSS animation delay
                isOpen && "animate-fade-in"
              )}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA footer */}
        <div className="px-6 pb-8 pt-4 border-t border-outline-variant/15">
          <Link
            href="/travel-guide"
            onClick={onClose}
            className="flex h-14 w-full items-center justify-center rounded-full font-sans font-semibold text-on-primary cta-gradient shadow-ambient-md transition-all duration-200 active:scale-[0.97]"
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </>
  );
}
