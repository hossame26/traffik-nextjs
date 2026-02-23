import Hero from '@/components/sections/Hero';
import Solutions from '@/components/sections/Solutions';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Solutions />
      <Projects />
      <Testimonials />
      <Process />
      <Contact />
    </main>
  );
}
