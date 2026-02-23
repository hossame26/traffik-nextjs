'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, ArrowRight, MessageCircle } from 'lucide-react';

const categories = ['Tous', 'Site Vitrine', 'SaaS', 'E-commerce'];

const projects = [
  {
    id: 1, title: 'Nova Studio',
    category: 'Site Vitrine',
    description: "Agence créative 3D. Expérience immersive avec galaxie 3D interactive, scroll storytelling et effets de post-processing en temps réel.",
    details: "Site vitrine immersif avec galaxie 3D interactive, scroll storytelling et effets de post-processing en temps réel. Next.js 16, Three.js, React Three Fiber, Framer Motion.",
    tech: 'Site Vitrine', gradient: 'from-purple-600 to-cyan-500',
    image: '/images/projects/nova.jpg', link: '#',
    year: '2026',
  },
  {
    id: 2, title: 'Helix Lab',
    category: 'Site Vitrine',
    description: "Lab scientifique. Interface futuriste pour laboratoire de recherche avec ADN 3D animé, scan lines et esthétique sci-fi.",
    details: "Interface futuriste pour laboratoire de recherche avec ADN 3D animé, scan lines et esthétique sci-fi. Next.js 16, Three.js, Postprocessing, Framer Motion.",
    tech: 'Site Vitrine', gradient: 'from-emerald-500 to-cyan-500',
    image: '/images/projects/helix.jpg', link: '#',
    year: '2026',
  },
  {
    id: 3, title: 'Mentalité Focus',
    category: 'SaaS',
    description: "Membership premium. Plateforme pour entrepreneurs avec espace membres, paiements Stripe, livestreams quotidiens et communauté Discord.",
    details: "Plateforme membership premium pour entrepreneurs. Espace membres, paiements Stripe, livestreams quotidiens et communauté Discord. Next.js 15, Prisma, PostgreSQL, Stripe, NextAuth.",
    tech: 'SaaS', gradient: 'from-amber-500 to-yellow-500',
    image: '/images/projects/focusbusiness.webp', link: 'https://mentalitefocus.com',
    year: '2025',
  },
  {
    id: 4, title: 'Cremya',
    category: 'E-commerce',
    description: "Marque beauté. Site e-commerce au design organique avec animations fluides et fiches produit interactives.",
    details: "Site e-commerce au design organique avec animations fluides et fiches produit interactives. HTML/CSS/JS, CSS Animations, SVG, Responsive.",
    tech: 'E-commerce', gradient: 'from-rose-500 to-fuchsia-500',
    image: '/images/projects/cremya.webp', link: 'https://cremya.fr',
    year: '2025',
  },
  {
    id: 5, title: 'Nutri7',
    category: 'E-commerce',
    description: "Compléments naturels. Plateforme e-commerce au design raffiné avec animations subtiles et badges de certification.",
    details: "Plateforme e-commerce au design raffiné avec animations subtiles et badges de certification. HTML/CSS/JS, Responsive, E-commerce.",
    tech: 'E-commerce', gradient: 'from-green-500 to-emerald-500',
    image: '/images/projects/nutri7.jpg', link: 'https://nutri7.fr',
    year: '2025',
  },
];

const techColors = {
  'E-commerce': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  SaaS: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'Site Vitrine': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } };

export default function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const filteredProjects = activeFilter === 'Tous' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white">
      <div className="max-w-5xl mx-auto py-20 px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#0066FF] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-purple-600">Réalisations</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl">
            Des interfaces qui marquent les esprits. Sites premium, dashboards, SaaS — découvrez nos projets.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${activeFilter === cat ? 'bg-[#0066FF] text-white border-[#0066FF]' : 'bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-[#0066FF] hover:text-[#0066FF]'}`}>
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={cardVariants} layout className="group rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden hover:border-[#0066FF]/40 transition-all">
                <div className={`relative h-48 ${project.image ? '' : `bg-gradient-to-br ${project.gradient}`} flex items-center justify-center overflow-hidden`}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-white/80 text-sm font-medium tracking-wider uppercase">{project.tech}</span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold border ${techColors[project.tech]}`}>{project.tech}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{project.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">{project.details}</p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 text-center">
                      <div className="text-base font-bold text-[#0066FF]">{project.year}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Année</div>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 text-center">
                      <div className="text-base font-bold text-[#0066FF]">100%</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Satisfaction</div>
                    </div>
                  </div>
                  {project.link && project.link !== '#' ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-[#0066FF] group-hover:gap-3 transition-all cursor-pointer">
                      Visiter le site <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0066FF] group-hover:gap-3 transition-all cursor-pointer">
                      Voir le projet <ExternalLink className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun projet dans cette catégorie pour le moment.</p>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 text-center">
          <div className="p-10 rounded-3xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Qu&apos;attendez-vous pour rejoindre cette liste ?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">Chaque projet est unique. Discutons du vôtre et transformons votre vision en interface mémorable.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a href="https://wa.me/33756881246" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold hover:scale-105 transition-transform shadow-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <MessageCircle className="w-5 h-5" /> Discuter sur WhatsApp
              </motion.a>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0066FF] text-white font-bold hover:bg-[#0055D4] transition-colors shadow-lg shadow-[#0066FF]/25">
                Lancer mon projet <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
