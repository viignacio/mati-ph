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
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between bg-surface/70 backdrop-blur-xl border border-outline-variant/20 px-8 py-5 rounded-full shadow-lg shadow-on-background/5">

          {/* Left cluster: Logo + Nav */}
          <div className="flex items-center gap-10">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 text-on-background"
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
              ) : (
                <span className="font-headline text-lg font-bold tracking-tight text-on-background">Mati PH</span>
              )}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-8">
              {navLinks.map((link: any) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold"
                >
                  {link.text}
                </Link>
              ))}
            </nav>

          </div>

          {/* Right Action + Hamburger */}
          <div className="flex items-center gap-6">
            {searchEnabled && (
              <div className="hidden md:flex items-center bg-surface-container rounded-full px-4 py-3 border border-outline-variant/15">
                <span className="material-symbols-outlined text-outline" style={{ fontSize: 18 }}>search</span>
                <input className="bg-transparent border-none focus:ring-0 text-sm outline-none placeholder:text-on-surface-variant/60 w-32 lg:w-40 text-on-surface p-0 m-0 ml-2 h-5 leading-none" placeholder="Search..." />
              </div>
            )}

            {cta && (
              <Link href={cta.url} className="hidden md:flex items-center justify-center bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2 rounded-full font-bold text-sm shadow-md shadow-primary/20 hover:scale-105 transition-transform">
                {cta.text}
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden p-2 rounded-full transition-colors text-on-surface hover:bg-surface-highest"
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
