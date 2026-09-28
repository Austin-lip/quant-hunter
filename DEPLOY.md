# Quant Hunter 个人猎头网站 · 部署与维护指南

## 一、这个项目是什么

你的个人猎头主页 + 岗位库，每个岗位拥有独立链接（`/jobs/岗位标识`），
可直接转发到领英、小红书、脉脉和私信里。

技术栈：React 19 + TypeScript + Vite + Tailwind + shadcn/ui。
`npm run build` 产出的 `dist/` 是纯静态文件，可托管到任何静态托管平台。

## 二、日常更新（最常用）

### 发布一个新岗位

1. 复制任意一个 `src/content/jobs/job-*.ts` 文件，改名如 `job-xxx.ts`
2. 按 `src/types/job.ts` 里的字段说明修改内容（slug 必须唯一，建议小写+连字符）
3. `npm run build` 后重新部署 —— 岗位会自动出现在列表页，链接为 `/jobs/<slug>`

> 下架岗位 = 删除对应文件。不需要改任何其它代码。

### 修改个人信息 / 口号 / FAQ / 联系方式

只改一个文件：`src/config/site.ts`（所有字段都有中文注释，搜索 `TODO-REPLACE` 可找到所有待替换的占位内容）。

## 三、部署方案（三选一）

### 方案 A：Vercel（推荐，10 分钟上线，无需备案）

1. 把项目代码推到 GitHub 仓库
2. 在 [vercel.com](https://vercel.com) 用 GitHub 账号登录 → `Add New Project` → 导入该仓库
3. 框架自动识别 Vite，直接 Deploy，无需任何额外配置（路由已兼容）
4. 得到一个 `xxx.vercel.app` 域名，立即可以分享岗位链接

### 方案 B：GitHub Pages（免费，与参考站 kenzhang 同款）

```bash
npm install
set VITE_BASE=/你的仓库名/ && npm run build
```

把 `dist/` 内容推到仓库的 `gh-pages` 分支（或用 `gh-pages` npm 包 / GitHub Actions），
在仓库 Settings → Pages 中选择该分支即可。访问地址为 `https://你的用户名.github.io/仓库名/`。

### 方案 C：Cloudflare Pages（国内访问相对友好）

与 Vercel 类似：登录 [pages.cloudflare.com](https://pages.cloudflare.com) → 连接 GitHub 仓库，
构建命令 `npm run build`，输出目录 `dist`。

## 四、绑定自己的域名（可选，第二步再做）

- Vercel / Cloudflare / GitHub Pages 都支持绑定自定义域名（如 `quanthunter.com`），
  在托管平台的 Domain 设置里添加记录即可，平台自动签发 HTTPS 证书。
- ⚠️ 若服务器在境外（Vercel/Cloudflare/GitHub 都是），绑定域名**无需 ICP 备案**，即买即用；
  只有使用「中国大陆境内服务器」时才需要备案（耗时 1-3 周）。
- 国内注册商（阿里云/腾讯云/华为云）购买的域名同样可以直接解析到境外托管平台，不受影响。

## 五、本地开发

```bash
npm install        # 首次
npm run dev        # 开发预览 http://localhost:3000
npm run build      # 生产构建到 dist/
npm run preview    # 本地预览生产构建
```

## 六、模块化结构（方便二次开发）

```
src/
├── config/site.ts          # ★ 全站配置中心：姓名/联系方式/社交账号/FAQ/数据看板
├── types/job.ts            # 岗位数据类型定义（数据契约）
├── content/jobs/           # ★ 岗位库：一个岗位一个文件，自动收录排序
│   └── index.ts            #    自动收集器（import.meta.glob），一般不用动
├── components/site/        # 通用组件：导航 / 页脚 / 岗位卡片 / 分享按钮 / 区块标题
├── sections/               # 首页各区块（英雄区/数据/岗位/领域/案例/流程/FAQ/登记）
├── pages/                  # 页面：首页 / 岗位列表 / 岗位详情 / 404
└── App.tsx                 # 路由总装
```

想加新功能（比如行业动态页、候选人测评页、数据统计模块），照这个分层加文件即可，
岗位数据契约在 `types/job.ts` 统一维护。
