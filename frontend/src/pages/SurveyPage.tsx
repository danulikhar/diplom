import type { FormEvent } from 'react';
import { useState } from 'react';
import { StoryWorkflowResult } from '../components/StoryWorkflowResult';
import { PageLayout } from '../components/PageLayout';
import { formalizeSurvey, generateStory } from '../services/api';
import type { FormalizedStoryRequest } from '../types/story';
import type { SurveyFormData } from '../types/survey';

const initialSurveyData: SurveyFormData = {
  childAge: '',
  mainCharacter: '',
  storyTheme: '',
  storyPlace: '',
  storyMood: '',
  hasMoral: 'Да',
  storyLength: 'Средняя',
};

const surveyFieldLabels: Record<keyof SurveyFormData, string> = {
  childAge: 'Возраст ребенка',
  mainCharacter: 'Главный герой',
  storyTheme: 'Тема сказки',
  storyPlace: 'Место действия',
  storyMood: 'Настроение сказки',
  hasMoral: 'Нужна ли мораль',
  storyLength: 'Длина сказки',
};

export function SurveyPage() {
  const [formData, setFormData] = useState<SurveyFormData>(initialSurveyData);
  const [submittedData, setSubmittedData] = useState<SurveyFormData | null>(null);
  const [formalizedStory, setFormalizedStory] = useState<FormalizedStoryRequest | null>(null);
  const [storyText, setStoryText] = useState('');
  const [modelName, setModelName] = useState('');
  const [isFormalizing, setIsFormalizing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsFormalizing(true);
      setError('');
      setSuccessMessage('');
      setStoryText('');
      setModelName('');
      setSubmittedData({ ...formData });
      const result = await formalizeSurvey({
        child_age: formData.childAge,
        main_character: formData.mainCharacter,
        theme: formData.storyTheme,
        setting: formData.storyPlace,
        tone: formData.storyMood,
        moral: formData.hasMoral,
        length: formData.storyLength,
      });
      setFormalizedStory(result);
      setSuccessMessage('Результаты опроса формализованы. Теперь можно запустить генерацию сказки.');
    } catch (requestError) {
      setFormalizedStory(null);
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Не удалось формализовать результаты опроса.',
      );
    } finally {
      setIsFormalizing(false);
    }
  };

  const handleChange = (field: keyof SurveyFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleGenerate = async () => {
    if (!formalizedStory) {
      setError('Сначала выполните формализацию результатов опроса.');
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

  const sourceContent = submittedData ? (
    <div className="workflow-stack">
      <div className="survey-result">
        {(Object.keys(submittedData) as Array<keyof SurveyFormData>).map((field) => (
          <div className="survey-result__item" key={field}>
            <span>{surveyFieldLabels[field]}</span>
            <strong>{submittedData[field] || 'Не указано'}</strong>
          </div>
        ))}
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
        <p className="page-header__eyebrow">Сценарий 3</p>
        <h1>Опрос для подготовки запроса</h1>
        <p>
          Форма собирает ключевые параметры будущей сказки. После отправки данные переходят в единый
          формализованный prompt и могут быть использованы для генерации через backend.
        </p>
      </section>

      <section className="form-section">
        <form className="form-card form-card--grid" onSubmit={handleSubmit}>
          <label className="form-field" htmlFor="childAge">
            <span>Возраст ребенка</span>
            <input
              id="childAge"
              name="childAge"
              placeholder="Например: 6 лет"
              type="text"
              value={formData.childAge}
              onChange={(event) => handleChange('childAge', event.target.value)}
            />
          </label>

          <label className="form-field" htmlFor="mainCharacter">
            <span>Главный герой</span>
            <input
              id="mainCharacter"
              name="mainCharacter"
              placeholder="Например: маленькая лиса"
              type="text"
              value={formData.mainCharacter}
              onChange={(event) => handleChange('mainCharacter', event.target.value)}
            />
          </label>

          <label className="form-field" htmlFor="storyTheme">
            <span>Тема сказки</span>
            <input
              id="storyTheme"
              name="storyTheme"
              placeholder="Например: дружба и смелость"
              type="text"
              value={formData.storyTheme}
              onChange={(event) => handleChange('storyTheme', event.target.value)}
            />
          </label>

          <label className="form-field" htmlFor="storyPlace">
            <span>Место действия</span>
            <input
              id="storyPlace"
              name="storyPlace"
              placeholder="Например: волшебный лес"
              type="text"
              value={formData.storyPlace}
              onChange={(event) => handleChange('storyPlace', event.target.value)}
            />
          </label>

          <label className="form-field" htmlFor="storyMood">
            <span>Настроение сказки</span>
            <input
              id="storyMood"
              name="storyMood"
              placeholder="Например: доброе и спокойное"
              type="text"
              value={formData.storyMood}
              onChange={(event) => handleChange('storyMood', event.target.value)}
            />
          </label>

          <label className="form-field" htmlFor="hasMoral">
            <span>Нужна ли мораль</span>
            <select
              id="hasMoral"
              name="hasMoral"
              value={formData.hasMoral}
              onChange={(event) => handleChange('hasMoral', event.target.value)}
            >
              <option value="Да">Да</option>
              <option value="Нет">Нет</option>
            </select>
          </label>

          <label className="form-field" htmlFor="storyLength">
            <span>Длина сказки</span>
            <select
              id="storyLength"
              name="storyLength"
              value={formData.storyLength}
              onChange={(event) => handleChange('storyLength', event.target.value)}
            >
              <option value="Короткая">Короткая</option>
              <option value="Средняя">Средняя</option>
              <option value="Длинная">Длинная</option>
            </select>
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
          sourcePlaceholder="После отправки формы здесь появятся структурированные ответы пользователя."
          storyText={storyText}
        />
      </section>
    </PageLayout>
  );
}
