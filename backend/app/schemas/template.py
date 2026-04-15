from pydantic import BaseModel


class StoryTemplateResponse(BaseModel):
    id: int
    title: str
    prompt: str
