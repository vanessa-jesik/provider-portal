import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Navbar from "./Navbar.js";
import ProviderPage from "./ProviderPage.js";
import ProviderById from "./ProviderById.js";
import PatientPage from "./PatientPage.js";

function App() {
  return (
    <div className="selection:bg-air-light selection:text-papaya-light">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/providers" element={<ProviderPage />} />
          <Route path="/providers/:id" element={<ProviderById />} />
          <Route path="/patients" element={<PatientPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
