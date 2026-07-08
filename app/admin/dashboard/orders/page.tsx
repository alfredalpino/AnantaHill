'use client';

import { useState } from 'react';
import CRMTable from '@/components/admin/CRMTable';
import { motion } from 'framer-motion';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { FoodOrder } from '@/data/crmData';

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
            const token = typeof window !== 'undefined' ? window.localStorage.getItem('ananta_admin_api_token') || '' : '';
            const res = await fetch('/api/admin/orders', {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                cache: 'no-store',
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || 'Failed to fetch food orders');
            }
            return Array.isArray(data) ? data : [];
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

    const updateOrderStatus = async (row: Record<string, any>, status: string) => {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('ananta_admin_api_token') || '' : '';
        const res = await fetch(`/api/admin/orders/${row.dbId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ status }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to update order status');
        handleFoodOrderStatus(row.id, status as FoodOrder['status']);
    };

    const retryPosSync = async (row: Record<string, any>) => {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('ananta_admin_api_token') || '' : '';
        const res = await fetch(`/api/admin/orders/${row.dbId}/retry-pos`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to retry POS sync');
        showNotification('success', data?.success ? 'POS sync successful' : 'POS sync failed');
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
                    { header: 'Room No.', key: 'roomNumber', render: (val) => <span className="font-bold">Room #{(val as React.ReactNode) || 'N/A'}</span> },
                    {
                        header: 'Items',
                        key: 'items',
                        render: (val) => <span className="text-[11px] font-medium">{Array.isArray(val) ? (val as Array<Record<string, any>>).map(i => `${i.name} x${i.quantity}`).join(', ') : String(val)}</span>
                    },
                    { header: 'Total', key: 'total', render: (val) => <span className="font-bold">₹{Number(val).toLocaleString('en-IN')}</span> },
                    { header: 'POS Ref', key: 'posOrderId', render: (val) => <span className="text-[10px] font-mono">{(val as string) || '-'}</span> },
                    { header: 'POS Sync', key: 'posSyncStatus', render: (val) => <span className="text-[10px] uppercase">{String(val || 'pending')}</span> },
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
                                        onClick={() => updateOrderStatus(row, 'Preparing').catch((e) => showNotification('error', e.message))}
                                        className="text-[10px] font-bold text-primary hover:underline"
                                    >
                                        Accept
                                    </button>
                                )}
                                {row.status === 'Preparing' && (
                                    <button
                                        onClick={() => updateOrderStatus(row, 'Delivered').catch((e) => showNotification('error', e.message))}
                                        className="text-[10px] font-bold text-success hover:underline"
                                    >
                                        Deliver
                                    </button>
                                )}
                                {row.status !== 'Delivered' && (
                                    <button
                                        onClick={() => updateOrderStatus(row, 'Cancelled').catch((e) => showNotification('error', e.message))}
                                        className="text-[10px] font-bold text-error hover:underline"
                                    >
                                        Cancel
                                    </button>
                                )}
                                {row.posSyncStatus === 'failed' && (
                                    <button
                                        onClick={() => retryPosSync(row).catch((e) => showNotification('error', e.message))}
                                        className="text-[10px] font-bold text-warning hover:underline"
                                    >
                                        Retry POS
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
