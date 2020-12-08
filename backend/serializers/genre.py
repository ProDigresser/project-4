from app import ma 
from serializers.base import BaseSchema
from marshmallow import fields
from models.genre import Genre


class GenreSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  
  class Meta:
    model = Genre
    load_instance = True

class PopulateGenreSchema(GenreSchema):

  class Meta:
    model= Genre
    load_instance = True

  videos = fields.Nested('VideoSchema', many=True, exclude=('genres',))