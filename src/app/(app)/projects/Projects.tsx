import React from 'react';
import frontendLab from '~/public/frontendLab.png';
import minimalLoopAgent from '~/public/minimalLoopAgent.png';
import { ProjectCard } from './ProjectCard';

export function Projects(): React.ReactElement {
	const projects: ProjectItem[] = [
		{
			id: '1',
			url: 'https://frontend-lab.netlify.app/',
			icon: frontendLab,
			name: '前端技术实验室',
			description: '记录学习、验证新想法的前端实验代码集合',
			tags: ['个人']
		},
		{
			id: '2',
			url: 'https://github.com/RED523/minimal-loop-agent',
			icon: minimalLoopAgent,
			name: 'minimal-loop-agent',
			description:
				'用 Python 写的 ReAct 风格智能体：让大模型在循环里交替进行「推理 → 调用工具 → 读回真实结果」，直到产出最终答案。依赖少、单文件入口清晰，适合理解 Agent 主循环和工具调用。',
			tags: ['个人']
		}
	];

	return (
		<ul
			role="list"
			className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
		>
			{projects.map((project) => (
				<ProjectCard project={project} key={project.id} />
			))}
		</ul>
	);
}
