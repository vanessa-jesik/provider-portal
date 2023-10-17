#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
import os

# Local imports
from config import app, db, api
# Add your model imports

from models import db, Provider, Patient, Incident


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
api = Api(app)
db.init_app(app)


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server for Madi and Vanessa!!</h1>'


class Providers(Resource):
    def get(self):
        return make_response(
            [provider.to_dict() for provider in Provider.query.all()], 200)


api.add_resource(Providers, "/providers")


if __name__ == '__main__':
    app.run(port=5555, debug=True)
