export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  stack: string[]
  github?: string
  demo?: string
  featured: boolean
  category: 'web' | 'mobile' | 'systems' | 'tooling'
}

export interface SkillCategory {
  id: string
  label: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level: number // 0-100
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  start: string
  end: string
  responsibilities: string[]
  achievements: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId: string
  verifyUrl: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  feedback: string
  avatar: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTimeMinutes: number
  tags: string[]
  featured?: boolean
}

export interface NavLink {
  label: string
  href: string
}
