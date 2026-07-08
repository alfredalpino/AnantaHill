import 'server-only';

import { fetchAndSyncPetpoojaMenu } from '@/lib/petpooja/fetch-menu';

const DEFAULT_SYNC_TIMEOUT_MS = 12000;

export async function syncPetpoojaMenuOnLoad(context: string) {
  const enabled = (process.env.PETPOOJA_FETCH_MENU_ON_FOOD_API ?? 'true').toLowerCase() === 'true';
  if (!enabled) return { synced: false as const, reason: 'disabled' as const };

  const timeoutMs = Number(process.env.PETPOOJA_FETCH_MENU_SYNC_TIMEOUT_MS ?? DEFAULT_SYNC_TIMEOUT_MS);
  const syncPromise = fetchAndSyncPetpoojaMenu();
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Petpooja menu sync timed out')), timeoutMs);
  });

  try {
    const result = await Promise.race([syncPromise, timeoutPromise]);
    console.info(`Petpooja fetchmenu sync completed for ${context}`, result);
    return { synced: true as const, result };
  } catch (error) {
    console.error(`Petpooja fetchmenu sync failed for ${context}; serving DB menu snapshot`, {
      message: error instanceof Error ? error.message : String(error),
    });
    return { synced: false as const, reason: 'error' as const };
  }
}
