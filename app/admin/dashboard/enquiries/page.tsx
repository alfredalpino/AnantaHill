'use client';

import { useState, useEffect, useMemo } from 'react';
import CRMTable from '@/components/admin/CRMTable';
import { motion } from 'framer-motion';
import { enquiries as mockEnquiries } from '@/data/crmData';

export default function AdminEnquiriesPage() {
    const [enquiriesData, setEnquiriesData] = useState<Record<string, any>[]>([]);
    const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'general' | 'event'>('all');

    useEffect(() => {
        // Simulated delay
        setTimeout(() => {
            setEnquiriesData(mockEnquiries);
            setIsLoadingEnquiries(false);
        }, 800);
    }, []);

    const filteredData = useMemo(() => {
        if (activeTab === 'all') return enquiriesData;
        return enquiriesData.filter(e => e.type?.toLowerCase() === activeTab);
    }, [enquiriesData, activeTab]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-text-primary">Guest Enquiries</h2>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Manage and respond to guest requests</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {(['all', 'general', 'event'] as const).map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                            activeTab === tab
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-text-muted border-secondary hover:bg-secondary/20'
                        }`}
                    >
                        {tab} ({tab === 'all' ? enquiriesData.length : enquiriesData.filter(e => e.type?.toLowerCase() === tab).length})
                    </button>
                ))}
            </div>

            <CRMTable
                title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Enquiries`}
                data={filteredData}
                isLoading={isLoadingEnquiries}
                columns={[
                    { header: 'ID', key: 'id', render: (val) => <span className="font-bold text-primary">{val as React.ReactNode}</span> },
                    {
                        header: 'Guest',
                        key: 'guestName',
                        render: (val, row) => (
                            <div className="flex flex-col">
                                <span className="font-bold text-text-primary whitespace-nowrap">{val as React.ReactNode}</span>
                                <span className="text-[9px] text-text-muted">{row.email}</span>
                            </div>
                        )
                    },
                    {
                        header: 'Phone',
                        key: 'phone',
                        render: (val) => <span className="text-[10px] font-bold text-text-primary">{val as string}</span>
                    },
                    {
                        header: 'Subject',
                        key: 'subject',
                        render: (val) => <span className="font-bold text-primary text-[11px] truncate max-w-[150px]">{val as string}</span>
                    },
                    {
                        header: 'Message',
                        key: 'message',
                        className: 'hidden lg:table-cell',
                        render: (val) => <span className="max-w-xs truncate block italic text-text-muted text-[11px]">"{val as React.ReactNode}"</span>
                    },
                    {
                        header: 'Status',
                        key: 'status',
                        render: (val) => (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                val === 'New' ? 'bg-primary/10 text-primary border-primary/20' :
                                val === 'Replied' ? 'bg-success/10 text-success border-success/20' :
                                'bg-text-muted/10 text-text-muted border-secondary'
                            }`}>
                                {val as React.ReactNode}
                            </span>
                        )
                    },
                ]}
                hideDefaultActions
                hideExportAction
            />
        </motion.div>
    );
}
