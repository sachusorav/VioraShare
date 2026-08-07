"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Loader2, Lock, KeyRound, UploadCloud, DownloadCloud,
  History, Trash2, ArrowRight, X, Eye, EyeOff,
} from "lucide-react";
import { toast } from "sonner";

// Reads ?join= param and clears it from URL immediately so user isn't trapped
function JoinParamWatcher({ onJoinParam }: { onJoinParam: (id: string) => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const joinParam = searchParams.get("join");
    if (joinParam) {
      onJoinParam(joinParam.toUpperCase());
      // Strip the ?join= from URL so refresh / backspace works cleanly
      window.history.replaceState({}, "", "/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function HomeForms() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("create");
  const [recentRooms, setRecentRooms] = useState<string[]>([]);

  // ── Show/hide password toggles ──
  const [showCreatePass, setShowCreatePass] = useState(false);
  const [showJoinPass, setShowJoinPass] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("viora_recent_rooms");
    if (saved) {
      try { setRecentRooms(JSON.parse(saved)); } catch { setRecentRooms([]); }
    }
  }, []);

  const saveRecentRoom = (roomId: string) => {
    const updated = [roomId, ...recentRooms.filter((id) => id !== roomId)].slice(0, 5);
    setRecentRooms(updated);
    localStorage.setItem("viora_recent_rooms", JSON.stringify(updated));
  };

  const clearRecentRooms = () => {
    setRecentRooms([]);
    localStorage.removeItem("viora_recent_rooms");
    toast.success("Recent rooms cleared");
  };

  // ── Create Room state ──
  const [createPasscode, setCreatePasscode] = useState("");
  const [expiresIn, setExpiresIn] = useState("60");
  const [isCreating, setIsCreating] = useState(false);

  // ── Join Room state ──
  const [joinRoomId, setJoinRoomId] = useState("");
  const [joinPasscode, setJoinPasscode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // Called by JoinParamWatcher when ?join= is in URL
  const handleJoinParam = useCallback((id: string) => {
    setJoinRoomId(id);
    setActiveTab("join");
  }, []);

  // When user switches back to Create tab, clear the join fields
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "create") {
      setJoinRoomId("");
      setJoinPasscode("");
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createPasscode) {
      toast.error("Please enter a passcode to secure your room.");
      return;
    }
    setIsCreating(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let tempId = "";
    for (let i = 0; i < 6; i++) tempId += chars.charAt(Math.floor(Math.random() * chars.length));
    router.push(`/room/${tempId}`);
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: createPasscode, expiresIn: parseInt(expiresIn), roomId: tempId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create room");
      saveRecentRoom(data.roomId);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
      router.push("/");
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = joinRoomId.trim().toUpperCase();
    const trimmedPass = joinPasscode.trim();
    if (!trimmedId || !trimmedPass) {
      toast.error("Please enter both Room ID and Passcode.");
      return;
    }
    setIsJoining(true);
    try {
      const res = await fetch(`/api/rooms/${trimmedId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: trimmedPass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid Room ID or Passcode");
      toast.success("Joined room successfully!");
      saveRecentRoom(trimmedId);
      router.push(`/room/${trimmedId}`);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <JoinParamWatcher onJoinParam={handleJoinParam} />
      </Suspense>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-3 h-11">
          <TabsTrigger value="create" className="text-sm gap-2 font-semibold">
            <UploadCloud className="w-4 h-4" /> Create Room
          </TabsTrigger>
          <TabsTrigger value="join" className="text-sm gap-2 font-semibold">
            <DownloadCloud className="w-4 h-4" /> Join Room
          </TabsTrigger>
        </TabsList>

        {/* ── CREATE ROOM ── */}
        <TabsContent value="create" className="w-full mt-0">
          <div className="w-full rounded-2xl border border-border/50 bg-card overflow-hidden shadow-xl">
            <form onSubmit={handleCreateRoom} className="w-full">
              <div className="p-5 pb-4 space-y-0.5">
                <h2 className="text-base font-semibold">New Room</h2>
                <p className="text-xs text-muted-foreground">
                  Create a secure, temporary space to share files.
                </p>
              </div>
              <div className="px-5 pb-4 space-y-4">
                {/* Passcode */}
                <div className="space-y-1.5">
                  <Label htmlFor="passcode" className="flex items-center gap-1.5 text-xs font-semibold">
                    <Lock className="w-3 h-3" /> Passcode
                  </Label>
                  <div className="relative">
                    <Input
                      id="passcode"
                      type={showCreatePass ? "text" : "password"}
                      placeholder="Set a passcode for this room"
                      value={createPasscode}
                      onChange={(e) => setCreatePasscode(e.target.value)}
                      className="bg-background/60 pr-10 h-10"
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCreatePass((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showCreatePass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expiry */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Expiration</Label>
                  <Select value={expiresIn} onValueChange={(val) => { if (val) setExpiresIn(val); }}>
                    <SelectTrigger className="bg-background/60 h-10">
                      <SelectValue placeholder="Select expiration time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="60">1 Hour</SelectItem>
                      <SelectItem value="1440">24 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="px-5 pb-5">
                <Button type="submit" className="w-full h-11 font-bold gap-2" disabled={isCreating}>
                  {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                  {isCreating ? "Creating Room..." : "Create Room"}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        {/* ── JOIN ROOM ── */}
        <TabsContent value="join" className="w-full mt-0">
          <div className="w-full rounded-2xl border border-border/50 bg-card overflow-hidden shadow-xl">
            <form onSubmit={handleJoinRoom} className="w-full">
              <div className="p-5 pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h2 className="text-base font-semibold">Join Room</h2>
                    <p className="text-xs text-muted-foreground">
                      Enter the Room ID and passcode to access files.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTabChange("create")}
                    className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors mt-0.5 shrink-0"
                  >
                    <X className="w-3 h-3" /> Create instead
                  </button>
                </div>
              </div>
              <div className="px-5 pb-4 space-y-4">
                {/* Room ID */}
                <div className="space-y-1.5">
                  <Label htmlFor="roomId" className="flex items-center gap-1.5 text-xs font-semibold">
                    <KeyRound className="w-3 h-3" /> Room ID
                  </Label>
                  <div className="relative">
                    <Input
                      id="roomId"
                      placeholder="e.g. A1B2C3"
                      value={joinRoomId}
                      onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
                      className="bg-background/60 uppercase tracking-widest font-mono pr-10 h-10"
                      autoComplete="off"
                      maxLength={6}
                      required
                    />
                    {joinRoomId && (
                      <button
                        type="button"
                        onClick={() => setJoinRoomId("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                        aria-label="Clear Room ID"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Passcode */}
                <div className="space-y-1.5">
                  <Label htmlFor="joinPasscode" className="flex items-center gap-1.5 text-xs font-semibold">
                    <Lock className="w-3 h-3" /> Passcode
                  </Label>
                  <div className="relative">
                    <Input
                      id="joinPasscode"
                      type={showJoinPass ? "text" : "password"}
                      placeholder="Enter room passcode"
                      value={joinPasscode}
                      onChange={(e) => setJoinPasscode(e.target.value)}
                      className="bg-background/60 pr-10 h-10"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowJoinPass((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showJoinPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5">
                <Button
                  type="submit"
                  className="w-full h-11 font-bold gap-2"
                  variant="secondary"
                  disabled={isJoining}
                >
                  {isJoining ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
                  {isJoining ? "Joining..." : "Access Files"}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        {/* ── RECENT ROOMS ── */}
        {recentRooms.length > 0 && (
          <div className="mt-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-3 h-3" /> Recent Rooms
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecentRooms}
                className="h-6 text-[10px] text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-3 h-3 mr-1" /> Clear
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {recentRooms.map((id) => (
                <button
                  key={id}
                  onClick={() => router.push(`/room/${id}`)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-card/40 border border-border/40 hover:border-primary/50 hover:bg-muted/30 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {id.substring(0, 1)}
                    </div>
                    <span className="font-mono font-bold text-sm tracking-widest">{id}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary" />
                </button>
              ))}
            </div>
          </div>
        )}
      </Tabs>
    </>
  );
}
