import { Trophy } from 'lucide-react'
import { getAllCases } from '@/content/cases'
import SectionHeading from '@/components/site/SectionHeading'

export default function Cases() {
  return (
    <section id="cases" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Track Record"
        title="成功案例"
        desc="所有案例均经客户与候选人同意后匿名化展示，不透露任何机构、个人身份与具体薪资信息。"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {getAllCases().map((c) => (
          <div
            key={c.title}
            className="card-glow flex flex-col rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Trophy className="h-3.5 w-3.5" />
              {c.tag}
            </div>
            <h3 className="font-display text-base font-bold leading-snug">
              {c.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
