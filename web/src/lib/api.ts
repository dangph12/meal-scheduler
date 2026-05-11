const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiOptions extends Omit<RequestInit, 'body' | 'headers'> {
  body?: unknown;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Module-level token — set once from AuthProvider
let _token: string | null = null;

export function setApiToken(token: string | null) {
  _token = token;
}

async function request<T = unknown>(
  method: HttpMethod,
  path: string,
  options: ApiOptions = {}
): Promise<T | undefined> {
  const { body, params, headers: customHeaders, ...rest } = options;

  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders
  };

  if (_token) {
    headers['Authorization'] = `Bearer ${_token}`;
  }

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...rest
  });

  if (!res.ok) {
    let errorData: unknown;
    try {
      errorData = await res.json();
    } catch {
      errorData = null;
    }
    throw new ApiError(
      `API ${method} ${path} failed: ${res.status}`,
      res.status,
      errorData
    );
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
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

export { ApiError };
export type { ApiOptions };
