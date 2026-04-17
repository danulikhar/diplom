from pydantic import BaseModel


class StoryTemplateResponse(BaseModel):
    id: int
    title: str
    description: str
    prompt_text: str
