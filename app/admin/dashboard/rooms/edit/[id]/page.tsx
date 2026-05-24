'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import RoomForm, { RoomFormData } from '@/components/admin/RoomForm';
import { useToast } from '@/components/Toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EditRoomPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { showToast } = useToast();
    const resolvedParams = use(params);
    const [initialData, setInitialData] = useState<RoomFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!resolvedParams.id) return;
        
        // Mock fetch logic
        setTimeout(() => {
            const mockData = {
                id: resolvedParams.id,
                name: 'Luxury Villa',
                type: 'Villas',
                capacity: 2,
                basePrice: '12000',
                description: 'A premium luxury villa with private garden.',
                isAvailable: true,
                images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400'],
                totalRooms: 5
            };
            
            setInitialData({
                name: mockData.name,
                type: mockData.type,
                capacity: mockData.capacity,
                basePrice: mockData.basePrice,
                description: mockData.description,
                isAvailable: mockData.isAvailable,
                images: mockData.images,
                totalRooms: mockData.totalRooms
            });
            setIsLoading(false);
        }, 800);
    }, [resolvedParams.id]);

    const handleSubmit = async (data: RoomFormData) => {
        setIsSubmitting(true);
        try {
            // Mock submit logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast('Room updated successfully', 'success');
            router.push('/admin/dashboard/rooms');
        } catch (error) {
            console.error('Submit error:', error);
            showToast('Failed to update room', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center py-32 space-y-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest animate-pulse">Loading Room Config...</p>
            </div>
        );
    }

    if (!initialData) return null;

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
                    <h1 className="text-3xl font-display font-black text-text-primary tracking-tight">Edit Room Category</h1>
                    <p className="text-text-muted mt-1 font-medium italic">Adjusting parameters for &quot;{initialData.name}&quot;</p>
                </div>
            </div>

            {/* Form */}
            <RoomForm initialData={initialData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </motion.div>
    );
}
