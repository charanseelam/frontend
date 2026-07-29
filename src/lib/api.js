const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export function getApiUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalizedPath}`;
}

export function apiFetch(path, options = {}) {
  return fetch(getApiUrl(path), options);
}
