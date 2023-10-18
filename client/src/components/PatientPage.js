import React, { Suspense, useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import PatientForm from "./PatientForm";

function PatientPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("/patients");
      const patArr = await response.json();
      setPatients(patArr);
    };
    fetchPatients().catch(console.error);
  }, []);

  let patientCards = patients.map((patient) => (
    <PatientCard key={patient.id} patient={patient} />
  ));

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center py-4 bg-blurple-500 text-white">
        Patients
      </h1>
      <Suspense>
        <h1 className="text-2xl font-semibold mb-4">Patients</h1>
        <div className="providerList">{patientCards}</div>
      </Suspense>
      <PatientForm />
    </div>
  );
}
export default PatientPage;
