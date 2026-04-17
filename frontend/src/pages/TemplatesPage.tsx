import { useEffect, useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { TemplateCard } from '../components/TemplateCard';
import { getTemplates } from '../services/api';
import type { StoryTemplate } from '../types/template';

export function TemplatesPage() {
  const [templates, setTemplates] = useState<StoryTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<StoryTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await getTemplates();
        setTemplates(data);
      } catch {
        setError('Не удалось загрузить шаблоны. Проверьте запуск backend и попробуйте снова.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadTemplates();
  }, []);

  return (
    <PageLayout>
      <section className="page-header">
        <p className="page-header__eyebrow">Сценарий 1</p>
        <h1>Готовые запросы</h1>
        <p>
          Здесь собраны шаблоны, которые можно использовать как основу для генерации детской
          сказки. На этом этапе шаблон можно выбрать и просмотреть его текст.
        </p>
      </section>

      {isLoading ? <div className="info-block">Загрузка шаблонов...</div> : null}
      {error ? <div className="info-block info-block--error">{error}</div> : null}

      {!isLoading && !error ? (
        <section className="template-grid">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              isSelected={selectedTemplate?.id === template.id}
              onSelect={setSelectedTemplate}
              template={template}
            />
          ))}
        </section>
      ) : null}

      <section className="result-panel">
        <div className="result-panel__header">
          <h2>Выбранный шаблон</h2>
          <p>
            Этот блок подготовлен для следующего этапа, когда на основе шаблона будет запускаться
            генерация.
          </p>
        </div>

        {selectedTemplate ? (
          <div className="prompt-preview">
            <h3>{selectedTemplate.title}</h3>
            <p className="prompt-preview__description">{selectedTemplate.description}</p>
            <pre>{selectedTemplate.prompt_text}</pre>
          </div>
        ) : (
          <div className="placeholder-card">
            Выберите один из шаблонов, чтобы увидеть текст подготовленного запроса.
          </div>
        )}
      </section>
    </PageLayout>
  );
}
