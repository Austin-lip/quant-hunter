import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, CalendarDays, Check, Share2, Tag } from 'lucide-react'
import { getAllInsights, getInsightBySlug } from '@/content/insights'
import NotFoundPage from '@/pages/NotFoundPage'

export default function InsightDetailPage() {
  const { slug } = useParams()
  const insight = slug ? getInsightBySlug(slug) : undefined
  const [copied, setCopied] = useState(false)

  if (!insight) return <NotFoundPage />

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = window.location.href
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const more = getAllInsights().filter((i) => i.slug !== insight.slug).slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* 面包屑 + 复制链接 */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/insights"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          市场思考
        </Link>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-primary" />
              已复制
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              复制文章链接
            </>
          )}
        </button>
      </div>

      <article>
        <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
          {insight.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {insight.date}
          </span>
          {insight.tags?.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              {t}
            </span>
          ))}
        </div>

        <p className="mt-6 border-l-2 border-primary/60 pl-4 text-base leading-relaxed text-muted-foreground">
          {insight.summary}
        </p>

        <div className="mt-8 space-y-5">
          {insight.content.map((para, i) => (
            <p key={i} className="text-base leading-loose text-foreground/90">
              {para}
            </p>
          ))}
        </div>
      </article>

      {/* 页脚提示 */}
      <div className="mt-14 rounded-xl border border-border bg-card/60 p-6 text-center">
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
          想进一步交流这个话题？欢迎邮件{' '}
          <a
            href="mailto:austin.cui@co-careers.com"
            className="font-semibold text-primary hover:underline"
          >
            austin.cui@co-careers.com
          </a>{' '}
          或到首页扫码添加微信。
        </p>
      </div>

      {/* 更多文章 */}
      {more.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display mb-4 text-lg font-bold">更多思考</h2>
          <div className="space-y-3">
            {more.map((i) => (
              <Link
                key={i.slug}
                to={`/insights/${i.slug}`}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40"
              >
                <span className="font-medium">{i.title}</span>
                <span className="text-sm text-muted-foreground">{i.date}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
