from app import db
from models.base import BaseModel
from models.user import User
from models.video_genres import video_genres_join

class Video(db.Model, BaseModel):

  __tablename__ = 'videos'

  title = db.Column(db.String(50), nullable=False, unique=True)
  description = db.Column(db.String(200), nullable=True)
  vid_url = db.Column(db.String(200), nullable=False, unique=True)

  genres = db.relationship('Genre', secondary=video_genres_join, backref='videos')

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  user = db.relationship('User', backref='videos')




  