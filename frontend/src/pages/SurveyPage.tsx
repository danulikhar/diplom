import type { FormEvent } from 'react';
import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedData({ ...formData });
  };

  const handleChange = (field: keyof SurveyFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <PageLayout>
      <section className="page-header">
        <p className="page-header__eyebrow">Сценарий 3</p>
        <h1>Опрос для подготовки запроса</h1>
        <p>
          Форма собирает ключевые параметры будущей сказки. Эти данные можно будет использовать для
          автоматической сборки формализованного промпта на следующем этапе.
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

          <button className="primary-button" type="submit">
            Сформировать результат опроса
          </button>
        </form>
      </section>

      <section className="result-panel">
        <div className="result-panel__header">
          <h2>Результат опроса</h2>
          <p>
            Ниже показаны структурированные данные, которые можно будет преобразовать в формальный
            запрос.
          </p>
        </div>

        {submittedData ? (
          <div className="survey-result">
            {(Object.keys(submittedData) as Array<keyof SurveyFormData>).map((field) => (
              <div className="survey-result__item" key={field}>
                <span>{surveyFieldLabels[field]}</span>
                <strong>{submittedData[field] || 'Не указано'}</strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="placeholder-card">
            После отправки формы здесь появится структурированный результат.
          </div>
        )}
      </section>
    </PageLayout>
  );
}
