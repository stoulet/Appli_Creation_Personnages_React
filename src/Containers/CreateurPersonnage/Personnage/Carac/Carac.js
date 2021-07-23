import React from "react";
import classes from "./Carac.module.css";

const Carac = (props) => {
    let carre = [];
    for (let i = 0; i < props.nbPoints; i++) {
        carre.push(<div key={i} className={classes.points}></div>)
    }
    return (
        <div className="row no-gutters">
            <div className={[classes.signe, classes.moins, "col-4"].join(' ')} onClick={props.moins}></div>
            <div className="col-4">{props.children} </div> {carre}
            <div className={[classes.signe, classes.plus, "col-4"].join(' ')} onClick={props.plus}></div>
        </div>
    )
};

export default Carac;