import React from "react";
import IndexLayout from "../layouts/IndexLayout";
import { Link } from "gatsby";
import "./style.scss"

const IndexPage = () => {
  return (
    <IndexLayout>
      <div className="index">
        <Link to="/characters">
          <button>Go to Image Showcase</button>
        </Link>
      </div>
    </IndexLayout>
  );
};

export default IndexPage;
