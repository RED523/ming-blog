## Why

文章列表页（`/posts`）目前仅按日期展示全部文章，读者无法在站内快速按关键词找到相关文章。在列表页顶部提供检索能力，可缩短查找路径并改善长列表的可浏览性。

## What Changes

- 在 `/posts` 页面**顶部**（标题与简介区域附近）增加**搜索/筛选**控件，用户输入关键词后仅展示匹配的博文卡片。
- 匹配范围至少包含**标题**；建议同时包含**摘要（description）**与**标签（tags）**，以提升命中率（具体以 spec 为准）。
- 无匹配时展示明确空状态（例如「未找到相关文章」），不破坏页面布局。
- 实现方式优先为**客户端即时过滤**（文章数据已由 Contentlayer 静态注入），无需新增后端 API；若采用 URL query 同步状态，需与现有 `CoverSwitch` 等 query 行为协调。

## Capabilities

### New Capabilities

- `posts-list-search`: 定义 `/posts` 列表页顶部检索与结果展示的行为、可访问性与匹配字段。

### Modified Capabilities

- （无）当前 `openspec/specs/` 下无既有能力规范需增量修改。

## Impact

- **代码**：`src/app/(app)/posts/page.tsx`（可能拆出子组件或 `use client` 包装搜索栏）；可选 `src/app/(app)/posts/` 下新组件文件。
- **依赖**：无强制新依赖；若做防抖可考虑现有工具或轻量实现。
- **构建与 SEO**：列表页仍为静态生成时，搜索为客户端行为，对 SEO 无负面影响；若使用 `searchParams` 需注意 Next.js App Router 对静态/动态的选择。
