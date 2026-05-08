import type { Metadata } from "next";
import { Outfit, Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import PageWrapper from "@/components/PageWrapper";



const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ananta - By The Hill",
  description: "Experience ultimate luxury and serenity at Ananta - By The Hill. A premium resort inspired by heritage and nature.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <body className="bg-ivory text-foreground antialiased flex flex-col min-h-screen font-sans">
        <Preloader />
        
        <Navbar />
        <PageWrapper>
          {children}
        </PageWrapper>
        <Footer />
      </body>
    </html>
  );
}
