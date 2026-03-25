"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Lock, KeyRound, UploadCloud, DownloadCloud } from "lucide-react";
import { toast } from "sonner"; 

export function HomeForms() {
  const router = useRouter();
  
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
      router.push(`/room/${joinRoomId}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Tabs defaultValue="create" className="w-full max-w-md mx-auto">
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
            <CardContent className="space-y-4">
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
            <CardFooter>
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
            <CardContent className="space-y-4">
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
            <CardFooter>
              <Button type="submit" className="w-full font-semibold" disabled={isJoining} variant="secondary">
                {isJoining ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {isJoining ? "Joining..." : "Access Files"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
