from app import app, db
from models.user import User
from models.comments import Comment, NestedComment
from models.genre import Genre
from models.video import Video

with app.app_context():
  db.drop_all()
  db.create_all()

  animation = Genre( name='Animation')
  writing = Genre( name='Writing')
  film_and_video = Genre( name='Film & Video')
  fine_art = Genre( name='Fine Art')
  graphic_design = Genre( name='Graphic Design')
  illustration = Genre( name='Illustration')
  music = Genre( name='Music')
  photography = Genre( name='Photography')
  ui_ux_design = Genre( name='UI/UX Design')
  web_development = Genre( name='Web Development')
  cooking = Genre( name='Cooking')
  lifestyle = Genre( name='Lifestyle')

  db.session.add_all([animation, writing, film_and_video, fine_art, graphic_design, illustration, music, photography, ui_ux_design, web_development, cooking, lifestyle])  

  print('Genres Created!')

  admin = User(
    username='Admin',
    email='hello@admin.com',
    password='Hello1!',
  )

  dec = User(
    username='Dec B',
    email='dec@dec.com',
    password='Dec1!',
    genres=[web_development, photography, music]
  )
  
  laurence = User(
    username='Laurence W',
    email='hello@laurence.com',
    password='Hello1!',
    genres=[web_development, cooking, ui_ux_design]
  )

  sherryll = User (
    username='Sherryll E',
    email='hello@sherryll.com',
    password='Sherryll1!',
    genres=[web_development, music, fine_art]
  )

  bob = User (
    username='Bob B',
    email='hello@bob.com',
    password='Bob1!',
    following=[sherryll, laurence],
    genres=[illustration, writing, film_and_video]
  )

  mark = User (
    username='Mark F',
    email='hello@mark.com',
    password='Hello1!',
    following=[laurence, dec],
    genres=[lifestyle, animation, film_and_video]
  )

  jenna = User (
    username='Jenna M',
    email='hello@jenna.com',
    password='Hello1!',
    following=[mark, bob, sherryll],
    genres=[lifestyle, graphic_design, fine_art]
  )

  brad = User (
    username='Brad L',
    email='hello@brad.com',
    password='Hello1!',
    following=[mark, dec, jenna],
    genres=[cooking, lifestyle]
  )

  db.session.add_all([laurence, dec, sherryll, bob, admin, mark, jenna, brad])

  print('Users Created!')
  
  laurence_vid_1 = Video(
    title='Javascript, React Hooks & Hooks',
    description='This is a good vid.',
    vid_url='www.vids.con/good.mp4',
    user=laurence
  )


  print('Videos Created!')
  
  # comment1 = Comment(
  #   content='hello this is a comment',
  #   video=bad_video,
  #   user=sherryll
  # )

  # comment2 = Comment(
  #   content='this is another comment',
  #   video=good_video,
  #   user=admin
  # )

  print('Comments Created!')

  # nested_comment_1 = NestedComment(
  #   nested_content='this is a nested comment',
  #   user=bob,
  #   comment=comment2
  # )

  # nested_comment_1.save()
  
  db.session.commit()

  print('Adding to database...')

  print('Everything works!')