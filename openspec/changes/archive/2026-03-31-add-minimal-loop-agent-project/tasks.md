## 1. 准备图标资源

- [x] 1.1 准备 minimal-loop-agent 项目图标（PNG 格式），放入 `public/` 目录（如 `public/minimalLoopAgent.png`）

## 2. 新增项目数据

- [x] 2.1 在 `src/app/(app)/projects/Projects.tsx` 顶部添加图标的静态 import
- [x] 2.2 在 `projects` 数组中追加 minimal-loop-agent 项目对象，包含 id、name、description、url、icon、tags 字段

## 3. 验证

- [x] 3.1 本地启动开发服务器，访问 `/projects` 页面确认新项目卡片正确展示
- [x] 3.2 确认卡片链接指向 `https://github.com/RED523/minimal-loop-agent` 且在新标签页打开
- [x] 3.3 确认卡片底部域名显示为 `github.com`
