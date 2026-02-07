from fastapi.middleware.cors import CORSMiddleware
from backend.main import app

# Permissive CORS for quick deploy; tighten later to your Vercel domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
