'use client';

import { useState } from 'react';
import { Search, Filter, Eye, XCircle, Download } from 'lucide-react';

interface CRMTableProps {
    title: React.ReactNode;
    data: Record<string, any>[];
    columns: { 
        header: React.ReactNode; 
        key: string; 
        className?: string;
        render?: (val: unknown, row: Record<string, any>) => React.ReactNode 
    }[];
    hideDefaultActions?: boolean;
    hideExportAction?: boolean;
    isLoading?: boolean;
    onRowClick?: (row: Record<string, any>) => void;
    rowClassName?: (row: Record<string, any>) => string;
}

export default function CRMTable({ 
    title, 
    data, 
    columns, 
    hideDefaultActions = false, 
    hideExportAction = false, 
    isLoading = false,
    onRowClick,
    rowClassName
}: CRMTableProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="bg-white rounded-xl border border-secondary overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 md:p-8 border-b border-secondary flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-bold font-display text-text-primary">{title}</h3>
                    <p className="text-xs text-text-muted font-bold tracking-widest uppercase mt-1">Total {filteredData.length} Records</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative min-w-[300px]">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search records..."
                            className="w-full pl-12 pr-6 py-3 bg-secondary/30 border border-secondary rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {!hideExportAction && (
                        <button className="hidden md:flex items-center gap-2 bg-text-primary text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-text-primary/90 transition-all uppercase tracking-widest">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left min-w-[800px] md:min-w-full">
                    <thead>
                        <tr className="bg-secondary/20 text-[10px] uppercase tracking-widest font-bold text-text-muted">
                            {columns.map(col => (
                                <th key={col.key} className={`px-6 py-5 ${col.className || ''}`}>{col.header}</th>
                            ))}
                            {!hideDefaultActions && <th key="actions" className="px-6 py-5">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary/30">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length + (hideDefaultActions ? 0 : 1)} className="py-20 text-center">
                                    <svg className="animate-spin h-8 w-8 text-primary/50 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="text-text-muted font-bold text-xs tracking-widest uppercase animate-pulse">Loading Data...</p>
                                </td>
                            </tr>
                        ) : filteredData.map((row, i) => (
                            <tr 
                                key={i} 
                                className={`hover:bg-secondary/10 transition-colors ${onRowClick ? 'cursor-pointer' : ''} ${rowClassName ? rowClassName(row) : ''}`}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map(col => (
                                    <td key={col.key} className={`px-6 py-5 text-sm ${col.className || ''}`}>
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                                {!hideDefaultActions && (
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <button className="p-2 hover:bg-primary/20 text-primary-dark rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors">
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!isLoading && filteredData.length === 0 && (
                <div className="p-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto">
                        <Search className="w-8 h-8 text-text-muted" />
                    </div>
                    <p className="text-text-muted font-bold text-sm">No records found matching your search.</p>
                </div>
            )}
        </div>
    );
}
