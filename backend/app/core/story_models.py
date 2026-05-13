from typing import Literal


StoryModelId = Literal[
    "google/gemma-4-26b-a4b-it",
    "yandex/gpt-pro-5.1",
    "qwen/qwen3.6-flash",
]

DEFAULT_STORY_MODEL: StoryModelId = "google/gemma-4-26b-a4b-it"
AVAILABLE_STORY_MODELS: tuple[StoryModelId, ...] = (
    DEFAULT_STORY_MODEL,
    "yandex/gpt-pro-5.1",
    "qwen/qwen3.6-flash",
)
