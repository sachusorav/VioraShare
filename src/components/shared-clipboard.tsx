"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Plus, Link as LinkIcon, StickyNote, ClipboardPaste } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Safe clipboard write — works on HTTPS (Clipboard API) and HTTP/older browsers (execCommand fallback)
async function writeToClipboard(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
  } else {
    // execCommand fallback — synchronous, no permission required
    const el = document.createElement("textarea");
    el.value = text;
    el.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(el);
    el.focus();
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    if (!ok) throw new Error("execCommand copy failed");
  }
}

// Strict URL check — only http:// and https:// are valid links
function isUrl(str: string): boolean {
  try {
    const url = new URL(str.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

interface Note {
  id: string;
  content: string;
  createdAt: string;
  roomId: string;
}

export function SharedClipboard({ roomId, notes }: { roomId: string; notes: Note[] }) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Pending optimistic notes (shown immediately, cleared once SSE confirms)
  const [optimisticNotes, setOptimisticNotes] = useState<Note[]>([]);

  // Efficient dedup: once a real note matches an optimistic one, drop it
  useEffect(() => {
    if (notes.length === 0) return;
    const realSet = new Set(notes.map((n) => n.id));
    setOptimisticNotes((prev) =>
      prev.filter(
        (opt) =>
          !realSet.has(opt.id) &&
          !notes.some(
            (n) =>
              n.content === opt.content &&
              Math.abs(
                new Date(n.createdAt).getTime() - new Date(opt.createdAt).getTime()
              ) < 10_000
          )
      )
    );
  }, [notes]);

  // Merge: real SSE notes + pending optimistic — newest first, no duplicates
  const displayNotes: Note[] = (() => {
    const seenIds = new Set(notes.map((n) => n.id));
    const dedupedOptimistic = optimisticNotes.filter((o) => !seenIds.has(o.id));
    return [...dedupedOptimistic, ...notes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  })();

  const addNote = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    const optimisticNote: Note = {
      id: `opt-${Date.now()}`,
      content: trimmed,
      createdAt: new Date().toISOString(),
      roomId,
    };

    setContent("");
    setOptimisticNotes((prev) => [optimisticNote, ...prev]);
    textareaRef.current?.focus();

    try {
      const res = await fetch(`/api/rooms/${roomId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed }),
      });
      if (!res.ok) throw new Error("server error");
    } catch {
      // Rollback: restore text so the user doesn't lose what they typed
      toast.error("Failed to save — your text has been restored.");
      setOptimisticNotes((prev) => prev.filter((n) => n.id !== optimisticNote.id));
      setContent(optimisticNote.content);
    }
  };

  // Ctrl+Enter or Cmd+Enter submits
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      addNote();
    }
  };

  const copyNote = async (text: string) => {
    try {
      await writeToClipboard(text);
      toast.success("Copied!");
    } catch {
      toast.error("Copy failed — please select and copy manually.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Input */}
      <form onSubmit={addNote} className="flex flex-col gap-2">
        <Textarea
          ref={textareaRef}
          placeholder="Paste a link, code snippet, or any text…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-background/50 backdrop-blur min-h-[100px] resize-none text-sm"
          aria-label="Clipboard note content"
        />
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground/40 pl-0.5">
            Ctrl+Enter to send
          </span>
          <Button type="submit" size="sm" disabled={!content.trim()} className="gap-1.5 h-9">
            <Plus className="w-3.5 h-3.5" />
            Add to Clipboard
          </Button>
        </div>
      </form>

      {/* Notes list */}
      <div className="flex flex-col gap-3">
        {displayNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3 text-muted-foreground border rounded-xl border-dashed bg-muted/10">
            <ClipboardPaste className="w-7 h-7 opacity-30" />
            <div className="text-center space-y-0.5">
              <p className="text-sm font-medium">Clipboard is empty</p>
              <p className="text-xs text-muted-foreground/50">
                Paste a link or text above — it syncs instantly for everyone in the room.
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {displayNotes.map((note) => {
              const isPending = note.id.startsWith("opt-");
              const url = isUrl(note.content);

              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: isPending ? 0.7 : 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  layout="position"
                >
                  <Card
                    className={`bg-card/60 backdrop-blur shadow-sm border-border/50 group transition-all
                      ${isPending ? "border-primary/40" : "hover:shadow-md"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="p-1.5 bg-muted/50 rounded-lg shrink-0 mt-0.5">
                          {url ? (
                            <LinkIcon
                              className={`w-3.5 h-3.5 ${isPending ? "text-primary animate-pulse" : "text-primary"}`}
                            />
                          ) : (
                            <StickyNote
                              className={`w-3.5 h-3.5 ${isPending ? "text-primary animate-pulse" : "text-muted-foreground"}`}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          {url ? (
                            <a
                              href={note.content}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-sm text-primary hover:underline underline-offset-2 break-all block"
                            >
                              {note.content}
                            </a>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                              {note.content}
                            </p>
                          )}
                          <p className="text-[10px] text-muted-foreground/40 mt-1.5 uppercase tracking-widest font-semibold">
                            {isPending
                              ? "Saving…"
                              : new Date(note.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                          </p>
                        </div>

                        {/* Copy — always visible on mobile, hover-reveal on desktop */}
                        {!isPending && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 h-7 w-7 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => copyNote(note.content)}
                            title="Copy to clipboard"
                            aria-label="Copy note"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
