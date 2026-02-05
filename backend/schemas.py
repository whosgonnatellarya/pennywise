from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    budget: int = 0
    emoji: Optional[str] = None
    color: Optional[str] = None

class CategoryCreate(CategoryBase): pass
class CategoryUpdate(CategoryBase): pass

class CategoryOut(CategoryBase):
    id: int
    order: int = 0
    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    category_id: int
    amount: int
    note: Optional[str] = None

class TransactionCreate(TransactionBase): pass

class TransactionOut(TransactionBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class ReorderPayload(BaseModel):
    order: List[int]