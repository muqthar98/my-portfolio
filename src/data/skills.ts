import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React', level: 96 },
      { name: 'TypeScript', level: 93 },
      { name: 'Tailwind CSS', level: 92 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 91 },
      { name: 'Express', level: 88 }
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    skills: [
      { name: 'React Native', level: 80 }
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    skills: [
      { name: 'Docker', level: 87 },
      { name: 'Kubernetes', level: 71 },
      { name: 'Jenkins', level: 66 },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 83 },
      { name: 'MySQL', level: 75 },
    ],
  },
]
