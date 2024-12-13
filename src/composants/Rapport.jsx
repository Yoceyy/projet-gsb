import React, {useState} from 'react';
import "../composants/HomePage.jsx";
import "../composants/Navbar.jsx";
import {useUser} from "../context/UserContext.jsx";

const Rapport = () => {
    const {user} = useUser();
    const [error, setError] = useState(null); // Add error state

    if (error) {
        return <div><p>{error}</p></div>;
    }

    if (!user) {
        return <div><p>Chargement des informations...</p></div>;
    }

    return (
        <div>
            <h1>Information sur L'utilisateur :</h1>
            <div>
                <p>ID: {user.id}</p>
                <p>Nom: {user.nom}</p>
                <p>Prénom: {user.prenom}</p>
                <p>Adresse: {user.adresse}</p>
                <p>Code Postal: {user.cp}</p>
                <p>Ville: {user.ville}</p>
            </div>
        </div>
    );
};

export default Rapport;