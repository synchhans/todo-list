from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, migrate
from routes import bp as api_bp
from utils import log_request

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={
    r"/api/*": {
        "origins": app.config["CORS_ORIGINS"]
    }
})

db.init_app(app)
migrate.init_app(app, db)

app.register_blueprint(api_bp, url_prefix="/api")

@app.after_request
def after_request(response):
    log_request(response)
    return response

if __name__ == "__main__":
    app.run()