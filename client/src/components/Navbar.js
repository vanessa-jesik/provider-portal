import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/providers">PROVIDERS</NavLink>
      <NavLink>DOCUMENT INCIDENT</NavLink>
      <NavLink>SEARCH</NavLink>
    </nav>
  );
}

export default Navbar;
