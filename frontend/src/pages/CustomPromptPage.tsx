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
      setError('Напишите пару строк о будущей сказке, чтобы мы могли начать.');
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
      setSuccessMessage('Ваша задумка уже превратилась в основу сказки. Можно звать историю.');
    } catch (requestError) {
      setFormalizedStory(null);
      setError(
        requestError instanceof Error ? requestError.message : 'Не удалось подготовить вашу задумку.',
      );
    } finally {
      setIsFormalizing(false);
    }
  };

  const handleGenerate = async () => {
    if (!formalizedStory) {
      setError('Сначала сохраните задумку, чтобы история получила направление.');
      return;
    }

    try {
      setIsGenerating(true);
      setError('');
      setSuccessMessage('');
      const result = await generateStory(formalizedStory);
      setStoryText(result.story_text);
      setModelName(result.model);
      setSuccessMessage('Сказка готова. Ниже уже можно читать.');
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Не удалось создать сказку. Попробуйте еще раз.',
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
          {isGenerating ? 'Плетем историю...' : 'Оживить сказку'}
        </button>
      </div>
    </div>
  ) : null;

  return (
    <PageLayout>
      <section className="page-header">
        <p className="page-header__eyebrow">Путь второй</p>
        <h1>Расскажите сказку своими словами</h1>
        <p>
          Просто опишите настроение, героя или целое приключение. Даже короткая мысль может стать
          началом теплой истории.
        </p>
      </section>

      <section className="form-section">
        <form className="form-card" onSubmit={handleSubmit}>
          <label className="form-field" htmlFor="custom-prompt">
            <span>О чем будет ваша сказка</span>
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
            {isFormalizing ? 'Слушаем и собираем...' : 'Сохранить задумку'}
          </button>
        </form>
      </section>

      <section className="result-panel">
        <StoryWorkflowResult
          formalizedStory={formalizedStory}
          modelName={modelName}
          sourceContent={sourceContent}
          sourcePlaceholder="Когда вы поделитесь своей идеей, здесь появится ее текст."
          storyText={storyText}
        />
      </section>
    </PageLayout>
  );
}
