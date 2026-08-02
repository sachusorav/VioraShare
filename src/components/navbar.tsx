"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Heart, Shield, HelpCircle, Sun, Moon, Zap } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return null;

  const isHome = pathname === "/";

  const navLinks = [
    { label: "Secure Sharing", href: "/secure-file-sharing", icon: Shield },
    { label: "Help", href: "/help", icon: HelpCircle },
    { label: "Support", href: "/support", icon: Heart },
  ];

  const handleStartSharing = () => {
    setIsOpen(false);
    if (isHome) {
      // Smooth-scroll to the form on homepage
      const el = document.getElementById("create-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Focus the first input inside the form
        setTimeout(() => {
          const input = el.querySelector("input");
          if (input) input.focus();
        }, 400);
      }
    } else {
      router.push("/#create-form");
    }
  };

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-sm shadow-black/5"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="relative">
              <Image
                src="/icon.png"
                alt="VioraShare"
                width={26}
                height={26}
                className="rounded-lg transition-transform group-hover:scale-105"
              />
              {/* Live pulse dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 border-2 border-background" />
            </div>
            <span className="font-heading text-[15px] font-bold tracking-tight leading-none">
              Viora<span className="text-foreground/40">Share</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links (center) ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold
                    rounded-xl transition-all duration-150
                    group whitespace-nowrap
                    ${active
                      ? "text-foreground bg-foreground/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {link.label}
                  {/* Underline indicator */}
                  <span
                    className={`absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full
                      bg-foreground transition-all duration-200 origin-left
                      ${active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-30"}`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Right side ── */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                title="Toggle theme"
                className="w-8 h-8 flex items-center justify-center rounded-xl
                           text-muted-foreground/70 hover:text-foreground hover:bg-foreground/6
                           transition-all duration-150"
              >
                {resolvedTheme === "dark"
                  ? <Sun className="w-[15px] h-[15px]" />
                  : <Moon className="w-[15px] h-[15px]" />
                }
              </button>
            )}

            <div className="w-px h-4 bg-border/60 mx-1" />

            {/* CTA — Start Sharing */}
            <button
              onClick={handleStartSharing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold
                         bg-foreground text-background
                         hover:bg-foreground/85 active:scale-[0.97]
                         transition-all duration-150 shadow-md shadow-black/20
                         whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5" />
              Start Sharing
            </button>
          </div>

          {/* ── Mobile: theme + burger ── */}
          <div className="md:hidden flex items-center gap-1 shrink-0">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-xl
                           text-muted-foreground hover:text-foreground hover:bg-foreground/6
                           transition-colors"
              >
                {resolvedTheme === "dark"
                  ? <Sun className="w-[15px] h-[15px]" />
                  : <Moon className="w-[15px] h-[15px]" />
                }
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-xl
                         text-muted-foreground hover:text-foreground hover:bg-foreground/6
                         transition-colors"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl
                        animate-in slide-in-from-top-2 duration-150">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors
                    ${active
                      ? "bg-foreground/8 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2 pb-1">
              <button
                onClick={handleStartSharing}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                           text-sm font-bold bg-foreground text-background
                           hover:bg-foreground/85 transition-all active:scale-[0.98]
                           shadow-md shadow-black/20"
              >
                <Zap className="w-4 h-4" />
                Start Sharing
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
