from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.video import Video


class VideoSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = Video
    load_instance = True
    load_only = ('user_id',)
  
  user_id = fields.Integer()
  user = fields.Nested('UserSchema', only=('id', 'username'))
  genres = fields.Nested('GenreSchema', many=True)
    

class PopulateVideoSchema(VideoSchema):
  class Meta:
    model = Video
    load_instance = True
    load_only = ('user_id',)

  comments = fields.Nested('CommentSchema', many=True)
  