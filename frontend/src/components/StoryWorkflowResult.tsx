import type { ReactNode } from 'react';
import type { FormalizedStoryRequest } from '../types/story';

type StoryWorkflowResultProps = {
  sourceContent: ReactNode;
  sourcePlaceholder: string;
  formalizedStory: FormalizedStoryRequest | null;
  storyText: string;
  modelName?: string;
};

const formalizedLabels: Array<[keyof FormalizedStoryRequest, string]> = [
  ['source_type', 'Тип источника'],
  ['child_age', 'Возраст ребенка'],
  ['main_character', 'Главный герой'],
  ['theme', 'Тема'],
  ['setting', 'Место действия'],
  ['tone', 'Тон'],
  ['moral', 'Мораль'],
  ['length', 'Длина'],
];

const sourceTypeLabels = {
  template: 'Готовый шаблон',
  custom: 'Пользовательский запрос',
  survey: 'Опрос',
} as const;

function formatValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (typeof value === 'string' && value in sourceTypeLabels) {
    return sourceTypeLabels[value as keyof typeof sourceTypeLabels];
  }

  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }

  return String(value ?? 'Не указано');
}

export function StoryWorkflowResult({
  sourceContent,
  sourcePlaceholder,
  formalizedStory,
  storyText,
  modelName,
}: StoryWorkflowResultProps) {
  return (
    <div className="workflow-grid">
      <article className="workflow-card">
        <div className="result-panel__header">
          <h2>Исходные данные</h2>
          <p>Здесь показано то, что пользователь выбрал или ввел перед формализацией.</p>
        </div>
        {sourceContent ? sourceContent : <div className="placeholder-card">{sourcePlaceholder}</div>}
      </article>

      <article className="workflow-card">
        <div className="result-panel__header">
          <h2>Формализованный запрос</h2>
          <p>Промежуточный результат сохраняется отдельно и используется для генерации сказки.</p>
        </div>

        {formalizedStory ? (
          <div className="workflow-stack">
            <div className="survey-result">
              {formalizedLabels.map(([field, label]) => (
                <div className="survey-result__item" key={field}>
                  <span>{label}</span>
                  <strong>{formatValue(formalizedStory[field])}</strong>
                </div>
              ))}
            </div>

            <div className="prompt-preview">
              <h3>Исходный ввод в формализованном виде</h3>
              <pre>{formatValue(formalizedStory.raw_input)}</pre>
            </div>

            <div className="prompt-preview">
              <h3>Итоговый prompt</h3>
              <pre>{formalizedStory.final_prompt}</pre>
            </div>
          </div>
        ) : (
          <div className="placeholder-card">
            После формализации здесь появится единая структура запроса.
          </div>
        )}
      </article>

      <article className="workflow-card">
        <div className="result-panel__header">
          <h2>Готовая сказка</h2>
          <p>
            После генерации пользователь увидит текст сказки
            {modelName ? ` и модель ${modelName}` : ''}.
          </p>
        </div>

        {storyText ? (
          <div className="prompt-preview">
            <h3>Сгенерированный текст</h3>
            <pre>{storyText}</pre>
          </div>
        ) : (
          <div className="placeholder-card">После генерации здесь появится готовая детская сказка.</div>
        )}
      </article>
    </div>
  );
}
