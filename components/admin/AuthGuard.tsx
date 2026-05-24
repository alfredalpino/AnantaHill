'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem('ananta_admin_auth');
            if (auth === 'true') {
                document.cookie = "ananta_admin_session=true; path=/; max-age=86400; SameSite=Lax";
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                if (!pathname?.startsWith('/admin/login')) {
                    router.replace('/admin/login');
                }
            }
        };

        checkAuth();
    }, [pathname, router]);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-secondary/20 flex flex-col items-center justify-center font-body text-text-primary gap-4">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted animate-pulse">Initializing Portal...</p>
            </div>
        );
    }

    if (!isAuthenticated && !pathname?.startsWith('/admin/login')) {
        return null;
    }

    return <>{children}</>;
}
