import type { ReactNode } from 'react';
import type { FormalizedStoryRequest } from '../types/story';

type StoryWorkflowResultProps = {
  sourceContent: ReactNode;
  sourcePlaceholder: string;
  formalizedStory: FormalizedStoryRequest | null;
  storyText: string;
  sourceTitle?: string;
  sourceDescription?: string;
};

const formalizedLabels: Array<[keyof FormalizedStoryRequest, string]> = [
  ['source_type', 'Источник'],
  ['child_age', 'Возраст ребенка'],
  ['main_character', 'Главный герой'],
  ['theme', 'Тема'],
  ['setting', 'Место действия'],
  ['tone', 'Настроение'],
  ['moral', 'Мораль'],
  ['length', 'Длина'],
];

const sourceTypeLabels = {
  template: 'Готовая заготовка',
  custom: 'Своя задумка',
  survey: 'Ответы на вопросы',
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
          <h2>Ваша задумка</h2>
          <p>Здесь собраны слова, выбор и детали, с которых начинается будущая сказка.</p>
        </div>
        {sourceContent ? <div>{sourceContent}</div> : <div className="placeholder-card">{sourcePlaceholder}</div>}
      </article>

      <article className="workflow-card">
        <div className="result-panel__header">
          <h2>Основа истории</h2>
          <p>Мы аккуратно собираем важные детали вместе, чтобы сказка звучала цельно и мягко.</p>
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
              <h3>Собранные детали</h3>
              <pre>{formatValue(formalizedStory.raw_input)}</pre>
            </div>

            <div className="prompt-preview">
              <h3>Текст для создания сказки</h3>
              <pre>{formalizedStory.final_prompt}</pre>
            </div>
          </div>
        ) : (
          <div className="placeholder-card">
            Когда основа будет готова, здесь появится собранный образ вашей будущей истории.
          </div>
        )}
      </article>

      <article className="workflow-card">
        <div className="result-panel__header">
          <h2>Готовая сказка</h2>
          <p>
            Здесь появится история, которую можно читать вслух, перечитывать и бережно хранить
            {modelName ? `. Она создана с помощью ${modelName}` : '.'}
          </p>
        </div>

        {storyText ? (
          <div className="prompt-preview">
            <h3>Текст сказки</h3>
            <pre>{storyText}</pre>
          </div>
        ) : (
          <div className="placeholder-card">Когда история будет готова, она появится здесь целиком.</div>
        )}
      </article>
    </div>
  );
}
