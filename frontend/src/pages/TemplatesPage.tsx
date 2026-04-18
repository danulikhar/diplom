import { useEffect, useState } from 'react';
import { StoryWorkflowResult } from '../components/StoryWorkflowResult';
import { PageLayout } from '../components/PageLayout';
import { TemplateCard } from '../components/TemplateCard';
import { formalizeTemplate, generateStory, getTemplates } from '../services/api';
import type { FormalizedStoryRequest } from '../types/story';
import type { StoryTemplate } from '../types/template';

export function TemplatesPage() {
  const [templates, setTemplates] = useState<StoryTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<StoryTemplate | null>(null);
  const [childAge, setChildAge] = useState('');
  const [formalizedStory, setFormalizedStory] = useState<FormalizedStoryRequest | null>(null);
  const [storyText, setStoryText] = useState('');
  const [modelName, setModelName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFormalizing, setIsFormalizing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [templatesError, setTemplatesError] = useState('');
  const [requestError, setRequestError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoading(true);
        setTemplatesError('');
        const data = await getTemplates();
        setTemplates(data);
      } catch {
        setTemplatesError('Не удалось открыть подборку сказок. Попробуйте обновить страницу чуть позже.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadTemplates();
  }, []);

  const handleSelectTemplate = (template: StoryTemplate) => {
    setSelectedTemplate(template);
    setFormalizedStory(null);
    setStoryText('');
    setModelName('');
    setRequestError('');
    setSuccessMessage('');
  };

  const handleFormalize = async () => {
    if (!selectedTemplate) {
      setRequestError('Сначала выберите основу, с которой начнется сказка.');
      return;
    }

    try {
      setIsFormalizing(true);
      setRequestError('');
      setSuccessMessage('');
      setStoryText('');
      setModelName('');
      const result = await formalizeTemplate(selectedTemplate.id, childAge);
      setFormalizedStory(result);
      setSuccessMessage('Основа сказки готова. Осталось только попросить историю ожить.');
    } catch (requestErrorValue) {
      setRequestError(
        requestErrorValue instanceof Error ? requestErrorValue.message : 'Не удалось подготовить основу сказки.',
      );
    } finally {
      setIsFormalizing(false);
    }
  };

  const handleGenerate = async () => {
    if (!formalizedStory) {
      setRequestError('Сначала подготовьте основу, а потом запускайте историю.');
      return;
    }

    try {
      setIsGenerating(true);
      setRequestError('');
      setSuccessMessage('');
      const result = await generateStory(formalizedStory);
      setStoryText(result.story_text);
      setModelName(result.model);
      setSuccessMessage('Сказка уже готова и ждет вас ниже.');
    } catch (requestErrorValue) {
      setRequestError(
        requestErrorValue instanceof Error ? requestErrorValue.message : 'Не удалось создать сказку. Попробуйте еще раз.',
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const sourceContent = selectedTemplate ? (
    <div className="workflow-stack">
      <div className="prompt-preview">
        <h3>{selectedTemplate.title}</h3>
        <p className="prompt-preview__description">{selectedTemplate.description}</p>
        <pre>{selectedTemplate.prompt_text}</pre>
      </div>

      <label className="form-field" htmlFor="template-child-age">
        <span>Для какого возраста подстроить сказку</span>
        <input
          id="template-child-age"
          name="templateChildAge"
          placeholder="Например: 5-7 лет"
          type="text"
          value={childAge}
          onChange={(event) => setChildAge(event.target.value)}
        />
      </label>

      <div className="action-row">
        <button className="primary-button" disabled={isFormalizing} type="button" onClick={handleFormalize}>
          {isFormalizing ? 'Готовим основу...' : 'Подготовить сказку'}
        </button>

        <button
          className="secondary-button"
          disabled={!formalizedStory || isGenerating}
          type="button"
          onClick={handleGenerate}
        >
          {isGenerating ? 'Плетем историю...' : 'Оживить сказку'}
        </button>
      </div>
    </div>
  ) : null;

  return (
    <PageLayout>
      <section className="page-header">
        <p className="page-header__eyebrow">Путь первый</p>
        <h1>Выберите сказочную заготовку</h1>
        <p>
          Здесь собраны готовые идеи для будущих историй. Выберите ту, что отзывается теплее
          всего, и превратите ее в настоящую сказку.
        </p>
      </section>

      {isLoading ? <div className="info-block">Открываем полку со сказками...</div> : null}
      {templatesError ? <div className="info-block info-block--error">{templatesError}</div> : null}
      {requestError ? <div className="info-block info-block--error">{requestError}</div> : null}
      {successMessage ? <div className="info-block info-block--success">{successMessage}</div> : null}

      {!isLoading && !templatesError ? (
        <section className="template-grid">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              isSelected={selectedTemplate?.id === template.id}
              onSelect={handleSelectTemplate}
              template={template}
            />
          ))}
        </section>
      ) : null}

      <section className="result-panel">
        <StoryWorkflowResult
          formalizedStory={formalizedStory}
          modelName={modelName}
          sourceContent={sourceContent}
          sourcePlaceholder="Выберите одну из заготовок, и здесь появится ее описание."
          storyText={storyText}
        />
      </section>
    </PageLayout>
  );
}
