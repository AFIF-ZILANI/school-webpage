import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryClientProvider } from "@/providers/queryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Raigon High School",
    description:
        "Welcome to Raigon High School - Nurturing minds, building futures",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <ReactQueryClientProvider>
                    <Navbar />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                    <Toaster />
                </ReactQueryClientProvider>
            </body>
        </html>
    );
}
