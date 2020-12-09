from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema, PopulateUserSchema
from middleware.secure_route import secure_route
from marshmallow import ValidationError

user_schema = UserSchema()
populate_user = PopulateUserSchema()

router = Blueprint(__name__, 'users')

@router.route('/signup', methods=['POST'])
def signup():
  request_body = request.get_json()
  user = populate_user.load(request_body)
  user.save()
  return { 'message': 'Confirmed' }, 200

@router.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  user = User.query.filter_by(email=data['email']).first()

  if not user:
    return { 'message': 'Unauthorized' }, 401

  if not user.validate_password(data['password']):
    return { 'message': 'Invalid Username or password.' }, 402

  token = user.generate_token()

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

@router.route('/follow', methods=['PUT'])
@secure_route
def update_user_follow():

  req = request.get_json()

  existing_user = User.query.get(g.current_user.id)

  # mapped_users
  # mapped_following_ids = [{'id':user.id} for user in [*existing_user.following]]
  # req['following'] = [*mapped_following_ids, *req['following']]

  try:
    user = populate_user.load(
    req,
    instance=existing_user,
    partial=True
  )
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  user.save()

  return populate_user.jsonify(user), 200

@router.route('/update_user', methods=['PUT'])
@secure_route
def update_user_genre():

  req = request.get_json()

  existing_user = User.query.get(g.current_user.id)


  print(req)
  try:
    user = populate_user.load(
    req,
    instance=existing_user,
    partial=True
  )
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  user.save()

  return populate_user.jsonify(user), 200