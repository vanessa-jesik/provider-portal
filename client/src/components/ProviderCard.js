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
    setIsEditing(!isEditing);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProvider({ id, name, badge_number, provider_type });
    console.log("the handleEditClick function ran");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProvider({});
    console.log("the handleCancelClick function ran");
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">
        {provider_type}, #{badge_number}
      </p>
      <span className="mt-2">
        <Link
          to={`/providers/${id}`}
          className="bg-blurple-500 text-white py-2 px-4 rounded-lg hover:bg-blurple-700"
        >
          View Provider
        </Link>
        <button
          onClick={handleEditClick}
          className="bg-blurple-600 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blurple-800"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-blurple-700 text-white py-2 px-4 rounded-lg hover-bg-blurple-900"
        >
          Delete
        </button>
      </span>
      {isEditing && editedProvider ? (
        <div>
          <ProviderForm
            initialValues={editedProvider}
            isEditing={isEditing}
            handleNewProvider={handleNewProvider}
            handleUpdateProvider={handleUpdateProvider}
            provider={editedProvider}
            toggleEdit={handleToggleEdit}
          />
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : null}
    </div>
  );
}

export default ProviderCard;
