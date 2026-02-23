'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code2, Zap, Shield, Smartphone, Search, Layers, MessageCircle, Globe, Database, Star, Check, TrendingUp, Clock, Users } from 'lucide-react';
import FAQSection from '@/components/common/FAQSection';

const staggerContainer = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 1, y: 0, filter: 'blur(0px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } };

const reactFaqs = [
  { question: "Quelle différence entre un site React et WordPress ?", answer: "React est construit sur mesure en code. Contrairement à WordPress (thèmes/plugins), React offre liberté totale sur design et fonctionnalités. Performances 2 à 5x supérieures." },
  { question: "Un site React est-il bien référencé sur Google ?", answer: "Oui, avec Next.js (SSR/SSG). J'intègre systématiquement balises meta, données structurées, sitemap XML, temps de chargement optimisé." },
  { question: "Je peux modifier mon site React moi-même ?", answer: "Pour le contenu, j'intègre un CMS headless (Sanity, Strapi ou Notion) pour modifier textes et images sans toucher au code. Les modifs techniques nécessitent un développeur." },
  { question: "Combien de temps pour développer un site React ?", answer: "Site vitrine : 1 à 2 semaines. Application web : 3 à 6 semaines. Full-stack complexe : 2 à 3 mois. Devis détaillé sous 24h." }
];

