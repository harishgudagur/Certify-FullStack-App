from flask import Flask
from flask_cors import CORS

from models import db

from routes.auth import auth
from routes.opportunities import opportunities

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secretkey'

CORS(app)

db.init_app(app)

app.register_blueprint(auth)
app.register_blueprint(opportunities)

with app.app_context():
    db.create_all()


@app.route('/')
def home():
    return {"message": "Backend Running Successfully"}


if __name__ == '__main__':
    app.run(debug=True)