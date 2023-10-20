from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import DateTime
from dateutil.parser import isoparse
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
        if not re.match("^[A-Za-z. ]+$", name):
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
    age = db.Column(db.Integer, nullable=False)
    sex = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

    # add relationship
    incidents = db.relationship(
        "Incident", back_populates="patient", cascade="all, delete-orphan"
    )
    providers = association_proxy("incidents", "provider")

    # add serialization rules
    serialize_rules = ("-incidents", "-providers")

    # add validation??
    @validates("name")
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Patient must have a name")
        if not isinstance(name, str):
            raise ValueError("Name must be a string")
        if len(name) > 30:
            raise ValueError("Name must be 30 or fewer characters")
        return name

    @validates("age")
    def validate_age(self, key, age):
        if not age:
            raise ValueError("Patient must have an age")
        if not isinstance(age, int):
            raise ValueError("Age must be an integer")
        if not 1 <= age <= 115:
            raise ValueError("Age must be between 1 and 115 inclusive")
        return age

    @validates("sex")
    def validate_sex(self, key, sex):
        valid_sexes = ["Female", "Male"]
        if not sex:
            raise ValueError("Patient sex must be recorded")
        if not isinstance(sex, str):
            raise ValueError("Patient sex must be a string")
        if sex not in valid_sexes:
            raise ValueError("Patient sex must be Female or Male")
        return sex

    @validates("address")
    def validate_address(self, key, address):
        if not address:
            raise ValueError("Address is required")
        if not isinstance(address, str):
            raise ValueError("Address must be a string")
        if len(address) > 60:
            raise ValueError("Address must be 60 or fewer characters")
        return address

    def __repr__(self):
        return f"<Patient {self.name}, {self.age}, {self.sex}, {self.address}>"


class Incident(db.Model, SerializerMixin):
    __tablename__ = "incidents"

    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"), nullable=False)

    # add relationships
    provider = db.relationship("Provider", back_populates="incidents")
    patient = db.relationship("Patient", back_populates="incidents")

    # add serialization rules
    serialize_rules = ("-provider.incidents", "-patient.incidents")

    # add validation??
    # @validates("date_time")
    # def validate_date_time(self, key, date_time):
    #     try:
    #         date_time = isoparse(date_time)
    #         return date_time
    #     except (TypeError, ValueError):
    #         raise ValueError("Invalid ISO 8601 datetime format")

    @validates("description")
    def validate_description(self, key, description):
        if not description:
            raise ValueError("Description required")
        if not isinstance(description, str):
            raise ValueError("Description must be a string")
        if len(description) > 100:
            raise ValueError("Description must be 100 or fewer characters")
        return description

    @validates("location")
    def validate_address(self, key, location):
        if not location:
            raise ValueError("Location is required")
        if not isinstance(location, str):
            raise ValueError("Location must be a string")
        if len(location) > 60:
            raise ValueError("Location must be 60 or fewer characters")
        return location

    # @validates("provider_id")
    # def validate_provider_id(self, key, provider_id):
    #     provider = db.session.get(Provider, provider_id)
    #     if provider:
    #         return provider_id
    #     return ValueError(f"Provider with id {provider_id} does not exist")

    # @validates("patient_id")
    # def validate_patient_id(self, key, patient_id):
    #     patient = db.session.get(Patient, patient_id)
    #     if patient:
    #         return patient_id
    #     return ValueError(f"Patient with id {patient_id} does not exist")

    def __repr__(self):
        return f"<Incident {self.date_time}, {self.description}, {self.location}>"
