import React, { Suspense, useState, useEffect } from "react";
import PatientCard from "./PatientCard";

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

  // const handleNewPatient = (newPatient) => {
  //   setPatients([...patients, newPatient]);
  // };

  function handleDeletePatient(id) {
    fetch(`/patients/${id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setPatients((patients) =>
          patients.filter((patient) => patient.id !== id)
        );
      }
    });
  }

  let patientCards = patients.map((patient) => (
    <PatientCard
      key={patient.id}
      patient={patient}
      onDelete={handleDeletePatient}
    />
  ));

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center py-4 bg-prussian-dark text-white">
        Patients
      </h1>
      <Suspense>
        <div className="grid grid-cols-3 gap-4 bg-gray-50 mt-4">
          {patientCards}
        </div>
      </Suspense>
    </div>
  );
}
export default PatientPage;
