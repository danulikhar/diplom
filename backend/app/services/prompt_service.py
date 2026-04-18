import re

from fastapi import HTTPException

from app.schemas.story import (
    CustomPromptFormalizationRequest,
    FormalizedStoryRequest,
    SurveyFormalizationRequest,
    StoryTemplateFormalizationRequest,
)
from app.services.template_service import get_story_template_by_id

SAFETY_REQUIREMENTS = [
    "Сказка должна быть доброй, безопасной и подходящей для детской аудитории.",
    "Нельзя добавлять жестокие, пугающие или травмирующие сцены.",
    "Язык должен быть простым, понятным и доброжелательным.",
    "Финал должен быть мягким, логичным и успокаивающим.",
]

DEFAULTS = {
    "child_age": "6-8 лет",
    "main_character": "любознательный маленький герой",
    "theme": "дружба, взаимопомощь и доброта",
    "setting": "уютный волшебный лес",
    "tone": "добрый, теплый и спокойный",
    "moral": "важно заботиться о других и не бояться просить помощи",
    "length": "средняя",
}

AGE_PATTERN = re.compile(r"(\d{1,2}\s*(?:лет|года|год))", re.IGNORECASE)

LENGTH_HINTS = {
    "корот": "короткая",
    "небольш": "короткая",
    "средн": "средняя",
    "длин": "длинная",
}

TONE_HINTS = {
    "спокой": "спокойный и уютный",
    "весел": "веселый и доброжелательный",
    "добр": "добрый и теплый",
    "смеш": "легкий и смешной",
}


def _clean_text(value: str | None, fallback: str) -> str:
    normalized = (value or "").strip()
    return normalized or fallback


def _normalize_length(value: str | None) -> str:
    normalized = (value or "").strip().lower()
    if not normalized:
        return DEFAULTS["length"]

    for key, mapped in LENGTH_HINTS.items():
        if key in normalized:
            return mapped

    return normalized


def _normalize_moral(value: str | None) -> str:
    normalized = (value or "").strip()
    if not normalized:
        return DEFAULTS["moral"]

    if normalized.lower() in {"нет", "не нужна", "без морали"}:
        return "мораль не нужно выделять отдельно, но финал должен оставаться теплым и добрым"

    if normalized.lower() in {"да", "нужна"}:
        return DEFAULTS["moral"]

    return normalized


def _infer_age(raw_prompt: str) -> str:
    match = AGE_PATTERN.search(raw_prompt)
    if match:
        return match.group(1)
    return DEFAULTS["child_age"]


def _infer_length(raw_prompt: str) -> str:
    lowered = raw_prompt.lower()
    for key, mapped in LENGTH_HINTS.items():
        if key in lowered:
            return mapped
    return DEFAULTS["length"]


def _infer_tone(raw_prompt: str) -> str:
    lowered = raw_prompt.lower()
    for key, mapped in TONE_HINTS.items():
        if key in lowered:
            return mapped
    return DEFAULTS["tone"]


def _build_final_prompt(formalized: FormalizedStoryRequest) -> str:
    safety_block = "\n".join(f"- {item}" for item in formalized.safety_requirements)

    return (
        "Сформируй детскую сказку на русском языке.\n"
        f"Возраст ребенка: {formalized.child_age}.\n"
        f"Главный герой: {formalized.main_character}.\n"
        f"Тема: {formalized.theme}.\n"
        f"Место действия: {formalized.setting}.\n"
        f"Тон: {formalized.tone}.\n"
        f"Мораль: {formalized.moral}.\n"
        f"Желаемая длина: {formalized.length}.\n"
        "Требования к истории:\n"
        f"{safety_block}\n"
        "Структура сказки: завязка, развитие, мягкая кульминация, счастливый финал.\n"
        "Используй образный, но простой язык и адаптируй лексику под возраст ребенка."
    )


def formalize_template_request(
    payload: StoryTemplateFormalizationRequest,
) -> FormalizedStoryRequest:
    template = get_story_template_by_id(payload.template_id)
    if template is None:
        raise HTTPException(status_code=404, detail="Шаблон не найден.")

    formalized = FormalizedStoryRequest(
        source_type="template",
        raw_input={
            "template_id": template.id,
            "title": template.title,
            "description": template.description,
            "prompt_text": template.prompt_text,
        },
        child_age=_clean_text(payload.child_age, DEFAULTS["child_age"]),
        main_character="герой из выбранного шаблона",
        theme=template.title.lower(),
        setting=DEFAULTS["setting"],
        tone="добрый и поддерживающий",
        moral=DEFAULTS["moral"],
        length=DEFAULTS["length"],
        final_prompt="",
        safety_requirements=SAFETY_REQUIREMENTS,
        template_id=template.id,
        template_title=template.title,
    )
    formalized.final_prompt = (
        f"{_build_final_prompt(formalized)}\n"
        f"Основа выбранного шаблона: {template.prompt_text}"
    )
    return formalized


def formalize_custom_prompt(
    payload: CustomPromptFormalizationRequest,
) -> FormalizedStoryRequest:
    normalized_prompt = payload.raw_prompt.strip()

    formalized = FormalizedStoryRequest(
        source_type="custom",
        raw_input=normalized_prompt,
        child_age=_infer_age(normalized_prompt),
        main_character="герой, описанный пользователем",
        theme="сюжет по пользовательскому запросу с акцентом на добрую детскую сказку",
        setting=DEFAULTS["setting"],
        tone=_infer_tone(normalized_prompt),
        moral=DEFAULTS["moral"],
        length=_infer_length(normalized_prompt),
        final_prompt="",
        safety_requirements=SAFETY_REQUIREMENTS,
    )
    formalized.final_prompt = (
        f"{_build_final_prompt(formalized)}\n"
        "Сохрани основной смысл пользовательского запроса, но не копируй его дословно.\n"
        f"Исходный запрос пользователя: {normalized_prompt}"
    )
    return formalized


def formalize_survey_request(payload: SurveyFormalizationRequest) -> FormalizedStoryRequest:
    formalized = FormalizedStoryRequest(
        source_type="survey",
        raw_input=payload.model_dump(),
        child_age=_clean_text(payload.child_age, DEFAULTS["child_age"]),
        main_character=_clean_text(payload.main_character, DEFAULTS["main_character"]),
        theme=_clean_text(payload.theme, DEFAULTS["theme"]),
        setting=_clean_text(payload.setting, DEFAULTS["setting"]),
        tone=_clean_text(payload.tone, DEFAULTS["tone"]),
        moral=_normalize_moral(payload.moral),
        length=_normalize_length(payload.length),
        final_prompt="",
        safety_requirements=SAFETY_REQUIREMENTS,
    )
    formalized.final_prompt = _build_final_prompt(formalized)
    return formalized
