from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/health", response_model=dict)
def health_check() -> dict:
    """
    Health check endpoint.
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION
    }
