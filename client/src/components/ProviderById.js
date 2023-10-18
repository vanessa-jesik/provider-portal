import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IncidentForm from "./IncidentForm.js";

function ProviderById() {
  const [provider, setProvider] = useState();
  const [refreshPage, setRefreshPage] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5555/providers/${id}`)
      .then(r => r.json())
      .then(provider => setProvider(provider))
      .catch(error => {
        console.error("Error fetching provider", error);
      });
  }, [refreshPage]);

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
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <IncidentForm
        provider_id={id}
        refreshPage={refreshPage}
        setRefreshPage={setRefreshPage}
      />
    </div>
  );
}

export default ProviderById;
