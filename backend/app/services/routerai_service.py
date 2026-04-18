from app.core.config import settings
from app.schemas.story import FormalizedStoryRequest

SYSTEM_PROMPT = (
    "Ты пишешь только добрые детские сказки на русском языке. "
    "Избегай жестокости, ужаса и тревожных деталей. "
    "Соблюдай заданные параметры и заканчивай историю мягко и обнадеживающе."
)


def generate_story_text(formalized_request: FormalizedStoryRequest) -> str:
    try:
        from openai import OpenAI
    except ModuleNotFoundError as error:
        raise ValueError(
            "Пакет openai не установлен. Выполните pip install -r backend/requirements.txt."
        ) from error

    if not settings.routerai_api_key:
        raise ValueError(
            "Не задан ROUTERAI_API_KEY. Создайте backend/.env и добавьте параметры RouterAI."
        )

    client = OpenAI(
        api_key=settings.routerai_api_key,
        base_url=settings.routerai_base_url,
    )

    response = client.chat.completions.create(
        model=settings.routerai_model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": formalized_request.final_prompt},
        ],
        temperature=0.8,
    )

    content = response.choices[0].message.content if response.choices else None
    story_text = (content or "").strip()

    if not story_text:
        raise ValueError("Модель не вернула текст сказки.")

    return story_text
