import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/organisms/HeroSection';
import { StructuredData } from '@/components/atoms/StructuredData';
import { SectionLoader } from '@/components/atoms/SectionLoader';
import { generateHomepageStructuredData } from '@/lib/structured-data';

// Lazy load below-the-fold sections for better performance - not so benificial for static exports
const AboutSection = dynamic(
  () => import('@/components/organisms/AboutSection').then(mod => ({ default: mod.AboutSection })),
  { loading: () => <SectionLoader /> }
);

const ProjectsSection = dynamic(
  () =>
    import('@/components/organisms/ProjectsSection').then(mod => ({
      default: mod.ProjectsSection,
    })),
  { loading: () => <SectionLoader /> }
);

const ArticlesSection = dynamic(
  () =>
    import('@/components/organisms/ArticlesSection').then(mod => ({
      default: mod.ArticlesSection,
    })),
  { loading: () => <SectionLoader /> }
);

const ContactSection = dynamic(
  () =>
    import('@/components/organisms/ContactSection').then(mod => ({ default: mod.ContactSection })),
  { loading: () => <SectionLoader fullHeight={false} /> }
);

const Footer = dynamic(() =>
  import('@/components/organisms/Footer').then(mod => ({ default: mod.Footer }))
);

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
