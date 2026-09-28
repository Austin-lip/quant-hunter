/**
 * 市场思考数据类型 —— 一个主题一个文件。
 * 文件放在 src/content/insights/ 下，命名 insight-*.ts，default export 一个 Insight。
 * slug 同时是分享链接地址：/insights/<slug>。
 */
export interface Insight {
  /** 唯一标识，小写字母、数字、连字符 */
  slug: string
  /** 文章标题 */
  title: string
  /** 发布日期，YYYY-MM-DD，用于排序（新的在前） */
  date: string
  /** 一句话摘要，列表页展示 */
  summary: string
  /** 正文段落，每个元素一段 */
  content: string[]
  /** 可选标签，如 ['量化招聘', '行业观察'] */
  tags?: string[]
}
