export type SourceType = 'template' | 'custom' | 'survey';
export type StoryModelId = 'google/gemma-4-26b-a4b-it' | 'yandex/gpt-pro-5.1' | 'qwen/qwen3.6-flash';

export type FormalizedStoryRequest = {
  source_type: SourceType;
  raw_input: unknown;
  child_age: string;
  main_character: string;
  theme: string;
  setting: string;
  tone: string;
  moral: string;
  length: string;
  final_prompt: string;
  safety_requirements: string[];
  template_id?: number | null;
  template_title?: string | null;
};

export type GenerateStoryResponse = {
  story_text: string;
  model: StoryModelId;
  formalized_request: FormalizedStoryRequest;
};
