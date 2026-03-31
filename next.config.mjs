import { withContentlayer } from 'next-contentlayer';
// import generate from './scripts/generate-rss.js';
/** @type {import('next').NextConfig} */
// 本地 pnpm build 使用静态 export（生成 out/）；Vercel 部署时自动设置 VERCEL 环境变量，关闭静态导出以支持 Route Handler（/api/visits）。
const deployWithServerRuntime = Boolean(process.env.VERCEL);

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
