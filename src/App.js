import React, { Component } from "react";
import CreateurPersonnage from "./Containers/CreateurPersonnage/CreateurPersonnage";
import ListePersonnage from "./Containers/ListePersonnage/ListePersonnage";
import Titre from "./Components/Titre/Titre";


class App extends Component {
    state = {
        refresh: false
    }

    handleRefresh = () => {
        this.setState((oldState) => {
            return {
                refresh: !oldState.refresh
            }
        });
    }
    render() {
        return (
            <div className="container">
                <Titre>Créateur de personnage</Titre>
                <CreateurPersonnage refresh={this.handleRefresh} />
                <ListePersonnage refresh={this.state.refresh} />
            </div>
        );
    }
}

export default App;