from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import SessionLocal, engine, Base
from models import User
from pydantic import BaseModel

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Pennywise API")

# ---- CORS ----
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # or ["*"] for quick local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ------------------------------------------------

# Pydantic schemas
class UserCreate(BaseModel):
    email: str
    full_name: str | None = None

class UserOut(BaseModel):
    id: int
    email: str
    full_name: str | None = None

    class Config:
        orm_mode = True

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=UserOut)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=user_in.email, full_name=user_in.full_name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.get("/users/", response_model=list[UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()