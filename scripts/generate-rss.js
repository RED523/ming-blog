/* eslint-disable */
const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generate() {
	const feed = new RSS({
		title: '柯腾呐',
		description:
			'嘿，大家好，我是柯腾，一名工作3年多的前端开发者。在这里，我将记录我的学习笔记、项目经验、对前端技术的见解以及一些日常生活。希望通过这个平台，与更多志同道合的朋友交流，共同成长！',
		site_url: 'https://keteng-blog.netlify.app',
		feed_url: 'https://keteng-blog.netlify.app/feed.xml'
	});

	// 定义要读取的文件夹路径
	const folders = [
		path.join(__dirname, '..', 'data', 'blog'),
		path.join(__dirname, '..', 'posts')
	];

	// 读取所有文件夹中的文件
	const allPosts = await Promise.all(
		folders.map(async (folder) => {
			const files = await fs.readdir(folder);
			return files.map((file) => ({ file, folder }));
		})
	);

	// 扁平化文件列表
	const flattenedPosts = allPosts.flat();
	await Promise.all(
		flattenedPosts.map(async ({ file, folder }) => {
			const content = await fs.readFile(path.join(folder, file));
			const frontmatter = matter(content);

			feed.item({
				title: frontmatter.data.title,
				url:
					'https://keteng-blog.netlify.app/posts/' + file.replace(/\.mdx?/, ''),
				date: frontmatter.data.publishedAt,
				description: frontmatter.data.summary
			});
		})
	);

	await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

// generate();
module.exports = generate;