function LiveTerminal() {
  const [lines, setLines] = useState([]);
  const fullCode = [
    { text: '$ npx create-next-app traffik', color: 'text-green-400', delay: 0 },
    { text: '', color: '', delay: 800 },
    { text: 'Creating a new Next.js app...', color: 'text-white/50', delay: 1200 },
    { text: '', color: '', delay: 1600 },
    { text: '> Installing react, react-dom, next...', color: 'text-blue-400', delay: 2000 },
    { text: '> Installing tailwindcss, framer-motion...', color: 'text-purple-400', delay: 2800 },
    { text: '', color: '', delay: 3400 },
    { text: 'Success! Your project is ready.', color: 'text-emerald-400', delay: 4000 },
    { text: '> Performance score: 100/100', color: 'text-[#0066FF]', delay: 4800 },
    { text: '> SEO: Fully optimized', color: 'text-[#0066FF]', delay: 5400 },
    { text: '> Deploy: traffik-web.fr', color: 'text-[#A855F7]', delay: 6000 },
  ];
  useEffect(() => {
    let cancelled = false;
    function run() {
      if (cancelled) return;
      setLines([]);
      const timers = fullCode.map((line, i) => setTimeout(() => { if (!cancelled) setLines(prev => [...prev, line]); }, line.delay));
      const loop = setTimeout(run, 9000);
      return () => { timers.forEach(clearTimeout); clearTimeout(loop); };
    }
    const cleanup = run();
    return () => { cancelled = true; if (cleanup) cleanup(); };
  }, []);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }} className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-[#0066FF]/20 via-[#A855F7]/10 to-[#0066FF]/20 rounded-3xl blur-2xl opacity-60" />
      <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-[#0066FF]/10">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
          <span className="text-[11px] text-white/30 font-mono ml-2">terminal -- zsh</span>
          <div className="ml-auto flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-[10px] text-green-400/60 font-mono">live</span></div>
        </div>
        <div className="p-5 font-mono text-sm min-h-[280px] max-h-[320px] overflow-hidden">
          {lines.map((line, i) => (<motion.div key={`${i}-${line.text}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className={`${line.color} leading-relaxed`}>{line.text || ' '}</motion.div>))}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-2 h-4 bg-[#0066FF] ml-0.5 mt-1" />
        </div>
      </div>
    </motion.div>
  );
}

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 15 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 15 });
  const handleMouse = (e) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; rotateX.set(y * -6); rotateY.set(x * 6); };
  return (<motion.div ref={ref} style={{ rotateX: springX, rotateY: springY, transformPerspective: 1200 }} onMouseMove={handleMouse} onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }} className={className}>{children}</motion.div>);
}

function MagneticButton({ children, href, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  return (
    <motion.a ref={ref} href={href} target="_blank" rel="noopener noreferrer" style={{ x: springX, y: springY }} onMouseMove={(e) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); x.set((e.clientX - rect.left - rect.width / 2) * 0.15); y.set((e.clientY - rect.top - rect.height / 2) * 0.15); }} onMouseLeave={() => { x.set(0); y.set(0); }} whileTap={{ scale: 0.95 }} className={className}>{children}</motion.a>
  );
}

function VitrinePreview() {
  const lines = [{ text: 'import React', color: 'text-purple-400' }, { text: '<Hero />', color: 'text-blue-400' }, { text: '<Features />', color: 'text-emerald-400' }, { text: '<Contact />', color: 'text-orange-400' }, { text: 'export default', color: 'text-purple-400' }];
  return (<div className="h-32 rounded-xl bg-[#0a0a0f] overflow-hidden relative p-3 font-mono border border-white/[0.06]"><div className="flex items-center gap-1.5 mb-2"><div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400/60" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" /><div className="w-1.5 h-1.5 rounded-full bg-green-400/60" /></div><span className="text-[8px] text-white/25 ml-1">App.tsx</span></div><div className="flex flex-col gap-0.5">{lines.map((line, i) => (<motion.div key={i} className="flex items-center gap-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: [0, 1, 1, 0.6], x: 0 }} transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, repeatDelay: 3 }}><span className="text-[8px] text-white/15 w-3 text-right">{i + 1}</span><span className={`text-[9px] ${line.color}`}>{line.text}</span></motion.div>))}</div></div>);
}

function SPAPreview() {
  const metrics = [{ label: 'Users', value: '2.4K', color: 'from-[#0066FF] to-blue-400' }, { label: 'Revenue', value: '12K', color: 'from-[#A855F7] to-purple-400' }, { label: 'Conv.', value: '8.3%', color: 'from-emerald-500 to-emerald-400' }];
  return (<div className="h-32 rounded-xl bg-[#0a0a0f] overflow-hidden relative p-3 flex flex-col border border-white/[0.06]"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-1.5"><Layers className="w-3 h-3 text-[#0066FF]" /><span className="text-[9px] text-white/40 font-medium">Dashboard</span></div><div className="flex gap-1 items-center"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-[8px] text-green-400/60">Live</span></div></div><div className="grid grid-cols-3 gap-1.5 mb-2">{metrics.map((m, i) => (<motion.div key={i} className="rounded-lg bg-white/[0.05] p-1.5 text-center" animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}><div className={`text-[10px] font-bold bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>{m.value}</div><div className="text-[7px] text-white/25">{m.label}</div></motion.div>))}</div><div className="flex items-end gap-0.5 flex-1">{[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (<motion.div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#0066FF]/40 to-[#A855F7]/40" initial={{ height: '0%' }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.08, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }} />))}</div></div>);
}

function FullStackPreview() {
  const layers = [{ label: 'Frontend', icon: 'React', color: 'border-[#0066FF]/30' }, { label: 'API Routes', icon: 'API', color: 'border-[#A855F7]/30' }, { label: 'Database', icon: 'DB', color: 'border-emerald-500/30' }];
  return (<div className="h-32 rounded-xl bg-[#0a0a0f] overflow-hidden relative p-3 flex flex-col items-center justify-center gap-1.5 border border-white/[0.06]">{layers.map((layer, i) => (<motion.div key={i} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg border ${layer.color} bg-white/[0.02]`} animate={{ x: [0, 3, 0, -3, 0] }} transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}><span className="text-[9px] text-white/50 font-bold">{layer.icon}</span><span className="text-[9px] text-white/40">{layer.label}</span><motion.div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }} /></motion.div>))}</div>);
}

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const animate = (time) => { if (!startTime) startTime = time; const progress = Math.min((time - startTime) / duration, 1); const eased = 1 - Math.pow(1 - progress, 3); setCount(Math.floor(eased * target)); if (progress < 1) requestAnimationFrame(animate); };
    requestAnimationFrame(animate);
  }, [start, target, duration]);
  return count;
}

export default function ReactDevContent() {
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsInView(true); }, { threshold: 0.5 }); if (statsRef.current) observer.observe(statsRef.current); return () => observer.disconnect(); }, []);
  const projects = useCountUp(50, 1800, statsInView);
  const lighthouse = useCountUp(100, 2200, statsInView);
  const satisfaction = useCountUp(100, 2000, statsInView);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white transition-colors relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden dark:block">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#0066FF]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#A855F7]/[0.02] rounded-full blur-[180px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#0066FF]/[0.03] rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10">
        <section className="lg:min-h-[90vh] flex items-center pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <Link href="/" className="inline-flex items-center gap-2 text-[#0066FF] hover:underline mb-10 text-sm"><ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil</Link>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 border border-[#0066FF]/25 bg-[#0066FF]/[0.08] px-4 py-2 rounded-full mb-6"><span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-[#0066FF] opacity-75" /><span className="relative rounded-full h-2 w-2 bg-[#0066FF]" /></span><span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0066FF]">Best Seller</span></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[0.95] mb-6 text-gray-900 dark:text-white">Applications{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#5B8DEF] to-[#A855F7]">React & Next.js</span></h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mb-8 leading-relaxed">Ultra-rapides, SEO-friendly, construites sur mesure. Du site vitrine au SaaS complet.</p>
                <div className="flex flex-wrap gap-3 mb-10">
                  <MagneticButton href="https://wa.me/33756881246?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20d%C3%A9veloppement%20React." className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066FF] text-white font-bold rounded-full shadow-lg shadow-[#0066FF]/30 hover:shadow-[#0066FF]/50 transition-shadow"><MessageCircle className="w-5 h-5" /> Discuter du projet</MagneticButton>
                  <motion.a href="#pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] text-gray-900 dark:text-white font-semibold rounded-full hover:border-[#0066FF]/30 transition-all">Voir les formules <ArrowRight className="w-4 h-4" /></motion.a>
                </div>
                <div className="flex gap-8">
                  {[{ value: '100', label: 'Lighthouse Score' }, { value: '< 1s', label: 'Temps chargement' }, { value: '50+', label: 'Projets React' }].map((stat, i) => (<div key={i}><div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</div></div>))}
                </div>
              </div>
              <div className="hidden lg:block"><LiveTerminal /></div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Pricing */}
          <div className="relative mb-20 scroll-mt-24 rounded-3xl p-6 md:p-10 -mx-2 md:-mx-4" id="pricing">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/[0.07] via-[#A855F7]/[0.04] to-[#0066FF]/[0.06] dark:from-[#0066FF]/[0.1] dark:via-[#A855F7]/[0.06] dark:to-[#0066FF]/[0.08] rounded-3xl" />
            <div className="absolute top-10 -left-10 w-60 h-60 bg-[#0066FF]/10 dark:bg-[#0066FF]/[0.15] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -right-10 w-60 h-60 bg-[#A855F7]/10 dark:bg-[#A855F7]/[0.15] rounded-full blur-3xl pointer-events-none" />
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Nos formules <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#A855F7]">React & Next.js</span></h2>
              <p className="text-gray-500 mb-8">Tarifs transparents, code source livré.</p>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { name: 'Site Vitrine React', price: '600', priceType: 'fixed', icon: Globe, description: 'Landing page haute performance', preview: VitrinePreview, features: ['Design sur mesure responsive', 'Animations Framer Motion', 'SEO complet (SSR/SSG)', 'Score Lighthouse 90+', 'Déploiement inclus'] },
                  { name: 'Application Web', price: 'Sur devis', priceType: 'custom', icon: Layers, description: 'App interactive sur mesure', popular: true, preview: SPAPreview, features: ['Architecture scalable', 'Intégration API REST/GraphQL', 'Auth et gestion rôles', 'Dashboard interactif', 'Tests automatisés'] },
                  { name: 'Full-Stack Next.js', price: 'Sur devis', priceType: 'custom', icon: Database, description: 'Plateforme complète', preview: FullStackPreview, features: ['API Routes intégrées', 'Base de données', 'Paiement Stripe', 'Espace membre', 'Infrastructure cloud'] },
                ].map((plan, index) => {
                  const Icon = plan.icon; const Preview = plan.preview;
                  return (
                    <motion.div key={index} variants={staggerItem}>
                      <TiltCard className={`relative rounded-2xl p-5 flex flex-col h-full transition-all duration-300 ${plan.popular ? 'bg-white/40 dark:bg-white/[0.08] backdrop-blur-xl border border-black/[0.08] dark:border-[#0066FF]/40 shadow-lg shadow-black/[0.06] dark:shadow-[#0066FF]/10 ring-1 ring-black/[0.04] dark:ring-[#0066FF]/10' : 'bg-white/30 dark:bg-white/[0.04] backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-md shadow-black/[0.05] dark:shadow-black/[0.2] hover:shadow-lg hover:shadow-black/[0.08] hover:bg-white/50 dark:hover:bg-white/[0.07] transition-all'}`}>
                        {plan.popular && (<div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"><span className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#A855F7] text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-[#0066FF]/40"><Star className="w-3 h-3 fill-white" /> Best-Seller</span></div>)}
                        <div className="flex items-center gap-3 mb-4 pt-1"><div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-purple-600/20 flex items-center justify-center"><Icon className="w-5 h-5 text-[#0066FF]" /></div><div><h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">{plan.name}</h3><p className="text-xs text-gray-500 dark:text-gray-400">{plan.description}</p></div></div>
                        <div className="mb-4"><Preview /></div>
                        <div className="mb-5">{plan.priceType === 'custom' ? (<><span className="text-[10px] text-gray-500 uppercase tracking-wider">Tarif personnalisé</span><div className="flex items-baseline gap-2 mt-1"><span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#A855F7]">Sur devis</span></div><p className="text-[11px] text-gray-500 mt-1">Devis gratuit en 24h</p></>) : (<><span className="text-xs text-gray-500">À partir de</span><div className="flex items-baseline gap-1"><span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}EUR</span></div></>)}</div>
                        <ul className="space-y-2.5 mb-6 flex-1">{plan.features.map((feature, i) => (<li key={i} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 text-[#0066FF] mt-0.5 flex-shrink-0" /><span className="text-gray-600 dark:text-gray-400">{feature}</span></li>))}</ul>
                        <motion.a href={`https://wa.me/33756881246?text=${encodeURIComponent(`Bonjour, je suis intéressé par l'offre ${plan.name}. Pouvez-vous m'envoyer un devis ?`)}`} target="_blank" rel="noopener noreferrer" className={`w-full py-3 rounded-xl font-semibold text-center text-sm transition-all block ${plan.popular ? 'bg-gradient-to-r from-[#0066FF] to-[#A855F7] text-white shadow-lg shadow-[#0066FF]/25 hover:shadow-[#0066FF]/40' : 'bg-gray-900 dark:bg-white/[0.08] text-white hover:bg-gray-800 dark:hover:bg-white/[0.12] border border-transparent dark:border-white/[0.06]'}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{plan.priceType === 'custom' ? 'Demander un devis gratuit' : 'Demander un devis'}</motion.a>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          </div>

          {/* Tech Logos */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 flex flex-wrap items-center justify-center gap-6 md:gap-10 py-8 border-y border-gray-200 dark:border-white/[0.06]">
            {[{ name: 'React' }, { name: 'Next.js' }, { name: 'TypeScript' }, { name: 'Tailwind' }, { name: 'Vercel' }, { name: 'Framer Motion' }, { name: 'Supabase' }, { name: 'Stripe' }].map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                <img src={`/logos/${tech.name.toLowerCase().replace(/\s+/g, '').replace('.', '')}.svg`} alt={tech.name} className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity" />
                <span className="text-xs font-medium hidden sm:inline">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div ref={statsRef} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ value: `${projects}+`, label: 'Projets livrés', icon: TrendingUp }, { value: lighthouse, label: 'Lighthouse Score', icon: Zap }, { value: `${satisfaction}%`, label: 'Satisfaction', icon: Users }, { value: '< 1s', label: 'Temps de chargement', icon: Clock }].map((stat, i) => { const Icon = stat.icon; return (<motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08]"><Icon className="w-5 h-5 text-[#0066FF] mx-auto mb-2" /><div className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div><div className="text-xs text-gray-500 mt-1">{stat.label}</div></motion.div>); })}
          </motion.div>

          {/* Process */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 p-6 md:p-8 rounded-3xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-6 text-center text-gray-900 dark:text-white">Du brief au deploy en 2 semaines</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ num: '01', label: 'Brief', desc: 'Appel 30 min' }, { num: '02', label: 'Design', desc: 'Maquette validée' }, { num: '03', label: 'Dev', desc: 'Code sur mesure' }, { num: '04', label: 'Deploy', desc: 'Mise en ligne' }].map((step, i) => (<motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center"><div className="text-3xl font-black text-[#0066FF]/20 mb-1">{step.num}</div><div className="text-sm font-bold text-gray-900 dark:text-white">{step.label}</div><div className="text-xs text-gray-500 mt-0.5">{step.desc}</div></motion.div>))}
            </div>
          </motion.div>

          {/* Bento */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px]">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="col-span-2 row-span-1 rounded-3xl p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-[#0066FF]/[0.08] to-[#A855F7]/[0.06] dark:from-[#0066FF]/[0.12] dark:to-[#A855F7]/[0.08] border border-[#0066FF]/15 dark:border-[#0066FF]/20 hover:shadow-lg hover:shadow-[#0066FF]/5 transition-shadow duration-300"><Zap className="w-8 h-8 text-[#0066FF]" /><div><h3 className="text-xl font-bold mb-1">Score Lighthouse 100</h3><p className="text-sm text-gray-500 dark:text-gray-400">DOM virtuel, temps de chargement ultra-courts, expérience fluide.</p></div></motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="col-span-1 row-span-1 rounded-3xl p-5 md:p-6 flex flex-col justify-between bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] hover:shadow-lg hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-300"><Search className="w-7 h-7 text-[#A855F7]" /><div><h3 className="font-bold mb-0.5">SEO natif</h3><p className="text-xs text-gray-500">SSR & SSG avec Next.js</p></div></motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }} className="col-span-1 row-span-1 rounded-3xl p-5 md:p-6 flex flex-col justify-between bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] hover:shadow-lg hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-300"><Smartphone className="w-7 h-7 text-[#0066FF]" /><div><h3 className="font-bold mb-0.5">Mobile-first</h3><p className="text-xs text-gray-500">Responsive tous écrans</p></div></motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }} className="col-span-1 row-span-1 rounded-3xl p-5 md:p-6 flex flex-col justify-between bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] hover:shadow-lg hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-300"><Code2 className="w-7 h-7 text-[#0066FF]" /><div><h3 className="font-bold mb-0.5">Code à vous</h3><p className="text-xs text-gray-500">100% propriétaire</p></div></motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.25 }} className="col-span-2 md:col-span-3 row-span-1 rounded-3xl p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-gray-900 to-gray-800 dark:from-white/[0.06] dark:to-white/[0.03] border border-gray-700 dark:border-white/[0.08] hover:shadow-xl transition-shadow duration-300"><Layers className="w-8 h-8 text-[#0066FF]" /><div><h3 className="text-xl font-bold mb-1 text-white">Scalable à l&apos;infini</h3><p className="text-sm text-gray-300 dark:text-gray-400">Architecture modulaire qui grandit avec votre business. De la landing page au SaaS complet.</p></div></motion.div>
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Questions fréquentes</h2>
            <FAQSection faqs={reactFaqs} />
          </motion.section>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center rounded-3xl bg-gradient-to-br from-[#0066FF] to-purple-700 p-10 md:p-14 relative overflow-hidden mb-20">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-black mb-3">Prêt à lancer votre projet ?</h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">Réponse sous 2h, devis détaillé sous 24h. Pas d&apos;engagement.</p>
              <MagneticButton href="https://wa.me/33756881246" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0066FF] font-bold rounded-full hover:shadow-xl shadow-lg shadow-white/20 transition-all"><MessageCircle className="w-5 h-5" /> Discuter sur WhatsApp</MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
