import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/howto_db')
secret = os.getenv('SECRET', 'Oh my god they were roommates.')
