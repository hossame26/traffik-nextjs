import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import BlogArticleContent from './BlogArticleContent';

export async function generateStaticParams() {
  const indexPath = path.join(process.cwd(), 'public', 'blog', 'index.json');
  const articles = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'public', 'blog', 'articles', `${slug}.json`);
  if (!fs.existsSync(filePath)) return {};

  const article = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    alternates: { canonical: `https://traffik-web.fr/blog/${slug}` },
    keywords: article.keywords?.join(', '),
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'public', 'blog', 'articles', `${slug}.json`);
  if (!fs.existsSync(filePath)) notFound();

  const article = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const indexPath = path.join(process.cwd(), 'public', 'blog', 'index.json');
  const allArticles = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  /* JSON-LD rendered server-side */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'Traffik Web',
      url: 'https://traffik-web.fr',
      logo: { '@type': 'ImageObject', url: 'https://traffik-web.fr/favicon.png' },
    },
    mainEntityOfPage: `https://traffik-web.fr/blog/${slug}`,
    wordCount: article.content
      ? article.content.replace(/<[^>]+>/g, '').split(/\s+/).length
      : undefined,
    keywords: article.keywords?.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleContent article={article} allArticles={allArticles} slug={slug} />
    </>
  );
}
