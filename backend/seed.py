from app import app, db
from models.user import User
from models.comments import Comment
from models.genre import Genre
from models.video import Video





with app.app_context():
  db.drop_all()
  db.create_all()

  admin = User(
    username='Admin',
    email='hello@admin.com',
    password='hello1',
    profession='Admin'
  )

  dec = User(
    username='Dec',
    email='dec@dec.com',
    password='dec',
    profession='Developer'
  )
  
  test_user_one = User(
    username='Laurence',
    email='hello@laurence.com',
    password='hello1',
    profession='Developer'
  )

  sherryll = User (
    username="sherryll",
    email="hello@sherryll.com",
    password="sherryll"
  )
  bob = User (
    username="bob",
    email="hello@bob.com",
    password="bob"
  )
  test_user_one.save()
  dec.save()
  sherryll.save()
  bob.save()
  admin.save()

  print('Users Created!')

  
  
  
  good_video = Video(
    title='Good Vid',
    description='This is a good vid.',
    vid_url='www.vids.con/good.mp4',
    user=test_user_one
  )

  bad_video = Video(
    title='Bad Vid',
    description='This is not a good vid.',
    vid_url='videoishere.com',
    user=dec
  )

  print('Videos Created!')
  
  comment1 = Comment(
    content="hello this is a comment",
    video=bad_video,
    user=sherryll
  )

  comment2 = Comment(
    content="this is another comment",
    video=good_video,
    user=admin
  )

  print('Comments Created!')

  cooking = Genre(
    name='Cooking',
    videos=[good_video, bad_video]
  )
  photography = Genre(
    name='Photography',
    videos=[good_video]
  )
  music = Genre(
    name='Music'
  )
  nature = Genre(
    name='Nature'
  )
  

  print('Genres Created!')
  print('Adding to database...')

  db.session.add_all([cooking, photography, music, nature])
  db.session.commit()

  print('Everything works!')