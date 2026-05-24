'use client';

import { useState } from 'react';
import CRMTable from '@/components/admin/CRMTable';
import { motion } from 'framer-motion';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { bookings as mockBookings } from '@/data/crmData';

export default function AdminBookingsPage() {
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [newBookingIds, setNewBookingIds] = useState<Set<string>>(new Set());

    const playAudioAlert = () => {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
            
            osc.start();
            gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
            osc.stop(ctx.currentTime + 0.5);
        } catch (e) {
            console.error('Audio play failed', e);
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const { data: bookingsData, isLoading: isLoadingBookings } = useAutoRefresh({
        fetchData: async () => {
            // Simulated delay
            await new Promise(resolve => setTimeout(resolve, 800));
            return mockBookings;
        },
        intervalMs: 10000,
        idKey: 'id',
        onNewData: (newItems) => {
            playAudioAlert();
            showNotification('success', `New booking received from ${newItems.map(i => i.guestName).join(', ')}`);
            setNewBookingIds(prev => {
                const updated = new Set(prev);
                newItems.forEach(i => updated.add(i.id));
                return updated;
            });
            setTimeout(() => {
                setNewBookingIds(prev => {
                    const updated = new Set(prev);
                    newItems.forEach(i => updated.delete(i.id));
                    return updated;
                });
            }, 5000);
        }
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
        >
            {notification && (
                <div className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg z-50 border font-bold text-xs ${
                    notification.type === 'success' ? 'bg-success/10 border-success text-success' : 'bg-error/10 border-error text-error'
                }`}>
                    {notification.message}
                </div>
            )}
            <CRMTable
                title="Room Bookings"
                data={bookingsData || []}
                columns={[
                    { header: 'ID', key: 'id', render: (val) => <span className="font-bold text-primary">{val as React.ReactNode}</span> },
                    { header: 'Guest', key: 'guestName', render: (val, row) => (
                        <div className="flex flex-col">
                            <span className="font-bold text-text-primary whitespace-nowrap">{val as React.ReactNode}</span>
                            <span className="text-[9px] text-text-muted">{row.email}</span>
                        </div>
                    ) },
                    { header: 'Room', key: 'room' },
                    { header: 'Check-In', key: 'checkIn' },
                    { header: 'Check-Out', key: 'checkOut' },
                    { header: 'Amount', key: 'amount', render: (val) => <span className="font-bold">₹{Number(val).toLocaleString()}</span> },
                    {
                        header: 'Status', key: 'status', render: (val) => (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                val === 'CONFIRMED' || val === 'Confirmed' ? 'bg-success/10 text-success border-success/20' :
                                val === 'PENDING' || val === 'Pending' ? 'bg-warning/10 text-warning border-warning/20' :
                                'bg-error/10 text-error border-error/20'
                            }`}>
                                {val as React.ReactNode}
                            </span>
                        )
                    },
                    {
                        header: 'Actions', key: 'actions', render: (_, row) => (
                            <button
                                onClick={() => showNotification('success', `Sync triggered for ${row.id} (CheckinCloud API pending)`)}
                                className="text-primary hover:text-primary-dark text-xs underline font-bold"
                            >
                                Sync CC
                            </button>
                        )
                    }
                ]}
                isLoading={isLoadingBookings}
                hideDefaultActions
                hideExportAction
                rowClassName={(row) => newBookingIds.has(row.id) ? 'bg-success/5 animate-pulse transition-all duration-1000' : ''}
            />
        </motion.div>
    );
}
