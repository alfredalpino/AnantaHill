'use client';

import { useState } from 'react';
import CRMTable from '@/components/admin/CRMTable';
import { motion } from 'framer-motion';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { foodOrders as mockOrders, FoodOrder } from '@/data/crmData';

export default function AdminOrdersPage() {
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

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

    const { data: foodOrdersData, isLoading: isLoadingFoodOrders, setOptimisticData } = useAutoRefresh({
        fetchData: async () => {
            await new Promise(resolve => setTimeout(resolve, 800));
            return mockOrders;
        },
        intervalMs: 10000,
        idKey: 'id',
        onNewData: (newItems) => {
            playAudioAlert();
            showNotification('success', `New Food Order(s): ${newItems.map(i => i.id).join(', ')}`);
            setNewOrderIds(prev => {
                const updated = new Set(prev);
                newItems.forEach(i => updated.add(i.id));
                return updated;
            });
            setTimeout(() => {
                setNewOrderIds(prev => {
                    const updated = new Set(prev);
                    newItems.forEach(i => updated.delete(i.id));
                    return updated;
                });
            }, 8000);
        }
    });

    const handleFoodOrderStatus = (id: string, newStatus: FoodOrder['status']) => {
        setOptimisticData(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
        showNotification('success', `Order ${id} status updated to ${newStatus}`);
    };

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
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold">Food Orders</h2>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Real-time room service tracking</p>
                </div>
            </div>

            <CRMTable
                title="Recent Orders"
                data={foodOrdersData || []}
                isLoading={isLoadingFoodOrders}
                columns={[
                    { header: 'Order ID', key: 'id', render: (val) => <span className="font-bold text-primary">{val as React.ReactNode}</span> },
                    { header: 'Room No.', key: 'roomNo', render: (val) => <span className="font-bold">Room #{val as React.ReactNode}</span> },
                    {
                        header: 'Items',
                        key: 'items',
                        render: (val) => <span className="text-[11px] font-medium">{val as string}</span>
                    },
                    { header: 'Total', key: 'total', render: (val) => <span className="font-bold">₹{Number(val).toLocaleString()}</span> },
                    { 
                        header: 'Status', key: 'status', render: (val) => (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                ['Delivered', 'COMPLETED', 'SERVED'].includes(val as string) ? 'bg-success/10 text-success border-success/20' :
                                ['Preparing', 'PREPARING', 'ACCEPTED'].includes(val as string) ? 'bg-primary/10 text-primary border-primary/20' :
                                val === 'FAILED' ? 'bg-error/10 text-error border-error/20' :
                                'bg-warning/10 text-warning border-warning/20'
                                }`}>
                                {val as React.ReactNode}
                            </span>
                        )
                    },
                    {
                        header: 'Actions',
                        key: 'actions',
                        render: (_, row) => (
                            <div className="flex gap-2">
                                {row.status === 'Pending' && (
                                    <button
                                        onClick={() => handleFoodOrderStatus(row.id, 'Preparing')}
                                        className="text-[10px] font-bold text-primary hover:underline"
                                    >
                                        Accept
                                    </button>
                                )}
                                {row.status === 'Preparing' && (
                                    <button
                                        onClick={() => handleFoodOrderStatus(row.id, 'Delivered')}
                                        className="text-[10px] font-bold text-success hover:underline"
                                    >
                                        Deliver
                                    </button>
                                )}
                                {row.status !== 'Delivered' && (
                                    <button
                                        onClick={() => handleFoodOrderStatus(row.id, 'Cancelled')}
                                        className="text-[10px] font-bold text-error hover:underline"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        )
                    }
                ]}
                hideDefaultActions
                hideExportAction
                rowClassName={(row) => newOrderIds.has(row.id) ? 'bg-primary/5 animate-pulse transition-all duration-1000' : ''}
            />
        </motion.div>
    );
}
