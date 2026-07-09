import { useState, useEffect, useRef } from "react";

interface RoomStreamState {
  messages: any[];
  files: any[];
  notes: any[];
  connected: boolean;
}

export function useRoomStream(roomId: string) {
  const [state, setState] = useState<RoomStreamState>({
    messages: [],
    files: [],
    notes: [],
    connected: false,
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const backoffRef = useRef(1000);

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      if (eventSourceRef.current) eventSourceRef.current.close();

      const es = new EventSource(`/api/rooms/${roomId}/stream`);
      eventSourceRef.current = es;

      es.onopen = () => {
        if (!isMounted) return;
        setState(s => ({ ...s, connected: true }));
        backoffRef.current = 1000; // reset backoff on successful connect
      };

      es.addEventListener("init", (e: any) => {
        if (!isMounted) return;
        const data = JSON.parse(e.data);
        setState(s => ({ ...s, messages: data.messages, files: data.files, notes: data.notes }));
      });

      es.addEventListener("new_messages", (e: any) => {
        if (!isMounted) return;
        const newMessages: any[] = JSON.parse(e.data);
        setState(s => ({
          ...s,
          messages: [
            ...s.messages,
            ...newMessages.filter(m => !s.messages.find(existing => existing.id === m.id)),
          ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
        }));
      });

      es.addEventListener("new_files", (e: any) => {
        if (!isMounted) return;
        const newFiles: any[] = JSON.parse(e.data);
        setState(s => ({
          ...s,
          files: [
            ...newFiles.filter(f => !s.files.find(existing => existing.id === f.id)),
            ...s.files,
          ],
        }));
      });

      es.addEventListener("sync_notes", (e: any) => {
        if (!isMounted) return;
        setState(s => ({ ...s, notes: JSON.parse(e.data) }));
      });

      es.onerror = () => {
        es.close();
        if (!isMounted) return;
        setState(s => ({ ...s, connected: false }));
        // Exponential backoff reconnect: 1s → 2s → 4s → 8s → max 10s
        reconnectTimeoutRef.current = setTimeout(() => {
          backoffRef.current = Math.min(backoffRef.current * 2, 10000);
          connect();
        }, backoffRef.current);
      };
    };

    connect();

    return () => {
      isMounted = false;
      if (eventSourceRef.current) eventSourceRef.current.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [roomId]);

  return state;
}
