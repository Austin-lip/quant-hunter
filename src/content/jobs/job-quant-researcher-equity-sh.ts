import type { Job } from '@/types/job'

/**
 * 【示例岗位】发布真实岗位时：复制本文件 → 改名 job-你的岗位.ts → 修改内容。
 * 文件会自动被收录，无需改动任何其它代码。
 */
const job: Job = {
  slug: 'quant-researcher-equity-sh',
  title: '量化研究员（股票中高频）',
  function: '量化研究',
  location: '上海',
  employment: '全职',
  seniority: '1-3 年',
  salary: '60-150w+',
  companyLabel: '头部百亿私募 · 上海',
  postedAt: '2026-09-20',
  hot: true,
  summary: '百亿规模平台，中高频股票策略团队直招，研究资源充足，晋升通道清晰。',
  highlights: [
    '管理规模百亿级，策略容量充足',
    '独立研究线，可直接对接实盘资金',
    '数据与算力投入行业前列',
    '扁平化管理，PM 带教机制',
  ],
  responsibilities: [
    '负责股票中高频方向的因子挖掘与策略研究',
    '参与策略回测、仿真与实盘跟踪迭代',
    '与交易、开发团队协作优化策略执行',
  ],
  requirements: [
    '国内外顶尖院校硕士及以上学历，数理/计算机/金融工程背景',
    '1-3 年量化研究经验，有可追溯的实盘或研究业绩',
    '扎实的统计与机器学习基础，熟练使用 Python',
  ],
  preferred: [
    '有竞赛获奖（CMO/NOI/ACM 等）或顶会论文发表',
    '熟悉 Level-2 行情数据与微观结构研究',
  ],
}

export default job
