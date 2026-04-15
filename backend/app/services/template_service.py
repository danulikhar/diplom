from app.schemas.template import StoryTemplateResponse


def get_story_templates() -> list[StoryTemplateResponse]:
    return [
        StoryTemplateResponse(
            id=1,
            title="Сказка про доброго лесного помощника",
            prompt="Напиши добрую детскую сказку о лесном герое, который помогает друзьям решать проблемы.",
        ),
        StoryTemplateResponse(
            id=2,
            title="Сказка перед сном про смелость",
            prompt="Создай спокойную сказку перед сном для ребенка о том, как герой учится быть смелым.",
        ),
        StoryTemplateResponse(
            id=3,
            title="Сказка о дружбе и взаимопомощи",
            prompt="Напиши детскую сказку о дружбе, взаимопомощи и счастливом финале.",
        ),
    ]
