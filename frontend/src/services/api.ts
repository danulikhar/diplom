import type { StoryTemplate } from '../types/template';

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
};

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiConfig.baseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getTemplates() {
  return fetchJson<StoryTemplate[]>('/templates');
}
