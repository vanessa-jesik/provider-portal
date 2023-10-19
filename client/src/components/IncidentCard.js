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
    <div className="bg-white p-4 m-6 rounded-lg shadow-lg">
      <p className="text-lg font-bold px-4 pb-2">Incident:</p>
      <p>{date_time}</p>
      <p>
        <span class="font-bold">Location: </span>
        {location}
      </p>
      <p>
        <span class="font-bold">Description: </span>
        {description}
      </p>
      <div className="p-4">
        <p>
          <span class="font-bold pl-4">Patient:</span>
        </p>
        <p>
          <span class="font-semibold">Name: </span>
          {patient.name}
        </p>
        <p>
          <span class="font-semibold ">Age: </span>
          {patient.age} <span class="font-semibold ml-6">Sex: </span>
          {patient.sex}
        </p>
        <p>
          <span class="font-semibold ">Address: </span>
          {patient.address}
        </p>
      </div>

      {showUpdateForm ? (
        <button
          onClick={() => setShowUpdateForm(false)}
          className="bg-prussian-light text-papaya px-4 py-2 mx-4 my-2 rounded-md hover:bg-prussian"
        >
          Close Form
        </button>
      ) : (
        <button
          onClick={() => setShowUpdateForm(true)}
          className="bg-air text-papaya px-4 py-2 mx-4 my-2 rounded-md hover:bg-air-dark"
        >
          Edit Incident
        </button>
      )}

      <button
        onClick={() => handleDeleteIncident(id)}
        className="bg-barn-light text-papaya px-4 py-2 mx-4 my-2 rounded-md hover:bg-fire-dark"
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
