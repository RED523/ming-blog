import { withContentlayer } from 'next-contentlayer';
// import generate from './scripts/generate-rss.js';
/** @type {import('next').NextConfig} */
const nextConfig = {
	// 静态导出：本地/非 Vercel 构建（如 Netlify 发布 `out`）仍用 export。
	// Vercel 构建会设置 VERCEL=1，此处关闭 export，才能部署 Route Handler（如 /api/visits）。
	...(process.env.VERCEL ? {} : { output: 'export' }),
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['blog-1304565468.cos.ap-shanghai.myqcloud.com', 'github.com']
	},
	webpack: (config, { isServer }) => {
		// if (isServer) {
		// 	require('./scripts/generate-sitemap'); // eslint-disable-line
		// 	require('./scripts/generate-rss'); // eslint-disable-line
		// }
		// generate();
		return config;
	}
};

export default withContentlayer(nextConfig);
