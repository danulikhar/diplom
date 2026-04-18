import type { StoryTemplate } from '../types/template';

type TemplateCardProps = {
  template: StoryTemplate;
  isSelected: boolean;
  onSelect: (template: StoryTemplate) => void;
};

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <article className={`template-card${isSelected ? ' template-card--selected' : ''}`}>
      <div className="template-card__content">
        <h3>{template.title}</h3>
        <p>{template.description}</p>
      </div>

      <button className="template-card__button" type="button" onClick={() => onSelect(template)}>
        {isSelected ? 'Выбрано' : 'Выбрать'}
      </button>
    </article>
  );
}
