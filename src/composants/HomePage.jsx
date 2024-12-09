import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useUser } from '../context/UserContext';
import Navbar from './Navbar';

const HomePage = () => {
    const { user, setUser } = useUser();

    useEffect(() => {
        // Vérifie si l'utilisateur est déjà chargé
        if (!user) {
            const userCookie = Cookies.get('user');
            if (userCookie) {
                try {
                    const parsedUser = JSON.parse(userCookie); // Parse les données du cookie
                    setUser(parsedUser); // Met à jour le contexte avec les données utilisateur
                } catch (err) {
                    console.error("Erreur lors de l'analyse des données utilisateur :", err);
                }
            }
        }
    }, [user, setUser]);

    return (
        <div style={{ padding: '20px' }}>
            <Navbar />
            <h1>Bienvenue sur la page</h1>
            {user ? (
                <div>
                    <h2>Bonjour, {user.nom} {user.prenom} !</h2>
                </div>
            ) : (
                <p>Chargement des informations utilisateur...</p>
            )}
        </div>
    );
};

export default HomePage;
