
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

### Настройка LLM

По умолчанию генерация сказок работает через RouterAI. Для этого создайте файл `backend/.env`:

```env
ROUTERAI_API_KEY=your-routerai-api-key
ROUTERAI_BASE_URL=https://routerai.ru/api/v1
```

Также приложение поддерживает локальную LLM через OpenAI-compatible API. Например, можно запустить `llama.cpp` с моделью `t-tech/T-lite-it-2.1-GGUF`, а затем выбрать в интерфейсе модель `T-lite-it 2.1 local`.

Рекомендуемое место для файла модели:

```text
D:\llm-models\t-lite-it-2.1\T-lite-it-2.1-Q4_K_M.gguf
```

Модель лучше хранить вне папки проекта, потому что GGUF-файл весит несколько гигабайт и не должен попадать в git.

Пример запуска сервера `llama.cpp`, если `llama-server` установлен через `winget`:

```bash
llama-server \
  -m D:\llm-models\t-lite-it-2.1\T-lite-it-2.1-Q4_K_M.gguf \
  --alias T-lite-it-2.1 \
  --jinja \
  --host 127.0.0.1 \
  --port 8080 \
  -c 4096 \
  -ngl 0 \
  --device none \
  --no-op-offload
```

Для Windows PowerShell:

```powershell
llama-server `
  -m D:\llm-models\t-lite-it-2.1\T-lite-it-2.1-Q4_K_M.gguf `
  --alias T-lite-it-2.1 `
  --jinja `
  --host 127.0.0.1 `
  --port 8080 `
  -c 4096 `
  -ngl 0 `
  --device none `
  --no-op-offload
```

Если `llama.cpp` скачан архивом, укажите полный путь к `llama-server.exe`, например:

```powershell
D:\llama.cpp\llama-server.exe `
  -m D:\llm-models\t-lite-it-2.1\T-lite-it-2.1-Q4_K_M.gguf `
  --alias T-lite-it-2.1 `
  --jinja `
  --host 127.0.0.1 `
  --port 8080 `
  -c 4096 `
  -ngl 0 `
  --device none `
  --no-op-offload
```

Если локальный сервер запущен не на `http://127.0.0.1:8080/v1` или используется другой alias модели, добавьте в `backend/.env`:

```env
LOCAL_LLM_API_KEY=local
LOCAL_LLM_BASE_URL=http://127.0.0.1:8080/v1
LOCAL_LLM_MODEL=T-lite-it-2.1
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

