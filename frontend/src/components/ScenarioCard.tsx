import { Link } from 'react-router-dom';

type ScenarioCardProps = {
  title: string;
  description: string;
  to: string;
  buttonLabel: string;
};

export function ScenarioCard({ title, description, to, buttonLabel }: ScenarioCardProps) {
  return (
    <article className="scenario-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className="scenario-card__button" to={to}>
        {buttonLabel}
      </Link>
    </article>
  );
}
