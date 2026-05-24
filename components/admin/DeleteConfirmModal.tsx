'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export default function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message
}: DeleteConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-accent/60 backdrop-blur-sm" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative bg-white rounded-2xl w-full max-w-sm p-6 border border-secondary shadow-xl overflow-hidden text-center"
                    >
                        <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-text-primary mb-2">{title}</h3>
                        <p className="text-sm font-medium text-text-muted mb-6">
                            {message}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 px-4 bg-secondary/30 text-text-primary font-bold rounded-xl transition-all hover:bg-secondary/50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 py-3 px-4 bg-error text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-error/20"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
