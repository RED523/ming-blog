import { allPosts, type Post } from 'contentlayer/generated';

/** 与列表页、站点地图等处一致的排序与 slice（排除最后一项）。 */
export function getSortedPostsForList(): Post[] {
	return [...allPosts]
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.slice(0, allPosts.length - 1);
}
