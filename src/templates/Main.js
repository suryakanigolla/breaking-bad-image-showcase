import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";

import Gallery from "../components/Gallery";
import IndexLayout from "../layouts/IndexLayout";
import Filter from "../components/Filter";

const Main = ({ data }) => {
  const [selectedCharacters, setSelectedCharacters] = useState(
    data.allCharacter.edges
  );

  const filters = [
    {
      filter: "appearance",
      subFilter: [1, 2, 3, 4, 5],
    },
    {
      filter: "category",
      subFilter: ["Breaking Bad", "Better Call Saul"],
    },
    {
      filter: "status",
      subFilter: ["Deceased", "Alive", "Presumed dead"],
    },
  ];

  const handleFilterChange = (filter, subFilter) => {
    var tempArray = [];
    console.log("hi");
    if (filter !== "" && subFilter !== "") {
      if (filter === "appearance") {
        for (var i = 0; i < data.allCharacter.edges.length; i++) {
          if (
            data.allCharacter.edges[i].node[filter].includes(Number(subFilter))
          ) {
            tempArray.push(data.allCharacter.edges[i]);
          }
        }
      }
      else {
        for (var i = 0; i < data.allCharacter.edges.length; i++) {
            if (
              data.allCharacter.edges[i].node[filter].includes(subFilter)
            ) {
              tempArray.push(data.allCharacter.edges[i]);
            }
          }
      }
    } else {
      tempArray = data.allCharacter.edges;
    }
    setSelectedCharacters(tempArray);
  };

  useEffect(() => {
    console.log(selectedCharacters);
  });

  return (
    <IndexLayout>
      <Filter filters={filters} onFilterChange={handleFilterChange}></Filter>
      <Gallery characters={selectedCharacters} perPage={9}></Gallery>
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
