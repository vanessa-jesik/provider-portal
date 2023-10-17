from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from config import db

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class Provider(db.Model, SerializerMixin):
    __tablename__ = 'providers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    provider_type = db.Column(db.String)
    badge_number = db.Column(db.Integer)

    # add relationship
    incidents = db.relationship(
        'Incident', back_populates="provider", cascade="all, delete-orphan")
    patients = association_proxy("incidents", "patient")

    # add serialization rules
    serialize_rules = ('-incidents.provider',)

    def __repr__(self):
        return f'<Provider {self.name}, {self.provider_type}, {self.badge_number}>'


class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    sex = db.Column(db.String)
    address = db.Column(db.String)

    # add relationship
    incidents = db.relationship(
        'Incident', back_populates="patient", cascade="all, delete-orphan")
    providers = association_proxy("incidents", "provider")

    # add serialization rules
    serialize_rules = ('-incidents.patient', )

    def __repr__(self):
        return f'<Patient {self.name}, {self.age}, {self.sex}, {self.address}>'


class RestaurantPizza(db.Model, SerializerMixin):
    __tablename__ = 'restaurant_pizzas'

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizzas.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    # add relationships
    pizza = db.relationship("Pizza", back_populates="restaurant_pizzas")
    restaurant = db.relationship(
        "Restaurant", back_populates="restaurant_pizzas")

    # add serialization rules
    serialize_rules = ('-restaurant.restaurant_pizzas',
                       '-pizza.restaurant_pizzas')

    # add validation
    @validates('price')
    def validate_price(self, key, price):
        if not 1 <= price <= 30:
            raise ValueError("Price must be between 1 and 30.")
        return price

    def __repr__(self):
        return f'<RestaurantPizza ${self.price}>'
