import { Link } from 'react-router'
import { Mail, Linkedin, Github, Phone, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function Footer() {
  const { contact, socials, qrcodes, brand, brandZh, privacyNote } = siteConfig

  const qrList = [
    { label: '微信', src: qrcodes.wechat },
    { label: '小红书', src: qrcodes.xiaohongshu },
    { label: '脉脉', src: qrcodes.maimai },
  ].filter((q) => q.src)

  return (
    <footer id="contact" className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* 品牌 + 简介 */}
          <div>
            <div className="font-display text-lg font-bold">{brand}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {brandZh} · {siteConfig.consultant.name}
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.slogan}。{privacyNote}
            </p>
          </div>

          {/* 联系方式 */}
          <div>
            <div className="text-sm font-semibold text-foreground">联系方式</div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {contact.email}
                </a>
              </li>
              {contact.phone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0" />
                  {contact.phone}
                </li>
              )}
            </ul>
            <div className="mt-5 space-y-2.5 text-sm">
              {socials.linkedin.url && (
                <a
                  href={socials.linkedin.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4 shrink-0" />
                  {socials.linkedin.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {socials.xiaohongshu.url && (
                <a
                  href={socials.xiaohongshu.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#ff2442] text-[10px] font-bold text-white">
                    红
                  </span>
                  {socials.xiaohongshu.label}
                  {socials.xiaohongshu.id && (
                    <span className="text-xs">ID: {socials.xiaohongshu.id}</span>
                  )}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {socials.maimai.url && (
                <a
                  href={socials.maimai.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#2f6bff] text-[10px] font-bold text-white">
                    脉
                  </span>
                  {socials.maimai.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {socials.github.url && (
                <a
                  href={socials.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4 shrink-0" />
                  {socials.github.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* 二维码 */}
          {qrList.length > 0 && (
            <div className="lg:col-span-2">
              <div className="text-sm font-semibold text-foreground">扫码联系</div>
              <div className="mt-4 flex flex-wrap gap-5">
                {qrList.map((q) => (
                  <div key={q.label} className="text-center">
                    <img
                      src={import.meta.env.BASE_URL + q.src}
                      alt={`${q.label}二维码`}
                      className="w-24 rounded-lg border border-border bg-white p-1 sm:w-28"
                    />
                    <div className="mt-2 text-xs text-muted-foreground">{q.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} {brand} · {siteConfig.consultant.name}
          </span>
          <span>岗位信息以最终沟通为准 · 机构名称经沟通后披露</span>
          <Link to="/jobs" className="transition-colors hover:text-primary">
            浏览全部在招岗位 →
          </Link>
        </div>
      </div>
    </footer>
  )
}
