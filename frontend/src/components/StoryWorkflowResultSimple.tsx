import type { ReactNode } from 'react';
import type { FormalizedStoryRequest } from '../types/story';

type StoryWorkflowResultSimpleProps = {
  sourceContent: ReactNode;
  sourcePlaceholder: string;
  formalizedStory: FormalizedStoryRequest | null;
  storyText: string;
  modelName?: string;
  sourceTitle?: string;
  sourceDescription?: string;
};

export function StoryWorkflowResultSimple({
  sourceContent,
  sourcePlaceholder,
  formalizedStory,
  storyText,
  modelName,
  sourceTitle,
  sourceDescription,
}: StoryWorkflowResultSimpleProps) {
  return (
    <div className="workflow-grid">
      <article className="workflow-card">
        {sourceTitle || sourceDescription ? (
          <div className="result-panel__header">
            {sourceTitle ? <h2>{sourceTitle}</h2> : null}
            {sourceDescription ? <p>{sourceDescription}</p> : null}
          </div>
        ) : null}
        {sourceContent ? <div>{sourceContent}</div> : <div className="placeholder-card">{sourcePlaceholder}</div>}
      </article>

      <article className="workflow-card">
        <div className="result-panel__header">
          <h2>Основа истории</h2>
        </div>

        {formalizedStory ? (
          <div className="workflow-stack">
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
          {storyText && modelName ? <p>Модель: {modelName}</p> : null}
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
