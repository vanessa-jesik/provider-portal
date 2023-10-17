import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.js";
import ProviderPage from "./ProviderPage.js";
import ProviderById from "./ProviderById.js";

function App() {
  return (
    <div>
      <Navbar />
      <h1>Project Client!!!</h1>
      <main>
        <Routes>
          <Route path="/" element={<ProviderPage />} />
          <Route path="/providers/:id" element={<ProviderById />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
