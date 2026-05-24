'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoomForm, { RoomFormData } from '@/components/admin/RoomForm';
import { useToast } from '@/components/Toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AddRoomPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: RoomFormData) => {
        setIsSubmitting(true);
        try {
            // Mock submit logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast('Room added successfully', 'success');
            router.push('/admin/dashboard/rooms');
        } catch (error) {
            console.error('Submit error:', error);
            showToast('Failed to add room', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-12"
        >
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link href="/admin/dashboard/rooms" className="inline-flex items-center gap-2 text-[10px] font-bold text-text-muted hover:text-primary transition-all mb-2 uppercase tracking-widest group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Inventory
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-black text-text-primary tracking-tight">Add New Category</h1>
                    <p className="text-text-muted mt-1 font-medium">Create a new room or villa type in the inventory.</p>
                </div>
            </div>

            {/* Form */}
            <RoomForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </motion.div>
    );
}
