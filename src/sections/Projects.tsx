import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import { SectionHeading } from '@/components/SectionHeading'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import { projects } from '@/data/projects'
import { staggerContainer, fadeUp } from '@/animations/variants'
import type { Project } from '@/types'

// const CATEGORIES: { id: Project['category'] | 'all'; label: string }[] = [
//   { id: 'all', label: 'All' },
//   { id: 'web', label: 'Web' },
//   { id: 'mobile', label: 'Mobile' },
//   { id: 'systems', label: 'Systems' },
//   { id: 'tooling', label: 'Tooling' },
// ]

export function Projects() {
  const [category, setCategory] = useState<Project['category'] | 'all'>('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return projects.filter((project) => {
      const matchesCategory =
        category === 'all' || project.category === category

      const matchesQuery =
        normalizedQuery === '' ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.longDescription.toLowerCase().includes(normalizedQuery) ||
        project.category.toLowerCase().includes(normalizedQuery) ||
        project.stack.some((tech) =>
          tech.toLowerCase().includes(normalizedQuery)
        )

      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const resetSearch = () => {
    setCategory('all');
    setQuery('');
  }

  return (
    <section id="projects" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="T+03 · Projects"
          title="Selected work that shipped and stayed shipped."
          // description="Filter by category or search by title, stack, or description."
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                  category === c.id
                    ? 'border-signal bg-signal/10 text-signal'
                    : 'border-line text-ink-300 hover:border-ion hover:text-ion'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div> */}

          {/* <label className="relative flex items-center">
            <FiSearch className="pointer-events-none absolute left-3 text-ink-500" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                }
              }}
              type="search"
              placeholder="Search projects..."
              className="w-full rounded-full border border-line bg-hull py-2 pl-9 pr-10 font-mono text-xs text-ink-100 placeholder:text-ink-500 focus-visible:border-signal sm:w-64"
              aria-label="Search projects"
            />

            {query && (
              <button
                type="button"
                onClick={() => resetSearch}
                className="absolute right-3 text-ink-500 transition hover:text-ink-200"
              >
              </button>
            )}
          </label> */}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-ink-500">
            No projects match that search.
          </p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={staggerContainer}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectCard
                  project={project}
                  onOpen={() => setSelected(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
