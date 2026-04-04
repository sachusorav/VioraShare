'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, LogOut, Trash2, ArrowRight, Activity, Database, DatabaseZap, Clock, Hash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type AdminStats = {
  totalRooms: number;
  activeRooms: number;
  totalFiles: number;
};

type RoomExt = {
  id: string;
  createdAt: string;
  expiresAt: string;
  _count: {
    files: number;
    notes: number;
    messages: number;
  };
};

export default function AdminDashboard() {
  const [secret, setSecret] = useState<string>('');
  const [inputSecret, setInputSecret] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{ rooms: RoomExt[]; stats: AdminStats } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('viora_admin_secret');
    if (saved) {
      setSecret(saved);
      fetchData(saved);
    }
  }, []);

  const fetchData = async (adminSecret: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/rooms?secret=${adminSecret}`);
      if (!res.ok) throw new Error('Unauthorized');
      const json = await res.json();
      setData(json);
      setIsAuthenticated(true);
      localStorage.setItem('viora_admin_secret', adminSecret);
    } catch (err) {
      toast.error('Access Denied: Invalid Secret');
      setIsAuthenticated(false);
      localStorage.removeItem('viora_admin_secret');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(inputSecret);
    setSecret(inputSecret);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setData(null);
    localStorage.removeItem('viora_admin_secret');
    toast.success('Logged out successfully');
  };

  const deleteRoom = async (id: string) => {
    if (!confirm(`Delete room ${id}? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/rooms?secret=${secret}&id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success(`Room ${id} deleted`);
      fetchData(secret);
    } catch (err) {
      toast.error('Failed to delete room');
    }
  };

  if (!isAuthenticated && !isLoading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white/[0.03] border border-white/10 backdrop-blur-3xl p-8 rounded-[2.5rem] space-y-8 shadow-2xl relative"
        >
          <div className="text-center space-y-3">
             <div className="mx-auto w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:rotate-12 duration-500">
                <ShieldAlert className="w-8 h-8 text-primary" />
             </div>
             <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
             <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest leading-relaxed">Identity Check Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              placeholder="Enter Admin Secret Key"
              value={inputSecret}
              onChange={(e) => setInputSecret(e.target.value)}
              className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-center placeholder:text-muted-foreground/30 font-mono tracking-widest"
              required
            />
            <button className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-xl text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center group">
              Access Dashboard
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="pt-4 text-center">
            <Link href="/" className="text-[10px] text-muted-foreground/50 hover:text-white transition-colors uppercase tracking-[0.25em] font-bold">
              Back to VioraShare
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 relative selection:bg-primary/20 selection:text-primary">
       <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-primary">System Online</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter">Command Center</h1>
             </div>
             <button 
                onClick={handleLogout}
                className="flex items-center gap-2 h-10 px-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-bold transition-all uppercase tracking-widest group"
              >
                Terminate Session
                <LogOut className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
               { icon: Database, label: "Total Sessions", val: data?.stats.totalRooms || 0, sub: "Total storage rooms" },
               { icon: Activity, label: "Active Pulse", val: data?.stats.activeRooms || 0, sub: "Current unexpired rooms" },
               { icon: DatabaseZap, label: "Managed Files", val: data?.stats.totalFiles || 0, sub: "Items currently in cloud" },
             ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white/[0.03] border border-white/10 rounded-[2rem] space-y-4 hover:border-primary/20 transition-colors group"
                >
                   <div className="flex items-center justify-between">
                     <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
                        <stat.icon className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
                     </div>
                     <span className="text-2xl font-bold tracking-tighter">{stat.val}</span>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</p>
                     <p className="text-[11px] text-muted-foreground/40 font-medium">{stat.sub}</p>
                   </div>
                </motion.div>
             ))}
          </div>

          <div className="space-y-6">
             <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-muted-foreground/60 pl-2">Active Sharing Registry</h2>
             
             <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-3xl shadow-black/50 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                   <thead>
                      <tr className="border-b border-white/5">
                         <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">ID / Session</th>
                         <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Pulse Status</th>
                         <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Payload</th>
                         <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Created</th>
                         <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      <AnimatePresence>
                        {data?.rooms.map((room, i) => (
                          <motion.tr 
                            key={room.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.05 }}
                            className="group hover:bg-white/[0.02] transition-colors border-b border-white/[0.03] last:border-0"
                          >
                             <td className="px-8 py-5">
                                <span className="font-mono text-xs font-bold bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 group-hover:border-primary/20 transition-all">{room.id}</span>
                             </td>
                             <td className="px-8 py-5">
                                {new Date(room.expiresAt) > new Date() ? (
                                  <div className="flex items-center gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                     <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Pulsing</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                     <Clock className="w-3 h-3 text-muted-foreground/40" />
                                     <span className="text-[10px] font-bold text-muted-foreground/40 tracking-widest uppercase">Terminated</span>
                                  </div>
                                )}
                             </td>
                             <td className="px-8 py-5">
                                <div className="flex items-center gap-2">
                                   <Database className="w-3.5 h-3.5 text-muted-foreground/40" />
                                   <span className="text-xs font-bold">{room._count.files} Files</span>
                                </div>
                             </td>
                             <td className="px-8 py-5">
                                <span className="text-[10px] font-bold text-muted-foreground/50 tracking-widest">
                                   {new Date(room.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                                </span>
                             </td>
                             <td className="px-8 py-5">
                                <button 
                                  onClick={() => deleteRoom(room.id)}
                                  className="p-2.5 bg-red-500/0 hover:bg-red-500/10 border border-white/0 hover:border-red-500/20 rounded-xl transition-all text-red-500/40 hover:text-red-500 group/trash"
                                >
                                   <Trash2 className="w-4 h-4 transition-transform group-hover/trash:scale-110" />
                                </button>
                             </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                   </tbody>
                </table>
             </div>
          </div>
       </div>
    </main>
  );
}
