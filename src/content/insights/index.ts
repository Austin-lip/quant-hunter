/**
 * 市场思考自动收录器 —— 不需要手动维护列表。
 * src/content/insights/ 目录下所有 insight-*.ts 文件会被自动收集并按日期倒序排列。
 * 新增文章 = 新建一个 insight-*.ts 文件；删除 = 删除对应文件。
 */
import type { Insight } from '@/types/insight'

const modules = import.meta.glob('./*.ts', { eager: true }) as Record<
  string,
  { default: Insight }
>

const insights: Insight[] = Object.values(modules)
  .map((m) => m.default)
  .filter((a, index, all) => all.findIndex((b) => b.slug === a.slug) === index)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getAllInsights(): Insight[] {
  return insights
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug)
}
