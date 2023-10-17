#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Patient, Provider, Incident

fake = Faker()


def create_patients():
    patients = []
    for _ in range(20):
        p = Patient(
            name=fake.name(),
            age=randint(1, 115),
            sex=fake.random_element(elements=('Male', 'Female')),
            address=fake.address(),
        )
        patients.append(p)
    return patients


def create_providers():
    providers = []
    for _ in range(10):
        p = Provider(
            name=fake.name(),
            provider_type=fake.random_element(
                elements=('Paramedic', 'Fire Fighter', 'EMT', 'Nurse')),
            badge_number=randint(10000, 99999),
        )
        providers.append(p)
    return providers


def create_incidents(patients, providers):
    incidents = []
    for _ in range(10):
        i = Incident(
            date_time=fake.date_time(),
            description=fake.sentence(nb_words=10),
            location=fake.address(),
            provider=rc(providers),
            patient=rc(patients),
        )
        incidents.append(i)
    return incidents


if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        Patient.query.delete()
        Provider.query.delete()
        Incident.query.delete()

        print("Seeding patients...")
        patients = create_patients()
        db.session.add_all(patients)
        db.session.commit()

        print("Seeding providers...")
        providers = create_providers()
        db.session.add_all(providers)
        db.session.commit()

        print("Seeding incidents...")
        incidents = create_incidents(patients, providers)
        db.session.add_all(incidents)
        db.session.commit()

        print("Done seeding!")
