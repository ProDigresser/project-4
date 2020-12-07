from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.video import Video


class VideoSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = Video
    load_instance = True
    load_only = ('user_id',)
  
  genres = fields.Nested('GenreSchema', many=True, only=('name',))
  user_id = fields.Integer()
  user = fields.Nested('UserSchema', only=('id', 'username'))
    

class PopulateVideoSchema(VideoSchema):
  class Meta:
    model = Video
    load_instance = True

  comments = fields.Nested('CommentSchema', many=True)
  genre = fields.Nested('GenreSchema', many=True)