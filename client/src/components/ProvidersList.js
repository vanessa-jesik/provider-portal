import React, { useEffect } from "react";

function ProvidersList({ providers, setProviders, onDelete }) {
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
          <li key={provider.id}>
            {provider.name} {provider.provider_type} {provider.badge_number}
            <button>Edit</button>
            <button onClick={() => onDelete(provider.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProvidersList;
