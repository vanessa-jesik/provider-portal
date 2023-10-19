import React, { useState } from "react";
import UpdateIncidentForm from "./UpdateIncidentForm.js";

function IncidentCard({ incident, handleDeleteIncident }) {
  const [showForm, setShowForm] = useState(false);
  const { id, date_time, description, location, patient } = incident;

  return (
    <div>
      <p>Incident:</p>
      <p>{date_time}</p>
      <p>Location: {location}</p>
      <p>Description: {description}</p>
      <p>Patient:</p>
      <p>Name: {patient.name}</p>
      <p>
        Age: {patient.age} Sex: {patient.sex}
      </p>
      <p>Address: {patient.address}</p>
      <button onClick={() => setShowForm(!showForm)}>Edit Incident</button>
      <button onClick={() => handleDeleteIncident(id)}>Delete Incident</button>
      {showForm ? <UpdateIncidentForm incident_id={id} /> : null}
    </div>
  );
}

export default IncidentCard;
