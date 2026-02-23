import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import CookieBanner from '@/components/layout/CookieBanner';
import ThemeScript from '@/components/ThemeScript';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata = {
  metadataBase: new URL('https://traffik-web.fr'),
  title: {
    default: 'Traffik Web | Création Site Web & Marketing Digital | Freelance France',
    template: '%s | Traffik Web',
  },
  description: 'Agence web freelance spécialisée Shopify, WordPress et React. Sites qui convertissent, publicité Facebook & Google Ads, SEO. Résultats garantis.',
  keywords: 'création site web, agence web, Shopify, WordPress, site sur mesure, Facebook Ads, Google Ads, SEO, marketing digital, France',
  authors: [{ name: 'Traffik Web' }],
  creator: 'Traffik Web',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://traffik-web.fr/',
    siteName: 'Traffik Web',
    title: 'Traffik Web | Création Site Web & Marketing Digital | Freelance France',
    description: 'Agence web freelance spécialisée Shopify, WordPress et React. Sites qui convertissent, publicité Facebook & Google Ads, SEO. Résultats garantis.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traffik Web | Création Site Web & Marketing Digital | Freelance France',
    description: 'Agence web freelance spécialisée Shopify, WordPress et React. Sites qui convertissent, publicité Facebook & Google Ads, SEO. Résultats garantis.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://traffik-web.fr/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  other: {
    'theme-color': '#0066FF',
    'msapplication-TileColor': '#0066FF',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Traffik Web",
              "url": "https://traffik-web.fr",
              "logo": "https://traffik-web.fr/favicon.png",
              "image": "https://traffik-web.fr/og-image.jpg",
              "description": "Agence web freelance. Création de sites Shopify, WordPress, React. Publicité Facebook Ads, Google Ads et référencement SEO. À partir de 250€.",
              "priceRange": "€€",
              "address": { "@type": "PostalAddress", "addressCountry": "FR", "addressRegion": "France" },
              "geo": { "@type": "GeoCoordinates", "latitude": "48.8566", "longitude": "2.3522" },
              "contactPoint": { "@type": "ContactPoint", "telephone": "+33756881246", "contactType": "customer service", "availableLanguage": ["French", "English"] },
              "sameAs": ["https://wa.me/33756881246"],
              "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "19:00" }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Traffik Web",
              "url": "https://traffik-web.fr"
            }),
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} font-sans min-h-screen bg-[#F8F9FA] dark:bg-black text-black dark:text-white selection:bg-[#0066FF] selection:text-white transition-colors duration-500`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
