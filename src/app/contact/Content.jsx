'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Contact from '@/components/sections/Contact';

export default function ContactContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white pt-28 pb-10">
      <div className="max-w-5xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#0066FF] hover:underline mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
        </Link>
      </div>
      <Contact />
    </div>
  );
}
