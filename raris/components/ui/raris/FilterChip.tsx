"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function FilterChip({ label, onRemove }: { label: string, onRemove: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-primary/30 rounded-full text-xs font-medium text-bright"
        >
            {label}
            <button onClick={onRemove} className="opacity-70 hover:opacity-100 hover:text-danger flex items-center justify-center w-4 h-4 rounded-full hover:bg-danger/20 transition-colors">
                <X className="w-3 h-3" />
            </button>
        </motion.div>
    );
}
