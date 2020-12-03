from models.base import BaseModel
from app import db

class Genre(db.Model, BaseModel):
  
  __tablename__= 'genres'
  name = db.Column(db.String(40), unique=True, nullable=False)
