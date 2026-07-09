"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Plus, Link as LinkIcon, StickyNote } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function SharedClipboard({ roomId, notes }: { roomId: string, notes: any[] }) {
  const [content, setContent] = useState("");
  
  // Local state for optimistic notes
  const [optimisticNotes, setOptimisticNotes] = useState<any[]>([]);

  // Clear optimistic notes once the real ones arrive via SSE
  useEffect(() => {
    if (notes.length > 0) {
      setOptimisticNotes(prev => 
        prev.filter(opt => !notes.some(n => n.id === opt.id || (n.content === opt.content && Math.abs(new Date(n.createdAt).getTime() - new Date(opt.createdAt).getTime()) < 5000)))
      );
    }
  }, [notes]);

  const displayNotes = [...optimisticNotes, ...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const optimisticNote = {
      id: `opt-${Date.now()}`,
      content: content, // Removed .trim() to preserve intentional spacing if any, though trailing trim is usually fine.
      createdAt: new Date().toISOString(),
      roomId,
    };

    setContent("");
    setOptimisticNotes(prev => [optimisticNote, ...prev]);

    try {
      const res = await fetch(`/api/rooms/${roomId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: optimisticNote.content }),
      });
      
      if (!res.ok) throw new Error("Failed to add note");
    } catch (error) {
      toast.error("Failed to add note");
      setOptimisticNotes(prev => prev.filter(n => n.id !== optimisticNote.id));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const isUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={addNote} className="flex flex-col gap-3">
        <Textarea
          placeholder="Paste code snippets, links, or multi-line notes..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-background/50 backdrop-blur min-h-[120px] resize-none"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!content.trim()} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add to Room Clipboard
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {displayNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border rounded-xl border-dashed bg-muted/10">
            <StickyNote className="w-8 h-8 mb-2 opacity-50" />
            <p>Your shared clipboard is empty.</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {displayNotes.map((note: any) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                layout
              >
                <Card className={`bg-card/60 backdrop-blur shadow-sm hover:shadow-md transition-all border-border/50 group ${note.id.startsWith('opt-') ? 'border-primary/40' : ''}`}>
                  <CardContent className="p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-start gap-3 overflow-hidden w-full">
                      <div className="p-2 bg-muted/50 rounded-lg shrink-0 mt-0.5">
                        {isUrl(note.content) ? (
                          <LinkIcon className={`w-4 h-4 ${note.id.startsWith('opt-') ? 'text-primary animate-pulse' : 'text-blue-500'}`} />
                        ) : (
                          <StickyNote className={`w-4 h-4 ${note.id.startsWith('opt-') ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        {isUrl(note.content) ? (
                          <a 
                            href={note.content} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-sm font-medium text-blue-500 hover:underline break-all block"
                          >
                            {note.content}
                          </a>
                        ) : (
                          <p className="text-sm font-medium whitespace-pre-wrap break-words leading-relaxed" title={note.content}>
                            {note.content}
                          </p>
                        )}
                        <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-widest">
                          {note.id.startsWith('opt-') ? "Saving to room..." : new Date(note.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="shrink-0 h-8 w-8 sm:opacity-0 group-hover:opacity-100 transition-opacity self-end sm:self-start"
                      onClick={() => copyToClipboard(note.content)}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
