import os
import sys
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(CURRENT_DIR)
if PARENT_DIR not in sys.path:
    sys.path.insert(0, PARENT_DIR)

from backend.main import app as main_app

# CORS (demo-safe)
main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET","POST","PUT","DELETE","OPTIONS"],
    allow_headers=["*"],
    allow_credentials=False,
)

# Serve built frontend out of backend/public
PUBLIC_DIR = os.path.join(CURRENT_DIR, "public")
main_app.mount("/", StaticFiles(directory=PUBLIC_DIR, html=True), name="static")

# Expose name 'app' for uvicorn
app = main_app
