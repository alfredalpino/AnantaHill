import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Great_Vibes, Playfair_Display, Pinyon_Script } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import ClientLayout from "@/components/ClientLayout";
import Preloader from "@/components/Preloader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon",
});

const manstromer = localFont({
  src: "../public/fonts/Manstromer-Slant.woff2",
  variable: "--font-manstromer",
  display: "swap",
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  title: "Ananta - By The Hill | Luxury Nature Resort in Hazaribagh",
  description: "Experience ultimate luxury and serenity at Ananta - By The Hill. A premium resort inspired by heritage and nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable} ${greatVibes.variable} ${pinyon.variable} ${manstromer.variable} font-body antialiased`}
      >
        <ToastProvider>
          <Preloader />
          <ClientLayout>{children}</ClientLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
