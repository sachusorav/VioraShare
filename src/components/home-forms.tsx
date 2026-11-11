"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Loader2, Lock, KeyRound, UploadCloud, DownloadCloud,
  History, Trash2, ArrowRight, X, Eye, EyeOff, Check, Copy, AlertCircle,
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
  const [createError, setCreateError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const joinPasscodeRef = useRef<HTMLInputElement>(null);

  const expiryLabels: Record<string, string> = {
    "15": "15 minutes",
    "60": "1 hour",
    "1440": "24 hours",
  };

  const handleCopy = (key: string, text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  // ── Join Room state ──
  const [joinRoomId, setJoinRoomId] = useState("");
  const [joinPasscode, setJoinPasscode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  // Called by JoinParamWatcher when ?join= is in URL
  const handleJoinParam = useCallback((id: string) => {
    setJoinRoomId(id);
    setActiveTab("join");
  }, []);

  // When user switches back to Create tab, clear the join fields
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCreateError(null);
    setJoinError(null);
    if (tab === "create") {
      setJoinRoomId("");
      setJoinPasscode("");
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    if (!createPasscode) {
      const msg = "Please enter a passcode to secure your room.";
      setCreateError(msg);
      toast.error(msg);
      return;
    }
    setIsCreating(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let tempId = "";
    for (let i = 0; i < 6; i++) tempId += chars.charAt(Math.floor(Math.random() * chars.length));

    try {
      // Step 1: Create the room
      const createRes = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: createPasscode, expiresIn: parseInt(expiresIn), roomId: tempId }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.error || "Failed to create room");

      const roomId = createData.roomId ?? tempId;
      saveRecentRoom(roomId);

      // Automatically switch to Join Room tab with Room ID filled in and passcode focused
      setJoinRoomId(roomId);
      setJoinPasscode("");
      setCreatePasscode("");
      setActiveTab("join");
      toast.success("Room created! Enter passcode to join.");
      setTimeout(() => {
        joinPasscodeRef.current?.focus();
      }, 50);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong";
      setCreateError(msg);
      toast.error(msg);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError(null);
    const trimmedId = joinRoomId.trim().toUpperCase();
    const trimmedPass = joinPasscode.trim();
    if (!trimmedId || !trimmedPass) {
      const msg = "Room not found, or the passcode is incorrect. Check both and try again.";
      setJoinError(msg);
      toast.error(msg);
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
      if (!res.ok) throw new Error(data.error || "Room not found, or the passcode is incorrect. Check both and try again.");
      toast.success("Joined room successfully!");
      saveRecentRoom(trimmedId);
      router.push(`/room/${trimmedId}`);
    } catch {
      const msg = "Room not found, or the passcode is incorrect. Check both and try again.";
      setJoinError(msg);
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
        <TabsList className="w-full grid grid-cols-2 mb-4 h-11 bg-card border border-border rounded-[12px] p-1">
          <TabsTrigger value="create" className="text-sm gap-2 font-semibold">
            <UploadCloud className="w-4 h-4" /> Create Room
          </TabsTrigger>
          <TabsTrigger value="join" className="text-sm gap-2 font-semibold">
            <DownloadCloud className="w-4 h-4" /> Join Room
          </TabsTrigger>
        </TabsList>

        {/* ── CREATE ROOM ── */}
        <TabsContent value="create" className="w-full mt-0">
          <div className="w-full rounded-[12px] border border-border bg-card overflow-hidden shadow-xl">
            <form onSubmit={handleCreateRoom} className="w-full">
              <div className="p-5 pb-4 space-y-0.5">
                <h2 className="text-[22px] font-bold text-foreground">Create Room</h2>
              </div>
                <div className="px-5 pb-4 space-y-4">
                  {createError && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 p-3 rounded-[8px] bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in-50 duration-150"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-destructive" aria-hidden="true" />
                      <span>{createError}</span>
                    </div>
                  )}

                  {/* Passcode */}
                  <div className="space-y-1.5">
                    <Label htmlFor="passcode" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <Lock className="w-4 h-4 text-muted-foreground" aria-hidden="true" /> Passcode
                    </Label>
                    <div className="relative">
                      <Input
                        id="passcode"
                        type={showCreatePass ? "text" : "password"}
                        placeholder="Choose a passcode"
                        value={createPasscode}
                        onChange={(e) => {
                          setCreatePasscode(e.target.value);
                          if (createError) setCreateError(null);
                        }}
                        className="pr-12 h-11 min-h-[44px] text-[16px]"
                        autoComplete="new-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCreatePass((v) => !v)}
                        className="w-11 h-11 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                        aria-label={showCreatePass ? "Hide passcode" : "Show passcode"}
                      >
                        {showCreatePass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[13px] text-muted-foreground">
                      You will share this with your recipient
                    </p>
                  </div>

                  {/* Expiry */}
                  <div className="space-y-1.5">
                    <Label htmlFor="expiry-select" className="text-xs font-semibold text-foreground">
                      Delete this room after
                    </Label>
                    <Select value={expiresIn} onValueChange={(val) => { if (val) setExpiresIn(val); }}>
                      <SelectTrigger id="expiry-select" className="h-11 min-h-[44px] text-[16px]">
                        <SelectValue>
                          {expiryLabels[expiresIn] || "1 hour"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="1440">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="px-5 pb-5 space-y-3">
                  <Button
                    type="submit"
                    className="w-full h-11 min-h-[44px] font-semibold rounded-[8px] bg-primary text-primary-foreground hover:bg-primary/90 gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                    disabled={isCreating}
                  >
                    {isCreating ? <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" /> : <UploadCloud className="w-4 h-4 text-primary-foreground" />}
                    {isCreating ? "Creating room..." : "Create room"}
                  </Button>
                  <p className="text-[13px] text-muted-foreground text-center leading-[1.5]">
                    Share the Room ID and passcode with the person you want to receive the files.
                  </p>
                </div>
              </form>
          </div>
        </TabsContent>

        {/* ── JOIN ROOM ── */}
        <TabsContent value="join" className="w-full mt-0">
          <div className="w-full rounded-[12px] border border-border bg-card overflow-hidden shadow-xl">
            <form onSubmit={handleJoinRoom} className="w-full">
              <div className="p-5 pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h2 className="text-[22px] font-bold text-foreground">Join Room</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTabChange("create")}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mt-0.5 shrink-0 rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                    aria-label="Switch to Create Room tab"
                  >
                    <X className="w-3.5 h-3.5" /> Create instead
                  </button>
                </div>
              </div>
              <div className="px-5 pb-4 space-y-4">
                {joinError && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 p-3 rounded-[8px] bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in-50 duration-150"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-destructive" aria-hidden="true" />
                    <span>{joinError}</span>
                  </div>
                )}

                {/* Room ID */}
                <div className="space-y-1.5">
                  <Label htmlFor="roomId" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <KeyRound className="w-4 h-4 text-muted-foreground" aria-hidden="true" /> Room ID
                  </Label>
                  <div className="relative">
                    <Input
                      id="roomId"
                      placeholder="Enter Room ID"
                      value={joinRoomId}
                      onChange={(e) => {
                        setJoinRoomId(e.target.value.toUpperCase());
                        if (joinError) setJoinError(null);
                      }}
                      className="uppercase tracking-widest font-mono pr-24 h-11 min-h-[44px] text-[16px]"
                      autoComplete="off"
                      maxLength={6}
                      required
                    />
                    {joinRoomId && (
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleCopy("roomId", joinRoomId)}
                          className="h-9 px-2 flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          aria-label="Copy Room ID"
                          title="Copy Room ID"
                        >
                          {copiedKey === "roomId" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-success" />
                              <span className="text-[11px] text-success font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-accent" />
                              <span className="text-[11px] font-medium">Copy</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setJoinRoomId("")}
                          className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          aria-label="Clear Room ID"
                          title="Clear Room ID"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Passcode */}
                <div className="space-y-1.5">
                  <Label htmlFor="joinPasscode" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Lock className="w-4 h-4 text-muted-foreground" aria-hidden="true" /> Passcode
                  </Label>
                  <div className="relative">
                    <Input
                      ref={joinPasscodeRef}
                      id="joinPasscode"
                      type={showJoinPass ? "text" : "password"}
                      placeholder="Enter passcode"
                      value={joinPasscode}
                      onChange={(e) => {
                        setJoinPasscode(e.target.value);
                        if (joinError) setJoinError(null);
                      }}
                      className="pr-12 h-11 min-h-[44px] text-[16px]"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowJoinPass((v) => !v)}
                      className="w-11 h-11 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                      aria-label={showJoinPass ? "Hide passcode" : "Show passcode"}
                    >
                      {showJoinPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5">
                <Button
                  type="submit"
                  className="w-full h-11 min-h-[44px] font-semibold rounded-[8px] bg-primary text-primary-foreground hover:bg-primary/90 gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                  disabled={isJoining}
                >
                  {isJoining ? <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" /> : <DownloadCloud className="w-4 h-4 text-primary-foreground" />}
                  {isJoining ? "Joining..." : "Join room"}
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
                <History className="w-3.5 h-3.5" /> Recent Rooms
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
                  className="flex items-center justify-between px-3 py-2.5 rounded-[12px] bg-card border border-border hover:border-accent/50 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-[8px] bg-muted flex items-center justify-center text-foreground font-bold text-xs">
                      {id.substring(0, 1)}
                    </div>
                    <span className="font-mono font-bold text-sm tracking-widest text-foreground">{id}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-accent" />
                </button>
              ))}
            </div>
          </div>
        )}
      </Tabs>
    </>
  );
}
