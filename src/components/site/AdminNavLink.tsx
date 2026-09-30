import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { siteConfig } from '@/config/site'

/**
 * 「投递管理」导航入口 + 未读徽标。
 * 仅当本浏览器已登录管理账号（Supabase 会话）时显示——候选人看不到入口；
 * 未读数每 60 秒轮询一次数据库。
 */
let client: SupabaseClient | null = null
function getClient(): SupabaseClient | null {
  if (!siteConfig.supabase.url || !siteConfig.supabase.anonKey) return null
  if (!client) client = createClient(siteConfig.supabase.url, siteConfig.supabase.anonKey)
  return client
}

export default function AdminNavLink({ mobile = false, onClick }: { mobile?: boolean; onClick?: () => void }) {
  const [unread, setUnread] = useState<number | null>(null)

  useEffect(() => {
    const sb = getClient()
    if (!sb) return
    let stop = false
    const check = async () => {
      const { data } = await sb.auth.getSession()
      if (stop) return
      if (!data.session) {
        setUnread(null)
        return
      }
      const { count } = await sb
        .from('submissions')
        .select('id', { count: 'exact', head: true })
        .eq('read', false)
      if (!stop) setUnread(count ?? 0)
    }
    check()
    const timer = setInterval(check, 60_000)
    const { data: sub } = sb.auth.onAuthStateChange(() => check())
    return () => {
      stop = true
      clearInterval(timer)
      sub.subscription.unsubscribe()
    }
  }, [])

  if (unread === null) return null

  return (
    <NavLink
      to="/admin"
      onClick={onClick}
      className={({ isActive }) =>
        `relative rounded-md text-sm transition-colors ${
          mobile ? 'block px-3 py-2.5' : 'px-3 py-2'
        } ${
          isActive
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`
      }
    >
      投递管理
      {unread > 0 && (
        <span className="absolute right-0 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
          {unread > 99 ? '99+' : unread}
        </span>
      )}
    </NavLink>
  )
}
