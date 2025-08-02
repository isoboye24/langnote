// app/api/years/route.ts (Next.js 13+/App Router)
import { getUniqueWordYears } from '@/lib/actions/user/word.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { bookId, groupId } = await req.json();
  const years = await getUniqueWordYears({ bookId, groupId });
  return NextResponse.json(years);
}
