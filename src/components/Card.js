import React from "react";
import CardImage from "./CardImage";
import { Link } from "gatsby";

import "./Card.scss";

const Card = ({ imageData, name, id }) => {
  return (
    <div className="card">
      <Link to={`/characters/${id}`}>
        <CardImage imageData={imageData} alt={name} />
      </Link>
      <div className="card__details">{name}</div>
    </div>
  );
};

export default Card;
