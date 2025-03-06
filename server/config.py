import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DEBUG = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost/todolist")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")