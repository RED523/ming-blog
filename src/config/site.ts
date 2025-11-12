import type { SiteConfig } from '@/types/siteConfig';

const url = new URL(
	process.env.NODE_ENV === 'production'
		? 'https://keteng.cn/'
		: 'http://localhost:3000'
);
export const baseSiteConfig: SiteConfig = {
	name: 'blog | 前端 | 开发者',
	description:
		'嘿，大家好，我是柯腾，一名工作3年多的前端开发者。在这里，我将记录我的学习笔记、项目经验、对前端技术的见解以及一些日常生活。希望通过这个平台，与更多志同道合的朋友交流，共同成长！',
	url: url.href, //'https://keteng.cn/',
	// 网站预览图
	ogImage: url.origin + '/og.png',
	// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
	metadataBase: '/',
	keywords: [
		'柯腾呐',
		'blog',
		'前端',
		'开发者',
		'AI',
		'编程',
		'学习笔记',
		'程序员'
	],
	authors: 'Keteng',
	email: 'snailrun160@gmail.com',
	authorsCN: '柯腾呐',
	authorsUrl: 'https://github.com/RED523',
	social: [
		{
			href: 'https://github.com/RED523',
			text: 'github',
			icon: 'GitHubIcon'
		},
		{
			href: 'douyin',
			text: '抖音',
			isPicture: true,
			icon: 'TiktokIcon'
		},
		{
			href: 'https://blog.csdn.net/weixin_46661464?spm=1000.2115.3001.5343',
			text: 'CSDN',
			icon: 'CsdnIcon'
		},
		{
			href: 'https://juejin.cn/user/1574925262918823',
			text: '掘金',
			icon: 'JueJinIcon'
		},
		{
			href: 'wx',
			text: '微信',
			isPicture: true,
			icon: 'WxIcon'
		},
		{
			href: 'wxPublic',
			text: '微信公众号',
			hide: true,
			isPicture: true,
			icon: 'WxMediaIcon'
		},
		{
			href: 'qq',
			text: 'QQ',
			isPicture: true,
			hide: true,
			icon: 'QqIcon'
		},
		{
			href: 'https://x.com/haozhan05554957',
			text: '推特（X）',
			hide: true,
			icon: 'XIcon'
		},
		{
			href: 'https://www.zhihu.com/people/axing-zh',
			text: '知乎',
			hide: true,
			icon: 'ZhihuIcon'
		},
		{
			href: 'https://space.bilibili.com/1695997565',
			text: '哔哩哔哩',
			hide: true,
			icon: 'BilibiliIcon'
		},
		{
			href: 'https://www.youtube.com/@lucky2snail',
			text: 'YouTube',
			hide: true,
			icon: 'YouTubeIcon'
		},
		{
			href: 'https://www.xiaohongshu.com/user/profile/5e2d938d000000000100ac82',
			text: '小红书',
			hide: true,
			icon: 'RedBookIcon'
		},
		{
			href: 'coderzzm@foxmail.com',
			text: '邮箱',
			icon: 'MailIcon'
		}
	],
	themeColors: [
		{ media: '(prefers-color-scheme: dark)', color: '#000212' },
		{ media: '(prefers-color-scheme: light)', color: '#fafafa' }
	],
	defaultNextTheme: 'system', // next-theme option: system | dark | light
	icons: {
		icon: '/favicon.ico',
		shortcut: '/keteng.png',
		apple: '/keteng.png'
	},
	navigationItems: [
		{ href: '/', text: '首页' },
		{ href: '/posts', text: '博客' },
		{ href: '/projects', text: '项目' },
		// { href: '/guestbook', text: '留言墙' },
		// { href: '/ama', text: 'AMA 咨询' },
		{ href: '/about', text: '关于我' },
		{ href: '/feed.xml', text: 'rss' }
		// { href: '/more', text: '更多', menu: true }
	],
	moreItems: {
		'/more': [
			{
				href: '/icon',
				text: '图标库'
			},
			{
				href: '/admin',
				text: '管理'
			}
		]
	},
	footerItems: [{ href: '/', text: '首页' }],
	locale: 'zh-CN',
	siteHostList: ['keteng.cn', 'lucky-snail.vercel.app']
};

const siteMetadata: SiteConfig = {
	...baseSiteConfig,
	openGraph: {
		type: 'website',
		locale: baseSiteConfig.locale,
		url: baseSiteConfig.url,
		title: baseSiteConfig.authors + baseSiteConfig.name,
		description: baseSiteConfig.description,
		siteName: baseSiteConfig.name,
		images: [`${baseSiteConfig.url}og.png`]
	},
	twitter: {
		card: 'summary_large_image',
		title: baseSiteConfig.authors + baseSiteConfig.name,
		description: baseSiteConfig.description,
		images: [`${baseSiteConfig.url}og.png`],
		creator: '@haozhan05554957'
	}
};
export default siteMetadata;
