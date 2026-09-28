import type { Job } from '@/types/job'

/** 【示例岗位】发布真实岗位时替换为实际 JD。 */
const job: Job = {
  slug: 'quant-intern-2027-sz',
  title: '量化研究实习生（2027 届）',
  function: '校园招聘',
  location: '深圳',
  employment: '实习',
  seniority: '应届可投',
  salary: '500-1500 元/天',
  companyLabel: '一线量化私募 · 深圳',
  postedAt: '2026-09-12',
  summary: '2027 届暑期实习，表现优秀直接发校招 Offer，竞赛背景优先。',
  highlights: [
    '实习转正率历年超过 60%',
    '直接接触实盘策略与研究团队',
    '提供住宿与往返交通补贴',
  ],
  responsibilities: [
    '参与因子研究与策略回测',
    '完成 mentor 布置的研究课题并进行内部答辩',
    '参与每周研究讨论会',
  ],
  requirements: [
    '2027 届毕业的本科/硕士/博士，数理或计算机方向',
    '熟悉 Python，有量化或 ML 项目经验',
    '可线下实习 3 个月以上',
  ],
  preferred: ['ACM/ICPC、CMO、NOI 等竞赛获奖经历'],
}

export default job
