from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, templates

app = FastAPI(
    title="Fairy Tale Generator API",
    description="Backend for the diploma project about formalizing prompts for story generation.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(templates.router, prefix="/api", tags=["templates"])
