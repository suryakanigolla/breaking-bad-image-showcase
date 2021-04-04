import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Gallery.scss"

const Gallery = ({ characters, perPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
    setNumPages(Math.ceil(characters.length / perPage));
  }, []);

  const pageNumbers = [];
  for (let i = 0; i < numPages; i++) {
    pageNumbers.push(i + 1);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        className={currentPage === number ? "active" : ""}
        onClick={(e) => handleClickPageNumber(e)}
      >
        {number}
      </li>
    );
  });

  const indexOfLastCharacter = currentPage * perPage;
  const indexOfFirstCharacter = indexOfLastCharacter - perPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const renderCharacters = currentCharacters.map((item, index) => (
    <Card imageData={item.node.image} name={item.node.name} key={index}></Card>
  ));


  const handleClick = (e) => {
    if (e.target.id === "prev" && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (e.target.id === "next" && currentPage !== numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleClickPageNumber = (e) => {
      setCurrentPage(Number(e.target.id));
  }

  return (
    <div className="gallery">
      <div className="gallery__body">{renderCharacters}</div>
      <div className="gallery__footer">
        <span>
          <button onClick={(e) => handleClick(e)} id="prev">
            Prev
          </button>
        </span>
        <ul className="list">{renderPageNumbers}</ul>
        <span>
          <button onClick={(e) => handleClick(e)} id="next">
            Next
          </button>
        </span>
      </div>
    </div>
  );
};

export default Gallery;
