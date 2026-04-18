from app.schemas.template import StoryTemplateResponse


def get_story_templates() -> list[StoryTemplateResponse]:
    return [
        StoryTemplateResponse(
            id=1,
            title="Сказка про доброго лесного помощника",
            description="Шаблон для истории о герое, который помогает друзьям и учит заботе о других.",
            prompt_text="Напиши добрую детскую сказку о лесном герое, который помогает друзьям решать проблемы и показывает пример взаимопомощи.",
        ),
        StoryTemplateResponse(
            id=2,
            title="Сказка перед сном про смелость",
            description="Спокойный шаблон для вечерней сказки, где герой постепенно учится быть смелым.",
            prompt_text="Создай спокойную сказку перед сном для ребенка о том, как герой преодолевает страх, становится смелее и чувствует поддержку близких.",
        ),
        StoryTemplateResponse(
            id=3,
            title="Сказка о дружбе и взаимопомощи",
            description="Универсальный шаблон для истории о дружбе, поддержке и счастливом финале.",
            prompt_text="Напиши детскую сказку о дружбе, взаимопомощи и преодолении трудностей вместе, чтобы история завершалась теплым и счастливым финалом.",
        ),
    ]


def get_story_template_by_id(template_id: int) -> StoryTemplateResponse | None:
    for template in get_story_templates():
        if template.id == template_id:
            return template

    return None
