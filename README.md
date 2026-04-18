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
- Формализация запроса через шаблон, свободный ввод и опрос
- Генерация детской сказки через backend
- FastAPI backend с endpoint:
  - `GET /api/health`
  - `GET /api/templates`
  - `POST /api/formalization/template`
  - `POST /api/formalization/custom`
  - `POST /api/formalization/survey`
  - `POST /api/stories/generate`

## Как запустить frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен по адресу `http://localhost:5173`.

## Как запустить backend

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python main.py
```

Если виртуального окружения `.venv` еще нет, создайте его перед активацией:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
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

- интеграцию с PostgreSQL
- хранение истории пользовательских сказок
- аутентификацию пользователей
- сохранение и просмотр ранее сгенерированных сказок
