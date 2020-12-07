from models.base import BaseModel
from app import db

class Genre(db.Model):
  
  __tablename__= 'genres'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), unique=True)
