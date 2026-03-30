## Context

博客列表由 `src/app/(app)/posts/page.tsx` 渲染，数据来自 Contentlayer 的 `allPosts`，当前按日期降序展示并 `slice` 掉最后一项（与站点其它处逻辑一致）。页面已有 `CoverSwitch` 等与查询参数相关的遗留注释，列表本身无搜索。目标是在**不改变构建产物形态**的前提下，在页面顶部增加可输入的检索，即时缩小可见文章卡片集合。

## Goals / Non-Goals

**Goals:**

- 在 `/posts` 页**顶部**（标题/简介区域）提供搜索输入，输入后列表仅显示匹配文章。
- 匹配逻辑在浏览器内完成，依赖已有 `Post` 元数据（标题、描述、标签等），无需新 HTTP API。
- 与现有 Tailwind、Container、PostCard 结构协调，保持明暗主题一致。

**Non-Goals:**

- 全文检索正文 MDX 内容（构建期未向列表页注入全文时成本过高）。
- 服务端搜索、Elastic 类索引或第三方搜索 SaaS。
- 多语言分词或拼音检索（除非后续单独立项）。

## Decisions

1. **客户端过滤 + 保持页面为 Server Component 外壳**  
   - **选择**：将「排序后的 posts 数组」作为 props 传给小的 `use client` 子组件（例如 `PostsListWithSearch`），子组件内维护 `query` state 并过滤后渲染 `PostCard`。  
   - **理由**：`allPosts` 在服务端可用，过滤需 `useState`，拆 client 边界可避免整页 `'use client'`。  
   - **备选**：整页 `use client`（更简单但损失 RSC 优势，不推荐）。

2. **匹配规则**  
   - **选择**：对用户输入做 trim 与大小写不敏感；若查询串为空，展示全部（与当前排序一致）。匹配字段：`title`、`description`（若存在）、`tags` 各标签字符串。  
   - **理由**：与 proposal/spec 一致，实现简单、可测。  
   - **备选**：仅标题匹配（命中率低）。

3. **URL 同步**  
   - **选择（默认 MVP）**：不同步 URL，仅本地 state；避免与 `CoverSwitch` 的 `s` 等参数纠缠。  
   - **备选**：`?q=` 与 `useSearchParams`，便于分享筛选结果；若采用须在实现阶段与现有 query 合并。

4. **性能**  
   - **选择**：文章量有限时直接过滤；若输入频繁可考虑 `useDeferredValue` 或简易 debounce（300ms）避免重渲染抖动。  
   - **理由**：博客规模通常可控，优先简单实现。

## Risks / Trade-offs

- **[Risk] 列表与详情页 `slice` 规则不透明** → 搜索仍在「当前展示的子集」上工作；若需搜索含被 slice 掉的文章，需单独产品决策是否调整 `slice`。  
- **[Risk] 无障碍** → 搜索框需 `label` 或 `aria-label`，空结果需可被读屏感知。  
- **Trade-off**：不做正文搜索，长文命中只能通过标题/摘要/标签间接覆盖。

## Migration Plan

- 部署：常规前端发布，无数据迁移。  
- 回滚：还原 `page.tsx` 及相关组件即可。

## Open Questions

- 是否与 `CoverSwitch` 的查询参数统一设计（例如未来扩展多个 query）——可在实现时读 `CoverSwitch` 源码后定夺。
