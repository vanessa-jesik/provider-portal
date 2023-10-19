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
    <nav className="bg-prussian-light p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <NavLink to="/" className="text-papaya hover:underline">
          HOME
        </NavLink>
        <NavLink to="/providers" className="text-papaya hover:underline">
          PROVIDERS
        </NavLink>
        <NavLink className="text-papaya hover:underline">
          DOCUMENT INCIDENT
        </NavLink>
        <NavLink to="/patients" className="text-papaya hover:underline">
          PATIENTS
        </NavLink>
        <NavLink className="text-papaya hover:underline">SEARCH</NavLink>
      </div>
      <img src={images["EMS.jpeg"]} alt="EMS image" className="h-16" />
    </nav>
  );
}

export default Navbar;
