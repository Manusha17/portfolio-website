import { Metadata } from 'next';
import { HeroSection } from '@/components/organisms/HeroSection';
import { AboutSection } from '@/components/organisms/AboutSection';
import { ProjectsSection } from '@/components/organisms/ProjectsSection';
import { ArticlesSection } from '@/components/organisms/ArticlesSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';
import { StructuredData } from '@/components/atoms/StructuredData';
import { generateMetadata } from '@/lib/seo';
import { generateHomepageStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = generateMetadata({
  title: 'Home',
  description:
    'Software engineer portfolio showcasing projects, articles, and professional experience',
});

export default function Home() {
  const structuredData = generateHomepageStructuredData();

  return (
    <>
      <StructuredData data={structuredData} />
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
    </>
  );
}
