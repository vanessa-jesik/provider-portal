import React, { useState, useEffect } from "react";

function ProvidersList() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await fetch("/providers");
      const provArr = await response.json();
      setProviders(provArr);
    };
    fetchProviders().catch(console.error);
  }, []);

  return (
    <div>
      <h1>Providers</h1>
      <ul>
        {providers.map((provider) => (
          <ul key={provider.id}>
            {provider.name} {provider.provider_type} {provider.badge_number}
          </ul>
        ))}
      </ul>
    </div>
  );
}

export default ProvidersList;
