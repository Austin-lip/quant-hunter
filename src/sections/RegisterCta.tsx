import { useState } from 'react'
import { Send, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/config/site'
import SectionHeading from '@/components/site/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

/** 候选人登记：点击后打开邮件客户端，预填好登记内容 */
export default function RegisterCta() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    direction: '',
    region: '',
    intro: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `【候选人登记】${form.name || '未署名'} · ${form.direction || '方向待定'}`,
    )
    const body = encodeURIComponent(
      [
        `姓名：${form.name}`,
        `邮箱：${form.email}`,
        `意向方向：${form.direction}`,
        `意向地区：${form.region}`,
        '',
        '一句话介绍：',
        form.intro,
        '',
        '（通过官网登记表单发送）',
      ].join('\n'),
    )
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="border-t border-border/60 bg-card/20">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Join Talent Pool"
          title="没看到合适岗位？先登记简历"
          desc="留下邮箱与意向方向，3-6 个月内有匹配岗位我会主动联系你。"
        />
        <form
          onSubmit={submit}
          className="rounded-xl border border-border bg-card p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted-foreground">姓名 *</span>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="怎么称呼你"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted-foreground">邮箱 *</span>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="接收岗位推荐的邮箱"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted-foreground">意向方向 *</span>
              <Input
                required
                value={form.direction}
                onChange={(e) => setForm({ ...form, direction: e.target.value })}
                placeholder="如：量化研究 / C++ 开发 / 机器学习"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted-foreground">意向地区</span>
              <Input
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                placeholder="如：上海 / 香港 / 新加坡"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm">
            <span className="mb-1.5 block text-muted-foreground">
              一句话介绍自己（可选）
            </span>
            <Textarea
              rows={3}
              value={form.intro}
              onChange={(e) => setForm({ ...form, intro: e.target.value })}
              placeholder="背景、经验、亮点，随便聊聊"
            />
          </label>
          <Button type="submit" size="lg" className="mt-6 w-full gap-2 font-semibold">
            <Send className="h-4 w-4" />
            发送登记邮件
          </Button>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {siteConfig.privacyNote}（点击后会打开你的邮件客户端预填好内容，发送即完成登记）
          </p>
        </form>
      </div>
    </section>
  )
}
