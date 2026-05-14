from app.core.config import settings
from app.core.story_models import StoryModelId
from app.schemas.story import FormalizedStoryRequest

SYSTEM_PROMPT = (
    "Ты пишешь только добрые детские сказки на русском языке. "
    "Избегай жестокости, ужаса и тревожных деталей. "
    "Соблюдай заданные параметры и заканчивай историю мягко и обнадеживающе."
)


LOCAL_STORY_MODELS: set[StoryModelId] = {"local/t-lite-it-2.1"}


def get_openai_client_config(model: StoryModelId) -> tuple[str, str, str]:
    if model in LOCAL_STORY_MODELS:
        return (
            settings.local_llm_api_key,
            settings.local_llm_base_url,
            settings.local_llm_model,
        )

    if not settings.routerai_api_key:
        raise ValueError(
            "Не задан ROUTERAI_API_KEY. Создайте backend/.env и добавьте параметры RouterAI."
        )

    return settings.routerai_api_key, settings.routerai_base_url, model


def generate_story_text(
    formalized_request: FormalizedStoryRequest,
    model: StoryModelId,
    temperature: int = 8,
) -> str:
    try:
        from openai import OpenAI
    except ModuleNotFoundError as error:
        raise ValueError(
            "Пакет openai не установлен. Выполните pip install -r backend/requirements.txt."
        ) from error

    api_key, base_url, provider_model = get_openai_client_config(model)

    client = OpenAI(
        api_key=api_key,
        base_url=base_url,
    )

    response = client.chat.completions.create(
        model=provider_model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": formalized_request.final_prompt},
        ],
        temperature=temperature / 10,
    )

    content = response.choices[0].message.content if response.choices else None
    story_text = (content or "").strip()

    if not story_text:
        raise ValueError("Модель не вернула текст сказки.")

    return story_text
