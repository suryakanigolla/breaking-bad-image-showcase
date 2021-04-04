import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const CardImage = ({ imageData, alt }) => {
  const image = getImage(imageData);
  return <GatsbyImage image={image} alt={alt}></GatsbyImage>;
};

export default CardImage;
