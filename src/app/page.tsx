import { HeroSection } from '@/components/organisms/HeroSection';
import { StructuredData } from '@/components/atoms/StructuredData';
import { generateHomepageStructuredData } from '@/lib/structured-data';
import { AboutSection } from '@/components/organisms/AboutSection';
import { ProjectsSection } from '@/components/organisms/ProjectsSection';
import { ArticlesSection } from '@/components/organisms/ArticlesSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';

const sections = [
  { id: 'hero', Component: HeroSection, fullHeight: true },
  { id: 'about', Component: AboutSection, fullHeight: true },
  { id: 'projects', Component: ProjectsSection, fullHeight: true },
  { id: 'articles', Component: ArticlesSection, fullHeight: true },
  { id: 'contact', Component: ContactSection, fullHeight: false },
] as const;

export default function Home() {
  const structuredData = generateHomepageStructuredData();

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="scroll-smooth">
        {sections.map(({ id, Component, fullHeight }) => (
          <section key={id} id={id} className={fullHeight ? 'min-h-screen' : undefined}>
            <Component />
          </section>
        ))}
        <Footer />
      </div>
    </>
  );
}
