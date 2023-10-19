import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProviderForm from "./ProviderForm";

function ProviderCard({
  provider: { id, name, badge_number, provider_type },
  onDelete,
  handleNewProvider,
  handleUpdateProvider,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProvider, setEditedProvider] = useState({});

  const handleToggleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedProvider({});
    } else {
      setIsEditing(true);
      setEditedProvider({ id, name, badge_number, provider_type });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-prussian-dark mb-2">
        {provider_type}, #{badge_number}
      </p>
      <span className="mt-2">
        <Link
          to={`/providers/${id}`}
          className="bg-prussian-light text-white py-2 px-4 mr-2 rounded-lg hover:bg-air-dark"
        >
          View Provider
        </Link>
        <button
          onClick={handleToggleEdit}
          className="bg-air-dark text-white py-1.5 px-4 rounded-lg mr-2 hover:bg-air-light"
        >
          {isEditing ? "Hide Edit" : "Edit"}
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-barn-light text-white py-1.5 px-4 rounded-lg hover:bg-barn-dark"
        >
          Delete
        </button>
      </span>
      {isEditing && editedProvider ? (
        <div className="text-center">
          <ProviderForm
            initialValues={editedProvider}
            isEditing={isEditing}
            handleNewProvider={handleNewProvider}
            handleUpdateProvider={handleUpdateProvider}
            provider={editedProvider}
            toggleEdit={handleToggleEdit}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ProviderCard;
