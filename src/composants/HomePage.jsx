// src/composants/HomePage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; // Chemin correct vers Navbar
import '../api/api.jsx' // Base de données
import "../App.css"; // Import du CSS principal

function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Récupération des informations utilisateur depuis le localStorage
        const storedUser = localStorage.getItem('id');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="home-container">
            <Navbar /> {/* Affiche le composant Navbar */}
            <div className="content">
                <h1>Bienvenue sur la page d'accueil</h1>
                {user ? (
                    <div>
                        <h2>Bonjour, {user.nom}!</h2>
                    </div>
                ) : (
                    <p>Aucune information utilisateur disponible.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
