// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
/* eslint-disable */
const GitHub = require('github-api');
const fs = require('fs-extra');
const path = require('path');
const { GH_TOKEN, GH_USER, GH_PROJECT_NAME } = process.env;

const gh = new GitHub({
	token: GH_TOKEN
});

const blogOutputPath = '../../data/blog';

if (!GH_USER || !GH_PROJECT_NAME) {
	console.error('请设置GITHUB_USER和GITHUB_PROJECT_NAME');
	process.exit(-1);
}

// 如果是 img 标签，并且没有闭合，那么就拼接闭合字符
function closeImgTag(htmlString) {
	// 使用正则表达式匹配未闭合的 <img> 标签
	const imgTagRegex = /<img([^>]*)(?<!\/)>/g;
	// 将未闭合的 <img> 标签替换为自闭合的 <img /> 标签
	return htmlString.replace(imgTagRegex, '<img$1 />');
}

// 获取博客列表实例
const issueInstance = gh.getIssues(GH_USER, GH_PROJECT_NAME);

// 生成mdx文件内容
function generateMdx(issue, fileName) {
	console.log('issue---->', issue);
	const { title, labels, created_at, body, html_url, user } = issue;
	return `---
title: ${title.trim()}
date: ${created_at}
slug: ${fileName}
author: ${user?.login}：${user?.html_url}
tags: ${JSON.stringify(labels.map((item) => item.name))}
---

${closeImgTag(body.replace(/<br \/>/g, '\n'))}

---
此文自动发布于：<a href="${html_url}" target="_blank">github issues</a>
`;
}

function main() {
	const filePath = path.resolve(__dirname, blogOutputPath);
	// 只查询自己的issues，避免别人创建的也更新到博客
	const creators = ['RED523'];
	fs.ensureDirSync(filePath);
	creators.forEach((name) => {
		issueInstance.listIssues({ creator: name }).then(({ data }) => {
			let successCount = 0;
			let newCount = 0;
			let updateCount = 0;
			let skipCount = 0;

			console.log('data---->', data);
			// 遍历所有issues数组
			for (const item of data) {
				try {
					const fileName = `post-${item.number}`; // 文件名
					const content = generateMdx(item, fileName); // 生成mdx文件内容
					const fullPath = `${filePath}/${fileName}.mdx`; // 文件全路径

					// 检查文件是否存在
					const fileExists = fs.existsSync(fullPath);

					if (fileExists) {
						// 文件存在，检查内容是否有变化
						const existingContent = fs.readFileSync(fullPath, 'utf8');
						if (existingContent === content) {
							console.log('无变化，跳过--->', `${filePath}/${fileName}.mdx`);
							skipCount++;
							successCount++;
							continue;
						} else {
							// 内容有变化，更新文件
							fs.writeFileSync(fullPath, content);
							console.log('更新成功--->', `${filePath}/${fileName}.mdx`);
							updateCount++;
						}
					} else {
						// 文件不存在，创建新文件
						fs.writeFileSync(fullPath, content);
						console.log('创建成功--->', `${filePath}/${fileName}.mdx`);
						newCount++;
					}

					successCount++;
				} catch (error) {
					console.log(error);
				}
			}
			console.log('========== 同步结果 ==========');
			console.log(`🔢 总文章数: ${data.length}`);
			console.log(`🆕 新增: ${newCount} 篇`);
			console.log(`🔄 更新: ${updateCount} 篇`);
			console.log(`🎁 跳过: ${skipCount} 篇`);
			console.log(`✅ 成功: ${successCount}/${data.length}`);
			console.log('==============================');
		});
	});
}

module.exports = main;
