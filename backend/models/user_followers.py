from app import db

user_followers_join = db.Table('user_followers',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)