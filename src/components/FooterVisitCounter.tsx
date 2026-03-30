'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FooterVisitCounter() {
	const pathname = usePathname();
	const [count, setCount] = useState<number | null>(null);
	const [unavailable, setUnavailable] = useState(false);

	useEffect(() => {
		let cancelled = false;
		fetch('/api/visits', { method: 'POST' })
			.then(async (res) => {
				if (cancelled) return;
				if (res.status === 503) {
					setUnavailable(true);
					return;
				}
				if (!res.ok) {
					setUnavailable(true);
					return;
				}
				const data = (await res.json()) as { count?: unknown };
				if (typeof data.count === 'number' && Number.isFinite(data.count)) {
					setCount(data.count);
					setUnavailable(false);
				} else {
					setUnavailable(true);
				}
			})
			.catch(() => {
				if (!cancelled) setUnavailable(true);
			});
		return () => {
			cancelled = true;
		};
	}, [pathname]);

	const countLabel = unavailable
		? '—'
		: count === null
			? '…'
			: count.toLocaleString('zh-CN');

	return (
		<div className="flex flex-col items-center justify-start gap-1 text-sm text-zinc-500/80 dark:text-zinc-400/80 sm:flex-row sm:items-baseline sm:gap-2">
			<span>欢迎 👏🏻 你的访问</span>
			<span className="tabular-nums" aria-live="polite">
				· 累计访问 {countLabel} 次
			</span>
		</div>
	);
}
