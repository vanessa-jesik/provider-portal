import React, { useState } from "react";
import ProvidersList from "./ProvidersList";
import ProviderForm from "./ProviderForm";

function ProviderPage() {
  const [providers, setProviders] = useState([]);

  const handleNewProvider = (newProvider) => {
    setProviders([...providers, newProvider]);
  };

  function handleDeleteProvider(id) {
    fetch(`/providers/${id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setProviders((providers) =>
          providers.filter((provider) => provider.id !== id)
        );
      }
    });
  }

  return (
    <div>
      <h1>Provider Portal</h1>
      <ProvidersList
        providers={providers}
        setProviders={setProviders}
        handleNewProvider={handleNewProvider}
        onDelete={handleDeleteProvider}
      />
      <ProviderForm handleNewProvider={handleNewProvider} />
    </div>
  );
}

export default ProviderPage;
