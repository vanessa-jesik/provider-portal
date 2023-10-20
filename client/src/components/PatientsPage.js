import React, { Suspense, useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import AddPatientForm from "./AddPatientForm";

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("/patients");
      const patArr = await response.json();
      setPatients(patArr);
    };
    fetchPatients().catch(console.error);
  }, []);

  function handleAddNewPatient(newPatient) {
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
  }

  // function handleDeletePatient(id) {
  //   fetch(`/patients/${id}`, { method: "DELETE" }).then((r) => {
  //     if (r.ok) {
  //       setpatients((patients) =>
  //         patients.filter((patient) => patient.id !== id)
  //       );
  //     }
  //   });
  // }

  let patientCards = patients.map(patient => (
    <PatientCard key={patient.id} patient={patient} />
  ));

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center py-4 bg-prussian-dark text-papaya-light">
        Patients
      </h1>
      <div className="text-center">
        {showAddPatientForm ? (
          <button
            onClick={() => setShowAddPatientForm(false)}
            className="bg-barn-light text-papaya px-4 py-2 mx-4 my-2 rounded-md hover:bg-fire-dark"
          >
            Close Form
          </button>
        ) : (
          <button
            onClick={() => setShowAddPatientForm(true)}
            className="bg-prussian-light text-papaya px-4 py-2 my-4 rounded-md hover:bg-prussian"
          >
            Add New Patient
          </button>
        )}
        {showAddPatientForm ? (
          <AddPatientForm
            handleAddNewPatient={handleAddNewPatient}
            setShowAddPatientForm={setShowAddPatientForm}
          />
        ) : null}
      </div>
      <Suspense>
        <div className="grid grid-cols-3 gap-4 bg-gray-50 mt-4">
          {patientCards}
        </div>
      </Suspense>
    </div>
  );
}
export default PatientsPage;
