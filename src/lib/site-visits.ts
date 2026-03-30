import 'server-only';
import { Redis } from '@upstash/redis';

export const SITE_VISIT_KEY = 'site:visit:total';

export function isVisitStoreConfigured(): boolean {
	return Boolean(
		process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
	);
}

function getRedis(): Redis {
	return Redis.fromEnv();
}

export async function getVisitCount(): Promise<number> {
	const redis = getRedis();
	const raw = await redis.get(SITE_VISIT_KEY);
	if (raw === null || raw === undefined) return 0;
	const n = typeof raw === 'number' ? raw : Number(raw);
	return Number.isFinite(n) ? Math.floor(n) : 0;
}

export async function incrementVisitCount(): Promise<number> {
	const redis = getRedis();
	return redis.incr(SITE_VISIT_KEY);
}
