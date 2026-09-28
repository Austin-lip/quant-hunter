/**
 * 成功案例数据类型 —— 与岗位一样「一个案例一个文件」。
 * 文件放在 src/content/cases/ 下，命名 case-*.ts，default export 一个 SuccessCase。
 */
export interface SuccessCase {
  /** 案例发生/归档日期，YYYY-MM-DD，用于排序（新的在前） */
  postedAt: string
  /** 分类小标签，如「研究」「开发」「应届」 */
  tag: string
  /** 案例标题（务必匿名化，如「某头部百亿私募 · 量化研究员」） */
  title: string
  /** 一两句话描述成果 */
  desc: string
}
