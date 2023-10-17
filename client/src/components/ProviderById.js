import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

function ProviderById() {
  const [provider, setProvider] = useState();
  const [incidents, setIncidents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5555/providers/${id}`)
      .then(r => r.json())
      .then(provider => setProvider(provider), console.log(provider))
      .catch(error => {
        console.error("Error fetching provider", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5555/incidents")
      .then(r => r.json())
      .then(incidents => setIncidents(incidents))
      .catch(error => {
        console.error("Error fetching incidents:", error);
      });
  }, []);

  const incidentsToDisplay = incidents.filter(
    incident => id == incident.provider_id
  );
  console.log(provider);
  console.log(incidents);
  console.log(incidentsToDisplay);
  return (
    <div>
      <h2>Selected Provider:</h2>
      {provider ? (
        <>
          <h3>{provider.name}</h3>
          <p>{provider.provider_type}</p>
          <p>{provider.badge_number}</p>
        </>
      ) : null}
    </div>
  );
}

export default ProviderById;
