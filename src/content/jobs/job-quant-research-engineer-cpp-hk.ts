import type { Job } from '@/types/job'

const job: Job = {
  slug: 'quant-research-engineer-cpp-hk',
  title: '量化研究工程师（C++）',
  function: '量化开发',
  location: '香港',
  employment: '全职',
  seniority: '3-5 年',
  salary: '150w+ HKD',
  companyLabel: '国际量化交易机构 · 香港',
  postedAt: '2026-09-28',
  summary:
    '构建量化研究核心的行情数据计算层：设计并负责可扩展、稳健的 C++ 框架，将 tick 数据转化为 point-in-time 正确的研究特征。',
  highlights: [],
  responsibilities: [
    '设计、构建并负责从实时与历史 tick 数据计算特征的 C++ 流水线',
    '开发大规模流式行情数据上的高效增量（在线）计算',
    '保证 point-in-time 正确性：无前视偏差，历史回测与实盘生产结果一致',
    '构建灵活、可组合的框架，让研究员可以方便地定义和添加新特征',
    '在大规模标的池与高事件量下扩展流水线，保证对数据缺口、坏 tick 等真实数据问题的稳健性',
    '负责流水线的测试、部署、监控与运行健康',
  ],
  requirements: [],
}

export default job
