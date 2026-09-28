/**
 * 岗位数据类型定义 —— 全站统一的数据契约。
 * 新增岗位只需在 src/content/jobs/ 下新建一个 job-*.ts 文件并 default export 一个 Job 对象。
 */
export interface Job {
  /** 唯一标识，同时是分享链接的地址：/jobs/<slug>。用小写字母、数字、连字符。 */
  slug: string
  /** 职位名称，如「量化研究员（股票中高频）」 */
  title: string
  /** 职能方向，如「量化研究」「量化开发」「高频交易」，用于列表页筛选 */
  function: string
  /** 工作地点，如「上海」「香港」「新加坡 / 远程」 */
  location: string
  /** 全职 / 实习 / 全职·实习 */
  employment: '全职' | '实习' | '全职·实习'
  /** 经验要求，如「应届可投」「1-3 年」「3 年以上」 */
  seniority: string
  /** 薪资区间（可选），如「50-100w+」 */
  salary?: string
  /**
   * 机构标签（保密）：按「类型 + 地区」展示，如「头部百亿私募 · 上海」。
   * 真实机构名称在第一通电话中披露 —— 这是猎头的标准做法。
   */
  companyLabel: string
  /** 发布日期，YYYY-MM-DD，用于排序与展示 */
  postedAt: string
  /** 是否为急招/热招岗位，列表页会打上「热招」标记 */
  hot?: boolean
  /** 一句话概述：卡片上展示的核心卖点 */
  summary: string
  /** 岗位亮点（3-6 条） */
  highlights: string[]
  /** 工作职责 */
  responsibilities: string[]
  /** 任职要求 */
  requirements: string[]
  /** 加分项（可选） */
  preferred?: string[]
}
