'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import CRMTable from '@/components/admin/CRMTable';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
    LayoutGrid, 
    Calendar, 
    RefreshCw, 
    CheckCircle2, 
    XCircle, 
    Info, 
    ArrowRight,
    Home,
} from 'lucide-react';

export default function AdminRoomsPage() {
    const [roomsData, setRoomsData] = useState<Record<string, any>[]>([]);
    const [roomToDelete, setRoomToDelete] = useState<string | number | null>(null);
    const [isLoadingRooms, setIsLoadingRooms] = useState(true);
    const [targetDate, setTargetDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const fetchRooms = () => {
        setIsLoadingRooms(true);
        setTimeout(() => {
            setRoomsData([
                { id: '1', name: 'Luxury Villa', basePrice: 12000, capacity: 2, totalRooms: 5, availableQuantity: 3, checkinCloudMappedCode: 'LV-01', images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400'], bookedQuantity: 1 },
                { id: '2', name: 'Forest Villa', basePrice: 9000, capacity: 2, totalRooms: 8, availableQuantity: 5, checkinCloudMappedCode: 'FV-02', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400'], bookedQuantity: 2 },
                { id: '3', name: 'Garden Suite', basePrice: 7000, capacity: 3, totalRooms: 10, availableQuantity: 2, checkinCloudMappedCode: 'GS-03', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400'], bookedQuantity: 3 },
            ]);
            setIsLoadingRooms(false);
        }, 800);
    };

    useEffect(() => {
        fetchRooms();
    }, [targetDate]);

    const stats = useMemo(() => {
        const totalTypes = roomsData.length;
        const totalInventory = roomsData.reduce((acc, r) => acc + (r.totalRooms || 0), 0);
        const availableNow = roomsData.reduce((acc, r) => acc + (r.availableQuantity || 0), 0);
        const bookedNow = roomsData.reduce((acc, r) => acc + (r.bookedQuantity || 0), 0);
        return { totalTypes, totalInventory, availableNow, bookedNow };
    }, [roomsData]);

    const confirmDeleteRoom = async () => {
        if (!roomToDelete) return;
        showNotification('success', 'Room deleted successfully');
        setRoomToDelete(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-12"
        >
            <AnimatePresence>
                {notification && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className={`fixed top-6 right-6 p-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 border backdrop-blur-md ${
                            notification.type === 'success' 
                                ? 'bg-success/90 border-success/20 text-white' 
                                : 'bg-error/90 border-error/20 text-white'
                        }`}
                    >
                        {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span className="font-bold text-sm tracking-tight">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-display font-black text-text-primary tracking-tight">Room Inventory</h1>
                    <p className="text-text-muted mt-1 font-medium">Live synchronization with CheckinCloud</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/dashboard/rooms/add"
                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-[10px] uppercase tracking-widest transition-all hover:bg-primary/90 hover:shadow-xl inline-flex items-center gap-2"
                    >
                        + Add Category
                    </Link>
                    <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                        <input 
                            type="date" 
                            value={targetDate} 
                            onChange={(e) => setTargetDate(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-secondary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
                        />
                    </div>
                    <button 
                        type="button"
                        onClick={() => fetchRooms()}
                        disabled={isLoadingRooms}
                        className="p-2.5 bg-white border border-secondary rounded-xl text-text-muted hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${isLoadingRooms ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Room Categories', value: stats.totalTypes, icon: LayoutGrid, color: 'text-primary bg-primary/10' },
                    { label: 'Total Inventory', value: stats.totalInventory, icon: Home, color: 'text-accent bg-accent/5' },
                    { label: 'Available Today', value: stats.availableNow, icon: CheckCircle2, color: 'text-success bg-success/10' },
                    { label: 'Pending (Local)', value: stats.bookedNow, icon: Info, color: 'text-warning bg-warning/10' },
                ].map((stat, i) => (
                    <motion.div 
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-5 rounded-2xl border border-secondary shadow-premium hover:shadow-luxury transition-shadow flex items-center justify-between group"
                    >
                        <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-text-primary mt-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color} transition-transform group-hover:rotate-6`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="bg-white rounded-[2rem] border border-secondary shadow-premium overflow-hidden">
                <CRMTable
                    title="Live Room Status"
                    isLoading={isLoadingRooms}
                    data={roomsData}
                    columns={[
                        { header: 'Image', key: 'images', render: (val: any) => {
                            const imgs = val as string[];
                            return (imgs && imgs.length > 0) ? (
                                <div className="relative w-16 h-10 group overflow-hidden rounded-lg">
                                    <Image
                                        src={imgs[0]}
                                        alt="Room preview"
                                        fill
                                        unoptimized={imgs[0].startsWith('http') || imgs[0].startsWith('blob:')}
                                        className="object-cover transition-transform group-hover:scale-110"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-10 bg-secondary/30 rounded-lg flex items-center justify-center text-[8px] text-text-muted border border-secondary font-bold uppercase">No Img</div>
                            );
                        } },
                        { 
                            header: 'Room Type', 
                            key: 'name', 
                            render: (val: any, row: any) => (
                                <div className="flex flex-col">
                                    <span className="font-bold text-text-primary text-sm leading-tight">{val}</span>
                                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-tighter flex items-center gap-1 mt-0.5">
                                        <ArrowRight className="w-2 h-2" />
                                        Mapped: <span className="text-primary">{row.checkinCloudMappedCode || 'NOT_MAPPED'}</span>
                                    </span>
                                </div>
                            )
                        },
                        { 
                            header: 'Price', 
                            key: 'basePrice', 
                            render: (val: any) => (
                                <div className="font-bold text-text-primary tabular-nums">
                                    ₹{val}
                                    <span className="text-[10px] text-text-muted font-medium ml-1">/night</span>
                                </div>
                            )
                        },
                        {
                            header: 'Guests',
                            key: 'capacity',
                            className: 'text-center',
                            render: (val: any) => (
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-text-primary">{val || 0}</span>
                                    <span className="text-[9px] font-medium text-text-muted uppercase">Max</span>
                                </div>
                            )
                        },
                        { 
                            header: 'Total Rooms', 
                            key: 'totalRooms', 
                            className: 'text-center',
                            render: (val: any) => (
                                <div className="flex flex-col items-center">
                                    <span className="font-black text-text-primary text-lg leading-none">{val || 0}</span>
                                    <span className="text-[9px] font-bold text-text-muted uppercase mt-1">Total</span>
                                </div>
                            )
                        },
                        { 
                            header: 'Available', 
                            key: 'availableQuantity', 
                            className: 'text-center',
                            render: (val: any) => (
                                <div className={`flex flex-col items-center px-3 py-1.5 rounded-xl border ${
                                    (val || 0) > 0 ? 'bg-success/10 border-success/20' : 'bg-error/10 border-error/20'
                                }`}>
                                    <span className={`font-black text-xl leading-none ${
                                        (val || 0) > 0 ? 'text-success' : 'text-error'
                                    }`}>{val || 0}</span>
                                    <span className={`text-[8px] font-bold uppercase mt-1 tracking-wider ${
                                        (val || 0) > 0 ? 'text-success/70' : 'text-error/70'
                                    }`}>Vacant</span>
                                </div>
                            )
                        },
                        {
                            header: 'Actions',
                            key: 'actions',
                            className: 'text-right',
                            render: (_: any, row: any) => (
                                <div className="flex gap-4 items-center justify-end">
                                    <Link 
                                        href={`/admin/dashboard/rooms/edit/${row.id}`}
                                        className="text-xs font-bold text-primary hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => setRoomToDelete(row.id)} 
                                        className="text-xs font-bold text-error hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )
                        }
                    ]}
                    hideDefaultActions
                    hideExportAction
                />
            </div>

            <DeleteConfirmModal
                isOpen={!!roomToDelete}
                onClose={() => setRoomToDelete(null)}
                onConfirm={confirmDeleteRoom}
                title="Delete Room Entry"
                message="Are you sure you want to delete this room type from inventory? This will not affect existing bookings."
            />
        </motion.div>
    );
}
