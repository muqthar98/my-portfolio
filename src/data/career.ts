import type { Certification, ExperienceEntry, Testimonial } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    id: 'software engineer',
    company: 'Crytonix Remote Tech Works Private Limited',
    role: 'Software Engineer',
    start: '2021',
    end: 'Present',
    responsibilities: [
      'Develop and maintain full-stack web applications using modern frontend and backend technologies.',
      'Design and implement scalable REST APIs, database schemas, and business logic for enterprise applications.',
      'Collaborate with cross-functional teams to deliver high-quality features and production-ready solutions.',
    ],
    achievements: [
      'Successfully delivered multiple production applications across fintech, e-commerce, and enterprise domains.',
      'Improved application performance and reduced API response times through backend optimization.',
      'Contributed to CI/CD pipelines and deployment automation to streamline release cycles.',
    ],
  },
  {
    id: 'junior developer',
    company: 'FastExpo Private Limited',
    role: 'Junior Software Developer',
    start: '2020',
    end: '2021',
    responsibilities: [
      'Developed frontend components and backend APIs for internal and client-facing applications.',
      'Participated in database design, bug fixing, and feature enhancements across multiple projects.',
      'Worked closely with senior developers to implement scalable and maintainable code solutions.',
    ],
    achievements: [
      'Delivered new features and bug fixes that improved overall application stability and user experience.',
      'Reduced manual processes by developing automation scripts and reusable components.',
      'Gained hands-on experience with full-stack development, version control, and agile workflows.',
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: 'udemy-1',
    name: 'Python Bootcamp',
    issuer: 'Udemy',
    date: '2020',
    credentialId: 'Udemy-88213',
    verifyUrl: 'https://www.credly.com/badges/example-aws-sa',
  },
  {
    id: 'udemy-2',
    name: 'Web DevelopmentBootcamp',
    issuer: 'Udemy',
    date: '2020',
    credentialId: 'Udemy-88214',
    verifyUrl: 'https://www.credly.com/badges/example-ckad',
  }
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Nandan',
    role: 'CEO, Ledgerline',
    feedback:
      'Alex rebuilt our billing core in six weeks and it has not gone down once since. Rare mix of design taste and systems thinking.',
    avatar: '/testimonials/priya.png',
  },
  {
    id: 't2',
    name: 'Marcus Webb',
    role: 'VP Engineering, Meridian Systems',
    feedback:
      'The platform migration Alex led is still the reference architecture new hires study. Calm under pressure, obsessive about the details that matter.',
    avatar: '/testimonials/marcus.png',
  },
  {
    id: 't3',
    name: 'Dana Ferreira',
    role: 'Founder, Fieldkit',
    feedback:
      'We needed offline-first from day one and most engineers wave that off as too hard. Alex treated it as the actual product requirement it was.',
    avatar: '/testimonials/dana.png',
  },
]
