from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import DateTime
import re

from config import db

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)


class Provider(db.Model, SerializerMixin):
    __tablename__ = "providers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    provider_type = db.Column(db.String, nullable=False)
    badge_number = db.Column(db.Integer, nullable=False, unique=True)

    # add relationship
    incidents = db.relationship(
        "Incident", back_populates="provider", cascade="all, delete-orphan"
    )
    patients = association_proxy("incidents", "patient")

    # add serialization rules
    serialize_rules = ("-patients", "-incidents")

    # add validation??
    @validates("name")
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name is required")
        if len(name) > 30:
            raise ValueError("Name must be 30 characters or less")
        if not re.match("^[A-Za-z ]+$", name):
            raise ValueError("Name must contain only letters and spaces")
        return name

    @validates("badge_number")
    def validate_badge_number(self, key, badge_number):
        if not badge_number:
            raise ValueError("Must have a badge number")
        if not badge_number.isdigit() or len(badge_number) != 5:
            raise ValueError("Badge number must be exactly 5 digits")
        return badge_number

    @validates("provider_type")
    def validate_provider_type(self, key, provider_type):
        valid_types = ["EMT", "Paramedic", "Fire Fighter", "Nurse", "Other"]
        if not provider_type:
            raise ValueError("Provider type is required")
        if provider_type not in valid_types:
            raise ValueError("Invalid Provider Type")
        return provider_type

    def __repr__(self):
        return f"<Provider {self.name}, {self.provider_type}, {self.badge_number}>"


class Patient(db.Model, SerializerMixin):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer)
    sex = db.Column(db.String)
    address = db.Column(db.String)

    # add relationship
    incidents = db.relationship(
        "Incident", back_populates="patient", cascade="all, delete-orphan"
    )
    providers = association_proxy("incidents", "provider")

    # add serialization rules
    serialize_rules = ("-incidents", "-providers")

    # add validation??

    def __repr__(self):
        return f"<Patient {self.name}, {self.age}, {self.sex}, {self.address}>"


class Incident(db.Model, SerializerMixin):
    __tablename__ = "incidents"

    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime)
    description = db.Column(db.String)
    location = db.Column(db.String)
    provider_id = db.Column(db.Integer, db.ForeignKey(
        "providers.id"), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey(
        "patients.id"), nullable=False)

    # add relationships
    provider = db.relationship("Provider", back_populates="incidents")
    patient = db.relationship("Patient", back_populates="incidents")

    # add serialization rules
    serialize_rules = ("-provider.incidents", "-patient.incidents")

    # add validation??

    def __repr__(self):
        return f"<Incident {self.date_time}, {self.description}, {self.location}>"
