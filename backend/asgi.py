from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.main import app

# CORS (safe for demo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET","POST","PUT","DELETE","OPTIONS"],
    allow_headers=["*"],
    allow_credentials=False,
)

# Serve the built frontend from backend/public (we'll copy files there in Step 2)
app.mount("/", StaticFiles(directory="backend/public", html=True), name="static")
