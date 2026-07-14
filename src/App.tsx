import { Suspense, lazy } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { useLenis } from '@/hooks/useLenis'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorFollower } from '@/components/CursorFollower'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Projects } from '@/sections/Projects'
import { Experience } from '@/sections/Experience'
import { Certifications } from '@/sections/Certifications'
import { Testimonials } from '@/sections/Testimonials'
import { Blog } from '@/sections/Blog'
import { Contact } from '@/sections/Contact'

const AmbientBackground = lazy(() =>
  import('@/three/AmbientBackground').then((m) => ({ default: m.AmbientBackground }))
)

function App() {
  useLenis()

  return (
    <HelmetProvider>
      <div className="relative min-h-screen">
        <Suspense fallback={null}>
          <AmbientBackground />
        </Suspense>
        <ScrollProgress />
        <CursorFollower />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          {/* <Testimonials />s */}
          {/* <Blog /> */}
          <Contact />
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App
