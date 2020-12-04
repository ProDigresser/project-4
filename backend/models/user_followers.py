from app import db

user_followers_join = db.Table('user_followers',
  db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
  db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)