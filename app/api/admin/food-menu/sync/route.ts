import { NextResponse } from 'next/server';
import { isAdminAuthorized, adminUnauthorizedResponse } from '@/lib/admin/auth';
import { fetchAndSyncPetpoojaMenu } from '@/lib/petpooja/fetch-menu';

export async function POST(req: Request) {
  if (!isAdminAuthorized(req)) return adminUnauthorizedResponse();

  try {
    const result = await fetchAndSyncPetpoojaMenu();
    return NextResponse.json({
      success: true,
      message: 'Petpooja fetchmenu sync completed',
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
