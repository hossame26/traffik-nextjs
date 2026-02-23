'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav
      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 flex-wrap"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="hover:text-[#0066FF] transition-colors">Accueil</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#0066FF] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-black dark:text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
