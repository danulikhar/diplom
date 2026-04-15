# Формализация запросов к генеративным моделям

Стартовый каркас дипломного веб-приложения для генерации детских сказок.

## Технологический стек

- Frontend: React + TypeScript + Vite
- Backend: FastAPI + Python
- Подготовка под PostgreSQL: добавлены заготовки конфигурации и слоя `db`

## Структура проекта

```text
.
|-- backend
|   |-- app
|   |   |-- core
|   |   |   `-- config.py
|   |   |-- db
|   |   |   `-- session.py
|   |   |-- routers
|   |   |   |-- health.py
|   |   |   `-- templates.py
|   |   |-- schemas
|   |   |   `-- template.py
|   |   |-- services
|   |   |   `-- template_service.py
|   |   `-- main.py
|   |-- main.py
|   `-- requirements.txt
|-- frontend
|   |-- public
|   |-- src
|   |   |-- components
|   |   |   `-- ScenarioCard.tsx
|   |   |-- pages
|   |   |   `-- HomePage.tsx
|   |   |-- services
|   |   |   `-- api.ts
|   |   |-- types
|   |   |   `-- template.ts
|   |   |-- App.tsx
|   |   |-- main.tsx
|   |   `-- styles.css
|   |-- index.html
|   |-- package.json
|   |-- tsconfig.json
|   |-- tsconfig.node.json
|   `-- vite.config.ts
`-- README.md
```

## Что уже реализовано

- Главная страница с названием проекта и кратким описанием
- Три пользовательских сценария в виде карточек
- Базовый сервисный слой на frontend для будущей работы с API
- FastAPI backend с тестовыми endpoint:
  - `GET /api/health`
  - `GET /api/templates`

## Как запустить frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен по адресу `http://localhost:5173`.

## Как запустить backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Backend будет доступен по адресу `http://localhost:8000`.

Swagger-документация FastAPI:

```text
http://localhost:8000/docs
```

## Текущее назначение структуры

- `frontend/src/components` — переиспользуемые UI-компоненты
- `frontend/src/pages` — страницы приложения
- `frontend/src/services` — работа с API и внешними источниками данных
- `frontend/src/types` — общие TypeScript-типы
- `backend/app/routers` — HTTP-роуты FastAPI
- `backend/app/schemas` — Pydantic-схемы запросов и ответов
- `backend/app/services` — бизнес-логика
- `backend/app/db` — будущий слой работы с PostgreSQL
- `backend/app/core` — конфигурация приложения

## Дальше можно развивать

- формы для трех сценариев генерации сказок
- интеграцию с PostgreSQL
- подключение генеративной модели
- хранение истории пользовательских сказок
