import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IncidentCard from "./IncidentCard.js";

function PatientById() {
  const [patient, setPatient] = useState(null);
  //   const [incidents, setIncidents] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5555/patients/${id}`)
      .then((r) => r.json())
      .then((patient) => setPatient(patient))
      .catch((error) => {
        console.error("Error fetching patient", error);
      });
  }, [id]);

  //   useEffect(() => {
  //     fetch("http://localhost:5555/incidents")
  //       .then((r) => r.json())
  //       .then((incidents) => setIncidents(incidents))
  //       .catch((error) => {
  //         console.error("Error fetching incidents", error);
  //       });
  //   }, []);

  return (
    <div>
      {patient ? (
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-500">
              Selected Patient:
            </h2>
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className="text-gray-600">Age: {patient.age}</p>
            <p className="text-gray-600">Sex: {patient.sex}</p>
            <p className="text-gray-600">Address: {patient.address}</p>
          </div>
          {/* <h2 className="text-lg font-semibold">Related Incidents:</h2>
          {patient.incidents ? (
            patient.incidents.length === 0 ? (
              <p>No incidents recorded for this patient.</p>
            ) : (
              <div>
                {patient.incidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            )
          ) : null} */}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default PatientById;
