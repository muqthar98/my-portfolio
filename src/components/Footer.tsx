import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { SiDribbble } from 'react-icons/si'
import { profile, socials } from '@/data/profile'

const iconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  dribbble: SiDribbble,
}

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-12 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="font-display text-lg text-ink-100">
            J<span className="text-signal">.</span>Muqthar
          </p>
          <p className="mt-1 telemetry-label">{profile.location}</p>
        </div>

        <div className="flex gap-5">
          {socials.map((s) => {
            const Icon = iconMap[s.icon]
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                data-cursor="pointer"
                className="text-ink-300 transition-colors hover:text-signal"
              >
                <Icon size={19} />
              </a>
            )
          })}
        </div>

        <p className="telemetry-label">© {new Date().getFullYear()} — All systems nominal</p>
      </div>
    </footer>
  )
}
