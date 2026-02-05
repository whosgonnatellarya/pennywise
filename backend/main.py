from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import Base, engine
from .routers import categories, transactions

app = FastAPI(title="Pennywise API")

# DB tables
Base.metadata.create_all(bind=engine)

# CORS for Vite dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categories.router)
app.include_router(transactions.router)

@app.get("/health")
def health():
    return {"ok": True}