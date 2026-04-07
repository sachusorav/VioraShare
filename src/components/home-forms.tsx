"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Lock, KeyRound, UploadCloud, DownloadCloud, History, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
function JoinParamWatcher({ onJoinParam }: { onJoinParam: (id: string) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const joinParam = searchParams.get("join");
    if (joinParam) onJoinParam(joinParam.toUpperCase());
  }, [searchParams, onJoinParam]);
  return null;
}

export function HomeForms() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("create");
  const [recentRooms, setRecentRooms] = useState<string[]>([]);

  useEffect(() => {
    // Load recent rooms from localStorage
    const saved = localStorage.getItem("viora_recent_rooms");
    if (saved) {
      try {
        setRecentRooms(JSON.parse(saved));
      } catch (e) {
        setRecentRooms([]);
      }
    }
  }, []);

  const saveRecentRoom = (roomId: string) => {
    const updated = [roomId, ...recentRooms.filter(id => id !== roomId)].slice(0, 5);
    setRecentRooms(updated);
    localStorage.setItem("viora_recent_rooms", JSON.stringify(updated));
  };

  const clearRecentRooms = () => {
    setRecentRooms([]);
    localStorage.removeItem("viora_recent_rooms");
    toast.success("Recent rooms cleared");
  };

  // Create Room State
  const [createPasscode, setCreatePasscode] = useState("");
  const [expiresIn, setExpiresIn] = useState("60"); // default 1 hour
  const [isCreating, setIsCreating] = useState(false);

  // Join Room State
  const [joinRoomId, setJoinRoomId] = useState("");
  const [joinPasscode, setJoinPasscode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createPasscode) {
      toast.error("Please enter a passcode to secure your room.");
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
      
      toast.success("Room created successfully!");
      saveRecentRoom(data.roomId);
      router.push(`/room/${data.roomId}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinRoomId || !joinPasscode) {
      toast.error("Please enter both Room ID and Passcode.");
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
      
      toast.success("Joined room successfully!");
      saveRecentRoom(joinRoomId);
      router.push(`/room/${joinRoomId}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsJoining(false);
    }
  };

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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="create" className="text-md py-3"><UploadCloud className="w-4 h-4 mr-2"/> Create Room</TabsTrigger>
        <TabsTrigger value="join" className="text-md py-3"><DownloadCloud className="w-4 h-4 mr-2"/> Join Room</TabsTrigger>
      </TabsList>
      
      <TabsContent value="create">
        <Card className="border-border/50 shadow-xl bg-card/60 backdrop-blur-xl">
          <form onSubmit={handleCreateRoom}>
            <CardHeader>
              <CardTitle className="text-2xl font-heading">New Room</CardTitle>
              <CardDescription>
                Create a secure, temporary space to share your files.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="space-y-2">
                <Label htmlFor="passcode" className="flex items-center"><Lock className="w-3 h-3 mr-2"/> Passcode</Label>
                <Input 
                  id="passcode" 
                  type="password" 
                  placeholder="Set a secure passcode" 
                  value={createPasscode}
                  onChange={(e) => setCreatePasscode(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiration">Expiration</Label>
                <Select value={expiresIn} onValueChange={(val) => { if (val) setExpiresIn(val); }}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select expiration time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                    <SelectItem value="1440">24 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="pt-4 pb-4">
              <Button type="submit" className="w-full font-semibold" disabled={isCreating}>
                {isCreating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {isCreating ? "Creating..." : "Create Room"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      <TabsContent value="join">
        <Card className="border-border/50 shadow-xl bg-card/60 backdrop-blur-xl">
          <form onSubmit={handleJoinRoom}>
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Join Room</CardTitle>
              <CardDescription>
                Enter the Room ID and passcode to access files.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="space-y-2">
                <Label htmlFor="roomId" className="flex items-center"><KeyRound className="w-3 h-3 mr-2"/> Room ID</Label>
                <Input 
                  id="roomId" 
                  placeholder="e.g. A1B2C3" 
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
                  className="bg-background/50 uppercase"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinPasscode" className="flex items-center"><Lock className="w-3 h-3 mr-2"/> Passcode</Label>
                <Input 
                  id="joinPasscode" 
                  type="password" 
                  placeholder="Enter room passcode" 
                  value={joinPasscode}
                  onChange={(e) => setJoinPasscode(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="pt-4 pb-4">
              <Button type="submit" className="w-full font-semibold" disabled={isJoining} variant="secondary">
                {isJoining ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {isJoining ? "Joining..." : "Access Files"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      {recentRooms.length > 0 && (
        <div className="mt-12 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
              <History className="w-3 h-3 mr-2" /> Recent Rooms
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearRecentRooms}
              className="h-7 text-[10px] text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="w-3 h-3 mr-1" /> Clear All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {recentRooms.map((id) => (
              <button
                key={id}
                onClick={() => router.push(`/room/${id}`)}
                className="flex items-center justify-between p-3 rounded-xl bg-card/40 border border-border/40 hover:border-primary/50 hover:bg-muted/30 transition-all group backdrop-blur-sm"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 text-primary font-bold text-xs">
                    {id.substring(0, 1)}
                  </div>
                  <span className="font-heading font-bold text-sm">Room {id}</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}
    </Tabs>
    </>
  );
}
