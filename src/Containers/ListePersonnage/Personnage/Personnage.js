import React from "react";
import imagePlayer1 from "../../../assets/images/persos/player1.png";
import imagePlayer2 from "../../../assets/images/persos/player2.png";
import imagePlayer3 from "../../../assets/images/persos/player3.png";
import imgArc from "../../../assets/images/armes/arc.png";
import imgEpee from "../../../assets/images/armes/epee.png";
import imgFleau from "../../../assets/images/armes/fleau.png";
import imgHache from "../../../assets/images/armes/hache.png";

const personnage = (props) => {
    let imgPerso = "";
    if (props.image === 1) imgPerso = imagePlayer1;
    else if (props.image === 2) imgPerso = imagePlayer2;
    else if (props.image === 3) imgPerso = imagePlayer3;

    let imgArme = "";
    if (props.arme === "arc") imgArme = imgArc;
    else if (props.arme === "epee") imgArme = imgEpee;
    else if (props.arme === "fleau") imgArme = imgFleau;
    else if (props.arme === "hache") imgArme = imgHache;


    return (
        <div className="row no-gutters">
            <div className="col-6"><img src={imgPerso} alt="Personnage" /></div>
            <div className="col-6">Force : {props.force} <br />
                Agilite : {props.agilite} <br />
                Intelligence: {props.intelligence} <br />
                <img src={imgArme} alt="Arme" />
            </div>
        </div>
    )
};

export default personnage;