from pathlib import Path

from app.core.story_models import DEFAULT_STORY_MODEL
from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Fairy Tale Generator API"
    api_prefix: str = "/api"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/fairy_tales"
    routerai_api_key: str = ""
    routerai_base_url: str = "https://routerai.ru/api/v1"
    routerai_model: str = DEFAULT_STORY_MODEL


settings = Settings()
