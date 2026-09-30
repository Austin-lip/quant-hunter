import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { siteConfig } from '@/config/site'

/**
 * 表单投递 —— 写入 Supabase：文本字段进 submissions 表，简历附件进 resumes 存储桶。
 * 数据库策略：匿名用户只能写入，读取/标记已读仅限 /admin 登录账号（authenticated）。
 * siteConfig.supabase.url / anonKey 留空时返回 not-configured，调用方回退为 mailto 投递。
 */
let client: SupabaseClient | null = null

export function isFormConfigured(): boolean {
  return Boolean(siteConfig.supabase.url && siteConfig.supabase.anonKey)
}

function getClient(): SupabaseClient {
  if (!client) {
    client = createClient(siteConfig.supabase.url, siteConfig.supabase.anonKey)
  }
  return client
}

export type SubmitResult = { ok: boolean; reason: 'not-configured' | 'sent' | 'error' }

export async function submitApplication(fields: {
  type: 'apply' | 'register'
  name: string
  email: string
  jobTitle?: string
  direction?: string
  region?: string
  intro?: string
  resume?: File | null
}): Promise<SubmitResult> {
  if (!isFormConfigured()) return { ok: false, reason: 'not-configured' }
  const supabase = getClient()

  let resumePath: string | null = null
  if (fields.resume) {
    const safeName = fields.resume.name.replace(/[^\w.\-一-龥]+/g, '_')
    resumePath = `${fields.type}/${Date.now()}-${crypto.randomUUID()}-${safeName}`
    const { error: upErr } = await supabase.storage.from('resumes').upload(resumePath, fields.resume, {
      contentType: fields.resume.type || 'application/octet-stream',
    })
    if (upErr) return { ok: false, reason: 'error' }
  }

  const { error } = await supabase.from('submissions').insert({
    type: fields.type,
    name: fields.name,
    email: fields.email,
    job_title: fields.jobTitle ?? null,
    direction: fields.direction ?? null,
    region: fields.region ?? null,
    intro: fields.intro ?? null,
    resume_path: resumePath,
  })
  if (error) return { ok: false, reason: 'error' }
  return { ok: true, reason: 'sent' }
}
