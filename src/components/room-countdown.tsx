"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function RoomCountdown({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const expiration = new Date(expiresAt).getTime();
      const now = new Date().getTime();
      const diff = expiration - now;

      if (diff <= 0) {
        setTimeLeft("EXPIRED");
        setIsExpired(true);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-card/60 rounded-full border border-border/50 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-tighter">
      <Clock className={`w-3.5 h-3.5 ${isExpired ? 'text-red-500' : 'text-primary animate-pulse'}`} />
      <span className={isExpired ? 'text-red-500' : 'text-foreground'}>
        Expires in: {timeLeft}
      </span>
    </div>
  );
}
