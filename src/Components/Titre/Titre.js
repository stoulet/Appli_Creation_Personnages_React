import React from "react";

const Titre = (props) => (
    <h1 className="text-center bg-primary text-white border border-dark rounded p-2 mt-2">{props.children}</h1>
);

export default Titre;