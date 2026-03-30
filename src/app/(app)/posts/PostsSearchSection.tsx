'use client';

import { HourglassIcon } from '@/assets';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import type { Post } from 'contentlayer/generated';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useDeferredValue, useMemo, useState } from 'react';
import { Tag } from './TagItem';

const SEARCH_INPUT_ID = 'posts-list-search';

function PostCard({ post, showCover }: { post: Post; showCover?: boolean }) {
	return (
		<Link
			href={`/posts/${post.slug}`}
			className={cn(
				'text-violet-500 relative dark:text-violet-400',
				showCover ? 'hover:drop-shadow-2xl' : ' hover:text-violet-700'
			)}
		>
			{showCover && (
				<AspectRatio
					ratio={16 / 9}
					className="bg-muted absolute left-0 top-0 rounded-md overflow-hidden"
				>
					<Image
						unoptimized
						src={post.cover ?? ''}
						alt={post.title}
						fill
						className=" object-cover"
					/>
				</AspectRatio>
			)}
			<div className="px-4 py-4 rounded-sm border-b-[1px] border-violet-200 sm:border-none  cursor-pointer">
				<h2 className="mb-1 text-xl font-medium">
					<span>{post.title}</span>
				</h2>
				<div className="hidden sm:flex flex-wrap mt-2 justify-start  items-center space-x-4 text-sm">
					<time
						dateTime={post.date}
						className=" block text-xs text-gray-600 dark:text-zinc-400"
					>
						{dayjs(post.date).format('YYYY-MM-DD')}
					</time>
					<div className=" text-xs text-gray-600 dark:text-zinc-400 flex items-center">
						<HourglassIcon className="mr-2" /> {post.readingTime?.text}
					</div>
				</div>
				<div className="flex gap-2 mt-2 flex-wrap">
					{post.tags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</div>
			</div>
		</Link>
	);
}

function matchesQuery(post: Post, raw: string): boolean {
	const q = raw.trim().toLowerCase();
	if (!q) return true;
	if (post.title.toLowerCase().includes(q)) return true;
	if (post.description?.toLowerCase().includes(q)) return true;
	return post.tags.some((tag) => tag.toLowerCase().includes(q));
}

export default function PostsSearchSection({ posts }: { posts: Post[] }) {
	const [query, setQuery] = useState('');
	const deferredQuery = useDeferredValue(query);

	const filtered = useMemo(
		() => posts.filter((post) => matchesQuery(post, deferredQuery)),
		[posts, deferredQuery]
	);

	return (
		<>
			<div className="max-w-2xl mb-6">
				<label
					htmlFor={SEARCH_INPUT_ID}
					className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
				>
					搜索文章
				</label>
				<input
					id={SEARCH_INPUT_ID}
					name="q"
					type="search"
					autoComplete="off"
					placeholder="按标题、摘要或标签筛选…"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className={cn(
						'w-full rounded-md border px-3 py-2 text-base shadow-sm transition-colors',
						'border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400',
						'dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500',
						'focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 dark:focus:border-violet-400'
					)}
				/>
			</div>
			<div className={cn('grid grid-cols-1 gap-4', false ? 'grid-cols-2' : '')}>
				{filtered.length === 0 ? (
					<p
						className="text-zinc-600 dark:text-zinc-400 py-8 text-center"
						role="status"
					>
						未找到相关文章，请尝试其他关键词。
					</p>
				) : (
					filtered.map((post) => (
						<PostCard showCover={false} key={post.slug} post={post} />
					))
				)}
			</div>
		</>
	);
}
