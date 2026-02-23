import fs from 'fs';
import path from 'path';
import { cities, services } from '@/data/cities';

const BASE_URL = 'https://traffik-web.fr';

export default function sitemap() {
  const now = new Date().toISOString();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tarifs`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/politique-confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cgv`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const servicePages = [
    { url: `${BASE_URL}/creation-site-shopify`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/creation-site-wordpress`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/developpement-react-nextjs`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/publicite-digitale`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/referencement-seo`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/audit-site-web`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];

  let blogPages = [];
  try {
    const indexPath = path.join(process.cwd(), 'public', 'blog', 'index.json');
    const articles = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    blogPages = articles.map((a) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: a.date || now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch {
    /* no blog articles */
  }

  const cityServicePages = [];
  for (const service of services) {
    for (const city of cities) {
      cityServicePages.push({
        url: `${BASE_URL}/${service.slug}-${city.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return [...staticPages, ...servicePages, ...blogPages, ...cityServicePages];
}
