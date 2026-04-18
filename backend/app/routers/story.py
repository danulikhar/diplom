from fastapi import APIRouter, HTTPException

from app.core.config import settings
from app.schemas.story import (
    CustomPromptFormalizationRequest,
    FormalizedStoryRequest,
    GenerateStoryRequest,
    GenerateStoryResponse,
    SurveyFormalizationRequest,
    StoryTemplateFormalizationRequest,
)
from app.services.prompt_service import (
    formalize_custom_prompt,
    formalize_survey_request,
    formalize_template_request,
)
from app.services.routerai_service import generate_story_text

router = APIRouter()


@router.post("/formalization/template", response_model=FormalizedStoryRequest)
def formalize_template(payload: StoryTemplateFormalizationRequest) -> FormalizedStoryRequest:
    return formalize_template_request(payload)


@router.post("/formalization/custom", response_model=FormalizedStoryRequest)
def formalize_custom(payload: CustomPromptFormalizationRequest) -> FormalizedStoryRequest:
    return formalize_custom_prompt(payload)


@router.post("/formalization/survey", response_model=FormalizedStoryRequest)
def formalize_survey(payload: SurveyFormalizationRequest) -> FormalizedStoryRequest:
    return formalize_survey_request(payload)


@router.post("/stories/generate", response_model=GenerateStoryResponse)
def generate_story(payload: GenerateStoryRequest) -> GenerateStoryResponse:
    try:
        story_text = generate_story_text(payload.formalized_request)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(
            status_code=502,
            detail="Не удалось получить ответ от RouterAI. Проверьте настройки и повторите попытку.",
        ) from error

    return GenerateStoryResponse(
        story_text=story_text,
        model=settings.routerai_model,
        formalized_request=payload.formalized_request,
    )
