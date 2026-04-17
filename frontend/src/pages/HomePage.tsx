import { PageLayout } from '../components/PageLayout';
import { ScenarioCard } from '../components/ScenarioCard';
import { apiConfig } from '../services/api';

const scenarios = [
  {
    title: 'Выбрать готовый запрос',
    description:
      'Выберите один из подготовленных шаблонов запроса и посмотрите, как будет выглядеть основа для генерации сказки.',
    to: '/templates',
    buttonLabel: 'Открыть шаблоны',
  },
  {
    title: 'Ввести свой запрос',
    description:
      'Опишите будущую сказку своими словами и проверьте, как приложение принимает и отображает пользовательский запрос.',
    to: '/custom-prompt',
    buttonLabel: 'Перейти к форме',
  },
  {
    title: 'Пройти опрос',
    description:
      'Заполните параметры будущей сказки, чтобы подготовить структурированные данные для следующего этапа формализации.',
    to: '/survey',
    buttonLabel: 'Открыть опрос',
  },
];

export function HomePage() {
  return (
    <PageLayout>
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Дипломный проект</p>
          <h1>Формализация запросов к генеративным моделям</h1>
          <p className="hero__description">
            Веб-приложение помогает формировать понятные и полные запросы для генерации детских
            сказок. Пользователь может выбрать готовый шаблон, ввести собственный запрос или
            заполнить опрос, который подготовит структуру для будущей автоматической формализации.
          </p>
          <p className="hero__backend">
            Backend API доступен по адресу: <code>{apiConfig.baseUrl}</code>
          </p>
        </div>
      </section>

      <section className="scenarios">
        <div className="section-heading">
          <h2>Сценарии работы</h2>
          <p>
            На этом этапе приложение уже поддерживает навигацию между тремя пользовательскими
            сценариями и готово к следующему шагу: подключению логики генерации.
          </p>
        </div>

        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.title}
              title={scenario.title}
              description={scenario.description}
              to={scenario.to}
              buttonLabel={scenario.buttonLabel}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
