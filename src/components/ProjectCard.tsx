import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onOpen: () => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 250, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 250, damping: 20 })

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.02 }}
      className="glass-panel group relative flex flex-col overflow-hidden rounded-2xl"
    >
      {/* <button
        onClick={onOpen}
        data-cursor="pointer"
        className="relative aspect-16/10 w-full overflow-hidden text-left"
        aria-label={`Open details for ${project.title}`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-hull-2 to-hull text-ink-500">
          <span className="font-mono text-xs uppercase tracking-widest">{project.title} · preview</span>
        </div>
        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full border border-signal bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-signal">
            Featured
          </span>
        )}
      </button> */}
      <button
        onClick={onOpen}
        data-cursor="pointer"
        className="relative aspect-16/10 w-full overflow-hidden text-left"
        aria-label={`Open details for ${project.title}`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
          <h3 className="font-display text-lg text-white">
            {project.title}
          </h3>
        </div>

        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full border border-signal bg-signal/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-signal backdrop-blur-sm">
            Featured
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl text-ink-100">{project.title}</h3>
        <p className="text-sm text-ink-300">{project.description}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ion">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-4 pt-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              className="flex items-center gap-1.5 font-mono text-xs text-ink-300 hover:text-signal"
            >
              <FiGithub /> Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              className="flex items-center gap-1.5 font-mono text-xs text-ink-300 hover:text-signal"
            >
              <FiExternalLink /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
