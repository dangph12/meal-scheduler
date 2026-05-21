const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiOptions extends Omit<RequestInit, 'body' | 'headers'> {
  body?: unknown;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

// Shape every backend response is expected to conform to
interface ApiResponseEnvelope {
  status?: 'success' | 'failed' | 'error';
  message?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly data: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Module-level token — set once from AuthProvider
let _token: string | null = null;

export function setApiToken(token: string | null) {
  _token = token;
}

function buildHeaders(custom?: Record<string, string>): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    ...(_token ? { Authorization: `Bearer ${_token}` } : {}),
    ...custom
  };
}

async function parseErrorMessage(
  res: Response
): Promise<{ message: string; data: unknown }> {
  try {
    const data = await res.json();
    const message =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as Record<string, unknown>).message)
        : `API error: ${res.status}`;
    return { message, data };
  } catch {
    return { message: `API error: ${res.status}`, data: null };
  }
}

async function request<T = unknown>(
  method: HttpMethod,
  path: string,
  options: ApiOptions = {}
): Promise<T | null> {
  const { body, params, headers, ...rest } = options;

  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    method,
    headers: buildHeaders(headers),
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest
  });

  if (res.status === 204) return null;

  if (!res.ok) {
    const { message, data } = await parseErrorMessage(res);
    throw new ApiError(message, res.status, data);
  }

  const data = (await res.json()) as T & ApiResponseEnvelope;

  if (data?.status === 'failed' || data?.status === 'error') {
    throw new ApiError(data.message ?? 'Request failed', res.status, data);
  }

  return data;
}

export const api = {
  get: <T = unknown>(path: string, options?: ApiOptions) =>
    request<T>('GET', path, options),

  post: <T = unknown>(path: string, body?: unknown, options?: ApiOptions) =>
    request<T>('POST', path, { ...options, body }),

  put: <T = unknown>(path: string, body?: unknown, options?: ApiOptions) =>
    request<T>('PUT', path, { ...options, body }),

  patch: <T = unknown>(path: string, body?: unknown, options?: ApiOptions) =>
    request<T>('PATCH', path, { ...options, body }),

  delete: <T = unknown>(path: string, options?: ApiOptions) =>
    request<T>('DELETE', path, options)
};

export type { ApiOptions };
