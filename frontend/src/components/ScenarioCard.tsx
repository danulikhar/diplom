type ScenarioCardProps = {
  title: string;
  description: string;
};

export function ScenarioCard({ title, description }: ScenarioCardProps) {
  return (
    <article className="scenario-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button" className="scenario-card__button">
        Скоро будет доступно
      </button>
    </article>
  );
}
