from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import SessionLocal, engine, Base
from models import User, Category, Transaction
from pydantic import BaseModel
from datetime import datetime

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Pennywise API")

origins = ["http://localhost:5173","http://127.0.0.1:5173","http://localhost:5174","http://127.0.0.1:5174"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class CategoryIn(BaseModel):
  id: int | None = None
  name: str
  budget: int

class CategoryOut(CategoryIn):
  id: int

class TxIn(BaseModel):
  amount: int
  note: str | None = None
  category_id: int

class TxOut(TxIn):
  id: int
  created_at: datetime

def get_db():
  db = SessionLocal()
  try: yield db
  finally: db.close()

# existing users endpoints stay

@app.get("/categories/", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
  return db.query(Category).order_by(Category.id.asc()).all()

@app.post("/categories/", response_model=CategoryOut)
def upsert_category(cat: CategoryIn, db: Session = Depends(get_db)):
  if cat.id:
    c = db.query(Category).get(cat.id)
    if not c: raise HTTPException(404, "Category not found")
    c.name, c.budget = cat.name, cat.budget
  else:
    c = Category(name=cat.name, budget=cat.budget)
    db.add(c)
  db.commit(); db.refresh(c); return c

@app.get("/transactions/", response_model=list[TxOut])
def list_transactions(category_id: int | None = None, db: Session = Depends(get_db)):
  q = db.query(Transaction).order_by(Transaction.created_at.desc())
  if category_id: q = q.filter(Transaction.category_id == category_id)
  return q.all()

@app.post("/transactions/", response_model=TxOut)
def create_tx(tx: TxIn, db: Session = Depends(get_db)):
  t = Transaction(amount=tx.amount, note=tx.note, category_id=tx.category_id)
  db.add(t); db.commit(); db.refresh(t); return t