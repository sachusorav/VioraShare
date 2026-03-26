"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import useSWR, { mutate } from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Copy, UploadCloud, File, Download, SearchIcon, ImageIcon, FileTextIcon, ArchiveIcon, QrCode, StickyNote, User } from "lucide-react";
import { toast } from "sonner";
import { File as PrismaFile } from "@prisma/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QRCodeSVG } from 'qrcode.react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SharedClipboard } from "./shared-clipboard";
import { RoomChat } from "./room-chat";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function RoomDashboard({ initialFiles, roomId, expiresAt }: { initialFiles: PrismaFile[], roomId: string, expiresAt: string }) {
  const [mounted, setMounted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selfDestruct, setSelfDestruct] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { data } = useSWR(`/api/rooms/${roomId}`, fetcher, { 
    refreshInterval: 3000, 
    fallbackData: { room: { files: initialFiles } } 
  });
  
  const liveFiles: PrismaFile[] = data?.room?.files || initialFiles;

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const tempId = `temp-${Date.now()}-${file.name}`;
      setUploadProgress((prev) => ({ ...prev, [tempId]: 0 }));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("roomId", roomId);
      formData.append("selfDestruct", selfDestruct.toString());

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload", true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress((prev) => ({ ...prev, [tempId]: percentComplete }));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          toast.success(`Uploaded ${file.name}`);
          mutate(`/api/rooms/${roomId}`); 
        } else {
          toast.error(`Failed to upload ${file.name}`);
        }
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[tempId];
          return newProgress;
        });
      };

      xhr.onerror = () => {
        toast.error(`Failed to upload ${file.name}`);
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[tempId];
          return newProgress;
        });
      };

      xhr.send(formData);
    });
  }, [roomId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return <ImageIcon className="w-8 h-8 text-blue-500" />;
    if (mimeType.includes("pdf") || mimeType.includes("document")) return <FileTextIcon className="w-8 h-8 text-orange-500" />;
    if (mimeType.includes("zip") || mimeType.includes("compressed")) return <ArchiveIcon className="w-8 h-8 text-purple-500" />;
    return <File className="w-8 h-8 text-muted-foreground" />;
  };

  const copyRoomLink = () => {
    const url = `${window.location.origin}/?join=${roomId}`;
    navigator.clipboard.writeText(url);
    toast.success("Room link copied to clipboard!");
  }

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Room {roomId}
        </h1>
        <p className="text-muted-foreground">
          Expires at {mounted ? new Date(expiresAt).toLocaleTimeString() : "..."}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={copyRoomLink} className="bg-background/50 backdrop-blur">
          <Copy className="w-4 h-4 mr-2" />
          Copy Room Link
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-background/50 backdrop-blur">
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md flex flex-col items-center justify-center p-8">
            <DialogHeader>
              <DialogTitle className="text-center mb-4 text-xl font-heading">Room QR Code</DialogTitle>
            </DialogHeader>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <QRCodeSVG value={typeof window !== 'undefined' ? `${window.location.origin}/?join=${roomId}` : ""} size={200} />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">Scan this on a mobile device to instantly join room {roomId}.</p>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList className="bg-muted/50 backdrop-blur mb-6">
          <TabsTrigger value="files">
            <File className="w-4 h-4 mr-2" />
            Files
          </TabsTrigger>
          <TabsTrigger value="clipboard">
            <StickyNote className="w-4 h-4 mr-2" />
            Shared Clipboard
          </TabsTrigger>
          <TabsTrigger value="chat">
            <User className="w-4 h-4 mr-2" />
            Team Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-6 outline-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-4">
              <Card 
                {...getRootProps()} 
                className={`border-dashed border-2 cursor-pointer transition-colors bg-card/40 backdrop-blur shadow-none h-48 flex flex-col items-center justify-center ${isDragActive ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/50 hover:bg-muted/20"}`}
              >
                <input {...getInputProps()} />
                <CardContent className="flex flex-col items-center justify-center pt-6 text-center">
                  <UploadCloud className={`w-12 h-12 mb-4 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <h3 className="font-semibold text-lg mb-1">
                    {isDragActive ? "Drop files here" : "Drag & drop files here"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    or click to select files to securely share
                  </p>
                </CardContent>
              </Card>

              <div className="flex items-center space-x-2 px-1">
                <Switch 
                  id="self-destruct" 
                  checked={selfDestruct} 
                  onCheckedChange={setSelfDestruct} 
                />
                <Label htmlFor="self-destruct" className="text-sm font-medium cursor-pointer">
                  Auto-Self-Destruct (Delete after 1 download)
                </Label>
              </div>
            </div>

            <div className="mt-8 flex-1">
              <h3 className="text-xl font-heading font-semibold mb-4">Room Files ({liveFiles.length})</h3>
              
              {liveFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border rounded-xl border-dashed bg-muted/10">
                  <SearchIcon className="w-8 h-8 mb-2 opacity-50" />
                  <p>No files uploaded yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {liveFiles.map(f => (
                    <Card key={f.id} className="bg-card/60 backdrop-blur shadow-sm hover:shadow-md transition-all group overflow-hidden border-border/50">
                      <CardContent className="p-0">
                        {/* Image Preview */}
                        {f.mimeType.startsWith('image/') && f.path && (
                          <div className="relative aspect-video w-full overflow-hidden bg-muted/20 group-hover:opacity-90 transition-opacity">
                            <Image 
                              src={f.path} 
                              alt={f.name} 
                              fill 
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        
                        <div className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-muted/50 rounded-lg shrink-0">
                              {getFileIcon(f.mimeType)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate text-sm" title={f.name}>{f.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {(f.size / 1024 / 1024).toFixed(2)} MB • {new Date(f.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          {(f as any).selfDestruct && (
                            <div className="mt-2 flex items-center gap-1.5 text-[10px] items-center text-orange-500 font-bold uppercase tracking-wider">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                              Self-Destruct Mode Active
                            </div>
                          )}
                          
                          {uploadProgress[f.id] !== undefined && (
                            <Progress value={uploadProgress[f.id]} className="h-1.5 mt-4" />
                          )}
                          
                          <div className="mt-4 flex gap-2 child-buttons">
                            <a href={`/api/download/${f.id}`} target="_blank" rel="noreferrer" className="w-full">
                              <Button variant="secondary" size="sm" className="w-full text-xs">
                                <Download className="w-3 h-3 mr-2" />
                                Download
                              </Button>
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="clipboard" className="outline-none pt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SharedClipboard roomId={roomId} />
          </motion.div>
        </TabsContent>

        <TabsContent value="chat" className="outline-none pt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-card/40 backdrop-blur border-border/50">
              <RoomChat roomId={roomId} />
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
