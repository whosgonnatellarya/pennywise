import os
import sys
from fastapi.staticfiles import StaticFiles

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(CURRENT_DIR)
if PARENT_DIR not in sys.path:
    sys.path.insert(0, PARENT_DIR)

from backend.main import app as main_app

# Serve built frontend out of backend/public
PUBLIC_DIR = os.path.join(CURRENT_DIR, "public")
main_app.mount("/", StaticFiles(directory=PUBLIC_DIR, html=True), name="static")

# Expose name 'app' for uvicorn
app = main_app
