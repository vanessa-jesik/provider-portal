import React from "react";
import { Link } from "react-router-dom";

function ProviderCard({
  provider: { id, name, badge_number, provider_type },
  onDelete,
}) {
  return (
    <div className="providercard">
      <h3>{name}</h3>
      <p>
        {badge_number} {provider_type}
      </p>
      <Link to={`/providers/${id}`}>View Provider</Link>
      <span>
        {" "}
        <button>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </span>
    </div>
  );
}

export default ProviderCard;
