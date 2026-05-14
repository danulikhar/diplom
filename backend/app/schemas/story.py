from typing import Any, Literal

from app.core.story_models import DEFAULT_STORY_MODEL, StoryModelId
from pydantic import BaseModel, Field


SourceType = Literal["template", "custom", "survey"]


class StoryTemplateFormalizationRequest(BaseModel):
    template_id: int = Field(..., ge=1)
    child_age: str | None = None


class CustomPromptFormalizationRequest(BaseModel):
    raw_prompt: str = Field(..., min_length=5, max_length=2000)


class SurveyFormalizationRequest(BaseModel):
    child_age: str | None = None
    main_character: str | None = None
    theme: str | None = None
    setting: str | None = None
    tone: str | None = None
    moral: str | None = None
    length: str | None = None


class FormalizedStoryRequest(BaseModel):
    source_type: SourceType
    raw_input: Any
    child_age: str
    main_character: str
    theme: str
    setting: str
    tone: str
    moral: str
    length: str
    final_prompt: str
    safety_requirements: list[str]
    template_id: int | None = None
    template_title: str | None = None


class GenerateStoryRequest(BaseModel):
    formalized_request: FormalizedStoryRequest
    model: StoryModelId = DEFAULT_STORY_MODEL
    temperature: int = Field(default=8, ge=1, le=10)


class GenerateStoryResponse(BaseModel):
    story_text: str
    model: StoryModelId
    formalized_request: FormalizedStoryRequest
