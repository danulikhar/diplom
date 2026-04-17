import type { FormEvent } from 'react';
import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';

export function CustomPromptPage() {
  const [promptText, setPromptText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedText = promptText.trim();

    if (!normalizedText) {
      setError('Введите текст запроса, чтобы продолжить.');
      setSubmittedText('');
      return;
    }

    setError('');
    setSubmittedText(normalizedText);
  };

  return (
    <PageLayout>
      <section className="page-header">
        <p className="page-header__eyebrow">Сценарий 2</p>
        <h1>Свой запрос</h1>
        <p>
          Введите свободный текст запроса. Позже сюда можно будет подключить backend для
          формализации и генерации сказки.
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

          <button className="primary-button" type="submit">
            Отправить запрос
          </button>
        </form>
      </section>

      <section className="result-panel">
        <div className="result-panel__header">
          <h2>Ваш запрос</h2>
          <p>Пока здесь отображается локальный результат, без отправки данных на backend.</p>
        </div>

        {submittedText ? (
          <div className="result-card">
            <p>{submittedText}</p>
          </div>
        ) : (
          <div className="placeholder-card">После отправки здесь появится введенный вами текст.</div>
        )}
      </section>
    </PageLayout>
  );
}
