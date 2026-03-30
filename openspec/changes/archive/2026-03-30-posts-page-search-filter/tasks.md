## 1. 提取与复用列表数据

- [x] 1.1 在 `src/app/(app)/posts/page.tsx` 中保留服务端对 `allPosts` 的排序与 `slice` 逻辑，将得到的 `Post[]` 作为单一数据源传给客户端子组件（或抽成 `getSortedPostsForList()` 小函数避免重复）。

## 2. 搜索 UI 与客户端边界

- [x] 2.1 新增 `use client` 组件（例如 `PostsSearchSection.tsx` 或同级命名），接收 `posts: Post[]`，在 header 内或标题/简介下方渲染搜索输入；使用 `label`/`aria-label` 满足可访问性。
- [x] 2.2 使用与站点一致的 Tailwind 样式（边框、圆角、暗色模式文字与背景），避免破坏现有 `Container` 与 header 布局。

## 3. 过滤逻辑与列表渲染

- [x] 3.1 实现 `query` state：trim 后为空则展示全部 posts；非空则大小写不敏感子串匹配 `title`、`description`（若存在）、`tags`。
- [x] 3.2 将现有 `PostCard` 映射移至客户端组件内（或从页面传入 render），对过滤后的数组 `map`；无结果时渲染明确空状态文案。
- [x] 3.3 （可选）对输入使用 `useDeferredValue` 或 ~300ms debounce，避免快速输入时卡顿。

## 4. 集成与验证

- [x] 4.1 在 `page.tsx` 中组装：Server Component 计算 `sortedPosts`，传入客户端搜索列表组件；确认 `CoverSwitch` 等现有行为未破坏。
- [x] 4.2 本地手动验证：空搜索、单字段命中、标签命中、无结果、暗色模式；必要时补充与 spec 场景对应的轻量检查说明。

**验证说明（对照 spec）：** `npm run build` 已通过。建议在本地 `npm run dev` 打开 `/posts` 检查：清空搜索框显示全部文章；输入标题/摘要/标签子串应过滤；无匹配时出现「未找到相关文章…」；切换系统/站点暗色模式确认输入框与空状态对比度。另：修复 `Toc.tsx` 中 `tocbot` 的默认导入，使全量类型检查通过（与本次列表功能无关，但为构建所必需）。
