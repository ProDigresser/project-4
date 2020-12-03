from app import db

user_followers_join = db.Table('user_followers',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
  db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
  db.UniqueConstraint('user_id', 'follower_id', name='unique_relationships')
)