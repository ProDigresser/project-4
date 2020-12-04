from app import db
from models.base import BaseModel
from models.video import Video
from models.user import User

class Comment(db.Model, BaseModel):
  
  __tablename__= 'comments'


  content = db.Column(db.Text, nullable=False)
  video_id = db.Column(db.Integer, db.ForeignKey('videos.id'))
  video = db.relationship('Video', backref='comments')

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', backref='comments')

class NestedComment(db.Model, BaseModel):

  __tablename__= 'nested_comments'

  nested_content = db.Column(db.Text, nullable=False)
  comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
  comment = db.relationship('Comment', backref='nested_comments')

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', backref='nested_comments')