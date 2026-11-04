import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteSEO {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  breadcrumbs: Array<{ name: string; path: string }>;
}

const ROUTE_SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: 'BEZALEL INC — Ecosystem of Human & Enterprise Development',
    description:
      'Equip people. Strengthen enterprise. Multiply opportunity. A purpose-led ecosystem uniting 4 operating ventures across psychological care, executive training, brand strategy, and corporate governance.',
    canonicalPath: '/',
    ogType: 'website',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },
  '/ecosystem': {
    title: 'Integrated Ecosystem & 4 Operating Ventures · BEZALEL INC',
    description:
      'Explore the four specialised operating ventures of BEZALEL INC: Olive & Vine, HUR-ON, Mustard Seed & Co, and Phroneo BoardSuite.',
    canonicalPath: '/ecosystem',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Ecosystem', path: '/ecosystem' },
    ],
  },
  '/story': {
    title: 'Our Story, Ethos & Founding Standard (Est. 2008) · BEZALEL INC',
    description:
      'The founding story and Biblical ethos of BEZALEL INC. Grounded in Exodus 31:1–6, building enduring human and enterprise capability since 2008.',
    canonicalPath: '/story',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Story', path: '/story' },
    ],
  },
  '/clients': {
    title: 'Selected Institutional Partners & Clients · BEZALEL INC',
    description:
      'Trusted across 14 international school campuses and 10 multinational & public-listed corporate partners including Sunway, GIS, ISKL, Unilever, and Padini.',
    canonicalPath: '/clients',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Partners & Clients', path: '/clients' },
    ],
  },
  '/impact': {
    title: 'Impact, Methodology & Track Record · BEZALEL INC',
    description:
      'Explore the measurable multi-generational impact of the Bezalel ecosystem across human wellbeing, enterprise longevity, and community opportunity.',
    canonicalPath: '/impact',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Impact', path: '/impact' },
    ],
  },
  '/leadership': {
    title: 'Leadership Council & Practice Stewards · BEZALEL INC',
    description:
      'Meet the leadership council, advisory stewards, and practice directors guiding the BEZALEL INC ecosystem across Southeast Asia.',
    canonicalPath: '/leadership',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Leadership', path: '/leadership' },
    ],
  },
  '/start': {
    title: 'Where to Start: Guided Journey & Venture Diagnostic · BEZALEL INC',
    description:
      'Discover the right pathway for your organization, institution, or executive team across our four specialised operating capabilities.',
    canonicalPath: '/start',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Where to Start', path: '/start' },
    ],
  },
  '/inquire': {
    title: 'Partnership Inquiry Desk · BEZALEL INC',
    description:
      'Initiate an institutional partnership, executive consultation, or cross-venture engagement with the BEZALEL INC Executive Secretariat.',
    canonicalPath: '/inquire',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Inquire', path: '/inquire' },
    ],
  },
  '/contact': {
    title: 'Partnership Inquiry Desk · BEZALEL INC',
    description:
      'Initiate an institutional partnership, executive consultation, or cross-venture engagement with the BEZALEL INC Executive Secretariat.',
    canonicalPath: '/inquire',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Inquire', path: '/inquire' },
    ],
  },
};

/**
 * SEOHead: Dynamic Route Meta & Breadcrumb JSON-LD Injector
 * Updates <title>, <meta description>, canonical URL, and AEO breadcrumb schema
 * dynamically as the user navigates across the Single Page Application.
 */
export const SEOHead: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const config = ROUTE_SEO_MAP[currentPath] || ROUTE_SEO_MAP['/'];

  useEffect(() => {
    // 1. Update Title
    document.title = config.title;

    // 2. Helper to set or create meta tags
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Update Meta Description & Titles
    setMetaTag('name', 'description', config.description);
    setMetaTag('name', 'title', config.title);
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('property', 'og:url', `https://bezalelinc.com${config.canonicalPath}`);
    setMetaTag('property', 'og:type', config.ogType || 'website');
    setMetaTag('name', 'twitter:title', config.title);
    setMetaTag('name', 'twitter:description', config.description);
    setMetaTag('name', 'twitter:url', `https://bezalelinc.com${config.canonicalPath}`);

    // 3. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://bezalelinc.com${config.canonicalPath}`);

    // 4. Inject Dynamic BreadcrumbList JSON-LD Schema for AEO
    const breadcrumbSchemaId = 'aeo-breadcrumb-schema';
    let scriptTag = document.getElementById(breadcrumbSchemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = breadcrumbSchemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: config.breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: b.name,
        item: `https://bezalelinc.com${b.path}`,
      })),
    };

    scriptTag.textContent = JSON.stringify(breadcrumbData);
  }, [config, currentPath]);

  return null;
};
