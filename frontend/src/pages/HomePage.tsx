import { PageLayout } from '../components/PageLayout';
import { ScenarioCard } from '../components/ScenarioCard';

const scenarios = [
  {
    title: 'Выбрать заготовку сказки',
    description:
      'Откройте готовые идеи и найдите ту, с которой хочется начать маленькое волшебное приключение.',
    to: '/templates',
    buttonLabel: 'Смотреть варианты',
  },
  {
    title: 'Рассказать свою задумку',
    description:
      'Опишите сказку своими словами, а мы бережно превратим вашу мысль в основу для доброй истории.',
    to: '/custom-prompt',
    buttonLabel: 'Написать идею',
  },
  {
    title: 'Собрать сказку по шагам',
    description:
      'Ответьте на несколько теплых вопросов о герое, настроении и мире, в котором оживет сказка.',
    to: '/survey',
    buttonLabel: 'Начать опрос',
  },
];

export function HomePage() {
  return (
    <PageLayout>
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Мастерская сказок</p>
          <h1>Место, где рождаются добрые истории перед сном</h1>
          <p className="hero__description">
            Здесь можно выбрать готовую основу, поделиться собственной задумкой или шаг за шагом
            собрать будущую сказку. Все устроено так, чтобы путь от идеи до истории был легким,
            уютным и немного волшебным.
          </p>
        </div>
      </section>

      <section className="scenarios">
        <div className="section-heading">
          <h2>Как начать путешествие</h2>
          <p>
            Выберите тот путь, который сейчас ближе: взять готовую идею, написать свою или
            собрать сказку из деталей, как будто нанизывая звезды на нить.
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
