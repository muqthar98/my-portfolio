import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'niyasLuxury',
    title: 'Niyas Luxury',
    description: 'Premium e-commerce platform for luxury watches and fashion accessories.',
    longDescription:
      'A modern e-commerce website designed for showcasing and selling premium watches and luxury accessories. Features responsive product catalogs, category filtering, detailed product pages, secure checkout workflows, and an elegant user experience optimized for both desktop and mobile customers.',
    image: '/assets/niyasluxury.png',
    stack: ['React', 'TypeScript'],
    // github: 'https://github.com/alexrivera/orbital',
    demo: 'https://niyasluxury.com/',
    featured: true,
    category: 'web',
  },

  {
    id: 'rdxgroup',
    title: 'R.dx Architects & Consultants',
    description: 'Professional architecture and consultancy website for showcasing projects and services.',
    longDescription:
      'A corporate website built for an architecture and consulting firm to present their portfolio, expertise, and completed projects. Includes service listings, project galleries, company information, inquiry forms, and a modern design that reflects the firm’s professional identity and architectural vision.',
    image: '/assets/rdxgroup.png',
    stack: ['React', 'TypeScript'],
    // github: 'https://github.com/alexrivera/ledgerline',
    demo: 'https://www.rdxgroup.in/',
    featured: true,
    category: 'web',
  },

  {
    id: 'thepeacewelfarefoundation',
    title: 'The Peace Welfare Foundation',
    description: 'Charity and welfare platform dedicated to supporting underprivileged children and communities.',
    longDescription:
      'A nonprofit organization website designed to raise awareness, showcase social initiatives, and encourage donations for child welfare programs. Features event updates, donation campaigns, volunteer registration, impact stories, and information about ongoing educational and community development activities.',
    image: '/assets/thepeacewelfarefoundation.png',
    stack: ['React', 'TypeScript'],
    // github: 'https://github.com/alexrivera/fieldkit',
    demo: 'https://thepeacewelfarefoundation.org/',
    featured: true,
    category: 'web',
  },

  {
    id: 'construction-website',
    title: 'Construction Website',
    description: 'Modern construction company website showcasing services, projects, and expertise.',
    longDescription:
      'A professional construction business website built to highlight completed projects, engineering capabilities, and construction services. Includes project galleries, service sections, client testimonials, company profile pages, and lead generation forms to help potential customers connect with the business.',
    image: '/assets/construction-website.png',
    stack: ['React', 'TypeScript', 'Next.js'],
    // github: 'https://construction-website-app.vercel.app/',
    demo: 'https://construction-website-app.vercel.app/',
    featured: true,
    category: 'web',
  },

  {
    id: 'integrationsias',
    title: 'Integrations IAS',
    description: 'Digital learning platform for UPSC and IAS aspirants.',
    longDescription:
      'An educational platform designed for civil service examination preparation, providing information about courses, faculty, study materials, and coaching programs. Features course enrollment, exam resources, current affairs updates, and a user-friendly interface tailored for IAS aspirants and competitive exam students.',
    image: '/assets/integrationsias.png',
    stack: ['React', 'TypeScript'],
    // github: 'https://github.com/alexrivera/atlas-notes',
    demo: 'https://www.integrationsias.in',
    featured: true,
    category: 'web',
  },
];