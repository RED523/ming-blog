## 1. 依赖与配置

- [x] 1.1 选定 KV 方案（Vercel KV / Upstash Redis 等），在 `package.json` 中加入对应 SDK（若采用 `@vercel/kv` 则安装并锁定版本）
- [x] 1.2 定义环境变量名（如 KV URL/TOKEN）并在本地 `.env.example` 或 README 片段中说明；生产环境在托管平台配置密钥

## 2. 服务端计数与 API

- [x] 2.1 实现持久化 key（如 `site:visit:total`）的原子 `INCR` 与读数辅助函数，未配置存储时明确失败、不伪造成功
- [x] 2.2 新增 Route Handler（例如 `src/app/api/visits/route.ts`）：`POST` 记一次访问并返回 JSON（含当前累计值）；可选 `GET` 仅返回当前值
- [x] 2.3 为 handler 添加基础错误处理与合适 HTTP 状态码，避免泄露敏感连接信息

## 3. 页脚 UI

- [x] 3.1 新增客户端组件（或在 Footer 内拆分）：挂载后调用 `POST /api/visits`，将返回的累计值展示在「欢迎 👏🏻 你的访问」旁，样式与现有 `Footer` 一致
- [x] 3.2 处理加载中、失败、未配置：保留欢迎语，数字区域使用占位或「—」等，不触发整页崩溃
- [x] 3.3 在 `Footer.tsx` 中接入该组件，确认明暗主题与响应式布局正常

## 4. 收尾

- [x] 4.1 手动验证：有/无环境变量、成功递增、刷新与多页导航行为符合 design 中声明的计数语义
- [x] 4.2 将 `openspec/specs/site-visit-counter/spec.md` 合入主 spec 目录（在 `/opsx:apply` 归档或合并流程中处理，若项目约定由 apply 脚本完成则跳过手抄）
