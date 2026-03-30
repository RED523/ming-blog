/**
 * tocbot 的 ESM 入口会导出 init / destroy，但各版本 .d.ts 在 default 与 export= 之间不一致，
 * 补充命名导出以便与 Vercel 上锁定的 tocbot 版本类型检查一致。
 */
declare module 'tocbot' {
	export function init(options?: tocbot.IStaticOptions): void;
	export function destroy(): void;
	export function refresh(options?: tocbot.IStaticOptions): void;
}
