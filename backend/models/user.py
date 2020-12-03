from app import db
from models.base import BaseModel
from datetime import *
from models.genre import Genre
from models.user_genre import user_genre_join
from models.user_followers import user_followers_join

class User(db.Model, BaseModel):

  __tablename__ = 'users'

  username = db.Column(db.String(20), nullable=False, unique=True)
  email = db.Column(db.String(128), nullable=False, unique=True)
  password_hash = db.Column(db.String(128), nullable=False)
  profession = db.Column(db.String(128), nullable=True)
  
  genres = db.relationship('Genre', secondary=user_genre_join, backref='users')
  #friends M2M
  #following = db.relationship('User', secondary=user_followers_join, backref='users')
  
  

  