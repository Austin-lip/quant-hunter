import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import {
  ArrowLeft, MapPin, Clock, Flame, Mail, MessageCircle,
  CheckCircle2, ChevronRight, Briefcase, Layers, Sparkles,
} from 'lucide-react'
import { getAllJobs, getJobBySlug } from '@/content/jobs'
import { siteConfig } from '@/config/site'
import ShareButton from '@/components/site/ShareButton'
import JobCard from '@/components/site/JobCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-display mb-4 text-xl font-bold">{title}</h2>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const job = slug ? getJobBySlug(slug) : undefined

  // 动态标题：转发到 LinkedIn/微信时链接预览更专业
  useEffect(() => {
    document.title = job
      ? `${job.title} · ${job.companyLabel} | ${siteConfig.meta.title}`
      : siteConfig.meta.title
    return () => {
      document.title = siteConfig.meta.title
    }
  }, [job])

  if (!job) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <div className="font-display text-6xl font-bold text-primary/30">404</div>
        <p className="mt-4 text-muted-foreground">这个岗位不存在或已下架</p>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/jobs">浏览在招岗位</Link>
        </Button>
      </div>
    )
  }

  const mailSubject = encodeURIComponent(`【应聘】${job.title} · ${job.companyLabel}`)
  const mailBody = encodeURIComponent(
    [`你好，我对这个岗位感兴趣：`, ``, `岗位：${job.title}`, `机构：${job.companyLabel}`, `链接：${typeof window !== 'undefined' ? window.location.href : ''}`, ``, `（我的简历见附件）`].join('\n'),
  )
  const related = getAllJobs().filter((j) => j.slug !== job.slug).slice(0, 3)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* 面包屑 */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-primary">首页</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/jobs" className="transition-colors hover:text-primary">在招岗位</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate text-foreground">{job.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* ===== 左列：JD 主体 ===== */}
        <article>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {job.hot && (
                <Badge className="mb-3 gap-1 bg-primary font-bold text-primary-foreground hover:bg-primary">
                  <Flame className="h-3 w-3" />
                  热招
                </Badge>
              )}
              <h1 className="font-display text-3xl font-bold leading-tight">
                {job.title}
              </h1>
              <div className="mt-2.5 text-base text-muted-foreground">
                {job.companyLabel}
              </div>
            </div>
            <ShareButton />
          </div>

          {/* 关键信息条 */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: MapPin, label: '工作地点', value: job.location },
              { icon: Briefcase, label: '经验要求', value: job.seniority },
              { icon: Layers, label: '职能方向', value: job.function },
              { icon: Clock, label: '更新时间', value: job.postedAt },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Icon className="h-3 w-3" />
                  {label}
                </div>
                <div className="mt-1 text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>

          {job.salary && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">薪资参考：</span>
              <span className="font-display text-lg font-bold text-primary">
                {job.salary}
              </span>
            </div>
          )}

          {/* JD 内容 */}
          <div className="mt-10 space-y-10">
            <Block title="岗位亮点" items={job.highlights} />
            <Block title="工作职责" items={job.responsibilities} />
            <Block title="任职要求" items={job.requirements} />
            {job.preferred && <Block title="加分项" items={job.preferred} />}
          </div>

          {/* 保密说明 */}
          <div className="mt-10 rounded-xl border border-border bg-card/60 p-5 text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">关于机构名保密：</span>
            岗位使用「类型 + 地区」标签是为保护在职候选人与客户。
            真实机构名称会在投递后的第一通电话中确认——这是行业通行的保密做法。
          </div>

          {/* 移动端申请区 */}
          <div className="mt-10 lg:hidden">
            <ApplyPanel jobTitle={job.title} mailSubject={mailSubject} mailBody={mailBody} />
          </div>
        </article>

        {/* ===== 右列：悬浮申请面板（桌面端） ===== */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ApplyPanel jobTitle={job.title} mailSubject={mailSubject} mailBody={mailBody} />
          </div>
        </aside>
      </div>

      {/* 更多岗位 */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold">更多在招岗位</h2>
            <Link
              to="/jobs"
              className="flex items-center gap-1 text-sm text-primary transition-colors hover:underline"
            >
              全部岗位
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((j) => (
              <JobCard key={j.slug} job={j} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/** 申请面板：邮件投递 + 微信 + 响应承诺 */
function ApplyPanel({
  jobTitle,
  mailSubject,
  mailBody,
}: {
  jobTitle: string
  mailSubject: string
  mailBody: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="font-display text-lg font-bold">申请这个岗位</div>
      <p className="mt-1.5 text-sm text-muted-foreground">
        工作日 48 小时内回复，合适即安排 15 分钟电话沟通。
      </p>
      <div className="mt-5 space-y-3">
        <Button asChild className="w-full gap-2 font-semibold">
          <a href={`mailto:${siteConfig.contact.email}?subject=${mailSubject}&body=${mailBody}`}>
            <Mail className="h-4 w-4" />
            邮件投递（预填岗位名）
          </a>
        </Button>
        <div className="rounded-lg border border-border bg-background p-4 text-center">
          <div className="mb-2.5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4 text-primary" />
            微信扫码直投（更快，12h 内首响）
          </div>
          <img
            src={import.meta.env.BASE_URL + siteConfig.qrcodes.wechat}
            alt="微信二维码"
            className="mx-auto w-36 rounded-md border border-border bg-white p-1.5"
          />
        </div>
      </div>
      <p className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
        {siteConfig.privacyNote}投递「{jobTitle}」时请注明，方便快速匹配。
      </p>
    </div>
  )
}
