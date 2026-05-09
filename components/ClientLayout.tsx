'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();
    const isExcludedRoute =
        pathname?.startsWith('/crm') ||
        pathname?.startsWith('/admin') ||
        pathname?.startsWith('/dashboard') ||
        pathname === '/login' ||
        pathname === '/signup';

    const isHome = pathname === '/';
    const mainClass =
        isExcludedRoute
            ? 'min-h-screen'
            : isHome
              ? 'min-h-screen'
              : 'min-h-screen pt-[72px]';

    return (
        <>
            {!isExcludedRoute && <Navbar />}
            <main className={mainClass}>
                {children}
            </main>
            {!isExcludedRoute && <Footer />}
        </>
    );
}
