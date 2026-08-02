"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Heart, Shield, HelpCircle, ArrowRight, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Do not render navbar on admin pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return null;
  }

  const navLinks = [
    { label: "Secure Sharing", href: "/secure-file-sharing", icon: Shield },
    { label: "Help & FAQ", href: "/help", icon: HelpCircle },
    { label: "Support Us", href: "/support", icon: Heart },
  ];

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 sticky top-0 z-50 pointer-events-none">
      <nav className="mx-auto max-w-7xl w-full bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl shadow-2xl pointer-events-auto transition-all duration-300">
        <div className="px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0">
              <Image src="/icon.png" alt="VioraShare" width={26} height={26} />
              <span className="font-heading text-base font-bold tracking-tight">
                VioraShare<span className="text-primary">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 px-3 py-1.5 rounded-lg whitespace-nowrap ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side: theme toggle + CTA */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <div className="h-4 w-px bg-border" />
              {/* Dark/Light toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-colors"
                title="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Button asChild size="sm" className="font-bold bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-black/25">
                <Link href="/" className="flex items-center gap-1.5 whitespace-nowrap">
                  Start Sharing
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="md:hidden flex items-center gap-1 shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-colors"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl rounded-b-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-border/40">
                <Button asChild className="w-full font-bold" onClick={() => setIsOpen(false)}>
                  <Link href="/" className="flex items-center justify-center gap-2">
                    Start Sharing <ArrowRight className="w-4 h-4" />
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
