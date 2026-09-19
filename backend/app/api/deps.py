from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from app.core.config import settings
import httpx

security = HTTPBearer()

def get_supabase_client() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise HTTPException(status_code=500, detail="Supabase configuration is missing")
    # Use httpx for the client transport if necessary, but supabase-py defaults to httpx.
    supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return supabase

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    Validates the token and returns the user object from Supabase.
    """
    supabase = get_supabase_client()
    try:
        # Get user from token
        user_response = supabase.auth.get_user(credentials.credentials)
        if not user_response or not user_response.user:
            raise ValueError("Invalid user")
        
        # Return the user object (which contains id, email, etc.)
        return {"id": user_response.user.id, "token": credentials.credentials}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

optional_security = HTTPBearer(auto_error=False)

def get_optional_user(credentials: HTTPAuthorizationCredentials = Depends(optional_security)) -> dict | None:
    if not credentials:
        return None
    try:
        return get_current_user(credentials)
    except Exception:
        return None
