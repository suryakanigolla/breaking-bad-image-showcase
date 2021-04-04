import React from "react";
import { graphql, Link } from "gatsby";
import "./Character.scss";

import CardImage from "../components/CardImage";
import IndexLayout from "../layouts/IndexLayout";

const Character = ({ data }) => {
  const character = data.allCharacter.edges[0].node;

  return (
    <IndexLayout>
      <div className="container">
        <div className="character">
          <div className="character__image">
            <CardImage
              imageData={character.image}
              alt={character.name}
            ></CardImage>
          </div>
          <div className="character__details">
            <h2>{character.name}</h2>
            <div className="character__details__body">
              <div className="details--half">
                <span>
                  <h3>Nickame: </h3>
                  {character.nickname}
                </span>
                <span>
                  <h3>Birthday: </h3>
                  {character.birthday}
                </span>
                <span>
                  <h3>Occupation: </h3>
                  {character.occupation.join(", ")}
                </span>
              </div>
              <div className="details--half">
                <span>
                  <h3>Portrayed: </h3>
                  {character.portrayed}
                </span>
                <span>
                  <h3>Appeared: </h3>
                  {character.category}
                </span>
                <span>
                  <h3>Status: </h3>
                  {character.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
};

export const query = graphql`
  query($id: String!) {
    allCharacter(filter: { id: { eq: $id } }) {
      edges {
        node {
          name
          birthday
          category
          nickname
          occupation
          portrayed
          status
          image {
            childImageSharp {
              gatsbyImageData(height: 400, width: 300, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;

export default Character;
