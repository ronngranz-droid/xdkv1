import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClassDataProvider } from '@/context/ClassDataContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingParticles from '@/components/common/FloatingParticles';
import FloatingBookPreview from '@/components/common/FloatingBookPreview';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'X DKV 1 — Website Resmi Kelas & Mading Digital',
  description: 'Portal digital kelas X DKV 1: Jadwal pelajaran, jadwal piket kebersihan Snoopy, struktur organisasi, direktori 35 siswa, dan mading kenangan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#DEF0FC] text-[#263B50] relative overflow-x-hidden">
        {/* Floating animated particles: bubbles, twinkling stars & pastel doodles */}
        <FloatingParticles />

        <ClassDataProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              {children}
            </main>
            <Footer />
            {/* Interactive floating book preview widget matching reference */}
            <FloatingBookPreview />
          </div>
        </ClassDataProvider>
      </body>
    </html>
  );
}
