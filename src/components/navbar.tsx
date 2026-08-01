"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Shield, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Do not render navbar on admin pages or in route handlers/API endpoints
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return null;
  }

  const navLinks = [
    { label: "Secure Sharing", href: "/secure-file-sharing", icon: Shield },
    { label: "Help & FAQ", href: "/help", icon: HelpCircle },
    { label: "Support Us", href: "/support", icon: Heart },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 sticky top-0 z-50 pointer-events-none">
      <nav className="mx-auto max-w-7xl w-full bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl shadow-2xl pointer-events-auto transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Image src="/icon.png" alt="VioraShare" width={28} height={28} className="shrink-0" />
                <span className="font-heading text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                  VioraShare<span className="text-primary">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 px-3 py-1.5 rounded-lg whitespace-nowrap ${
                      isActive 
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="h-4 w-px bg-border" />
              <Button asChild size="sm" className="font-bold tracking-tight bg-foreground text-background hover:bg-foreground/90 transition-all shadow-lg shadow-black/25 shrink-0">
                <Link href="/" className="flex items-center gap-1.5 whitespace-nowrap">
                  Start Sharing
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/10 focus:outline-none transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl rounded-b-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1.5 px-4 py-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold transition-colors hover:bg-muted/10 ${
                      isActive ? "text-primary bg-primary/10 font-bold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border/40 mt-3">
                <Button asChild className="w-full font-bold py-6 rounded-xl bg-primary text-primary-foreground" onClick={() => setIsOpen(false)}>
                  <Link href="/" className="flex items-center justify-center gap-2">
                    Start Sharing
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
