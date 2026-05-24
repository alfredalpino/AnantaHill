'use client';

import { useState } from 'react';
import CRMTable from '@/components/admin/CRMTable';
import { motion } from 'framer-motion';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';

export default function TableReservationsPage() {
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    // Mock Fetching Data
    const { data: reservations, isLoading } = useAutoRefresh({
        fetchData: async () => {
            // Simulated delay
            await new Promise(resolve => setTimeout(resolve, 800));
            return [
                { id: 'RES-001', guestName: 'Vikram Singh', phone: '+91 98765 43210', date: '2026-05-15', time: '07:30 PM', guests: 4, status: 'Confirmed', requests: 'Window seat preferred' },
                { id: 'RES-002', guestName: 'Ananya Sharma', phone: '+91 87654 32109', date: '2026-05-15', time: '08:00 PM', guests: 2, status: 'Pending', requests: 'Birthday celebration' },
                { id: 'RES-003', guestName: 'Rahul Mehta', phone: '+91 76543 21098', date: '2026-05-16', time: '07:00 PM', guests: 6, status: 'Confirmed', requests: 'Vegetarian options required' },
                { id: 'RES-004', guestName: 'Priya Iyer', phone: '+91 65432 10987', date: '2026-05-16', time: '09:00 PM', guests: 3, status: 'Cancelled', requests: 'N/A' },
                { id: 'RES-005', guestName: 'Sanjay Gupta', phone: '+91 54321 09876', date: '2026-05-17', time: '08:30 PM', guests: 5, status: 'Confirmed', requests: 'Near the bar' },
            ];
        },
        intervalMs: 10000, // Refresh every 10 seconds
        idKey: 'id',
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                title="Recent Reservations"
                data={reservations}
                isLoading={isLoading}
                columns={[
                    { 
                        header: 'Res ID', 
                        key: 'id', 
                        render: (val) => <span className="font-bold text-primary">{val as React.ReactNode}</span> 
                    },
                    { 
                        header: 'Guest Name', 
                        key: 'guestName' 
                    },
                    { 
                        header: 'Contact', 
                        key: 'phone',
                        render: (val) => (
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-text-primary">{val as string}</span>
                            </div>
                        )
                    },
                    { 
                        header: 'Date & Time', 
                        key: 'date',
                        render: (_, row) => (
                            <div className="flex flex-col">
                                <span className="text-xs">{row.date}</span>
                                <span className="text-[10px] text-text-muted">{row.time}</span>
                            </div>
                        )
                    },
                    { 
                        header: 'Pax', 
                        key: 'guests'
                    },
                    { 
                        header: 'Requests', 
                        key: 'requests',
                        render: (val) => <span className="text-[10px] text-text-muted line-clamp-1">{val as string}</span>
                    },
                    { 
                        header: 'Status', 
                        key: 'status',
                        render: (val) => (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                val === 'Confirmed' ? 'bg-success/10 text-success' :
                                val === 'Pending' ? 'bg-warning/10 text-warning' :
                                'bg-error/10 text-error'
                            }`}>
                                {val as React.ReactNode}
                            </span>
                        )
                    },
                    {
                        header: 'Actions',
                        key: 'actions',
                        render: (_, row) => (
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => showNotification('success', `Confirmed ${row.id}`)}
                                    className="text-primary hover:text-primary-dark text-xs underline"
                                >
                                    Confirm
                                </button>
                                <button 
                                    onClick={() => showNotification('error', `Cancelled ${row.id}`)}
                                    className="text-error hover:text-error/80 text-xs underline"
                                >
                                    Cancel
                                </button>
                            </div>
                        )
                    }
                ]}
                hideDefaultActions
                hideExportAction
            />
        </motion.div>
    );
}
