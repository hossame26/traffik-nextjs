'use client';

import Link from 'next/link';

export default function InternalLinks({ links = [] }) {
  if (!links.length) return null;

  return (
    <nav className="mt-16 border-t border-gray-200 dark:border-white/10 pt-8">
      <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Liens utiles</h3>
      <div className="flex flex-wrap gap-3">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="text-sm text-[#0066FF] hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
