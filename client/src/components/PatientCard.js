import React from "react";
import { Link } from "react-router-dom";

function PatientCard({ patient: { id, name, age, sex, address }, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">
        {name} {age} {sex} {address}
      </p>
      <Link
        to={`/patients/${id}`}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        View Patient
      </Link>
      <span className="mt-2">
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-yellow-700">
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </span>
    </div>
  );
}

export default PatientCard;
