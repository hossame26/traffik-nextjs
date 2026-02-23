'use client';

import Link from 'next/link';
import { Home, ArrowLeft, MessageCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8F9FA] dark:bg-black px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-bold text-[#0066FF] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Page introuvable
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0066FF] text-white rounded-xl font-semibold hover:bg-[#0052CC] transition-colors"
          >
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Nous contacter
          </Link>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-2 text-gray-500 hover:text-[#0066FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Revenir en arrière
        </button>
      </div>
    </main>
  );
}
