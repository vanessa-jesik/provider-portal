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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="font-bold">Incident:</p>
      <p>{date_time}</p>
      <p>
        <span class="font-semibold">Location: </span>
        {location}
      </p>
      <p>
        <span class="font-semibold">Description: </span>
        {description}
      </p>
      <p>
        <span class="font-semibold">Patient:</span>
      </p>
      <p>Name: {patient.name}</p>
      <p>
        Age: {patient.age} Sex: {patient.sex}
      </p>
      <p>Address: {patient.address}</p>

      {showUpdateForm ? (
        <button
          onClick={() => setShowUpdateForm(false)}
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900"
        >
          Close Form
        </button>
      ) : (
        <button
          onClick={() => setShowUpdateForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Edit Incident
        </button>
      )}

      <button
        onClick={() => handleDeleteIncident(id)}
        className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900"
      >
        Delete Incident
      </button>
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
