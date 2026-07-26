"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LogOut, Shield, LayoutDashboard, Home } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col w-full overflow-x-hidden">
      {/* Admin Navbar */}
      <header className="border-b border-border/60 bg-card/20 backdrop-blur sticky top-0 z-50 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
              <Image src="/icon.png" alt="VioraShare" width={30} height={30} />
              <span className="text-lg font-bold font-heading hidden sm:inline">VioraShare.</span>
            </Link>
            <div className="h-4 w-px bg-border shrink-0 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/25 shrink-0">
              <Shield className="w-3 h-3" />
              <span className="hidden xs:inline">Admin Panel</span>
              <span className="xs:hidden">Admin</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground hidden sm:flex">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
