from flask import Blueprint, request, g
from models.video import Video
from models.genre import Genre
from models.comments import Comment
from serializers.video import VideoSchema, PopulateVideoSchema
from serializers.comments import CommentSchema
from serializers.genre import GenreSchema, PopulateGenreSchema
from middleware.secure_route import secure_route
from marshmallow import ValidationError

video_schema = VideoSchema()
populate_video = PopulateVideoSchema()

comment_schema = CommentSchema()

genre_schema = GenreSchema()
populate_genre = PopulateGenreSchema()

router = Blueprint(__name__, 'videos')

# Get all videos

@router.route('/videos', methods=['GET'])
def index():
  videos = Video.query.all()
  return video_schema.jsonify(videos, many=True), 200

# Get all genres

@router.route('/genres', methods=['GET'])
def genres_index():
  genres = Genre.query.all()
  return populate_genre.jsonify(genres, many=True), 200

# Get a single video

@router.route('/videos/<int:id>', methods=['GET'])
def get_single_video(id):
  video = Video.query.get(id)

  if not video:
    return { 'message': 'Video not available' }, 404
  
  return populate_video.jsonify(video), 200

# Add a video

@router.route('/videos', methods=['POST'])
@secure_route
def create():
  video_dictionary = request.get_json()
  video_dictionary['user_id'] = g.current_user.id

  try:
    video = video_schema.load(video_dictionary)
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }
  
  video.save()

  return video_schema.jsonify(video), 200

# Edit a video

@router.route('/videos/<int:id>', methods=['PUT'])
@secure_route
def update_video(id):
  existing_video = Video.query.get(id)

  try:
    video = video_schema.load(
      request.get_json(),
      instance=existing_video,
      partial=True
    )
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  if video.user != g.current_user:
    return { 'message': 'Unauthorized' }, 401

  video.save()

  return video_schema.jsonify(video), 201 

# Delete a video

@router.route('/videos/<int:id>', methods=['DELETE'])
@secure_route
def remove(id):
  video = Video.query.get(id)

  if video.user != g.current_user:
      return { 'message': 'Unauthorized' }, 401

  video.remove()
  return { 'message': f'Video {id}--deleted successfully' }

# Post a comment

@router.route('/videos/<int:video_id>/comments', methods=['POST'])
@secure_route
def comment_create(video_id):
  comment_data = request.get_json()
  video = Video.query.get(video_id)
  comment = comment_schema.load(comment_data)
  comment.video = video
  comment.user_id = g.current_user.id
  comment.save()
  return populate_video.jsonify(video), 200

# Delete a comment

@router.route('/comments/<int:id>', methods=['DELETE'])
@secure_route
def removeComment(id):
  comment = Comment.query.get(id)
  video_id = comment.video_id
  video = Video.query.get(video_id)

  if comment.user != g.current_user:
    return { 'message': 'Unauthorized' }, 401

  comment.remove()

  return populate_video.jsonify(video), 200

# Edit a comment

@router.route('/comments/<int:id>', methods=['PUT'])
@secure_route
def update_comment(id):

  existing_comment = Comment.query.get(id)

  try:
    comment = comment_schema.load(
      request.get_json(),
      instance=existing_comment,
      partial=True
    )
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  if comment.user != g.current_user:
    return { 'message': 'Unauthorized' }, 401

  comment.save()

  return { 'message': 'Comment updated.' }, 201 