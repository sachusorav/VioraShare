"use client";

import { useState, useRef, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User } from "lucide-react";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function RoomChat({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data } = useSWR(`/api/rooms/${roomId}/messages`, fetcher, {
    refreshInterval: 3000
  });

  const messages = data?.messages || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    try {
      const res = await fetch(`/api/rooms/${roomId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message.trim() }),
      });

      if (res.ok) {
        setMessage("");
        mutate(`/api/rooms/${roomId}/messages`);
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[450px]">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
            <User className="w-8 h-8 mb-2" />
            <p className="text-sm">Start a conversation...</p>
          </div>
        ) : (
          messages.map((m: any) => (
            <div key={m.id} className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {m.author}
                </span>
                <span className="text-[10px] text-muted-foreground/50">
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="bg-muted/30 backdrop-blur rounded-2xl rounded-tl-none p-3 text-sm max-w-[85%] border border-border/50">
                {m.content}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-border/50 bg-background/30 backdrop-blur">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent"
            disabled={isSending}
          />
          <Button type="submit" size="icon" disabled={isSending || !message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
