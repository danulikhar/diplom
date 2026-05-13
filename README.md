
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

## frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://localhost:5173`.

## backend

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python main.py
```

Если виртуального окружения `.venv` еще нет

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python main.py
```

Backend `http://localhost:8000`.

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

