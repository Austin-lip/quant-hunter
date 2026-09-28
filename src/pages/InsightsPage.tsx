import { Link } from 'react-router'
import { ArrowRight, Newspaper } from 'lucide-react'
import { getAllInsights } from '@/content/insights'

export default function InsightsPage() {
  const insights = getAllInsights()

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      {/* 页头 */}
      <div className="mb-10 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Market Insights · 不定期更新
        </div>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">市场思考</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          关于量化人才市场、招聘趋势与行业观察的个人笔记。每篇文章都有独立链接，可直接转发。
        </p>
      </div>

      {insights.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((it) => (
            <Link
              key={it.slug}
              to={`/insights/${it.slug}`}
              className="card-glow group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Newspaper className="h-3.5 w-3.5" />
                {it.date}
              </div>
              <h3 className="font-display text-base font-bold leading-snug group-hover:text-primary">
                {it.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {it.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                阅读全文
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        /* 空状态：还没发布文章时的占位 */
        <div className="rounded-xl border border-dashed border-border py-24 text-center">
          <Newspaper className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
          <p className="text-lg font-semibold">即将更新</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            这里将发布关于量化人才市场与行业观察的个人思考。等不及想交流？
            欢迎邮件或微信联系我。
          </p>
          <Link
            to="/#contact"
            className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            联系我
          </Link>
        </div>
      )}
    </div>
  )
}
