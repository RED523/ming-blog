## Context

项目页（`/projects`）使用硬编码的 TypeScript 数组存储项目数据，每个项目对象满足 `ProjectItem` 接口（`id`、`name`、`url`、`description`、`icon`、`tags`）。UI 通过 `ProjectCard` 组件渲染，卡片包含圆形图标、标题链接、描述、标签和域名展示。当前只有一个项目条目。

## Goals / Non-Goals

**Goals:**
- 在项目列表中新增 minimal-loop-agent 项目，展示正确的名称、描述、GitHub 链接和标签
- 提供合适的项目图标

**Non-Goals:**
- 不改动项目页的布局、样式或组件结构
- 不重构数据管理方式（如抽取到 JSON 文件）

## Decisions

### 1. 图标方案

**选择**: 使用项目的 GitHub 头像或自制简洁 PNG 图标放入 `public/` 目录，通过 `next/image` 的 `StaticImageData` 静态导入。

**理由**: 与现有项目（`frontendLab.png`）保持一致的数据流和图片优化方式。

**备选**: 使用 URL 远程图片 — 但 `ProjectItem.icon` 类型为 `StaticImageData`，需改动接口和组件，不值得。

### 2. 数据添加位置

**选择**: 直接在 `Projects.tsx` 的 `projects` 数组中追加新对象。

**理由**: 遵循现有模式，改动最小，无需引入新的数据管理层。

## Risks / Trade-offs

- [图标缺失] → 如果没有合适的项目图标，可以先用一个通用的占位图标，后续替换。
- [URL 解析] → `ProjectCard` 使用 `new URL(url).host` 提取域名显示，GitHub 链接会显示为 `github.com`，符合预期。
