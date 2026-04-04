'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Zap } from 'lucide-react';

interface AdPortalProps {
  onComplete: () => void;
  isOpen: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const COUNTDOWN_SECONDS = 5;

export default function AdPortal({ onComplete, isOpen }: AdPortalProps) {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [phase, setPhase] = useState<'loading' | 'ad' | 'done'>('loading');

  const startCountdown = useCallback(() => {
    setPhase('ad');
    setCountdown(COUNTDOWN_SECONDS);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(COUNTDOWN_SECONDS);
      setPhase('loading');
      return;
    }

    // Short loading phase before ad
    const loadTimer = setTimeout(() => {
      startCountdown();

      // Try to push AdSense ad
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // AdSense not yet initialized — still run the timer
      }
    }, 800);

    return () => clearTimeout(loadTimer);
  }, [isOpen, startCountdown]);

  useEffect(() => {
    if (phase !== 'ad') return;

    if (countdown <= 0) {
      setPhase('done');
      setTimeout(onComplete, 400);
      return;
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, phase, onComplete]);

  const progress = ((COUNTDOWN_SECONDS - countdown) / COUNTDOWN_SECONDS) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/70"
          >
            {/* Status Bar */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                  {phase === 'loading' ? 'Initializing...' : 'Securing Room'}
                </span>
              </div>
              {phase === 'ad' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest font-bold">Skip in</span>
                  <span className="text-xs font-black text-white tabular-nums w-4 text-center">{countdown}</span>
                </div>
              )}
            </div>

            {/* Ad Slot */}
            <div className="mx-6 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 min-h-[200px] flex items-center justify-center relative">
              {phase === 'loading' ? (
                <div className="flex flex-col items-center gap-3 p-8">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p className="text-xs text-muted-foreground/50 font-medium tracking-widest uppercase">Loading</p>
                </div>
              ) : (
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block', width: '100%', minHeight: '200px' }}
                  data-ad-client="ca-pub-6881946526372309"
                  data-ad-slot="auto"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              )}
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-5 space-y-3">
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'linear' }}
                />
              </div>

              {/* Security Indicators */}
              <div className="flex items-center justify-between pt-1">
                {[
                  { icon: Shield, label: 'Encrypting' },
                  { icon: Lock, label: 'Securing' },
                  { icon: Zap, label: 'Generating' },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className={`flex items-center gap-1.5 transition-all duration-500 ${progress > (i + 1) * 30 ? 'opacity-100 text-primary' : 'opacity-30 text-muted-foreground'}`}>
                    <Icon className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
