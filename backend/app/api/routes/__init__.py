from fastapi import APIRouter
from app.api.routes import health, gemini

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(gemini.router, prefix="/gemini", tags=["gemini"])
