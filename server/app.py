#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from datetime import datetime
from dateutil import parser

# Local imports
from config import app, db, api

# Add your model imports

from models import db, Provider, Patient, Incident


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)
api = Api(app)
db.init_app(app)


# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server for Madi and Vanessa!!</h1>"


class Providers(Resource):
    def get(self):
        try:
            providers = [provider.to_dict() for provider in Provider.query.all()]
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
        provider = db.session.get(Provider, id)
        if provider:
            return make_response(
                provider.to_dict(rules=("incidents", "-incidents.provider")),
                200,
            )
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


class Patients(Resource):
    def get(self):
        return make_response(
            [patient.to_dict() for patient in Patient.query.all()], 200
        )

    def post(self):
        patient = Patient()
        patient_json = request.get_json()
        try:
            for key in patient_json:
                if hasattr(patient, key):
                    setattr(patient, key, patient_json[key])
            db.session.add(patient)
            db.session.commit()
            return make_response(patient.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": e.__str__()}, 422)


class PatientsById(Resource):
    def get(self, id):
        patient = db.session.get(Patient, id)
        if patient:
            return make_response(
                patient.to_dict(
                    rules=("incidents", "incidents.provider", "-incidents.patient")
                ),
                200,
            )
        return make_response({"error": "Patient not found"}, 404)

    def delete(self, id):
        patient = db.session.get(Patient, id)

        if patient:
            db.session.delete(patient)
            db.session.commit()
            return "", 204

        return make_response({"error": "patient not found"}, 404)


class Incidents(Resource):
    def post(self):
        incident = Incident()
        incident_json = request.get_json()
        date_time_str = incident_json["date_time"].replace("Z", "")
        date_time = parser.isoparse(date_time_str)
        incident_json["date_time"] = date_time
        try:
            for key in incident_json:
                if hasattr(incident, key):
                    setattr(incident, key, incident_json[key])
            db.session.add(incident)
            db.session.commit()
            return make_response(incident.to_dict(rules=("-provider",)), 201)
        except ValueError as e:
            return make_response({"error": e.__str__()}, 422)


class IncidentById(Resource):
    def patch(self, id):
        incident = db.session.get(Incident, id)
        incident_json = request.get_json()
        date_time_str = incident_json["date_time"].replace("Z", "")
        date_time = parser.isoparse(date_time_str)
        incident_json["date_time"] = date_time
        if incident:
            try:
                for key in incident_json:
                    if hasattr(incident, key):
                        setattr(incident, key, incident_json[key])
                db.session.commit()
                return make_response(incident.to_dict(rules=("-provider",)), 202)
            except ValueError as e:
                return make_response({"error": e.__str__()}, 422)
        return make_response({"error": "Incident not found"}, 404)

    def delete(self, id):
        incident = db.session.get(Incident, id)
        if incident:
            db.session.delete(incident)
            db.session.commit()
            return make_response("", 204)
        return make_response({"error": "Incident not found"}, 404)


api.add_resource(Providers, "/providers")
api.add_resource(ProviderById, "/providers/<int:id>")
api.add_resource(Patients, "/patients")
api.add_resource(PatientsById, "/patients/<int:id>")
api.add_resource(Incidents, "/incidents")
api.add_resource(IncidentById, "/incidents/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
