import type { StoryModelId } from '../types/story';

export const defaultStoryModel: StoryModelId = 'google/gemma-4-26b-a4b-it';

export const storyModels: Array<{ id: StoryModelId; label: string }> = [
  { id: defaultStoryModel, label: 'Gemma' },
  { id: 'yandex/gpt-pro-5.1', label: 'Yandex GPT Pro 5.1' },
  { id: 'qwen/qwen3.6-flash', label: 'Qwen 3.6 Flash' },
];

export function getStoryModelLabel(modelId: StoryModelId) {
  return storyModels.find((model) => model.id === modelId)?.label ?? modelId;
}
