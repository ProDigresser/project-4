from app import db, bcrypt
from models.base import BaseModel
from datetime import *
from models.genre import Genre
from models.user_genre import user_genre_join
from models.user_followers import user_followers_join

import jwt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from environment.config import secret
import re

class User(db.Model, BaseModel):

  __tablename__ = 'users'

  username = db.Column(db.String(20), nullable=False, unique=True)
  email = db.Column(db.String(128), nullable=False, unique=True)
  password_hash = db.Column(db.String(128), nullable=False)
  
  genres = db.relationship('Genre', secondary=user_genre_join, backref='users')
  following = db.relationship('User', secondary=user_followers_join, 
              primaryjoin='User.id == user_followers.c.follower_id',
              secondaryjoin='User.id == user_followers.c.followed_id',
              backref=db.backref('user_followers_join', lazy='dynamic'),
              )
  
  @hybrid_property
  def password(self):
    pass

  @password.setter
  def password(self, password_plaintext):
    if not re.match('^(?=.*\W)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,20}$', password_plaintext):
      raise AssertionError('Password must contain 1 capital, 1 number, one symbol and be between 5 and 20 charetars long.')
    self.password_hash = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')

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

  @validates('username') 
  def validate_username(self, key, username):
    if not username:
      raise AssertionError('No username provided')
    if len(username) < 2 or len(username) > 20:
      raise AssertionError('Username must be between 3 and 20 characters') 
    return username 
  
  @validates('email') 
  def validate_email(self, key, email):
    if not email:
      raise AssertionError('No email provided')
    if User.query.filter(User.email == email).first():
      raise AssertionError('Email is already in use')
    if not re.match("[^@]+@[^@]+\.[^@]+", email):
      raise AssertionError('Provided email is not an email address') 
    return email
