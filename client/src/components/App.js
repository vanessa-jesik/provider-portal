import React from "react";
import { Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./Home.js";
import Navbar from "./Navbar.js";
import ProvidersPage from "./ProvidersPage.js";
import ProviderById from "./ProviderById.js";
import PatientsPage from "./PatientsPage.js";
import Search from "./Search.js";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="selection:bg-air-light selection:text-papaya-light">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/providers/:id" element={<ProviderById />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </div>
    </LocalizationProvider>
  );
}

export default App;
