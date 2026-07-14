import { motion } from 'framer-motion'
import { FiClock } from 'react-icons/fi'
import type { BlogPost } from '@/types'
import { formatDate } from '@/utils/format'

interface BlogCardProps {
  post: BlogPost
  onOpen: () => void
  featured?: boolean
}

export function BlogCard({ post, onOpen, featured }: BlogCardProps) {
  return (
    <motion.button
      onClick={onOpen}
      data-cursor="pointer"
      whileHover={{ y: -4 }}
      className={`glass-panel flex flex-col rounded-2xl p-6 text-left ${featured ? 'sm:col-span-2' : ''}`}
    >
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ion">
            {tag}
          </span>
        ))}
      </div>
      <h3 className={`mt-4 font-display text-ink-100 ${featured ? 'text-2xl' : 'text-lg'}`}>{post.title}</h3>
      <p className="mt-2 text-sm text-ink-300">{post.excerpt}</p>
      <div className="mt-auto flex items-center gap-4 pt-6 telemetry-label">
        <span>{formatDate(post.date)}</span>
        <span className="flex items-center gap-1">
          <FiClock /> {post.readTimeMinutes} min read
        </span>
      </div>
    </motion.button>
  )
}
