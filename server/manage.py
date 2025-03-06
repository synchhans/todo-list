from flask import Flask
from flask_migrate import Migrate
from extensions import db
from app import create_app

app = create_app()
migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run()