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

  // Hide on admin / api routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return null;

  const navLinks = [
    { label: "Secure Sharing", href: "/secure-file-sharing", icon: Shield },
    { label: "Help", href: "/help", icon: HelpCircle },
    { label: "Support", href: "/support", icon: Heart },
  ];

  const isActive = (href: string) => pathname === href;
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    /* Outer wrapper gives the floating effect + a real height so page content starts below */
    <header className="sticky top-0 z-50 w-full px-3 sm:px-4 py-2.5
                       bg-transparent">
      <nav
        className="mx-auto max-w-6xl
                   bg-card/70 backdrop-blur-xl
                   border border-border/50
                   rounded-2xl shadow-lg shadow-black/10
                   transition-all duration-200"
      >
        <div className="flex h-12 items-center justify-between px-4 sm:px-5">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <Image src="/icon.png" alt="VioraShare" width={24} height={24} className="rounded-md" />
            <span className="font-heading text-[15px] font-bold tracking-tight leading-none">
              VioraShare<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-xl transition-all duration-150 whitespace-nowrap
                    ${isActive(link.href)
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 flex items-center justify-center rounded-xl
                         text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="w-px h-4 bg-border" />
            <Button asChild size="sm"
              className="h-8 px-4 text-[13px] font-bold gap-1.5
                         bg-foreground text-background hover:bg-foreground/85
                         shadow-sm">
              <Link href="/">
                Start Sharing
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile: theme + burger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-xl
                         text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-xl
                         text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
            >
              {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-border/40 px-3 pb-3 pt-2
                          animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-0.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
                      ${isActive(link.href)
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                      }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-border/40">
              <Button
                asChild
                className="w-full font-bold gap-2 h-10"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/">
                  Start Sharing <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
