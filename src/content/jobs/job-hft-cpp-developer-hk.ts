import type { Job } from '@/types/job'

/** 【示例岗位】发布真实岗位时替换为实际 JD。 */
const job: Job = {
  slug: 'hft-cpp-developer-hk',
  title: '高频交易系统 C++ 开发工程师',
  function: '量化开发',
  location: '香港',
  employment: '全职',
  seniority: '3 年以上',
  salary: '100-200w+ HKD',
  companyLabel: '外资做市商 · 香港',
  postedAt: '2026-09-18',
  hot: true,
  summary: '全球顶级做市商香港团队，低延迟核心系统岗位，技术栈硬核、待遇对标国际。',
  highlights: [
    '直接参与微秒级延迟优化核心项目',
    '国际化团队，英语工作环境',
    '薪酬与奖金对标全球市场',
    '完善的 relocation 支持与签证办理',
  ],
  responsibilities: [
    '设计、开发与优化低延迟交易执行系统',
    '分析系统性能瓶颈，进行内核/网络层优化',
    '与研究员协作实现策略上线',
  ],
  requirements: [
    '3 年以上 C++ 系统开发经验，熟悉现代 C++（C++17/20）',
    '熟悉 Linux 系统编程、网络协议与性能调优',
    '计算机相关专业，数据结构与算法功底扎实',
    '英语口语流利可作为工作语言',
  ],
  preferred: ['有低延迟/高频交易/游戏服务器等延迟敏感系统经验'],
}

export default job
