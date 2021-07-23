import React from "react";

const Bouton = (props) => {
    const btnCSS = `btn ${props.typeBtn}`;
    return <button className={btnCSS} onClick={props.clic}>{props.children}</button>
};

export default Bouton;