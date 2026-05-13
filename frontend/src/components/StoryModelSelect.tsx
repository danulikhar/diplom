import { storyModels } from '../constants/storyModels';
import type { StoryModelId } from '../types/story';

type StoryModelSelectProps = {
  value: StoryModelId;
  disabled?: boolean;
  onChange: (value: StoryModelId) => void;
};

export function StoryModelSelect({ value, disabled = false, onChange }: StoryModelSelectProps) {
  return (
    <label className="form-field story-model-select" htmlFor="story-model">
      <span>Модель генерации</span>
      <select
        disabled={disabled}
        id="story-model"
        name="storyModel"
        value={value}
        onChange={(event) => onChange(event.target.value as StoryModelId)}
      >
        {storyModels.map((model) => (
          <option key={model.id} value={model.id}>
            {model.label}
          </option>
        ))}
      </select>
    </label>
  );
}
