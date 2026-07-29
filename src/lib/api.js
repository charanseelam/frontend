const API_BASE = (import.meta.env.VITE_API_URL || 'https://trading-g4tl.onrender.com/api').replace(/\/$/, '');

export function getApiUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalizedPath}`;
}

export function apiFetch(path, options = {}) {
  return fetch(getApiUrl(path), options);
}
