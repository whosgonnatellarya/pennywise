from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.main import app

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET","POST","PUT","DELETE","OPTIONS"],
    allow_headers=["*"],
    allow_credentials=False,
)

# Serve built frontend out of backend/public
app.mount("/", StaticFiles(directory="backend/public", html=True), name="static")
