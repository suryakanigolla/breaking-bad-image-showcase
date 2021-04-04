import React from "react";
import CardImage from "./CardImage";
import "./Card.scss";

const Card = ({ imageData, name }) => {
  return (
    <div className="card">
      <CardImage imageData={imageData} alt={name} />
      <div className="card__details">{name}</div>
    </div>
  );
};

export default Card;
