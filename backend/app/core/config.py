from pydantic import BaseModel


class Settings(BaseModel):
    app_name: str = "Fairy Tale Generator API"
    api_prefix: str = "/api"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/fairy_tales"


settings = Settings()
