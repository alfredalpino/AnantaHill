'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const shouldShowAtTop = pathname === '/contact' || pathname === '/booking';

    const showToast = (message: string, type: ToastType = 'success') => {
        setToast({ message, type });
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className={`fixed ${shouldShowAtTop ? 'top-24' : 'bottom-6'} right-6 z-[100] animate-in ${shouldShowAtTop ? 'slide-in-from-top-full' : 'slide-in-from-right-full'} duration-300`}>
                    <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-premium border ${toast.type === 'success' ? 'bg-success/10 border-success text-success' :
                            toast.type === 'error' ? 'bg-error/10 border-error text-error' :
                                'bg-primary/10 border-primary text-primary'
                        } backdrop-blur-md bg-white/90`}>
                        {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                        {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
                        {toast.type === 'info' && <Info className="w-5 h-5" />}
                        <span className="font-medium text-sm">{toast.message}</span>
                        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};
