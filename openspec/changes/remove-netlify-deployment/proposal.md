## Why

项目目前同时维护 Vercel 和 Netlify 两套部署配置，但实际只通过 Vercel 进行部署。保留 Netlify 相关配置会增加维护负担，并在构建逻辑中引入不必要的条件分支（`NETLIFY` 环境变量判断），容易造成混淆。

## What Changes

- 删除 `netlify.toml` 配置文件
- 移除 `next.config.mjs` 中对 `NETLIFY` 环境变量的判断逻辑，仅保留 `VERCEL` 环境变量作为服务端运行时部署的判断条件
- 更新 `README.md`，移除 Netlify 访问地址链接

## Capabilities

### New Capabilities

（无新增能力）

### Modified Capabilities

（无规格层级的行为变更）

## Impact

- `netlify.toml`：直接删除
- `next.config.mjs`：简化 `deployWithServerRuntime` 逻辑，只保留 `Boolean(process.env.VERCEL)` 判断
- `README.md`：移除 `https://keteng-blog.netlify.app/` 访问地址
