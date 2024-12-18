import React from 'react';
import {useUser} from '../context/UserContext';
import Navbar from './Navbar';
import {Outlet} from 'react-router-dom';
import "../composants/Medecins.jsx"

const HomePage = () => {
    const {user} = useUser();

    return (
        <div style={{padding: '20px'}}>
            <Navbar/>
            <h1>Bienvenue sur la page !!</h1>
            {user && user.nom && user.prenom ? (
                <div>
                    <h2>Bonjour, {user.nom} {user.prenom} !</h2>
                </div>
            ) : (
                <p>Chargement des informations utilisateur ou erreur dans les données...</p>
            )}
            <Outlet/>
        </div>
    );
};

export default HomePage;
