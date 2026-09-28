import type { Job } from '@/types/job'

/** 【示例岗位】发布真实岗位时替换为实际 JD。 */
const job: Job = {
  slug: 'crypto-quant-trader-sg',
  title: '数字资产量化交易员',
  function: '数字资产',
  location: '新加坡 / 远程',
  employment: '全职',
  seniority: '3 年以上',
  salary: '可谈，上不封顶',
  companyLabel: '头部交易平台 · 新加坡',
  postedAt: '2026-09-10',
  summary: '全球 Top3 交易平台自营团队，负责现货与衍生品做市策略，base 新加坡或远程。',
  highlights: [
    '直接管理真实资金，盈亏透明',
    '全球分布式团队，远程友好',
    '薪酬与 PnL 强挂钩',
  ],
  responsibilities: [
    '负责数字资产现货/合约市场的做市与套利策略',
    '持续优化报价与风控参数',
    '监控策略运行，处理极端行情',
  ],
  requirements: [
    '3 年以上量化交易经验，有可说明的 PnL 记录',
    '熟悉数字资产市场微观结构与主流交易所规则',
    'Python/C++ 至少一门精通',
  ],
  preferred: ['有传统金融转加密市场经验者优先'],
}

export default job
