import {
  LineChart, Cpu, Brain, Globe, Briefcase, GraduationCap,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import SectionHeading from '@/components/site/SectionHeading'

const iconMap: Record<string, typeof LineChart> = {
  'line-chart': LineChart,
  cpu: Cpu,
  brain: Brain,
  globe: Globe,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
}

export default function Specialties() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Specialties"
        title="专注领域"
        desc="长期深耕量化与金融科技人才市场，只做自己懂的方向。"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.specialties.map((s) => {
          const Icon = iconMap[s.icon] ?? Briefcase
          return (
            <div
              key={s.title}
              className="card-glow rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
