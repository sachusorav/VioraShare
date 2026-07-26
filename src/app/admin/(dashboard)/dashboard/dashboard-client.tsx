"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ShieldAlert,
  HardDrive,
  FolderOpen,
  Clock,
  Unlock,
  Lock,
  Trash2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface DashboardClientProps {
  stats: {
    activeRooms: number;
    allTimeRooms: number;
    todayRooms: number;
    weekRooms: number;
    totalFiles: number;
    totalStorageBytes: number;
    passcodedCount: number;
    noPasscodeCount: number;
    exp15m: number;
    exp1h: number;
    exp24h: number;
    otherExp: number;
  };
  chartData: Array<{ date: string; rooms: number }>;
  recentRooms: Array<{
    id: string;
    createdAt: string;
    expiresAt: string;
    filesCount: number;
    messagesCount: number;
    notesCount: number;
    hasPasscode: boolean;
  }>;
}

export function AdminDashboardClient({ stats, chartData, recentRooms: initialRecentRooms }: DashboardClientProps) {
  const [mounted, setMounted] = useState(false);
  const [recentRooms, setRecentRooms] = useState(initialRecentRooms);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm(`Are you sure you want to delete room ${roomId}? This will permanently delete all its files, notes, and messages.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/rooms/${roomId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete room");
      }

      toast.success(`Room ${roomId} deleted successfully`);
      setRecentRooms((prev) => prev.filter((r) => r.id !== roomId));
    } catch (err) {
      toast.error("Failed to delete room");
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-heading">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Real-time metrics and administration controls for VioraShare.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardTitle className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Active Rooms</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl sm:text-3xl font-bold">{stats.activeRooms}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently live</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardTitle className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Storage Used</CardTitle>
            <HardDrive className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl sm:text-3xl font-bold">{formatBytes(stats.totalStorageBytes)}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.totalFiles} files</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardTitle className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Rooms Created</CardTitle>
            <FolderOpen className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl sm:text-3xl font-bold">{stats.allTimeRooms}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.todayRooms} today</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardTitle className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Passcode Rate</CardTitle>
            <ShieldAlert className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl sm:text-3xl font-bold">
              {Math.round((stats.passcodedCount / (stats.allTimeRooms || 1)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">{stats.passcodedCount} locked</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="col-span-2 bg-card/40 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-heading">Rooms Created (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRooms" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary, #00e5a0)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--color-primary, #00e5a0)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(13,17,23,0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="rooms"
                    stroke="var(--color-primary, #00e5a0)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRooms)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                Loading charts...
              </div>
            )}
          </CardContent>
        </Card>

        {/* Room Expiry Breakdown */}
        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-heading">Room Expiry Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">15 Minutes Expiry</span>
                <span className="font-semibold">{stats.exp15m}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(stats.exp15m / (stats.allTimeRooms || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">1 Hour Expiry</span>
                <span className="font-semibold">{stats.exp1h}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(stats.exp1h / (stats.allTimeRooms || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">24 Hours Expiry</span>
                <span className="font-semibold">{stats.exp24h}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${(stats.exp24h / (stats.allTimeRooms || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Other / Custom Expiry</span>
                <span className="font-semibold">{stats.otherExp}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${(stats.otherExp / (stats.allTimeRooms || 1)) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="bg-card/40 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-heading">Recent Activity (Last 10 Rooms)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3 px-4">Room ID</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Security</th>
                  <th className="py-3 px-4">Content</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentRooms.map((room) => {
                  const isExpired = new Date(room.expiresAt) < new Date();
                  return (
                    <tr key={room.id} className="hover:bg-muted/10 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold">
                        <div className="flex items-center gap-1.5">
                          {room.id}
                          {!isExpired && (
                            <Link href={`/room/${room.id}`} target="_blank" className="text-muted-foreground hover:text-foreground">
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {new Date(room.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        {room.hasPasscode ? (
                          <span className="flex items-center gap-1 text-xs text-orange-500 font-bold uppercase tracking-wider">
                            <Lock className="w-3.5 h-3.5" />
                            Passcode
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-green-500 font-bold uppercase tracking-wider">
                            <Unlock className="w-3.5 h-3.5" />
                            Open
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-muted-foreground">
                        {room.filesCount} Files • {room.notesCount} Notes • {room.messagesCount} Chats
                      </td>
                      <td className="py-3.5 px-4">
                        {isExpired ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/10 text-red-500 border border-red-500/20">
                            Expired
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-500/10 text-green-500 border border-green-500/20">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {recentRooms.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No rooms found in database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
