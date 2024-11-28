import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../api/api.jsx';
import "../App.css";

function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Récupération des informations utilisateur depuis le localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="home-container"> {/*CLASS DU CSS DU BIENVENUE*/}
            <Navbar />
            <div className="content">
                <h1>Bienvenue sur la page</h1>
                {user ? (
                    <div>
                        <h2>Bonjour, {user.nom} {user.prenom} !</h2> {/* Retourne nom et prenom de l'utilisateur */}
                    </div>
                ) : (
                    <p>Aucune information utilisateur disponible.</p> /*Si l'API ne fonctionne pas*/
                )}
            </div>
        </div>
    );
}

export default HomePage;
