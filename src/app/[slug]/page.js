import { notFound } from 'next/navigation';
import { cities, services, parseServiceCity } from '@/data/cities';
import CityServiceContent from './CityServiceContent';

export async function generateStaticParams() {
  const params = [];
  for (const service of services) {
    for (const city of cities) {
      params.push({ slug: `${service.slug}-${city.slug}` });
    }
  }
  return params;
}

function getFAQs(service, city) {
  return [
    {
      question: `Combien coûte une ${service.name.toLowerCase()} à ${city.name} ?`,
      answer: `Nos tarifs pour la ${service.name.toLowerCase()} commencent à partir de ${service.price}. Ce prix inclut la conception, le développement et l'optimisation de votre site. Nous sommes freelance, ce qui nous permet de proposer des tarifs jusqu'à 3 fois moins chers qu'une agence web traditionnelle à ${city.name}, tout en garantissant une qualité professionnelle.`,
    },
    {
      question: `Quel est le délai de livraison pour un projet de ${service.name.toLowerCase()} à ${city.name} ?`,
      answer: `Nous livrons la plupart de nos projets de ${service.name.toLowerCase()} en 5 à 10 jours ouvrables. Nous travaillons à distance avec nos clients de ${city.name} et de toute la région ${city.region}, ce qui nous permet d'être réactifs et efficaces. Vous recevez des mises à jour régulières tout au long du projet.`,
    },
    {
      question: `Pourquoi choisir Traffik Web pour votre ${service.keyword} à ${city.name} ?`,
      answer: `Traffik Web est un freelance spécialisé basé en France. Nous connaissons les spécificités du marché de ${city.name} et de la région ${city.region}. Nos avantages : des tarifs compétitifs à partir de ${service.price}, une livraison rapide, un accompagnement personnalisé et une expertise technique reconnue. Plus de 50 projets livrés avec un taux de satisfaction de 100%.`,
    },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { service, city } = parseServiceCity(slug);
  if (!service || !city) return {};

  return {
    title: `${service.name} à ${city.name} | À partir de ${service.price} | Traffik Web`,
    description: `${service.name} à ${city.name} (${city.region}) à partir de ${service.price}. Freelance web en France : site professionnel, livraison rapide en 5 jours, tarifs 3x moins chers qu'une agence. Devis gratuit.`,
    alternates: { canonical: `https://traffik-web.fr/${service.slug}-${city.slug}` },
    keywords: `${service.keyword} ${city.name}, ${service.keyword} ${city.region}, ${service.name.toLowerCase()} ${city.name}, agence web ${city.name}, freelance web ${city.name}, site internet ${city.name}`,
  };
}

export default async function CityServicePage({ params }) {
  const { slug } = await params;
  const { service, city } = parseServiceCity(slug);

  if (!service || !city) {
    notFound();
  }

  const faqs = getFAQs(service, city);

  /* JSON-LD schemas rendered server-side */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Traffik Web',
    description: `${service.name} à ${city.name} - Freelance web en France`,
    url: `https://traffik-web.fr/${service.slug}-${city.slug}`,
    telephone: '+33635505374',
    areaServed: {
      '@type': 'City',
      name: city.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.lat,
        longitude: city.lng,
      },
    },
    priceRange: service.price,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.region,
      addressCountry: 'FR',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://traffik-web.fr/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: service.name,
        item: `https://traffik-web.fr${service.parentPath}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: city.name,
        item: `https://traffik-web.fr/${service.slug}-${city.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CityServiceContent service={service} city={city} />
    </>
  );
}
