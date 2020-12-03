from app import db, bcrypt
from models.base import BaseModel
from datetime import *
from models.genre import Genre
from models.user_genre import user_genre_join
from models.user_followers import user_followers_join

import jwt
from sqlalchemy.ext.hybrid import hybrid_property
from environment.config import secret

class User(db.Model, BaseModel):

  __tablename__ = 'users'

  username = db.Column(db.String(20), nullable=False, unique=True)
  email = db.Column(db.String(128), nullable=False, unique=True)
  password_hash = db.Column(db.String(128), nullable=False)
  profession = db.Column(db.String(128), nullable=True)
  
  genres = db.relationship('Genre', secondary=user_genre_join, backref='users')
  #friends M2M
  # following = db.relationship('User', secondary=user_followers_join, 
  #     primaryjoin=id==user_followers_join.c.user_id,
  #     secondaryjoin=id==user_followers_join.c.follower_id,
  #     backref='users')
  
  @hybrid_property
  def password(self):
    pass

  @password.setter
  def password(self, password_plaintext):
    self.password_hash = bcrypy.generate_password_hash(password_plaintext).decode('utf-8')

  def validate_password(self, password_plaintext):
    return bcrypt.check_password_hash(self.password_hash, password_plaintext)
  
  def generate_token(self):
    payload = {
      'exp': datetime.utcnow() + timedelta(days=1),
      'iat': datetime.utcnow(),
      'sub': self.id
    }
    token = jwt.encode(
      payload,
      secret,
      'HS256'
    ).decode('utf-8')

    return token