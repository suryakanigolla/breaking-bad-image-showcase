import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";

import Gallery from "../components/Gallery";
import IndexLayout from "../layouts/IndexLayout";

const Main = ({ data }) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const characters = data.allCharacter.edges;
  useEffect(() => {
    console.log(data.allCharacter.edges);
  });

  return (
    <IndexLayout>
      <Gallery characters={characters} perPage={9}></Gallery>
    </IndexLayout>
  );
};

export const query = graphql`
  query MyQuery {
    allCharacter {
      edges {
        node {
          image {
            childImageSharp {
              gatsbyImageData(height: 400, width: 300, placeholder: BLURRED)
            }
          }
          name
          id
          category
          appearance
          status
        }
      }
    }
  }
`;

export default Main;
