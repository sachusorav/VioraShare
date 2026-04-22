"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, KeyRound, Upload, Download } from "lucide-react";
import { toast } from "sonner";

/* ─ JoinParamWatcher ─ */
function JoinParamWatcher({ onJoinParam }: { onJoinParam: (id: string) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const j = searchParams.get("join");
    if (j) onJoinParam(j.toUpperCase());
  }, [searchParams, onJoinParam]);
  return null;
}

/* ─ Mono label ─ */
function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10px] uppercase tracking-[0.12em] mb-2"
      style={{ color: "#4a6060", fontFamily: "var(--font-space-mono, monospace)" }}
    >
      {children}
    </div>
  );
}

/* ─ Glass Input ─ */
function GlassInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`glass-input w-full rounded-[10px] px-4 py-3 text-[13px] outline-none transition-all ${props.className ?? ""}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderTopColor: "rgba(255,255,255,0.14)",
        color: "#e8f0f0",
        fontFamily: "var(--font-space-mono, monospace)",
        ...props.style,
      }}
    />
  );
}

/* ─ Expiry Pill ─ */
function ExpiryPill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 py-2.5 rounded-full text-center text-[12px] transition-all"
      style={{
        fontFamily: "var(--font-space-mono, monospace)",
        background: selected ? "rgba(0,229,160,0.1)" : "rgba(255,255,255,0.04)",
        border: selected ? "1px solid rgba(0,229,160,0.35)" : "1px solid rgba(255,255,255,0.08)",
        color: selected ? "#00e5a0" : "#4a6060",
        borderTopColor: selected ? "rgba(0,229,160,0.35)" : "rgba(255,255,255,0.14)",
      }}
    >
      {label}
    </button>
  );
}

/* ─ Submit Button ─ */
function SubmitBtn({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3.5 rounded-full flex items-center justify-center gap-2.5 btn-emerald mt-6 disabled:opacity-60"
      style={{
        fontFamily: "var(--font-space-mono, monospace)",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
      {children}
      {!loading && <span className="text-[15px] font-normal">→</span>}
    </button>
  );
}

/* ─ Recent Room Button ─ */
function RecentRoomBtn({ roomId, onClick }: { roomId: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        color: "#e8f0f0",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold"
          style={{ background: "rgba(0,229,160,0.1)", color: "#00e5a0" }}
        >
          {roomId.substring(0, 1)}
        </div>
        <span
          className="text-[13px] font-medium font-mono"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          Room {roomId}
        </span>
      </div>
      <span
        className="text-base opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform"
        style={{ color: "#00e5a0" }}
      >
        →
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════
   Main Component
═══════════════════════════════════════════ */
export function HomeForms() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const [recentRooms, setRecentRooms] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("viora_recent_rooms");
    if (saved) {
      try { setRecentRooms(JSON.parse(saved)); } catch { setRecentRooms([]); }
    }
  }, []);

  const saveRecentRoom = (id: string) => {
    const updated = [id, ...recentRooms.filter(r => r !== id)].slice(0, 5);
    setRecentRooms(updated);
    localStorage.setItem("viora_recent_rooms", JSON.stringify(updated));
  };

  /* Create Room */
  const [createPasscode, setCreatePasscode] = useState("");
  const [expiresIn, setExpiresIn] = useState("60");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createPasscode) {
      toast.error("Please set a passcode to secure your room.");
      return;
    }
    setIsCreating(true);
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: createPasscode, expiresIn: parseInt(expiresIn) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create room");
      toast.success("Room created!");
      saveRecentRoom(data.roomId);
      router.push(`/room/${data.roomId}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  /* Join Room */
  const [joinRoomId, setJoinRoomId] = useState("");
  const [joinPasscode, setJoinPasscode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinRoomId || !joinPasscode) {
      toast.error("Please enter Room ID and Passcode.");
      return;
    }
    setIsJoining(true);
    try {
      const res = await fetch(`/api/rooms/${joinRoomId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: joinPasscode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid Room ID or Passcode");
      toast.success("Joined room!");
      saveRecentRoom(joinRoomId);
      router.push(`/room/${joinRoomId}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsJoining(false);
    }
  };

  const expiryOptions = [
    { label: "15 min", value: "15" },
    { label: "1 hour", value: "60" },
    { label: "24 hrs", value: "1440" },
  ];

  return (
    <>
      <Suspense fallback={null}>
        <JoinParamWatcher
          onJoinParam={(id) => {
            setJoinRoomId(id);
            setActiveTab("join");
          }}
        />
      </Suspense>

      {/* Tab Header */}
      <div
        className="flex items-center justify-between px-6 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-0.5 p-1 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
          {(["create", "join"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 rounded-md text-[11px] uppercase tracking-[0.1em] transition-all"
              style={{
                fontFamily: "var(--font-space-mono, monospace)",
                background: activeTab === tab ? "rgba(0,229,160,0.1)" : "transparent",
                border: activeTab === tab ? "1px solid rgba(0,229,160,0.3)" : "1px solid transparent",
                color: activeTab === tab ? "#00e5a0" : "#4a6060",
              }}
            >
              {tab === "create" ? "Create" : "Join"}
            </button>
          ))}
        </div>
        <div
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em]"
          style={{ color: "#00e5a0", fontFamily: "var(--font-space-mono, monospace)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full pulse-emerald" style={{ background: "#00e5a0" }} />
          Secure
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6">
        {activeTab === "create" ? (
          <form onSubmit={handleCreateRoom}>
            <div className="mb-5">
              <MonoLabel>
                <Lock className="inline w-3 h-3 mr-1.5 opacity-60" />
                Passcode
              </MonoLabel>
              <GlassInput
                type="password"
                placeholder="Set a secure passcode"
                value={createPasscode}
                onChange={(e) => setCreatePasscode(e.target.value)}
                required
              />
            </div>

            <div className="mb-1">
              <MonoLabel>Room expires after</MonoLabel>
              <div className="flex gap-2">
                {expiryOptions.map((opt) => (
                  <ExpiryPill
                    key={opt.value}
                    label={opt.label}
                    selected={expiresIn === opt.value}
                    onClick={() => setExpiresIn(opt.value)}
                  />
                ))}
              </div>
            </div>

            <SubmitBtn loading={isCreating}>
              {isCreating ? "Creating..." : "Initialize Room"}
            </SubmitBtn>
          </form>
        ) : (
          <form onSubmit={handleJoinRoom}>
            <div className="mb-5">
              <MonoLabel>
                <KeyRound className="inline w-3 h-3 mr-1.5 opacity-60" />
                Room ID
              </MonoLabel>
              <GlassInput
                type="text"
                placeholder="e.g. A1B2C3"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
                style={{ textTransform: "uppercase" }}
                required
              />
            </div>

            <div className="mb-1">
              <MonoLabel>
                <Lock className="inline w-3 h-3 mr-1.5 opacity-60" />
                Passcode
              </MonoLabel>
              <GlassInput
                type="password"
                placeholder="Enter room passcode"
                value={joinPasscode}
                onChange={(e) => setJoinPasscode(e.target.value)}
                required
              />
            </div>

            <SubmitBtn loading={isJoining}>
              {isJoining ? "Joining..." : "Enter Room"}
            </SubmitBtn>
          </form>
        )}

        {/* Recent Rooms */}
        {recentRooms.length > 0 && (
          <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] uppercase tracking-[0.12em]"
                style={{ color: "#3a5050", fontFamily: "var(--font-space-mono, monospace)" }}
              >
                Recent rooms
              </span>
              <button
                type="button"
                onClick={() => {
                  setRecentRooms([]);
                  localStorage.removeItem("viora_recent_rooms");
                }}
                className="text-[10px] uppercase tracking-[0.08em] transition-colors"
                style={{ color: "#3a5050", fontFamily: "var(--font-space-mono, monospace)" }}
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {recentRooms.map((id) => (
                <RecentRoomBtn
                  key={id}
                  roomId={id}
                  onClick={() => router.push(`/room/${id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
