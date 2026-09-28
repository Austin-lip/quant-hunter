import { siteConfig } from '@/config/site'
import SectionHeading from '@/components/site/SectionHeading'

export default function Process() {
  return (
    <section className="border-t border-border/60 bg-card/20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Process"
          title="服务流程"
          desc="从第一次通话到入职跟进，每一步都有明确承诺。"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.process.map((p) => (
            <div
              key={p.step}
              className="card-glow relative rounded-xl border border-border bg-card p-6"
            >
              <div className="font-display text-3xl font-bold text-primary/30">
                {p.step}
              </div>
              <h3 className="font-display mt-3 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
