import React from "react";
import "./IndexLayout.scss";

const IndexLayout = ({children}) => {
    return(
        <div className="indexlayout">
            <h1>Image Showcase</h1>
            {children}
        </div>
    );
} 

export default IndexLayout;