import { ScenarioCard } from '../components/ScenarioCard';
import { apiConfig } from '../services/api';

const scenarios = [
  {
    title: 'Выбрать готовый запрос',
    description:
      'Пользователь сможет выбрать один из заранее подготовленных шаблонов для быстрой генерации сказки.',
  },
  {
    title: 'Ввести свой запрос',
    description:
      'Пользователь сможет самостоятельно описать тему, героев или настроение будущей сказки.',
  },
  {
    title: 'Пройти опрос',
    description:
      'Небольшой опрос поможет автоматически сформировать качественный запрос для генеративной модели.',
  },
];

export function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Дипломный проект</p>
          <h1>Формализация запросов к генеративным моделям</h1>
          <p className="hero__description">
            Веб-приложение помогает родителям и педагогам подготавливать запросы
            для генерации уникальных детских сказок: через шаблоны, собственный
            текст или интерактивный опрос.
          </p>
          <p className="hero__backend">
            Backend API будет подключаться по адресу:{' '}
            <code>{apiConfig.baseUrl}</code>
          </p>
        </div>
      </section>

      <section className="scenarios">
        <div className="section-heading">
          <h2>Будущие сценарии работы</h2>
          <p>
            На текущем этапе подготовлен стартовый интерфейс, который можно
            развивать дальше без изменения базовой архитектуры.
          </p>
        </div>

        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.title}
              title={scenario.title}
              description={scenario.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
