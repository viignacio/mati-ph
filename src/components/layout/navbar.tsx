"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function Navbar({ data }: { data?: any }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoUrl = data?.logo?.asset?.url;
  const navLinks = data?.navigation || [];
  const searchEnabled = data?.searchEnabled || false;
  const cta = data?.cta;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 pointer-events-none">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between bg-amber-50/85 backdrop-blur-2xl border border-amber-200/50 px-8 py-3 rounded-full shadow-lg shadow-amber-900/5 pointer-events-auto hidden xl:flex">

          {/* Left cluster: Logo + Nav */}
          <div className="flex items-center gap-10">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 text-neutral-900"
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
              ) : (
                <span className="font-headline text-lg font-bold tracking-tight text-on-background">Mati PH</span>
              )}
            </Link>

            {/* Desktop nav */}
            <nav className="flex items-center gap-8">
              {navLinks.map((link: any) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className="text-stone-700 hover:text-primary transition-colors text-base font-semibold"
                >
                  {link.text}
                </Link>
              ))}
            </nav>

          </div>

          {/* Right Action */}
          <div className="flex items-center gap-6">
            {searchEnabled && (
              <div className="hidden md:flex items-center bg-surface-container rounded-full px-4 h-12 border border-outline-variant/15">
                <span className="material-symbols-outlined text-outline" style={{ fontSize: 18 }}>search</span>
                <input className="bg-transparent border-none focus:ring-0 text-sm outline-none placeholder:text-on-surface-variant/60 w-32 lg:w-40 text-on-surface ml-2" placeholder="Search..." />
              </div>
            )}

            {cta && (
              <Link href={cta.url} className="hidden md:flex items-center justify-center bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2 rounded-full font-bold text-sm shadow-md shadow-primary/20 hover:scale-105 transition-transform">
                {cta.text}
              </Link>
            )}
          </div>

        </div>

        {/* Floating Mobile Toggle */}
        <div className={cn("xl:hidden fixed top-6 right-6 z-[60] pointer-events-auto", mobileOpen && "hidden")}>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-container-high/90 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/20 text-primary transition-all active:scale-90"
            aria-label="Open navigation menu"
          >
            <Menu size={28} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} logoUrl={logoUrl} />
    </>
  );
}
