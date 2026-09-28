import type { Job } from '@/types/job'

/** 【示例岗位】发布真实岗位时替换为实际 JD。 */
const job: Job = {
  slug: 'ml-researcher-alpha-bj',
  title: '机器学习研究员（深度学习因子）',
  function: '机器学习',
  location: '北京',
  employment: '全职',
  seniority: '应届可投',
  salary: '40-120w',
  companyLabel: '一线量化私募 · 北京',
  postedAt: '2026-09-15',
  summary: '深度学习因子方向，欢迎顶会论文作者与竞赛大神，应届可投、带教完善。',
  highlights: [
    'GPU 集群千卡级算力支持',
    '研究氛围浓厚，论文阅读分享机制',
    '应届友好，mentor 一对一培养',
    '研究产出与实盘策略直接挂钩',
  ],
  responsibilities: [
    '探索深度学习在量化因子挖掘中的应用',
    '复现并改进前沿论文方法，落地到真实交易数据',
    '构建可复用的模型训练与评估框架',
  ],
  requirements: [
    '计算机/数学/统计方向硕士或博士，2026-2027 届均可',
    '熟练使用 PyTorch/TensorFlow，有深度学习项目经验',
    '对量化交易有强烈兴趣，自驱力强',
  ],
  preferred: ['NeurIPS/ICML/ICLR/CVPR 等顶会一作论文', 'Kaggle 金牌及以上'],
}

export default job
