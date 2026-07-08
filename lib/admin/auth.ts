import { NextResponse } from 'next/server';

export function isAdminAuthorized(req: Request): boolean {
  const expected = (process.env.ADMIN_API_TOKEN ?? '').trim();
  if (!expected) return false;
  const auth = req.headers.get('authorization') ?? '';
  return auth === `Bearer ${expected}`;
}

export function adminUnauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
}
