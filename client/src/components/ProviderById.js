import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IncidentCard from "./IncidentCard.js";
import AddIncidentForm from "./AddIncidentForm.js";

function ProviderById() {
  const [provider, setProvider] = useState();
  const [patients, setPatients] = useState([]);
  const { id } = useParams();
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5555/providers/${id}`)
      .then(r => r.json())
      .then(provider => setProvider(provider))
      .catch(error => {
        console.error("Error fetching provider", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5555/patients")
      .then(r => r.json())
      .then(patients => setPatients(patients))
      .catch(error => {
        console.error("Error fetching patients", error);
      });
  }, []);

  function handleSubmitNewIncident(newIncident) {
    const updatedIncidents = provider.incidents.concat(newIncident);
    const updatedProvider = { ...provider, incidents: updatedIncidents };
    setProvider(updatedProvider);
  }

  function handleUpdateIncident(updatedIncident) {
    const updatedIncidents = provider.incidents.map(incident => {
      if (incident.id === updatedIncident.id) {
        return updatedIncident;
      }
      return incident;
    });
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
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-500">
              Selected Provider:
            </h2>
            <h3 className="text-lg font-semibold">{provider.name}</h3>
            <p className="text-gray-600">{provider.provider_type}</p>
            <p className="text-gray-600">
              Badge Number: {provider.badge_number}
            </p>
          </div>
          <h2 className="text-lg font-semibold">Related Incidents:</h2>
          {provider ? (
            provider.incidents.length === 0 ? (
              <p>Nio incidents recorded for this provder.</p>
            ) : null
          ) : null}
          <div>
            {provider.incidents.map(incident => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                handleDeleteIncident={handleDeleteIncident}
                handleUpdateIncident={handleUpdateIncident}
                patients={patients}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}

      {showAddForm ? (
        <button
          onClick={() => setShowAddForm(false)}
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900"
        >
          Close form.
        </button>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900"
        >
          Add new incident for this provider:
        </button>
      )}

      {showAddForm ? (
        <AddIncidentForm
          provider_id={id}
          patients={patients}
          handleSubmitNewIncident={handleSubmitNewIncident}
        />
      ) : null}
    </div>
  );
}

export default ProviderById;
