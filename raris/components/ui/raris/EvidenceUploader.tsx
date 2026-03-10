"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileIcon, X } from 'lucide-react';

export function EvidenceUploader({ onChange, maxFiles = 3 }: { onChange: (files: File[]) => void, maxFiles?: number }) {
    const [files, setFiles] = useState<File[]>([]);
    const [isDrag, setIsDrag] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); setIsDrag(false);
        if (e.dataTransfer.files) handleFiles(Array.from(e.dataTransfer.files));
    };
    const handleFiles = (newFiles: File[]) => {
        const combined = [...files, ...newFiles].slice(0, maxFiles);
        setFiles(combined); onChange(combined);
    };

    return (
        <div className="w-full">
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDrag(true) }}
                onDragLeave={() => setIsDrag(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${isDrag ? 'border-primary bg-primary/10 glow-blue' : 'border-muted/30 bg-surface/30 hover:border-primary/50'}`}
            >
                <UploadCloud className={`w-10 h-10 mb-3 ${isDrag ? 'text-primary' : 'text-muted'}`} />
                <p className="text-sm font-medium">Drag & drop or click to upload</p>
                <p className="text-xs text-muted mt-1">Photos, videos, audio, pdf. Max {maxFiles} files.</p>
                <input id="file-upload" type="file" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))} />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
                <AnimatePresence>
                    {files.map((f, i) => (
                        <motion.div key={i} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2 bg-surface border border-muted/20 pl-2 pr-1 py-1 rounded-lg">
                            <FileIcon className="w-4 h-4 text-primary" />
                            <span className="text-xs max-w-[100px] truncate">{f.name}</span>
                            <button onClick={() => { const n = files.filter((_, idx) => idx !== i); setFiles(n); onChange(n) }} className="p-1 hover:bg-danger/20 hover:text-danger rounded"><X className="w-3 h-3" /></button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
