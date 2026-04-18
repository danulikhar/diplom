import type { FormEvent } from 'react';
import { useState } from 'react';
import { StoryWorkflowResult } from '../components/StoryWorkflowResult';
import { PageLayout } from '../components/PageLayout';
import { formalizeCustomPrompt, generateStory } from '../services/api';
import type { FormalizedStoryRequest } from '../types/story';

export function CustomPromptPage() {
  const [promptText, setPromptText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [formalizedStory, setFormalizedStory] = useState<FormalizedStoryRequest | null>(null);
  const [storyText, setStoryText] = useState('');
  const [modelName, setModelName] = useState('');
  const [isFormalizing, setIsFormalizing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedText = promptText.trim();

    if (!normalizedText) {
      setError('Введите текст запроса, чтобы продолжить.');
      setSubmittedText('');
      setFormalizedStory(null);
      return;
    }

    try {
      setIsFormalizing(true);
      setError('');
      setSuccessMessage('');
      setSubmittedText(normalizedText);
      setStoryText('');
      setModelName('');
      const result = await formalizeCustomPrompt(normalizedText);
      setFormalizedStory(result);
      setSuccessMessage(
        'Пользовательский запрос формализован. Теперь можно запустить генерацию сказки.',
      );
    } catch (requestError) {
      setFormalizedStory(null);
      setError(
        requestError instanceof Error ? requestError.message : 'Не удалось формализовать запрос.',
      );
    } finally {
      setIsFormalizing(false);
    }
  };

  const handleGenerate = async () => {
    if (!formalizedStory) {
      setError('Сначала выполните формализацию запроса.');
      return;
    }

    try {
      setIsGenerating(true);
      setError('');
      setSuccessMessage('');
      const result = await generateStory(formalizedStory);
      setStoryText(result.story_text);
      setModelName(result.model);
      setSuccessMessage('Сказка успешно сгенерирована через backend.');
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Не удалось сгенерировать сказку.',
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const sourceContent = submittedText ? (
    <div className="workflow-stack">
      <div className="result-card">
        <p>{submittedText}</p>
      </div>

      <div className="action-row">
        <button
          className="secondary-button"
          disabled={!formalizedStory || isGenerating}
          type="button"
          onClick={handleGenerate}
        >
          {isGenerating ? 'Генерация...' : 'Сгенерировать сказку'}
        </button>
      </div>
    </div>
  ) : null;

  return (
    <PageLayout>
      <section className="page-header">
        <p className="page-header__eyebrow">Сценарий 2</p>
        <h1>Свой запрос</h1>
        <p>
          Введите свободный текст запроса. Система выполнит мягкую формализацию, а затем по кнопке
          отправит итоговый prompt на backend для генерации сказки.
        </p>
      </section>

      <section className="form-section">
        <form className="form-card" onSubmit={handleSubmit}>
          <label className="form-field" htmlFor="custom-prompt">
            <span>Текст запроса</span>
            <textarea
              id="custom-prompt"
              name="customPrompt"
              placeholder="Например: придумай добрую сказку про маленького ежика, который учится дружить."
              rows={8}
              value={promptText}
              onChange={(event) => setPromptText(event.target.value)}
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}
          {successMessage ? <div className="info-block info-block--success">{successMessage}</div> : null}

          <button className="primary-button" disabled={isFormalizing} type="submit">
            {isFormalizing ? 'Формализация...' : 'Сформировать запрос'}
          </button>
        </form>
      </section>

      <section className="result-panel">
        <StoryWorkflowResult
          formalizedStory={formalizedStory}
          modelName={modelName}
          sourceContent={sourceContent}
          sourcePlaceholder="После формализации здесь появится введенный вами текст."
          storyText={storyText}
        />
      </section>
    </PageLayout>
  );
}
