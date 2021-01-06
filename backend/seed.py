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
  graphic_design = Genre( name='Graphic Design')
  art_illustration = Genre( name='Art & Illustration')
  music = Genre( name='Music')
  photography = Genre( name='Photography')
  ui_ux_design = Genre( name='UI/UX Design')
  web_development = Genre( name='Web Development')
  cooking = Genre( name='Cooking')
  lifestyle = Genre( name='Lifestyle')
  productivity = Genre( name='Productivity')

  db.session.add_all([animation, writing, film_and_video, productivity, graphic_design, art_illustration, music, photography, ui_ux_design, web_development, cooking, lifestyle])  

  print('Genres Created!')

  admin = User(
    username='Admin',
    email='hello@admin.com',
    password='Hello1!')

  dec = User(
    username='Dec B',
    email='dec@dec.com',
    password='Dec1!',
    genres=[web_development, photography, music])
  
  laurence = User(
    username='Laurence W',
    email='hello@laurence.com',
    password='Hello1!',
    genres=[web_development, cooking, ui_ux_design])

  sherryll = User (
    username='Sherryll E',
    email='hello@sherryll.com',
    password='Sherryll1!',
    genres=[web_development, music, art_illustration])

  bob = User (
    username='Bob B',
    email='hello@bob.com',
    password='Bob1!',
    following=[sherryll, laurence],
    genres=[art_illustration, writing, film_and_video])

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
    genres=[lifestyle, graphic_design, art_illustration])

  brad = User (
    username='Brad L',
    email='hello@brad.com',
    password='Hello1!',
    following=[mark, dec, jenna],
    genres=[cooking, lifestyle])

  db.session.add_all([laurence, dec, sherryll, bob, admin, mark, jenna, brad])

  print('Users Created!')
  
  laurence_vid_1 = Video(
    title='Javascript, React & Hooks',
    description='Get to grips with this tutorial for React and Hooks.',
    vid_url='https://youtu.be/mxK8b99iJTg',
    user=laurence,
    genres=[web_development, ui_ux_design])

  laurence_vid_2 = Video(
    title='Functional Programming & Why You Should Try It!',
    description='Learn the basics to functional programming in Javascript.',
    vid_url='https://youtu.be/6NPfQJJEySY',
    user=laurence,
    genres=[web_development])

  dec_vid_1 = Video(
    title='Lighting is Everything',
    description='Tips and tricks to properly light your environment for filming and photography.',
    vid_url='https://youtu.be/flc5iP0KwTg',
    user=dec,
    genres=[photography, film_and_video])

  dec_vid_2 = Video(
    title='Choose Your Lens',
    description='A deep dive into the best lens for the job.',
    vid_url='https://youtu.be/BE6H5C-g6JA',
    user=dec,
    genres=[photography, film_and_video])

  dec_vid_3 = Video(
    title='Tips For Music Photography',
    description='Get the best out of your concert photos with these simple tricks.',
    vid_url='https://youtu.be/-D8HTk4BnQI',
    user=dec,
    genres=[photography])

  sherryll_vid_1 = Video(
    title='Guitar Practice that ISN\'T Stairway To Heaven',
    description='Pro habits to develop while learnign guitar.',
    vid_url='https://youtu.be/PfndlSCeWeo',
    user=sherryll,
    genres=[music, lifestyle])

  sherryll_vid_2 = Video(
    title='Get That Good Sound',
    description='What to look for when upgrading your Amp.',
    vid_url='https://youtu.be/aW0akNVYIRs',
    user=sherryll,
    genres=[music])

  mark_vid_1 = Video(
    title='Learn To Paint Like Bob Ross',
    description='Definitive guide to painting like painting like Bob Ross.',
    vid_url='https://youtu.be/mYAmSXpeFjM',
    user=mark,
    genres=[art_illustration])

  mark_vid_2 = Video(
    title='Learn to Doodle',
    description='Doodling and the art of making a mess!',
    vid_url='https://youtu.be/W2HDsQGHWQk',
    user=mark,
    genres=[art_illustration, graphic_design])

  mark_vid_3 = Video(
    title='Animation - Where to Start',
    description='A beginners guide to animation.',
    vid_url='https://youtu.be/Cw-_vMMiaRo',
    user=mark,
    genres=[animation, art_illustration])

  mark_vid_4 = Video(
    title='Photoshop Shortcuts Everyone Should Know!',
    description='Speed up your workflow with theese must use shortcuts.',
    vid_url='https://youtu.be/1732S1rlHOM',
    user=mark,
    genres=[graphic_design])

  jenna_vid_1 = Video(
    title='Declutter.',
    description='Declutter and other tips for a happy habitat.',
    vid_url='https://youtu.be/cZHUmiJQKBY',
    user=jenna,
    genres=[lifestyle])

  jenna_vid_2 = Video(
    title='Learn How To Learn',
    description='The habit of learning and the pattern of growth.',
    vid_url='https://youtu.be/FplJGbt6Iys',
    user=jenna,
    genres=[lifestyle])

  brad_vid_1 = Video(
    title='Ferment The Planet',
    description='Where to start your fermentation journey.',
    vid_url='https://youtu.be/iiNl0Jv6xTw',
    user=brad,
    genres=[cooking]
  )

  db.session.add_all([laurence_vid_1, laurence_vid_2, dec_vid_1, dec_vid_2, dec_vid_3, sherryll_vid_1, sherryll_vid_2, mark_vid_1, mark_vid_2, mark_vid_3, mark_vid_4, jenna_vid_1, jenna_vid_2, brad_vid_1])

  print('Videos Created!')
  
  comment1_vid1 = Comment(
    content='Great tutorial!',
    video=laurence_vid_1,
    user=sherryll
  )
  comment2_vid1 = Comment(
    content='This was interesting, but can you help me fix my code?',
    video=laurence_vid_1,
    user=bob
  )
  comment1_vid2 = Comment(
    content= 'I hope everyone enjoyed my tutorial!',
    video=laurence_vid_2,
    user=laurence
  )
  comment1_vid3 = Comment(
    content='This will definitely help me with a future project 😁',
    video=dec_vid_1,
    user=mark
  )
  comment1_vid4 = Comment(
    content='Very informative, thank you!',
    video=dec_vid_2,
    user=jenna
  )
  comment2_vid4 = Comment(
    content='⭐️⭐️⭐️',
    video=dec_vid_2,
    user=sherryll
  )
  comment3_vid4 = Comment(
    content='Top tips!',
    video=dec_vid_2,
    user=laurence
  )
  comment1_vid5 = Comment(
    content='But I LIKE stairway to heaven...',
    video=sherryll_vid_1,
    user=laurence
  )
  comment2_vid5 = Comment(
    content='This will definitely help me practice at home!',
    video=sherryll_vid_1,
    user=jenna
  )
  comment1_vid6 = Comment(
    content='Great guide thanks!',
    video=sherryll_vid_2,
    user=jenna
  )
  comment1_vid7 = Comment(
    content='I forgot how much i enjoy doodling!',
    video=mark_vid_2,
    user=laurence
  )
  comment2_vid7 = Comment(
    content='Great way to keep myself pre-occupied!',
    video=mark_vid_2,
    user=bob
  )
  comment1_vid8 = Comment(
    content='I didn\'t even know half of these! Love it.',
    video=mark_vid_4,
    user=sherryll
  )
  comment1_vid9 = Comment(
    content='This looks very satisfying!',
    video=jenna_vid_1,
    user=dec
  )
  comment1_vid10 = Comment(
    content='Cant wait to start my ferment collection!',
    video=brad_vid_1,
    user=laurence
  )
  comment2_vid10 = Comment(
    content='Love the breakdown!',
    video=brad_vid_1,
    user=mark
  )

  db.session.add_all([comment1_vid1, comment2_vid1, comment1_vid2, comment1_vid3, comment1_vid4, comment2_vid4, comment3_vid4, comment1_vid5, comment2_vid5, comment1_vid6, comment1_vid7, comment2_vid7, comment1_vid8, comment1_vid9, comment1_vid10, comment2_vid10])

  print('Comments Created!')

  nested_comment_1 = NestedComment(
    nested_content='No 😊',
    user=laurence,
    comment=comment2_vid1)

  nested_comment_2 = NestedComment(
    nested_content='Thank you!',
    user=laurence,
    comment=comment1_vid1)
    
  nested_comment_3 = NestedComment(
    nested_content='I can\'t wait to see what you are working on!',
    user=jenna,
    comment=comment1_vid3)

  nested_comment_4 = NestedComment(
    nested_content='Me too!',
    user=dec,
    comment=comment1_vid3)

  nested_comment_5 = NestedComment(
    nested_content='I agree!',
    user=laurence,
    comment=comment2_vid7)

  nested_comment_6 = NestedComment(
    nested_content='Cant wait for that sweet and sour crunch!',
    user=laurence,
    comment=comment1_vid10)

  nested_comment_7 = NestedComment(
    nested_content='Sorry! Its been banned 😂',
    user=sherryll,
    comment=comment1_vid5)

  nested_comment_8 = NestedComment(
    nested_content='It\'ll change your life! Promise.',
    user=jenna,
    comment=comment1_vid9)

  db.session.add_all([nested_comment_1, nested_comment_2, nested_comment_3, nested_comment_4, nested_comment_5, nested_comment_6, nested_comment_7, nested_comment_8])

  print('Nested Comments Created!')
  
  db.session.commit()

  print('Adding to database...')

  print('Everything works!')