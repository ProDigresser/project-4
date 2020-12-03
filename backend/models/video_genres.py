from app import db

video_genres_join = db.Table('video_genres',
  db.Column('genre_id', db.Integer, db.ForeignKey('genres.id'), primary_key=True),
  db.Column('video_id', db.Integer, db.ForeignKey('videos.id'), primary_key=True)
)

