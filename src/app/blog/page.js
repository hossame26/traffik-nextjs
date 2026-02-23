import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Blog Création Site Web & Marketing Digital | Traffik Web',
  description: 'Conseils, guides et actualités sur la création de sites web, le SEO, Shopify, WordPress et la publicité digitale. Articles experts par Traffik Web.',
  alternates: { canonical: 'https://traffik-web.fr/blog' },
};

import BlogListContent from './BlogListContent';

export default function BlogPage() {
  const indexPath = path.join(process.cwd(), 'public', 'blog', 'index.json');
  const raw = fs.readFileSync(indexPath, 'utf-8');
  const articles = JSON.parse(raw).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return <BlogListContent articles={articles} />;
}
