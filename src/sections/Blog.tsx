import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { BlogCard } from '@/components/BlogCard'
import { BlogReader } from '@/components/BlogReader'
import { blogPosts } from '@/data/blog'
import { staggerContainer, fadeUp } from '@/animations/variants'
import type { BlogPost } from '@/types'

export function Blog() {
  const [active, setActive] = useState<BlogPost | null>(null)
  const featured = blogPosts.find((p) => p.featured)
  const rest = blogPosts.filter((p) => p.id !== featured?.id)

  return (
    <section id="blog" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="T+07 · Field Notes"
          title="Writing on the systems I actually build."
          description="Short technical notes — the trade-offs, not just the win."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          variants={staggerContainer}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {featured && (
            <motion.div variants={fadeUp} className="sm:col-span-2">
              <BlogCard post={featured} onOpen={() => setActive(featured)} featured />
            </motion.div>
          )}
          {rest.map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <BlogCard post={post} onOpen={() => setActive(post)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <BlogReader post={active} onClose={() => setActive(null)} />
    </section>
  )
}
