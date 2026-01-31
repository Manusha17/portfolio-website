import { HeroSection } from '@/components/organisms/HeroSection';
import { AboutSection } from '@/components/organisms/AboutSection';
import { ProjectsSection } from '@/components/organisms/ProjectsSection';
import { ArticlesSection } from '@/components/organisms/ArticlesSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';

export default function Home() {
  return (
    <div className="scroll-smooth">
      <section id="hero" className="min-h-screen">
        <HeroSection />
      </section>

      <section id="about" className="min-h-screen">
        <AboutSection />
      </section>

      <section id="projects" className="min-h-screen">
        <ProjectsSection />
      </section>

      <section id="articles" className="min-h-screen">
        <ArticlesSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </div>
  );
}
