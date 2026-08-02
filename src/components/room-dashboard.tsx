"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useRoomStream } from "@/hooks/useRoomStream";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Copy, UploadCloud, File, Download, SearchIcon, ImageIcon, FileTextIcon, ArchiveIcon, QrCode, StickyNote, User } from "lucide-react";
import { toast } from "sonner";
import { File as PrismaFile } from "@prisma/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
const QRCodeSVG = dynamic(() => import("qrcode.react").then((m) => m.QRCodeSVG), { ssr: false });
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SharedClipboard } from "./shared-clipboard";
import { RoomChat } from "./room-chat";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RoomCountdown } from "./room-countdown";

async function generateThumbnail(file: File): Promise<string | null> {
  if (file.type.startsWith("image/")) {
    return new Promise((resolve) => {
      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = 200;
        const scale = Math.min(size / img.width, size / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
        URL.revokeObjectURL(objectUrl);
      };
      img.onerror = () => resolve(null);
      img.src = objectUrl;
    });
  }
  return null;
}

export function RoomDashboard({ initialFiles, roomId, expiresAt }: { initialFiles: PrismaFile[], roomId: string, expiresAt: string }) {
  const [mounted, setMounted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selfDestruct, setSelfDestruct] = useState(false);
  const [activeTab, setActiveTab] = useState("files");
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const [isZipping, setIsZipping] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect tab from hash
    const hash = window.location.hash.replace("#", "");
    if (["files", "clipboard", "chat"].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.location.hash = value;
  };
  
  const { files: streamFiles, messages: streamMessages, notes: streamNotes, connected } = useRoomStream(roomId);
  const liveFiles: PrismaFile[] = streamFiles.length > 0 ? streamFiles : initialFiles;

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const tempId = `upload-${Date.now()}-${file.name}`;
      setUploadProgress((prev: Record<string, number>) => ({ ...prev, [tempId]: 0 }));

      // Generate thumbnail client-side before upload
      const thumbnail = await generateThumbnail(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("roomId", roomId);
      formData.append("selfDestruct", selfDestruct.toString());
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload", true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress((prev: Record<string, number>) => ({ ...prev, [tempId]: percentComplete }));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          toast.success(`Uploaded ${file.name}`);
          // SSE stream will pick up the new file automatically
        } else {
          toast.error(`Failed to upload ${file.name}`);
        }
        setUploadProgress((prev: Record<string, number>) => {
          const newProgress = { ...prev };
          delete newProgress[tempId];
          return newProgress;
        });
      };

      xhr.onerror = () => {
        toast.error(`Failed to upload ${file.name}`);
        setUploadProgress((prev: Record<string, number>) => {
          const newProgress = { ...prev };
          delete newProgress[tempId];
          return newProgress;
        });
      };

      xhr.send(formData);
    }
  }, [roomId, selfDestruct]);

  const { getRootProps, getInputProps, isDragActive, open: openFilePicker } = useDropzone({ onDrop, noClick: true });

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

  const downloadAllFiles = async () => {
    if (liveFiles.length === 0) return;
    setIsZipping(true);
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    
    try {
      toast.info("Preparing your ZIP archive...");
      
      const downloadPromises = liveFiles.map(async (file) => {
        const response = await fetch(file.path);
        const blob = await response.blob();
        zip.file(file.name, blob);
      });

      await Promise.all(downloadPromises);
      
      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `VioraShare_${roomId}.zip`;
      link.click();
      window.URL.revokeObjectURL(url);
      
      toast.success("Download started!");
    } catch (error) {
      console.error("Zipping error:", error);
      toast.error("Failed to create ZIP archive.");
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div {...getRootProps()} className={`flex flex-col gap-6 flex-1${isDragActive ? " ring-2 ring-primary ring-inset rounded-xl" : ""}`}>
      <input {...getInputProps()} />
      {/* Room Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Image src="/icon.png" alt="Viora" width={20} height={20} />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold tracking-tight leading-tight">
              Room <span className="font-mono tracking-widest">{roomId}</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Live</span>
              <span className={`text-[10px] font-semibold ${connected ? "text-green-500" : "text-orange-400 animate-pulse"}`}>
                · {connected ? "Connected" : "Reconnecting..."}
              </span>
            </div>
          </div>
        </div>
        <RoomCountdown expiresAt={expiresAt} />
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={copyRoomLink} className="bg-card/50 backdrop-blur h-9 text-sm gap-2">
          <Copy className="w-3.5 h-3.5" />
          Copy Link
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="bg-card/50 backdrop-blur h-9 text-sm gap-2">
              <QrCode className="w-3.5 h-3.5" />
              QR Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm flex flex-col items-center p-8">
            <DialogHeader>
              <DialogTitle className="text-center text-lg font-heading">Scan to Join</DialogTitle>
            </DialogHeader>
            <div className="bg-white p-4 rounded-2xl shadow-sm mt-2">
              <QRCodeSVG value={typeof window !== 'undefined' ? `${window.location.origin}/?join=${roomId}` : ""} size={180} />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">Scan on any device to join room <span className="font-mono font-bold">{roomId}</span>.</p>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="bg-card/50 backdrop-blur border border-border/40 mb-4 h-10 p-1">
          <TabsTrigger value="files" className="gap-1.5 text-sm h-8">
            <File className="w-3.5 h-3.5" />
            Files
          </TabsTrigger>
          <TabsTrigger value="clipboard" className="gap-1.5 text-sm h-8">
            <StickyNote className="w-3.5 h-3.5" />
            Clipboard
          </TabsTrigger>
          <TabsTrigger value="chat" className="gap-1.5 text-sm h-8">
            <User className="w-3.5 h-3.5" />
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-6 outline-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-3">
              {/* Drop zone */}
              <Card
                onClick={openFilePicker}
                className={`border-2 border-dashed cursor-pointer transition-all bg-card/30 backdrop-blur shadow-none
                  h-36 flex flex-col items-center justify-center rounded-2xl
                  ${isDragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-border/50 hover:border-primary/40 hover:bg-muted/10"}`}
              >
                <CardContent className="flex flex-col items-center justify-center pt-4 text-center gap-2">
                  <UploadCloud className={`w-9 h-9 ${isDragActive ? 'text-primary' : 'text-muted-foreground/60'}`} />
                  <div>
                    <p className="font-semibold text-sm">
                      {isDragActive ? "Drop to upload" : "Drag & drop or click to upload"}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">
                      Any file type supported
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Self-destruct toggle */}
              <div className="flex items-center gap-2.5 px-1">
                <Switch
                  id="self-destruct"
                  checked={selfDestruct}
                  onCheckedChange={setSelfDestruct}
                />
                <Label htmlFor="self-destruct" className="text-xs font-medium cursor-pointer text-muted-foreground">
                  💥 Self-destruct after 1 download
                </Label>
              </div>
            </div>

            <div className="mt-4 flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Files ({liveFiles.length})</h3>
                {liveFiles.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={downloadAllFiles} 
                    disabled={isZipping}
                    className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Download className={`w-3.5 h-3.5 mr-2 ${isZipping ? 'animate-bounce' : ''}`} />
                    {isZipping ? "Bundling..." : "Download All (ZIP)"}
                  </Button>
                )}
              </div>
              
              {/* Active Uploads */}
              {Object.keys(uploadProgress).length > 0 && (
                <div className="mb-6 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Uploading...</p>
                  {Object.entries(uploadProgress).map(([tempId, progress]) => (
                    <Card key={tempId} className="bg-primary/5 border-primary/20 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium truncate max-w-[200px]">{tempId.split('-').slice(2).join('-')}</span>
                          <span className="text-[10px] font-mono">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-1" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {liveFiles.length === 0 && Object.keys(uploadProgress).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border rounded-xl border-dashed bg-muted/10">
                  <SearchIcon className="w-8 h-8 mb-2 opacity-50" />
                  <p>No files uploaded yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {liveFiles.map(f => (
                    <Card key={f.id} className="bg-card/60 backdrop-blur shadow-sm hover:shadow-md transition-all group overflow-hidden border-border/50">
                      <CardContent className="p-0">
                        {/* Image Preview with Blur-up */}
                        {f.mimeType.startsWith('image/') && f.path && (
                          <div className="relative aspect-video w-full overflow-hidden bg-muted/20 group-hover:opacity-90 transition-opacity">
                            {!imageLoaded[f.id] && (
                              <div className="absolute inset-0 animate-pulse bg-muted-foreground/10 flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 opacity-20" />
                              </div>
                            )}
                            <Image 
                              src={f.path} 
                              alt={f.name} 
                              fill 
                              unoptimized={true}
                              className={`object-cover transition-all duration-500 ${imageLoaded[f.id] ? 'scale-100 blur-0' : 'scale-110 blur-xl'}`}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              onLoad={() => setImageLoaded((prev: Record<string, boolean>) => ({ ...prev, [f.id]: true }))}
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
            <SharedClipboard roomId={roomId} notes={streamNotes} />
          </motion.div>
        </TabsContent>

        <TabsContent value="chat" className="outline-none pt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-card/40 backdrop-blur border-border/50">
              <RoomChat roomId={roomId} messages={streamMessages} />
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
