import React, { useState } from "react";
import Card from "./Card";

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
        onClick={handleClick}
      >
        {number}
      </li>
    );
  });

  const renderCharacters = characters.map((item, index) => (
    <Card imageData={item.node.image} name={item.node.name} key={index}></Card>
  ));

  const handleClick = (e) => {
    if (e.target.id === "prev" && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (e.target.id === "next" && currentPage !== numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

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
