import React, { Component } from "react";
import Titre from "../../Components/Titre/Titre";
import Bouton from "../../Components/Bouton/Bouton";
import Personnage from "./Personnage/Personnage";
import Armes from "./Armes/Armes";
import axios from "axios";

class CreateurPersonnage extends Component {
    state = {
        personnage: {
            image: 1,
            agilite: 0,
            force: 0,
            intelligence: 0,
            arme: null,
        },
        nbPointsDisponibles: 7,
        armes: null,
        loading: false,
    }

    componentDidMount = () => {
        this.setState({ loading: true });
        axios.get("https://creaperso-a2dea-default-rtdb.europe-west1.firebasedatabase.app/armes.json")
            .then(reponse => {
                const armesArray = Object.values(reponse.data);
                this.setState({
                    armes: armesArray,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            })
    }

    handleImagePrecedente = () => {
        this.setState(oldState => {
            const newPersonnage = { ...oldState.personnage };
            if (oldState.personnage.image <= 1) newPersonnage.image = 3;
            else newPersonnage.image--;
            return { personnage: newPersonnage };
        })
    };

    handleImageSuivante = () => {
        this.setState(oldState => {
            const newPersonnage = { ...oldState.personnage };
            if (oldState.personnage.image >= 3) newPersonnage.image = 1;
            else newPersonnage.image++;
            return { personnage: newPersonnage };
        })
    };

    handleEnleverPoint = (carac) => {
        this.setState((oldState, props) => {
            if (oldState.personnage[carac] <= 0 || oldState.nbPointsDisponibles >= 7) return null;
            const newPointCarac = oldState.personnage[carac] - 1;
            const newPerso = { ...oldState.personnage };
            const newNbPointsDisponible = oldState.nbPointsDisponibles + 1;
            newPerso[carac] = newPointCarac;
            return {
                personnage: newPerso,
                nbPointsDisponibles: newNbPointsDisponible
            }
        })
    }

    handleAjouterPoint = (carac) => {
        this.setState((oldState, props) => {
            if (oldState.personnage[carac] >= 5 || oldState.nbPointsDisponibles <= 0) return null;
            const newPointCarac = oldState.personnage[carac] + 1;
            const newPerso = { ...oldState.personnage };
            const newNbPointsDisponible = oldState.nbPointsDisponibles - 1;
            newPerso[carac] = newPointCarac;
            return {
                personnage: newPerso,
                nbPointsDisponibles: newNbPointsDisponible
            }
        })
    }

    handleChangeArmePersonnage = (arme) => {
        const newPerso = { ...this.state.personnage };
        newPerso.arme = arme;
        this.setState({ personnage: newPerso });
    }

    handleReinitialisation = () => {
        this.setState(
            {
                personnage: {
                    image: 1,
                    agilite: 0,
                    force: 0,
                    intelligence: 0,
                    arme: null
                },
                nom: "",
                nbPointsDisponibles: 7,
                armes: ["epee", "fleau", "arc", "hache"]
            }
        )
    }

    handleValidation = () => {
        this.setState({ loading: true });
        const player = {
            perso: { ...this.state.personnage },
            nom: this.state.nom
        }
        axios.post("https://creaperso-a2dea-default-rtdb.europe-west1.firebasedatabase.app/persos.json", player)
            .then(reponse => {
                console.log(reponse);
                this.setState({ loading: false });
                this.handleReinitialisation();
                this.props.refresh();
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
                this.handleReinitialisation();
            })
    }

    render() {
        return (
            <>
                {
                    this.state.loading && <div>Chargement...</div>
                }
                <div className="form-group mb-3">
                    <label htmlFor="inputName" class="form-label">Nom :</label>
                    <input type="text" className="form-control" id="inputName" value={this.state.nom} onChange={event => this.setState({ nom: event.target.value })} />
                </div>
                <Personnage {...this.state.personnage}
                    precedente={this.handleImagePrecedente}
                    suivante={this.handleImageSuivante}
                    nbPointsDisponibles={this.state.nbPointsDisponibles}
                    enleverPoint={this.handleEnleverPoint}
                    ajouterPoint={this.handleAjouterPoint}
                />
                {
                    this.state.armes &&
                    <Armes
                        listeArmes={this.state.armes}
                        changeArme={this.handleChangeArmePersonnage}
                        currentArme={this.state.personnage.arme}
                    />
                }
                <Bouton typeBtn="btn btn-danger w-50" clic={this.handleReinitialisation}>Réinitialiser</Bouton>
                <Bouton typeBtn="btn btn-success w-50" clic={this.handleValidation}>Valider</Bouton>
            </>
        );
    }
}

export default CreateurPersonnage;