## 1. 删除 Netlify 配置文件

- [x] 1.1 删除项目根目录的 `netlify.toml` 文件

## 2. 清理构建逻辑

- [x] 2.1 修改 `next.config.mjs`：将 `deployWithServerRuntime` 简化为仅检测 `VERCEL` 环境变量，移除 `NETLIFY` 判断及相关注释

## 3. 更新文档

- [x] 3.1 修改 `README.md`：移除 Netlify 访问地址 `https://keteng-blog.netlify.app/` 相关链接或说明
