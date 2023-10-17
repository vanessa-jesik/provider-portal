import React, { useState, useEffect } from "react";
import ProvidersList from "./ProvidersList";
import ProviderForm from "./ProviderForm";

function ProviderPage() {
  const [providers, setProviders] = useState([]);

  const handleNewProvider = (newProvider) => {
    setProviders([...providers, newProvider]);
  };

  return (
    <div>
      <h1>Provider Portal</h1>
      <ProvidersList
        providers={providers}
        setProviders={setProviders}
        handleNewProvider={handleNewProvider}
      />
      <ProviderForm handleNewProvider={handleNewProvider} />
    </div>
  );
}

export default ProviderPage;
