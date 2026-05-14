import { StoryModelSelect } from './StoryModelSelect';
import type { StoryModelId } from '../types/story';

type GenerationSettingsProps = {
  model: StoryModelId;
  temperature: number;
  disabled?: boolean;
  onModelChange: (value: StoryModelId) => void;
  onTemperatureChange: (value: number) => void;
};

export function GenerationSettings({
  model,
  temperature,
  disabled = false,
  onModelChange,
  onTemperatureChange,
}: GenerationSettingsProps) {
  return (
    <div className="generation-settings">
      <StoryModelSelect disabled={disabled} value={model} onChange={onModelChange} />

      <label className="form-field temperature-control" htmlFor="story-temperature">
        <span>Свобода фантазии: {temperature}</span>
        <input
          disabled={disabled}
          id="story-temperature"
          max="10"
          min="1"
          name="storyTemperature"
          step="1"
          type="range"
          value={temperature}
          onChange={(event) => onTemperatureChange(Number(event.target.value))}
        />
      </label>
    </div>
  );
}
