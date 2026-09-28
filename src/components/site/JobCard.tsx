import { Link } from 'react-router'
import { MapPin, Clock, Flame, ChevronRight } from 'lucide-react'
import type { Job } from '@/types/job'
import { Badge } from '@/components/ui/badge'

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      to={`/jobs/${job.slug}`}
      className="card-glow group relative flex flex-col rounded-xl border border-border bg-card p-5"
    >
      {/* 热招标记 */}
      {job.hot && (
        <span className="absolute -top-2.5 right-4 flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">
          <Flame className="h-3 w-3" />
          热招
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary">
          {job.title}
        </h3>
        {job.salary && (
          <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
            {job.salary}
          </span>
        )}
      </div>

      <div className="mt-1.5 text-sm text-muted-foreground">
        {job.companyLabel}
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {job.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary" className="gap-1 font-normal">
          <MapPin className="h-3 w-3" />
          {job.location}
        </Badge>
        <Badge variant="secondary" className="font-normal">
          {job.function}
        </Badge>
        <Badge variant="secondary" className="font-normal">
          {job.employment} · {job.seniority}
        </Badge>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          更新于 {job.postedAt}
        </span>
        <span className="flex items-center gap-0.5 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          查看 JD
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}
