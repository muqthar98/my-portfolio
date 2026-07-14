import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { FiX, FiClock } from 'react-icons/fi'
import type { BlogPost } from '@/types'
import { formatDate } from '@/utils/format'

interface BlogReaderProps {
  post: BlogPost | null
  onClose: () => void
}

export function BlogReader({ post, onClose }: BlogReaderProps) {
  return (
    <AnimatePresence>
      {post && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-void/85 px-6 py-16 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel w-full max-w-3xl rounded-2xl p-8 sm:p-12"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ion">
                    {tag}
                  </span>
                ))}
              </div>
              <button onClick={onClose} aria-label="Close article" className="text-ink-300 hover:text-signal">
                <FiX size={22} />
              </button>
            </div>

            <h1 className="mt-6 font-display text-3xl text-ink-100 sm:text-4xl">{post.title}</h1>
            <div className="mt-3 flex items-center gap-4 telemetry-label">
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1">
                <FiClock /> {post.readTimeMinutes} min read
              </span>
            </div>

            <div className="prose-blog mt-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
