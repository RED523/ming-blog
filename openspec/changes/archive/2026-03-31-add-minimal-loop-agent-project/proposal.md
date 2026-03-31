## Why

项目页（`/projects`）目前只有一个项目「前端技术实验室」，需要补充新完成的 minimal-loop-agent 项目，让访客了解更多个人作品。

## What Changes

- 在 `/projects` 页面的项目列表中新增 `minimal-loop-agent` 项目卡片
- 新增项目图标资源到 `public/` 目录
- 项目信息：名称、描述、GitHub 地址、个人标签

## Capabilities

### New Capabilities

- `add-project-entry`: 在现有项目列表数据中新增一条 minimal-loop-agent 项目记录，包括名称、描述、URL、图标和标签

### Modified Capabilities

（无需修改现有 spec 级别行为）

## Impact

- `src/app/(app)/projects/Projects.tsx` — 新增项目数据条目和图标 import
- `public/` — 新增项目图标图片
