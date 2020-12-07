from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.video import Video
from models.genre import Genre
from models.comments import Comment, NestedComment

class CommentSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  
  class Meta:
    model = Comment
    load_instance = True
    load_only = ('user_id',)

  user_id = fields.Integer()
  user = fields.Nested('UserSchema', only=('id', 'username'))
  nested_comments = fields.Nested('NestedCommentSchema', many=True)


class NestedCommentSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = NestedComment
    load_instance = True
    load_only = ('user_id',)

  user_id = fields.Integer()
  user = fields.Nested('UserSchema', only=('id', 'username'))
  comment_id = fields.Integer()