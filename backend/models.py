from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db import Base

class Category(Base):
  __tablename__ = "categories"
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, nullable=False, unique=True)
  budget = Column(Integer, default=0)  # cents

class Transaction(Base):
  __tablename__ = "transactions"
  id = Column(Integer, primary_key=True, index=True)
  amount = Column(Integer, nullable=False)  # cents
  note = Column(String, nullable=True)
  created_at = Column(DateTime, default=datetime.utcnow)
  category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)