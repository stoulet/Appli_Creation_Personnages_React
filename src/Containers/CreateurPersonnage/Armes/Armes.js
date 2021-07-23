import React from "react";
import Arme from "./Arme/Arme";
import imgArc from "../../../assets/images/armes/arc.png";
import imgEpee from "../../../assets/images/armes/epee.png";
import imgFleau from "../../../assets/images/armes/fleau.png";
import imgHache from "../../../assets/images/armes/hache.png";

const Armes = (props) => (
    <div className="row no-gutters text-center">
        {props.listeArmes.map(arme => {
            let imgArme;
            switch (arme) {
                case "arc": imgArme = imgArc;
                    break;
                case "epee": imgArme = imgEpee;
                    break;
                case "fleau": imgArme = imgFleau;
                    break;
                case "hache": imgArme = imgHache;
                    break;
            }
            return (
                <div className="col-3" key={arme}>
                    <Arme
                        imageArme={imgArme}
                        isCurrentArme={props.currentArme === arme}
                        clic={() => props.changeArme(arme)}
                    >{arme}</Arme>
                </div>
            );
        })}
    </div>
);

export default Armes;