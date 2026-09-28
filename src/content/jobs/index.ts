/**
 * 岗位自动收录器 —— 不需要手动维护列表。
 * src/content/jobs/ 目录下所有 job-*.ts 文件会被自动收集并按发布日期倒序排列。
 * 新增岗位 = 新建一个 job-*.ts 文件；下架岗位 = 删除对应文件。
 */
import type { Job } from '@/types/job'

const modules = import.meta.glob('./*.ts', { eager: true }) as Record<
  string,
  { default: Job }
>

const jobs: Job[] = Object.values(modules)
  .map((m) => m.default)
  // 防御：按 slug 去重，避免链接冲突
  .filter((job, index, all) => all.findIndex((j) => j.slug === job.slug) === index)
  .sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1))

export function getAllJobs(): Job[] {
  return jobs
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug)
}

/** 提取所有职能方向（用于列表页筛选），按岗位数量倒序 */
export function getFunctions(): string[] {
  const count = new Map<string, number>()
  jobs.forEach((j) => count.set(j.function, (count.get(j.function) ?? 0) + 1))
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([f]) => f)
}
