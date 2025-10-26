'use client';

import { SparkleIcon } from '@/assets';
import { SocialLink } from '@/components/links/SocialLink';
import siteMetadata from '@/config/site';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Balancer from 'react-wrap-balancer';

function Designer() {
	return (
		<span className="group relative bg-black/5 p-1 dark:bg-white/5">
			<span className="pointer-events-none absolute inset-0 border border-violet-700/90 opacity-70 group-hover:border-dashed group-hover:opacity-100 dark:border-violet-400/90">
				<span className="absolute -left-[3.5px] -top-[3.5px] size-1.5 border border-violet-700 bg-zinc-50 dark:border-violet-400" />
				<span className="absolute -bottom-[3.5px] -right-[3.5px] size-1.5 border border-violet-700 bg-zinc-50 dark:border-violet-400" />
				<span className="absolute -bottom-[3.5px] -left-[3.5px] size-1.5 border border-violet-700 bg-zinc-50 dark:border-violet-400" />
				<span className="absolute -right-[3.5px] -top-[3.5px] size-1.5 border border-violet-700 bg-zinc-50 dark:border-violet-400" />
			</span>
			<SparkleIcon className="mr-1 inline-flex transform-gpu transition-transform duration-500 group-hover:rotate-180" />
			Hey 👋，欢迎来到我的网站~
		</span>
	);
}

export function Headline() {
	return (
		<div className="max-w-3xl">
			<motion.h1
				className="xs:text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl lg:text-5xl "
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: 'spring',
					damping: 25,
					stiffness: 100,
					duration: 0.3
				}}
			>
				<Designer />
				<span className="block h-4" />
			</motion.h1>
			<motion.p
				className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: 'spring',
					damping: 30,
					stiffness: 85,
					duration: 0.3,
					delay: 0.1
				}}
			>
				<Balancer>{siteMetadata.description}</Balancer>
				{/* {siteMetadata.description} */}
			</motion.p>
			<motion.div
				className="mt-6 flex gap-6 flex-wrap"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: 'spring',
					damping: 50,
					stiffness: 90,
					duration: 0.35,
					delay: 0.25
				}}
			>
				{siteMetadata.social.map((item) =>
					item.hide ? null : (
						<SocialLink
							isPicture={item.isPicture}
							key={item.href}
							href={item.href}
							icon={item.icon}
							aria-label={item.text}
							platform={item.text}
						/>
					)
				)}
			</motion.div>
			{/* 引入 skillicons */}
			<motion.div
				className="mt-6 flex flex-wrap gap-3"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: 'spring',
					damping: 30,
					stiffness: 85,
					duration: 0.3,
					delay: 0.2
				}}
			>
				<Image
					src="https://skillicons.dev/icons?i=js,html,css,nodejs,tailwind,ts,sass,react,vue,nextjs)"
					alt="skills icons"
					width={800}
					height={100}
					className="mb-4 cursor-pointer w-4/5 h-auto"
					unoptimized
				/>
			</motion.div>
			{/* 引入一张图片 */}
			<motion.div
				className="flex"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: 'spring',
					damping: 30,
					stiffness: 85,
					duration: 0.3,
					delay: 0.2
				}}
			>
				<Image
					src="https://raw.githubusercontent.com/RED523/RED523/refs/heads/output/github-contribution-grid-snake.svg"
					alt="github contribution grid snake animation"
					width={800}
					height={100}
					className="mb-4 cursor-pointer w-4/5 h-auto"
					unoptimized
				/>
			</motion.div>
		</div>
	);
}
