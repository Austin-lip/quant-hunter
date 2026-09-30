import { siteConfig } from '@/config/site'

/**
 * 表单投递 —— 通过 Web3Forms 把简历附件以邮件形式直达顾问邮箱。
 * 静态站点没有服务器，借助 Web3Forms 转发（免费 250 封/月，附件随邮件送达，不落第三方存储）。
 * siteConfig.formAccessKey 留空时返回 not-configured，调用方应回退为 mailto 投递。
 */
export async function submitWithAttachment(fields: {
  subject: string
  /** 文本字段（不含附件） */
  data: Record<string, string>
  resume?: File | null
}): Promise<{ ok: boolean; reason: 'not-configured' | 'sent' | 'error' }> {
  const key = siteConfig.formAccessKey
  if (!key) return { ok: false, reason: 'not-configured' }

  const fd = new FormData()
  fd.append('access_key', key)
  fd.append('subject', fields.subject)
  for (const [k, v] of Object.entries(fields.data)) fd.append(k, v)
  if (fields.resume) fd.append('attachment', fields.resume)

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: fd,
    })
    const json = await res.json()
    return { ok: Boolean(json?.success), reason: json?.success ? 'sent' : 'error' }
  } catch {
    return { ok: false, reason: 'error' }
  }
}
