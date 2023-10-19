import React, { useState } from "react";
import UpdateIncidentForm from "./UpdateIncidentForm.js";

function IncidentCard({
  incident,
  handleDeleteIncident,
  handleUpdateIncident,
  patients,
}) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
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

      {showUpdateForm ? (
        <button onClick={() => setShowUpdateForm(false)}>Close Form</button>
      ) : (
        <button onClick={() => setShowUpdateForm(true)}>Edit Incident</button>
      )}

      <button onClick={() => handleDeleteIncident(id)}>Delete Incident</button>
      {showUpdateForm ? (
        <UpdateIncidentForm
          incident={incident}
          patients={patients}
          handleUpdateIncident={handleUpdateIncident}
          setShowUpdateForm={setShowUpdateForm}
        />
      ) : null}
    </div>
  );
}

export default IncidentCard;
