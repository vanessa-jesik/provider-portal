import React from "react";
import { NavLink } from "react-router-dom";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg)$/)
);

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <NavLink to="/" className="text-white hover:underline">
          HOME
        </NavLink>
        <NavLink to="/providers" className="text-white hover:underline">
          PROVIDERS
        </NavLink>
        <NavLink className="text-white hover:underline">
          DOCUMENT INCIDENT
        </NavLink>
        <NavLink to="/patients" className="text-white hover:underline">
          PATIENTS
        </NavLink>
        <NavLink className="text-white hover:underline">SEARCH</NavLink>
      </div>
      <img src={images["EMS.jpeg"]} alt="EMS image" className="h-16" />
    </nav>
  );
}

export default Navbar;
