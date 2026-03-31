## Context

项目是一个 Next.js 博客，当前 `next.config.mjs` 中通过检测 `VERCEL` 或 `NETLIFY` 环境变量来决定是否启用服务端运行时（禁用静态导出）。Netlify 配置文件 `netlify.toml` 存在于项目根目录，`README.md` 中也包含 Netlify 访问地址。由于实际只使用 Vercel 部署，这些配置为多余负担。

## Goals / Non-Goals

**Goals:**
- 删除所有 Netlify 相关配置文件和代码引用
- 简化 `next.config.mjs` 构建逻辑，仅依赖 `VERCEL` 环境变量判断部署运行时
- 清理 `README.md` 中的 Netlify 访问地址

**Non-Goals:**
- 修改 Vercel 部署相关任何配置
- 改变现有的构建输出行为（本地静态导出逻辑不变）
- 修改 CI/CD 工作流

## Decisions

**保留 `deployWithServerRuntime` 变量，仅移除 Netlify 分支**

当前逻辑：
```js
const deployWithServerRuntime = Boolean(process.env.VERCEL) || process.env.NETLIFY === 'true';
```
修改后：
```js
const deployWithServerRuntime = Boolean(process.env.VERCEL);
```

理由：保持逻辑清晰，仅保留实际使用的平台判断，避免引入不存在的平台依赖。注释也一并清理以消除 Netlify 相关说明。

## Risks / Trade-offs

- **风险**：若将来有人意外运行 Netlify 构建，会因缺少 `netlify.toml` 而失败 → **缓解**：这是预期行为，项目已明确仅使用 Vercel。
- **风险**：README 中的 Netlify 链接可能仍被外部引用 → **缓解**：链接指向旧部署地址，移除不影响现有用户。
