import React, { Component } from "react";
import axios from "axios";
import Titre from "../../Components/Titre/Titre";
import Personnage from "./Personnage/Personnage";

class ListePersonnage extends Component {
    state = {
        personnages: null,
        loading: false
    }

    loadData = () => {
        this.setState({ loading: true });
        axios.get("https://creaperso-a2dea-default-rtdb.europe-west1.firebasedatabase.app/persos.json")
            .then(reponse => {
                const personnages = Object.values(reponse.data);
                this.setState({ personnages, loading: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            })
    }

    componentDidMount = () => {
        this.loadData();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.refresh !== this.props.refresh) {
            this.loadData();
        }
    }

    render() {
        return (
            <>
                <h1 className="text-center mt-3">Listing des personnages</h1>
                {this.state.loading && <div>Chargement...</div>}
                {!this.state.loading && this.state.personnages &&
                    <div className="row no-gutters">

                        {this.state.personnages.map((perso, indice) => {
                            return (
                                <div className="col-6" key={indice}>
                                    <Titre>{perso.nom}</Titre>
                                    <Personnage {...perso.perso} />
                                </div>
                            );
                        })}
                    </div>
                }
            </>
        );
    }
}

export default ListePersonnage;