from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from .db import SessionLocal, engine, Base
from . import models
from .routers import categories, transactions

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Pennywise API")

def get_allowed_origins():
    default_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    env_origins = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "").split(",")
        if origin.strip()
    ]
    return list(dict.fromkeys(default_origins + env_origins))


origins = get_allowed_origins()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.railway\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categories.router)
app.include_router(transactions.router)

DEFAULT_CATEGORIES = [
    ("Housing", 120000),
    ("Food", 35000),
    ("Transport", 15000),
    ("Utilities", 12000),
    ("Healthcare", 10000),
    ("Personal", 8000),
    ("Entertainment", 9000),
    ("Savings", 50000),
]


@app.on_event("startup")
def seed_default_categories():
    db = SessionLocal()
    try:
        has_categories = db.query(models.Category.id).first() is not None
        if has_categories:
            return

        for idx, (name, budget) in enumerate(DEFAULT_CATEGORIES):
            db.add(models.Category(name=name, budget=budget, order=idx))
        db.commit()
    finally:
        db.close()


@app.get("/health")
def health():
    return {"ok": True}