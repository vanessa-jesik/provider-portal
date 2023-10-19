import React, { Suspense, useState, useEffect } from "react";
import ProviderCard from "./ProviderCard";
import ProviderForm from "./ProviderForm";

function ProviderPage() {
  const [providers, setProviders] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  let providerCards = providers.map((provider, index) => (
    <ProviderCard
      key={provider.id}
      provider={provider}
      onUpdate={handleUpdateProvider}
      onDelete={handleDeleteProvider}
      handleNewProvider={handleNewProvider}
      handleUpdateProvider={handleUpdateProvider}
    />
  ));

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center py-4 bg-blurple-500 text-white">
        Provider Portal
      </h1>
      <Suspense>
        <h1 className="text-2xl font-semibold mb-4">Providers</h1>
        <button
          onClick={toggleForm}
          className="bg-papaya-dark text-white py-2 px-4 rounded-lg mt-4 hover:bg-papaya"
        >
          {isFormOpen ? "Close Form" : "Add a New Provider"}
        </button>
        {isFormOpen && (
          <ProviderForm
            key={providers.id}
            providers={providers}
            initialValues={{}}
            handleNewProvider={handleNewProvider}
            handleUpdateProvider={handleUpdateProvider}
            toggleForm={toggleForm}
          />
        )}
        <div className="providerList">
          <div className="grid grid-cols-3 gap-4 bg-gray-50">
            {providerCards}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
export default ProviderPage;
