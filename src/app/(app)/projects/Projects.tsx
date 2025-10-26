import React from 'react';
import frontendLab from '~/public/frontendLab.png';
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
