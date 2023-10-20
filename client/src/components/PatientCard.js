import React from "react";
import { Link } from "react-router-dom";

function PatientCard({ patient: { id, name, age, sex, address }, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">
        {name} {age}yo {sex}
      </p>
      <p className="text-gray-600 mb-2">{address}</p>
      <Link
        to={`/patients/${id}`}
        className="bg-prussian-light text-white py-2 px-4 mr-2 rounded-lg hover:bg-air-dark"
      >
        View Incidents
      </Link>
      <span className="mt-2">
        <button
          onClick={() => onDelete(id)}
          className="bg-barn-light text-white py-1.5 px-4 rounded-lg hover:bg-barn-dark"
        >
          Delete
        </button>
      </span>
    </div>
  );
}

export default PatientCard;
