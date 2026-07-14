import type { NavLink } from '@/types'

export const profile = {
  name: 'Muqthar Ahmed Quraishi J',
  role: 'Full Stack Developer',
  tagline: 'Building immersive digital experiences powered by modern technologies.',
  shortBio:
    "I build and ship scalable full-stack applications where intuitive user experiences meet robust backend systems. Passionate about turning complex ideas into reliable, production-ready solutions using modern web technologies.",
  location: 'Chennai, TamilNadu',
  email: 'muqthar401@gmail.com',
  resumeUrl: '/alex-rivera-resume.pdf',
  avatar: '/avatar.png',
  stats: [
    { label: 'Years Shipping', value: 5 },
    { label: 'Projects Launched', value: 15 },
    { label: 'Technologies', value: 10 },
    { label: 'Clients Served', value: 10 },
  ],
  philosophy:
    'Software should feel inevitable — obvious in hindsight, invisible in use. I optimize for the version of a product that a team can actually maintain at 2am.',
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/muqthar98', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/muqthar-ahmed-quraishi-j', icon: 'linkedin' },
  { label: 'Twitter', href: 'https://twitter.com/alexrivera', icon: 'twitter' },
  { label: 'Dribbble', href: 'https://dribbble.com/alexrivera', icon: 'dribbble' },
] as const

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export const timeline = [
  {
    year: '2021',
    label: 'Software Engineer Journey Begins',
    detail: 'Started building web applications using JavaScript and modern frontend frameworks.',
  },
  {
    year: '2022',
    label: 'Full Stack Development',
    detail: 'Designed and developed REST APIs, databases, and responsive user interfaces.',
  },
  {
    year: '2024',
    label: 'DevOps',
    detail: 'Implemented CI/CD pipelines, containerization.',
  },
  {
    year: '2026',
    label: 'Senior Full Stack Engineer',
    detail: 'Building scalable products using React, Node.js, Express.js, MongoDB, Docker.',
  },
];
