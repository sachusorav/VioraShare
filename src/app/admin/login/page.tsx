"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Welcome back, Admin!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-screen">
      {/* Background gradients */}
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[80px] -z-10 pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center gap-6 relative z-10 animate-in fade-in duration-300">
        <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
          <Image src="/icon.png" alt="VioraShare" width={40} height={40} />
          <span className="text-2xl font-bold font-heading">VioraShare.</span>
        </Link>

        <Card className="w-full bg-card/40 backdrop-blur border-border/50 overflow-hidden relative">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-1 text-center">
              <h1 className="text-2xl font-bold font-heading">Admin Login</h1>
              <p className="text-xs text-muted-foreground">
                Enter your credentials to access the dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="admin@viorashare.online" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50 backdrop-blur"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-background/50 backdrop-blur"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full font-medium mt-6" disabled={loading}>
                {loading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Link 
          href="/" 
          className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          ← Back to Homepage
        </Link>
      </div>
    </main>
  );
}
