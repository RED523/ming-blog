## 项目简介

### 预览
访问地址：[`https://keteng-blog.netlify.app/`](https://keteng-blog.netlify.app/)

![Demo 动画](/public/demo.gif)

这是一个基于 Next.js 打造的个人博客网站，支持以 GitHub Issues 作为内容源，自动同步为本地 MDX 文章并生成静态站点。项目使用 Tailwind CSS 与一套可复用 UI 组件，内置 RSS 生成功能与基础 SEO 配置，适合个人技术写作与内容归档。

### 主要特性
- **技术栈**: Next.js 14、Tailwind CSS、Framer Motion、Contentlayer
- **内容来源**: 通过脚本从 GitHub Issues 同步为 `data/blog/*.mdx`
- **自动清理**: 当 GitHub 上文章被删除时，自动删除本地对应 MDX 文件
- **内容格式**: 支持 MDX、代码高亮、目录、标签等
- **产出**: 可导出静态页面，支持 RSS 订阅

### 快速上手
1. 安装依赖并启动开发（[pnpm](https://pnpm.io/)，版本见 `package.json` 的 `packageManager`）：
   - `pnpm install` 安装依赖
   - `pnpm run dev` 启动开发环境
   - `pnpm run build` 构建生产环境
   - `pnpm run start` 本地运行生产构建（默认端口 3003）

2. 同步文章与生成 RSS：
   - `pnpm run sync-post`：从 GitHub Issues 拉取并生成/更新/删除 `data/blog` 下的文章
   - `pnpm run generate-rss`：生成 RSS 输出

3. 静态产物本地预览：
   - `pnpm run start:static` 在本地以静态站点方式预览 `out` 目录内容

### 部署（Vercel 与页脚累计访问）

- **Vercel**：在 Project → Settings → Environment Variables 中配置 `UPSTASH_REDIS_REST_URL`、`UPSTASH_REDIS_REST_TOKEN`（或从 Vercel Marketplace 绑定 Upstash Redis）。推送代码后重新部署即可。
- **为何本地正常、线上曾 404**：仓库默认在非 Vercel 构建时使用静态导出（`out/`），不包含 `/api/*`。已在 `next.config.mjs` 中在 **Vercel 构建**（自动带 `VERCEL` 环境变量）时关闭纯静态导出，以便部署 `/api/visits`。若仍 404，确认已重新部署包含该配置的版本。
- **仅上传 `out/` 的纯静态托管**：没有服务端 API，累计访问会显示「—」。
