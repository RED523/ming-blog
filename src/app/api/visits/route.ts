import {
	getVisitCount,
	incrementVisitCount,
	isVisitStoreConfigured
} from '@/lib/site-visits';
import { NextResponse } from 'next/server';

export async function POST() {
	if (!isVisitStoreConfigured()) {
		return NextResponse.json({ error: 'kv_not_configured' }, { status: 503 });
	}
	try {
		const count = await incrementVisitCount();
		return NextResponse.json({ count });
	} catch {
		return NextResponse.json({ error: 'kv_error' }, { status: 500 });
	}
}

export async function GET() {
	if (!isVisitStoreConfigured()) {
		return NextResponse.json({ error: 'kv_not_configured' }, { status: 503 });
	}
	try {
		const count = await getVisitCount();
		return NextResponse.json({ count });
	} catch {
		return NextResponse.json({ error: 'kv_error' }, { status: 500 });
	}
}
