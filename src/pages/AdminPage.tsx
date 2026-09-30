import { useEffect, useState } from 'react'
import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js'
import {
  Lock, LogOut, RefreshCw, FileText, Mail, Check, Loader2, Inbox,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Submission = {
  id: number
  created_at: string
  type: 'apply' | 'register'
  name: string
  email: string
  job_title: string | null
  direction: string | null
  region: string | null
  intro: string | null
  resume_path: string | null
  read: boolean
}

function fmtTime(iso: string) {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** 投递管理页：登录后查看候选人提交（/admin 不在站内导航中暴露，且已屏蔽搜索引擎收录） */
export default function AdminPage() {
  const configured = Boolean(siteConfig.supabase.url && siteConfig.supabase.anonKey)
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [rows, setRows] = useState<Submission[] | null>(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  useEffect(() => {
    if (!configured) return
    const sb = createClient(siteConfig.supabase.url, siteConfig.supabase.anonKey)
    setSupabase(sb)
    sb.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [configured])

  const load = async (sb: SupabaseClient) => {
    setErr('')
    const { data, error } = await sb
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) setErr('读取失败：' + error.message)
    setRows(data as Submission[] | null)
  }

  useEffect(() => {
    if (supabase && session) load(supabase)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, session])

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setBusy(true)
    setLoginErr('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) setLoginErr('登录失败：' + error.message)
  }

  const logout = async () => {
    if (supabase) await supabase.auth.signOut()
  }

  const download = async (path: string) => {
    if (!supabase) return
    const { data, error } = await supabase.storage.from('resumes').download(path)
    if (error || !data) return
    const url = URL.createObjectURL(data)
    const a = document.createElement('a')
    a.href = url
    a.download = path.split('/').pop() || 'resume'
    a.click()
    URL.revokeObjectURL(url)
  }

  const markRead = async (id: number) => {
    if (!supabase) return
    await supabase.from('submissions').update({ read: true }).eq('id', id)
    setRows((rs) => rs?.map((r) => (r.id === id ? { ...r, read: true } : r)) ?? null)
  }

  if (!configured) {
    return (
      <div className="mx-auto max-w-md px-4 py-32 text-center text-muted-foreground">
        管理页未配置（缺少 Supabase 连接信息）。
      </div>
    )
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-sm px-4 py-28">
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="mb-6 flex items-center gap-2 font-display text-lg font-bold">
            <Lock className="h-5 w-5 text-primary" />
            投递管理
          </div>
          <form onSubmit={login} className="space-y-3">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="管理账号邮箱"
            />
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
            />
            {loginErr && <p className="text-sm text-red-500">{loginErr}</p>}
            <Button type="submit" disabled={busy} className="w-full gap-2 font-semibold">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              登录
            </Button>
          </form>
        </div>
      </div>
    )
  }

  const unread = rows?.filter((r) => !r.read).length ?? 0

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Inbox className="h-6 w-6 text-primary" />
          <h1 className="font-display text-2xl font-bold">候选人投递</h1>
          {unread > 0 && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
              {unread} 条未读
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => supabase && load(supabase)} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> 刷新
          </Button>
          <Button variant="outline" size="sm" onClick={logout} className="gap-1.5">
            <LogOut className="h-3.5 w-3.5" /> 退出
          </Button>
        </div>
      </div>

      {err && <p className="mb-4 text-sm text-red-500">{err}</p>}

      {rows === null ? (
        <div className="flex justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-20 text-center text-muted-foreground">
          还没有收到投递。
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div
              key={r.id}
              className={`rounded-xl border bg-card p-5 ${r.read ? 'border-border/60 opacity-80' : 'border-primary/40'}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    {!r.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                    <span className="font-display font-bold">{r.name}</span>
                    <span className="text-xs text-muted-foreground">{fmtTime(r.created_at)}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <a href={`mailto:${r.email}`} className="text-primary hover:underline">{r.email}</a>
                    </span>
                    <span className={r.type === 'apply' ? 'text-primary' : ''}>
                      {r.type === 'apply' ? `应聘：${r.job_title}` : `登记：${r.direction ?? '方向待定'}`}
                    </span>
                    {r.region && <span>地区：{r.region}</span>}
                  </div>
                  {r.intro && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.intro}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  {r.resume_path && (
                    <Button variant="outline" size="sm" onClick={() => download(r.resume_path!)} className="gap-1.5">
                      <FileText className="h-3.5 w-3.5" /> 简历
                    </Button>
                  )}
                  {!r.read && (
                    <Button variant="ghost" size="sm" onClick={() => markRead(r.id)} className="gap-1.5 text-muted-foreground">
                      <Check className="h-3.5 w-3.5" /> 已读
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
