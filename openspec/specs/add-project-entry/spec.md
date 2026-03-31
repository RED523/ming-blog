## ADDED Requirements

### Requirement: 项目列表包含 minimal-loop-agent 条目

系统 SHALL 在 `/projects` 页面的项目列表中展示 minimal-loop-agent 项目，包含以下信息：
- **名称**: minimal-loop-agent
- **描述**: 这是一个用 Python 写的 ReAct 风格智能体：针对你指定的本地项目目录，让大模型在循环里交替进行「推理 → 调用工具 → 读回真实结果」，直到产出 \<final_answer\>。依赖少、单文件入口清晰，适合用来理解 Agent 主循环和工具调用，再对照论文或接入更重的编排框架。
- **链接**: https://github.com/RED523/minimal-loop-agent
- **标签**: 个人
- **图标**: 项目专属图标（静态导入）

#### Scenario: 访客查看项目页

- **WHEN** 用户访问 `/projects` 页面
- **THEN** 页面 SHALL 展示 minimal-loop-agent 项目卡片，包含名称、描述、GitHub 链接和「个人」标签

#### Scenario: 点击项目链接

- **WHEN** 用户点击 minimal-loop-agent 卡片的链接
- **THEN** 浏览器 SHALL 在新标签页打开 `https://github.com/RED523/minimal-loop-agent`

#### Scenario: 卡片底部显示域名

- **WHEN** minimal-loop-agent 卡片渲染完成
- **THEN** 卡片底部 SHALL 显示 `github.com` 作为链接域名
