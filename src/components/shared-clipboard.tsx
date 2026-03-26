"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Plus, Link as LinkIcon, StickyNote } from "lucide-react";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function SharedClipboard({ roomId }: { roomId: string }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data, isLoading } = useSWR(`/api/rooms/${roomId}/notes`, fetcher, {
    refreshInterval: 5000
  });

  const notes = data?.notes || [];

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/rooms/${roomId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (res.ok) {
        setContent("");
        mutate(`/api/rooms/${roomId}/notes`);
        toast.success("Note added to clipboard");
      } else {
        toast.error("Failed to add note");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
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
      <form onSubmit={addNote} className="flex gap-2">
        <Input
          placeholder="Paste a link or type a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-background/50 backdrop-blur"
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting || !content.trim()}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {isLoading && notes.length === 0 ? (
          <div className="h-24 bg-muted/20 animate-pulse rounded-xl" />
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border rounded-xl border-dashed bg-muted/10">
            <StickyNote className="w-8 h-8 mb-2 opacity-50" />
            <p>Your shared clipboard is empty.</p>
          </div>
        ) : (
          notes.map((note: any) => (
            <Card key={note.id} className="bg-card/60 backdrop-blur shadow-sm hover:shadow-md transition-all border-border/50 group">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-muted/50 rounded-lg shrink-0">
                    {isUrl(note.content) ? (
                      <LinkIcon className="w-4 h-4 text-blue-500" />
                    ) : (
                      <StickyNote className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0">
                    {isUrl(note.content) ? (
                      <a 
                        href={note.content} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm font-medium text-blue-500 hover:underline truncate block"
                      >
                        {note.content}
                      </a>
                    ) : (
                      <p className="text-sm font-medium truncate" title={note.content}>
                        {note.content}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {new Date(note.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(note.content)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
