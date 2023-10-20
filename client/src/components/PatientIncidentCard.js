import React, { useState } from "react";

function PatientIncidentCard({
  incident,
  // handleDeleteIncident,
  // handleUpdateIncident,
}) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { id, date_time, description, location, provider } = incident;

  return (
    <div className="bg-white p-4 m-6 rounded-lg shadow-lg">
      <p className="text-lg font-bold px-4 pb-2">Incident:</p>
      <p>{date_time}</p>
      <p>
        <span className="font-bold">Location: </span>
        {location}
      </p>
      <p>
        <span className="font-bold">Description: </span>
        {description}
      </p>
      <div className="p-4">
        <p>
          <span className="font-bold pl-4">Provider:</span>
        </p>
        <p>
          <span className="font-semibold">Name: </span>
          {provider.name}
        </p>
        <p>
          {provider.provider_type} <span className="font-semibold ml-6">#</span>
          {provider.badge_number}
        </p>
      </div>

      {/* {showUpdateForm ? (
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
      </button> */}
      {/* {showUpdateForm ? (
        <UpdateIncidentForm
          incident={incident}
          patients={patients}
          handleUpdateIncident={handleUpdateIncident}
          setShowUpdateForm={setShowUpdateForm}
        />
      ) : null} */}
    </div>
  );
}

export default PatientIncidentCard;
