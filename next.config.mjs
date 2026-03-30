import { withContentlayer } from 'next-contentlayer';
// import generate from './scripts/generate-rss.js';
/** @type {import('next').NextConfig} */
// 本地 pnpm build 仍用静态 export（生成 out/）；带服务端运行时的部署需关闭 export 才能包含 Route Handler（/api/visits）。
// - Vercel：构建时自动设置 VERCEL
// - Netlify：构建时自动设置 NETLIFY=true（见 Netlify 只读环境变量文档）
const deployWithServerRuntime =
	Boolean(process.env.VERCEL) || process.env.NETLIFY === 'true';

const nextConfig = {
	...(deployWithServerRuntime ? {} : { output: 'export' }),
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
