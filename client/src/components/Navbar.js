import React from "react";
import { NavLink, useLocation } from "react-router-dom";

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
  const location = useLocation();

  return (
    <nav className="bg-prussian-light p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <NavLink
          to="/"
          className={`text-papaya hover:underline ${
            location.pathname === "/" ? "bg-barn" : ""
          }`}
        >
          HOME
        </NavLink>
        <NavLink
          to="/providers"
          className={`text-papaya hover:underline ${
            location.pathname.startsWith("/providers") ? "bg-barn" : ""
          }`}
        >
          PROVIDERS
        </NavLink>
        <NavLink className="text-papaya hover:underline">
          DOCUMENT INCIDENT
        </NavLink>
        <NavLink
          to="/patients"
          className={`text-papaya hover:underline ${
            location.pathname.startsWith("/patients") ? "bg-barn" : ""
          }`}
        >
          PATIENTS
        </NavLink>
        <NavLink
          to="/search"
          className={`text-papaya hover:underline ${
            location.pathname === "/search" ? "bg-barn" : ""
          }`}
        >
          SEARCH
        </NavLink>
      </div>
      <img src={images["EMS.jpeg"]} alt="EMS image" className="h-16" />
    </nav>
  );
}

export default Navbar;
