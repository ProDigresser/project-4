from flask import Blueprint, request, g
from models.video import Video
from models.genre import Genre
from models.comments import Comment, NestedComment
from serializers.video import VideoSchema, PopulateVideoSchema
from serializers.comments import CommentSchema, NestedCommentSchema
from serializers.genre import GenreSchema, PopulateGenreSchema
from middleware.secure_route import secure_route
from marshmallow import ValidationError

video_schema = VideoSchema()
populate_video = PopulateVideoSchema()

comment_schema = CommentSchema()
nested_comment_schema = NestedCommentSchema()

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
    video = populate_video.load(video_dictionary)
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }, 401
  
  video.save()

  return populate_video.jsonify(video), 200

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


# Get one comment 

@router.route('/comments/<int:id>', methods=['GET'])
def get_single_comment(id):
  comment = Comment.query.get(id)

  if not comment:
    return { 'message': 'Video not available' }, 404
  
  return comment_schema.jsonify(comment), 200

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


# Nested Comment
@router.route('/comments/<int:comment_id>/nested', methods=['POST'])
@secure_route
def create_nested(comment_id):
  nested_comment_data = request.get_json()
  comment = Comment.query.get(comment_id)
  if not comment:
    return { 'message': 'Comment not available' }, 404

  nested_comment = nested_comment_schema.load(nested_comment_data)
  nested_comment.comment = comment
  nested_comment.user_id = g.current_user.id
  nested_comment.comment_id = comment_id
  nested_comment.save()

  video = Video.query.get(comment.video_id)

  return populate_video.jsonify(video), 200

# Delete Nested Comment

@router.route('/comments/<int:comment_id>/<int:nested_id>', methods=['DELETE'])
@secure_route
def removeNestedComment(comment_id, nested_id):
  nested_comment = NestedComment.query.get(nested_id)

  if not nested_comment:
    return { 'message': 'Comment not available' }, 404

  comment = Comment.query.get(comment_id)

  if not comment:
    return { 'message': 'Comment not available' }, 404

  video_id = comment.video_id
  video = Video.query.get(video_id)

  if nested_comment.user != g.current_user:
    return { 'message': 'Unauthorized' }, 401

  nested_comment.remove()

  return populate_video.jsonify(video), 200