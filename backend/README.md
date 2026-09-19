# DSSEduAI Backend

This is the FastAPI backend for the DSSEduAI project.

## Prerequisites

- Python 3.9+
- [uv](https://github.com/astral-sh/uv) (optional, for faster installs) or standard `pip`.

## Setup Instructions (Windows PowerShell)

1. **Navigate to the backend directory:**
   ```powershell
   cd backend
   ```

2. **Create a Python virtual environment:**
   ```powershell
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
   *(Note: If you encounter an execution policy error, run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` and try again).*

4. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   - Copy `.env.example` to `.env` (already done by default in this setup).

## Running the Server

Run the FastAPI development server with Uvicorn:

```powershell
uvicorn app.main:app --reload
```

The server will start at `http://127.0.0.1:8000`.

## Testing the API

- **Health Endpoint:** Visit [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health) to verify the backend is running.
- **Swagger UI:** Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for the interactive API documentation.
