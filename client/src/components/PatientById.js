import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PatientIncidentCard from "./PatientIncidentCard";
import { useNavigate } from "react-router-dom";

function PatientById() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5555/patients/${id}`)
      .then(r => r.json())
      .then(patient => {
        setPatient(patient);
      })
      .catch(error => {
        console.error("Error fetching patient", error);
      });
  }, [id]);

  // function handleUpdateIncident(updatedIncident) {
  //   const updatedIncidents = provider.incidents.map(incident => {
  //     if (incident.id === updatedIncident.id) {
  //       return updatedIncident;
  //     }
  //     return incident;
  //   });
  //   const updatedProvider = { ...provider, incidents: updatedIncidents };
  //   setProvider(updatedProvider);
  // }

  // function handleDeleteIncident(incident_id) {
  //   fetch(`http://localhost:5555/incidents/${incident_id}`, {
  //     method: "DELETE",
  //   }).then(r => {
  //     if (r.ok) {
  //       const updatedIncidents = provider.incidents.filter(
  //         incident => incident.id !== incident_id
  //       );
  //       const updatedProvider = { ...provider, incidents: updatedIncidents };
  //       setProvider(updatedProvider);
  //     }
  //   });
  // }

  return (
    <div>
      <button
        onClick={() => {
          navigate("/patients");
        }}
        className="bg-barn text-papaya px-4 py-2 mx-4 m-2 rounded-md hover:bg-barn-dark"
      >
        View All Patients
      </button>
      {patient ? (
        <div>
          <div className="bg-air-light p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-black">
              Selected Patient:
            </h2>
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className="text-gray-600">Age: {patient.age}</p>
            <p className="text-gray-600">Sex: {patient.sex}</p>
            <p className="text-gray-600">Address: {patient.address}</p>
          </div>
          {patient ? (
            patient.incidents.length === 0 ? (
              <p className="px-8 py-2">
                No incidents recorded for this patient.
              </p>
            ) : null
          ) : null}
          <div>
            {patient.incidents.map(incident => (
              <PatientIncidentCard
                key={incident.id}
                incident={incident}
                // handleDeleteIncident={handleDeleteIncident}
                // handleUpdateIncident={handleUpdateIncident}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default PatientById;
