import React, { Suspense, useState, useEffect } from "react";
import ProviderCard from "./ProviderCard";
import ProviderForm from "./ProviderForm";

function ProviderPage() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await fetch("/providers");
      const provArr = await response.json();
      setProviders(provArr);
    };
    fetchProviders().catch(console.error);
  }, []);

  const handleNewProvider = (newProvider) => {
    setProviders([...providers, newProvider]);
  };

  const handleUpdateProvider = (editedProvider) => {
    // Find and update the provider in the providers list
    setProviders((prevProviders) =>
      prevProviders.map((provider) =>
        provider.id === editedProvider.id ? editedProvider : provider
      )
    );
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

  let providerCards = providers.map((provider) => (
    <ProviderCard
      key={provider.id}
      provider={provider}
      onUpdate={handleUpdateProvider}
      onDelete={handleDeleteProvider}
      handleNewProvider={handleNewProvider}
    />
  ));

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center py-4 bg-blurple-500 text-white">
        Provider Portal
      </h1>
      <Suspense>
        <h1 className="text-2xl font-semibold mb-4">Providers</h1>
        <div className="providerList">{providerCards}</div>
      </Suspense>
      <ProviderForm handleNewProvider={handleNewProvider} />
    </div>
  );
}
export default ProviderPage;
