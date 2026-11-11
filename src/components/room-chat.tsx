"use client";

import { useState, useRef, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  roomId: string;
}

export function RoomChat({ roomId, messages }: { roomId: string; messages: Message[] }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Optimistic messages — keyed by a local id
  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);

  // Drop optimistic messages once SSE has delivered the real versions
  // Uses a Set for O(1) lookup — avoids O(n²) nested loops on every SSE event
  useEffect(() => {
    if (messages.length === 0) return;
    const realIds = new Set(messages.map((m) => m.id));
    setOptimisticMessages((prev) =>
      prev.filter(
        (opt) =>
          !realIds.has(opt.id) &&
          !messages.some(
            (m) =>
              m.content === opt.content &&
              Math.abs(
                new Date(m.createdAt).getTime() - new Date(opt.createdAt).getTime()
              ) < 10_000
          )
      )
    );
  }, [messages]);

  // Merge SSE messages + pending optimistic, chronological order
  const displayMessages: Message[] = (() => {
    const seenIds = new Set(messages.map((m) => m.id));
    const dedupedOptimistic = optimisticMessages.filter((o) => !seenIds.has(o.id));
    return [...messages, ...dedupedOptimistic].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  })();

  // Auto-scroll to bottom whenever any message (real or optimistic) arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [displayMessages.length]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || isSending) return;

    const optimisticMsg: Message = {
      id: `opt-${Date.now()}`,
      content: trimmed,
      author: "You",
      createdAt: new Date().toISOString(),
      roomId,
    };

    setMessage("");
    setOptimisticMessages((prev) => [...prev, optimisticMsg]);
    setIsSending(true);
    inputRef.current?.focus();

    try {
      const res = await fetch(`/api/rooms/${roomId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed }),
      });
      if (!res.ok) throw new Error("server error");
    } catch {
      // Rollback optimistic message and restore user's text
      toast.error("Message failed — please try again.");
      setOptimisticMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
      setMessage(optimisticMsg.content);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[450px]">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      >
        <AnimatePresence initial={false}>
          {displayMessages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2 opacity-50"
            >
              <MessageSquare className="w-8 h-8" />
              <p className="text-sm">No messages yet — say hello!</p>
            </motion.div>
          ) : (
            displayMessages.map((m) => {
              const isPending = m.id.startsWith("opt-");
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -10, scale: 0.97 }}
                  animate={{ opacity: isPending ? 0.65 : 1, x: 0, scale: 1 }}
                  layout="position"
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isPending ? "text-primary animate-pulse" : "text-muted-foreground"
                      }`}
                    >
                      {isPending ? "You" : m.author}
                    </span>
                    <span className="text-[10px] text-muted-foreground/40">
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {isPending && (
                      <span className="text-[9px] text-muted-foreground/40 italic">sending…</span>
                    )}
                  </div>
                  <div
                    className={`bg-muted/30 backdrop-blur rounded-2xl rounded-tl-none p-3 text-sm max-w-[85%] border border-border/50 transition-opacity ${
                      isPending ? "border-primary/30" : ""
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-border/50 bg-background/30 backdrop-blur"
      >
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Type a message…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent"
            disabled={isSending}
            aria-label="Chat message"
          />
          <Button type="submit" size="icon" disabled={isSending || !message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
