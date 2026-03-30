## Context

页脚由 `src/components/Footer.tsx` 渲染，第二段 `Container.Inner` 内为「欢迎 👏🏻 你的访问」。站点为 Next.js App Router，部署目标包含 Vercel（见 `siteHostList`）。累计次数需在**多实例/无本地磁盘**环境下原子递增，纯内存或本地文件在 serverless 下不可靠。

## Goals / Non-Goals

**Goals:**

- 在页脚该文案**同一视觉区域**展示全站累计访问次数（单调递增的非负整数）。
- 提供可在生产环境持久化、并发安全的计数存储与 API（或 Server Action）边界。
- 未配置存储或请求失败时，页脚仍可渲染，计数区域有明确降级表现（见 spec）。

**Non-Goals:**

- 单篇文章 PV、访客地域/设备分析、与 Google Analytics 等指标对齐。
- 防刷到「绝对公平」（bots、预渲染多次命中）；仅做基本的服务端原子递增与可选的简单限流说明。
- 历史报表、按日曲线、导出。

## Decisions

1. **计数语义（全站 PV 近似）**  
   - **选择**：在浏览器中于**应用壳挂载后**发起一次「记一次访问」的请求（例如 `POST` 到 Route Handler），成功后在 UI 展示服务端返回的**当前累计值**（或随后 `GET` 拉取）。同一标签页内路由切换是否再次计数：默认 **每次导航记一次**（与常见「访问量」直觉一致）；若需减轻重复，可在实现阶段改为「每会话一次」并用 cookie，本设计不强制。  
   - **理由**：累计次数需服务端持久化；客户端触发与博客多页结构一致。  
   - **备选**：仅首页计数（产品范围收窄，未采纳）。

2. **存储**  
   - **选择**：使用 **Redis 兼容 KV**（如 Vercel KV、`@vercel/kv`，或 Upstash Redis）保存单一 key（例如 `site:visit:total`），用 `INCR`（或 Lua/事务）保证原子性。  
   - **理由**：与 Next.js serverless/edge 常见组合，延迟低、运维面小。  
   - **备选**：自建 Redis/Postgres 计数表——更重；**文件/JSON**——不适合多实例。

3. **API 形态**  
   - **选择**：`Route Handler`（如 `src/app/api/visits/route.ts`）：`POST` 执行递增并返回新值；可选 `GET` 只读当前值（用于 SSR 或刷新展示）。使用环境变量注入 KV 连接，未配置时返回明确错误或 503，由 UI 降级。  
   - **理由**：与现有 App Router 一致，易测、易部署。  
   - **备选**：Server Action——亦可，但 Route Handler 更便于缓存策略与监控。

4. **Footer 集成**  
   - **选择**：将「欢迎 + 数字」抽成小的 **`use client`** 组件（或仅在数字区 client），在 `useEffect` 中调用 `POST` 一次并 setState；样式延续现有 `text-sm`、`zinc` 色系与 flex 布局。  
   - **理由**：计数依赖浏览器生命周期，避免在 RSC 中重复执行不确定次数。

5. **SEO / 预渲染**  
   - **选择**：计数数字以客户端展示为主；首屏可先显示占位符或省略号再替换，避免阻塞 LCP。  
   - **理由**：第三方 KV 调用不宜放在阻塞 RSC 的关键路径上。

## Risks / Trade-offs

- **[Risk] 爬虫与预取导致偏高** → 接受为 PV 类指标的常见误差；后续可加 rate limit 或仅统计 `navigator` 存在时的请求。  
- **[Risk] KV 未配置导致本地开发无数字** → 文档说明 `.env.local` 模板；降级展示见 spec。  
- **[Risk] 冷启动与 KV 延迟** → UI 异步加载数字，失败不抛错到整页。  
- **Trade-off**：会话级去重未默认启用，数字更接近「请求次数」而非 UV。

## Migration Plan

- **部署**：在托管平台创建 KV，配置环境变量，发布前后端代码；无数据迁移（从 0 或手动 `SET` 初值若需承接历史）。  
- **回滚**：移除 client 调用与 Route Handler，还原 `Footer` 文案块即可；KV 中数据可保留。

## Open Questions

- 是否在首屏用 `GET` 同步展示「上次已知值」而 `POST` 异步更新——实现阶段按性能与闪烁接受度决定。  
- 是否需要从既有分析工具导入初始值——一次性运维操作，不写入代码路径。
