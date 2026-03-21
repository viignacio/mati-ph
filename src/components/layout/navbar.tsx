"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { label: "Destinations", href: "/destinations" },
  { label: "Activities", href: "/activities" },
  { label: "Culture", href: "/culture" },
  { label: "Food", href: "/food" },
  { label: "Travel Guide", href: "/travel-guide" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    // Set initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-30 transition-all duration-300",
          scrolled
            ? "glass-nav shadow-ambient-md py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "font-serif text-xl font-semibold transition-colors",
              scrolled ? "text-on-surface" : "text-white"
            )}
          >
            Mati City
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-sm font-medium px-4 py-2 rounded-full transition-colors duration-150",
                  scrolled
                    ? "text-on-surface hover:bg-surface-highest hover:text-primary"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => {
                window.location.href = "/travel-guide";
              }}
            >
              Plan Your Trip
            </Button>

            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                "md:hidden p-2 rounded-full transition-colors",
                scrolled
                  ? "text-on-surface hover:bg-surface-highest"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
