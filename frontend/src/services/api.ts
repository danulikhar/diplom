import type { FormalizedStoryRequest, GenerateStoryResponse } from '../types/story';
import { defaultStoryModel } from '../constants/storyModels';
import type { StoryModelId } from '../types/story';
import type { StoryTemplate } from '../types/template';

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
};

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiConfig.baseUrl}${path}`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<T>;
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${apiConfig.baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<T>;
}

async function getErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { detail?: string };
    return data.detail ?? `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

export function getTemplates() {
  return fetchJson<StoryTemplate[]>('/templates');
}

export function formalizeTemplate(templateId: number, childAge?: string) {
  return postJson<FormalizedStoryRequest>('/formalization/template', {
    template_id: templateId,
    child_age: childAge?.trim() || undefined,
  });
}

export function formalizeCustomPrompt(rawPrompt: string) {
  return postJson<FormalizedStoryRequest>('/formalization/custom', {
    raw_prompt: rawPrompt,
  });
}

export function formalizeSurvey(payload: {
  child_age?: string;
  main_character?: string;
  theme?: string;
  setting?: string;
  tone?: string;
  moral?: string;
  length?: string;
}) {
  return postJson<FormalizedStoryRequest>('/formalization/survey', payload);
}

export function generateStory(formalizedRequest: FormalizedStoryRequest, model: StoryModelId = defaultStoryModel) {
  return postJson<GenerateStoryResponse>('/stories/generate', {
    formalized_request: formalizedRequest,
    model,
  });
}
