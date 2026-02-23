import Hero from '@/components/sections/Hero';
import Solutions from '@/components/sections/Solutions';
import Ads from '@/components/sections/Ads';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Solutions />
      <Ads />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  );
}
