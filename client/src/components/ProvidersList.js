import React, { useState, useEffect } from "react";

function ProvidersList() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const providerDB = "http://127.0.0.1:5555/providers";

    fetch(providerDB)
      .then((response) => response.json())
      .then((data) => {
        setProviders(data);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
      });
  }, []);

  return (
    <div>
      <h1>Providers</h1>
      <ul>
        {providers.map((provider) => (
          <li key={provider.id}>{provider.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProvidersList;
