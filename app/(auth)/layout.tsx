import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -20%, rgba(189, 166, 96, 0.18), transparent 55%),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(189, 166, 96, 0.12), transparent 50%),
            radial-gradient(ellipse 50% 35% at 0% 80%, rgba(38, 30, 30, 0.08), transparent 45%)`,
        }}
      />
      <header className="relative z-10 px-6 py-6 flex items-center justify-between max-w-lg mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-text-body hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/nav-logo.png" alt="Ananta" width={180} height={40} className="h-10 w-auto" />
        </Link>
      </header>
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-6 md:pb-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
