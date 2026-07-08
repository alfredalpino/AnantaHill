import { syncPetpoojaMenuPayload } from '@/lib/petpooja/menu-sync';

const DEFAULT_FETCHMENU_URL =
  'https://qle1yy2ydc.execute-api.ap-southeast-1.amazonaws.com/V1/mapped_restaurant_menus';
const DEFAULT_TIMEOUT_MS = 15000;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim() ?? '';
  if (!value) throw new Error(`Missing required env ${name}`);
  return value;
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function parseResponseBody(raw: string): unknown {
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return raw;
  }
}

function isSuccessResponse(payload: unknown): boolean {
  if (!payload || typeof payload !== 'object') return false;
  const success = (payload as Record<string, unknown>).success;
  if (success === true || success === 1 || success === '1') return true;
  if (typeof success === 'string' && success.trim().toLowerCase() === 'true') return true;
  return false;
}

function extractMessage(payload: unknown): string {
  if (payload && typeof payload === 'object') {
    return String((payload as Record<string, unknown>).message ?? 'Unknown Petpooja error');
  }
  return String(payload);
}

function shouldRetryWithDefaultEndpoint(status: number, payload: unknown): boolean {
  if (status === 403) return true;
  const message = extractMessage(payload).toLowerCase();
  return message.includes('missing authentication token') || message.includes('missing auth');
}

function shouldTryAlternateAuth(status: number, payload: unknown): boolean {
  if ([401, 403].includes(status)) return true;
  const message = extractMessage(payload).toLowerCase();
  return message.includes('invalid client credentials') || message.includes('invalid callback authentication');
}

export async function fetchAndSyncPetpoojaMenu() {
  const configuredEndpoint = process.env.PETPOOJA_FETCH_MENU_URL?.trim() || '';
  const endpoint = configuredEndpoint || DEFAULT_FETCHMENU_URL;
  const appKey = requireEnv('PETPOOJA_APP_KEY');
  const appSecret = requireEnv('PETPOOJA_APP_SECRET');
  const accessToken = requireEnv('PETPOOJA_ACCESS_TOKEN');
  const restId = requireEnv('PETPOOJA_REST_ID');
  const timeoutMs = Number(process.env.PETPOOJA_FETCH_MENU_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS);

  const callbackBearer = process.env.PETPOOJA_CALLBACK_AUTH_BEARER?.trim() ?? '';
  const callbackHeaderName = process.env.PETPOOJA_CALLBACK_HEADER_NAME?.trim() ?? '';
  const callbackHeaderValue = process.env.PETPOOJA_CALLBACK_HEADER_VALUE?.trim() ?? '';
  const normalizedCallbackHeaderName = callbackHeaderName.toLowerCase();

  const makeRequest = async (
    targetEndpoint: string,
    mode: 'petpooja-fetchmenu' | 'pushmenu-callback-post' | 'pushmenu-callback-get',
  ) => {
    const headers: Record<string, string> = { Accept: 'application/json' };
    let method: 'GET' | 'POST' = 'POST';
    let body: string | undefined;

    if (mode === 'petpooja-fetchmenu') {
      headers['Content-Type'] = 'application/json';
      headers['app-key'] = appKey;
      headers['app-secret'] = appSecret;
      headers['access-token'] = accessToken;
      body = JSON.stringify({ restID: restId });
    } else if (mode === 'pushmenu-callback-post') {
      headers['Content-Type'] = 'application/json';
      if (callbackBearer) headers.authorization = callbackBearer;
      if (normalizedCallbackHeaderName && callbackHeaderValue) {
        headers[normalizedCallbackHeaderName] = callbackHeaderValue;
      }
      body = JSON.stringify({ restID: restId });
    } else {
      method = 'GET';
      if (callbackBearer) headers.authorization = callbackBearer;
      if (normalizedCallbackHeaderName && callbackHeaderValue) {
        headers[normalizedCallbackHeaderName] = callbackHeaderValue;
      }
    }

    const response = await fetchWithTimeout(
      targetEndpoint,
      { method, headers, body },
      Number.isFinite(timeoutMs) ? timeoutMs : DEFAULT_TIMEOUT_MS,
    );
    const raw = await response.text();
    const parsed = parseResponseBody(raw);
    return { targetEndpoint, mode, response, raw, parsed };
  };

  let attempt = await makeRequest(endpoint, 'petpooja-fetchmenu');

  if (shouldTryAlternateAuth(attempt.response.status, attempt.parsed)) {
    const callbackPostAttempt = await makeRequest(endpoint, 'pushmenu-callback-post');
    if (callbackPostAttempt.response.ok && isSuccessResponse(callbackPostAttempt.parsed)) {
      attempt = callbackPostAttempt;
    } else {
      const callbackGetAttempt = await makeRequest(endpoint, 'pushmenu-callback-get');
      if (callbackGetAttempt.response.ok && isSuccessResponse(callbackGetAttempt.parsed)) {
        attempt = callbackGetAttempt;
      }
    }
  }

  if (
    configuredEndpoint &&
    endpoint !== DEFAULT_FETCHMENU_URL &&
    shouldRetryWithDefaultEndpoint(attempt.response.status, attempt.parsed)
  ) {
    attempt = await makeRequest(DEFAULT_FETCHMENU_URL, 'petpooja-fetchmenu');
  }

  if (!attempt.response.ok) {
    throw new Error(`Petpooja fetchmenu failed HTTP ${attempt.response.status}: ${attempt.raw.slice(0, 500)}`);
  }
  if (!isSuccessResponse(attempt.parsed)) {
    throw new Error(`Petpooja fetchmenu rejected: ${extractMessage(attempt.parsed)}`);
  }

  const syncStats = await syncPetpoojaMenuPayload(attempt.parsed);
  return { endpoint: attempt.targetEndpoint, status: attempt.response.status, mode: attempt.mode, syncStats };
}
