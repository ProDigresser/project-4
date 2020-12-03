from datetime import *
from marshmallow import fields
from flask_marshmallow import Marshmallow

class BaseSchema:
  
  created_at = fields.DateTime(format='%Y-%m-%d %H:%M:%S')
  updated_at = fields.DateTime(format='%Y-%m-%d %H:%M:%S')