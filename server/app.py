#!/usr/bin/env python3

# Standard library imports
import os

# Remote library imports
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource


# Add your model imports

from models import db, Provider, Patient, Incident


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

migrate = Migrate(app, db)
api = Api(app)
db.init_app(app)


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server for Madi and Vanessa!!</h1>'


class Providers(Resource):
    def get(self):
        try:
            providers = [provider.to_dict()
                         for provider in Provider.query.all()]
            return make_response(providers, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

    def post(self):
        provider_json = request.get_json()
        provider = Provider()

        try:
            for key in provider_json:
                if hasattr(provider, key):
                    setattr(provider, key, provider_json[key])
            db.session.add(provider)
            db.session.commit()
            return make_response(provider.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


class ProviderById(Resource):
    def get(self, id):
        provider = db.session.get(Provider, id)  # provider.query.get(id)
        if provider:
            return make_response(provider.to_dict(), 200)

        return make_response({"error": "Provider not found"}, 404)

    def patch(self, id):
        provider = db.session.get(Provider, id)

        if provider:
            provider_json = request.get_json()
            try:
                for key in provider_json:
                    if hasattr(provider, key):
                        setattr(provider, key, provider_json[key])
                db.session.commit()
                return make_response(provider.to_dict(), 202)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)

        return make_response({"error": "provider not found"}, 404)

    def delete(self, id):
        provider = db.session.get(Provider, id)

        if provider:
            db.session.delete(provider)
            db.session.commit()
            return "", 204

        return make_response({"error": "provider not found"}, 404)


api.add_resource(Providers, "/providers")
api.add_resource(ProviderById, "/providers/<int:id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)
