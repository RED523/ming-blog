## REMOVED Requirements

### Requirement: Netlify 部署支持
项目 SHALL NOT 再维护 Netlify 平台的部署配置。所有部署均通过 Vercel 完成。

- **Reason**: 项目仅使用 Vercel 进行部署，Netlify 配置为冗余资产，增加维护成本。
- **Migration**: 无需迁移，Netlify 部署已停用。

#### Scenario: 构建时无 Netlify 环境变量判断
- **WHEN** 项目在任何环境执行构建
- **THEN** 构建逻辑 SHALL 仅检测 `VERCEL` 环境变量来判断是否启用服务端运行时，不得检测 `NETLIFY` 环境变量
