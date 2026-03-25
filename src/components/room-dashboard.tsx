"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useSWR, { mutate } from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Copy, UploadCloud, File, Download, SearchIcon, ImageIcon, FileTextIcon, ArchiveIcon, QrCode } from "lucide-react";
import { toast } from "sonner";
import { File as PrismaFile } from "@prisma/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QRCodeSVG } from 'qrcode.react';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function RoomDashboard({ initialFiles, roomId }: { initialFiles: PrismaFile[], roomId: string }) {
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  
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

      <div className="mt-8 flex-1">
        <h3 className="text-xl font-heading font-semibold mb-4">Room Files ({liveFiles.length})</h3>
        
        {liveFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border rounded-xl border-dashed bg-muted/10">
            <SearchIcon className="w-8 h-8 mb-2 opacity-50" />
            <p>No files uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {liveFiles.map(f => (
              <Card key={f.id} className="bg-card/60 backdrop-blur shadow-sm hover:shadow-md transition-all group overflow-hidden border-border/50">
                <CardContent className="p-4">
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
