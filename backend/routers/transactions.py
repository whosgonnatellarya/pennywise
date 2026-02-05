from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..db import get_db
from .. import models, schemas

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.get("", response_model=List[schemas.TransactionOut])
def list_transactions(db: Session = Depends(get_db)):
    return db.query(models.Transaction).order_by(models.Transaction.created_at.desc(), models.Transaction.id.desc()).all()

@router.post("", response_model=schemas.TransactionOut)
def create_transaction(tx: schemas.TransactionCreate, db: Session = Depends(get_db)):
    if not db.get(models.Category, tx.category_id):
        raise HTTPException(400, "Invalid category_id")
    t = models.Transaction(category_id=tx.category_id, amount=tx.amount, note=tx.note)
    db.add(t); db.commit(); db.refresh(t)
    return t

@router.delete("/{id}", status_code=204)
def delete_transaction(id: int, db: Session = Depends(get_db)):
    t = db.get(models.Transaction, id)
    if not t: raise HTTPException(404, "Transaction not found")
    db.delete(t); db.commit()
    return