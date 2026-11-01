const projectContext = 'Smart Campus'

export const skillGroups = [
  {
    name: 'Languages',
    skills: [{ name: 'C++' }, { name: 'Python' }, { name: 'JavaScript' }],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React', context: projectContext },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
  },
  {
    name: 'Backend & Data',
    skills: [
      { name: 'Supabase', context: projectContext },
      { name: 'PostgreSQL', context: projectContext },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Vite', context: projectContext },
      { name: 'Vercel', context: projectContext },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
    ],
  },
]
