from flask import Blueprint, request
from models.user import User
from serializers.user import UserSchema, PopulateUserSchema
from middleware.secure_route import secure_route

user_schema = UserSchema()
populate_user = PopulateUserSchema()

router = Blueprint(__name__, 'users')

@router.route('/signup', methods=['POST'])
def signup():
  request_body = request.get_json()
  user = user_schema.load(request_body)
  user.save()
  return populate_user.jsonify(user), 200

@router.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  user = User.query.filter_by(email=data['email']).first()

  if not user:
    return { 'message': 'Unauthorized' }, 401

  token = user.generate_token()
  print(user)
  return{ 'token': token, 'username':user.username, 'user_id':user.id, 'message': 'Welcome back!'}


@router.route('/users', methods=['GET'])

def user_index():
  users = User.query.all()
  return user_schema.jsonify(users, many=True), 200

@router.route('/users/<int:id>', methods=['GET'])

def user_single(id):
  user = User.query.get(id)

  if not user:
    return { 'message': 'User not available' }, 404
  
  return populate_user.jsonify(user), 200