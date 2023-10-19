import React from "react";
import { Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./Home.js";
import Navbar from "./Navbar.js";
import ProviderPage from "./ProviderPage.js";
import ProviderById from "./ProviderById.js";
import PatientPage from "./PatientPage.js";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
    </LocalizationProvider>
  );
}

export default App;
