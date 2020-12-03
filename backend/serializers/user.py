from app import ma
from serializers.base import BaseSchema
from models.user import User
from marshmallow import fields



class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  
  class Meta:
    model = User
    load_instance = True
    exclude = ('password_hash',)
    load_only = ('email', 'password')

  password = fields.String(required=True)