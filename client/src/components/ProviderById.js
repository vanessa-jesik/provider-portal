import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddIncidentForm from "./AddIncidentForm.js";

function ProviderById() {
  const [provider, setProvider] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5555/providers/${id}`)
      .then(r => r.json())
      .then(provider => setProvider(provider))
      .catch(error => {
        console.error("Error fetching provider", error);
      });
  }, []);

  function handleSubmitNewIncident(newIncident) {
    const updatedIncidents = provider.incidents.concat(newIncident);
    const updatedProvider = { ...provider, incidents: updatedIncidents };
    setProvider(updatedProvider);
  }

  function handleDeleteIncident(incident_id) {
    fetch(`http://localhost:5555/incidents/${incident_id}`, {
      method: "DELETE",
    }).then(r => {
      if (r.ok) {
        const updatedIncidents = provider.incidents.filter(
          incident => incident.id !== incident_id
        );
        const updatedProvider = { ...provider, incidents: updatedIncidents };
        setProvider(updatedProvider);
      }
    });
  }

  return (
    <div>
      {provider ? (
        <div>
          <div>
            <h2>Selected Provider:</h2>
            <h3>{provider.name}</h3>
            <p>{provider.provider_type}</p>
            <p>Badge Number: {provider.badge_number}</p>
          </div>
          <h2>Related Incidents:</h2>
          {provider ? (
            provider.incidents.length === 0 ? (
              <p>No incidents recorded for this provider.</p>
            ) : null
          ) : null}
          <div>
            {provider.incidents.map(incident => (
              <div key={incident.id}>
                <p>Incident:</p>
                <p>{incident.date_time}</p>
                <p>Location: {incident.location}</p>
                <p>Description: {incident.description}</p>
                <p>Patient:</p>
                <p>Name: {incident.patient.name}</p>
                <p>
                  Age: {incident.patient.age} Sex: {incident.patient.sex}
                </p>
                <p>Address: {incident.patient.address}</p>
                <button>Edit Incident</button>
                <button onClick={() => handleDeleteIncident(incident.id)}>
                  Delete Incident
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <h1>Add a new incident for this provider:</h1>
      <AddIncidentForm
        provider_id={id}
        handleSubmitNewIncident={handleSubmitNewIncident}
      />
    </div>
  );
}

export default ProviderById;
