const API_BASE = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api');

export function getApiUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE.replace(/\/$/, '')}${normalizedPath}`;
}

export function apiFetch(path, options = {}) {
  return fetch(getApiUrl(path), options);
}
