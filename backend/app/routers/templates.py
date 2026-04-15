from fastapi import APIRouter

from app.schemas.template import StoryTemplateResponse
from app.services.template_service import get_story_templates

router = APIRouter()


@router.get("/templates", response_model=list[StoryTemplateResponse])
def get_templates() -> list[StoryTemplateResponse]:
    return get_story_templates()
