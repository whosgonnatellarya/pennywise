from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..db import get_db
from .. import models, schemas

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("", response_model=List[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).order_by(models.Category.order, models.Category.id).all()

@router.post("", response_model=schemas.CategoryOut)
def create_category(cat: schemas.CategoryCreate, db: Session = Depends(get_db)):
    c = models.Category(name=cat.name, budget=cat.budget, emoji=cat.emoji, color=cat.color)
    db.add(c); db.commit(); db.refresh(c)
    return c

@router.put("/{id}", response_model=schemas.CategoryOut)
def update_category(id: int, cat: schemas.CategoryUpdate, db: Session = Depends(get_db)):
    c = db.get(models.Category, id)
    if not c: raise HTTPException(404, "Category not found")
    c.name = cat.name; c.budget = cat.budget; c.emoji = cat.emoji; c.color = cat.color
    db.add(c); db.commit(); db.refresh(c)
    return c

@router.delete("/{id}", status_code=204)
def delete_category(id: int, db: Session = Depends(get_db)):
    c = db.get(models.Category, id)
    if not c: raise HTTPException(404, "Category not found")
    db.delete(c); db.commit()
    return

@router.post("/reorder", status_code=204)
def reorder(payload: schemas.ReorderPayload, db: Session = Depends(get_db)):
    for idx, cid in enumerate(payload.order):
        c = db.get(models.Category, cid)
        if c:
            c.order = idx
            db.add(c)
    db.commit()
    return