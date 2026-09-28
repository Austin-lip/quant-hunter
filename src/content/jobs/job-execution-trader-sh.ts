import type { Job } from '@/types/job'

/** 【示例岗位】发布真实岗位时替换为实际 JD。 */
const job: Job = {
  slug: 'execution-trader-sh',
  title: '执行交易员（Execution Trader）',
  function: '交易',
  location: '上海',
  employment: '全职',
  seniority: '1-3 年',
  salary: '40-80w',
  companyLabel: '百亿量化私募 · 上海',
  postedAt: '2026-09-08',
  summary: '百亿私募交易团队扩编，负责股票/期货组合的执行与算法交易调优。',
  highlights: [
    '直连交易系统，参与算法策略迭代',
    '与研究团队高频协作，成长曲线陡峭',
    '团队年轻，氛围直接高效',
  ],
  responsibilities: [
    '执行股票/期货组合的日常交易指令',
    '监控交易成本与滑点，反馈优化建议',
    '参与交易算法参数调优',
  ],
  requirements: [
    '1-3 年交易或相关经验，熟悉 A 股/期货市场规则',
    '反应敏捷，抗压能力强，纪律性高',
    '熟练使用 Excel/Python 进行数据分析',
  ],
  preferred: ['有算法交易或 TCA 经验者优先'],
}

export default job
