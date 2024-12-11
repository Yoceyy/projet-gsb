import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../css/Login.css';

const LoginPage = () => {
    const [login, setLogin] = useState(''); // Champ pour l'identifiant
    const [mdp, setMdp] = useState(''); // Champ pour le mot de passe
    const [error, setError] = useState(''); // Gestion des erreurs
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async () => {
        setError(''); // Réinitialiser les erreurs
        try {
            const apiUrl = `http://172.16.61.61/restGSB/connexion?`;

            const params = new URLSearchParams({
                login : login, // "login"
                mdp : mdp,   // "mdp"
            });

            console.log('URL appelée :', apiUrl)

            const response = await fetch(apiUrl+params);

            console.log('Statut de la réponse :', response.status);

            if (!response.ok) {
                const errorData = response.headers.get('Content-Length') > 0 ? await response.json() : {};
                console.log('Erreur retournée par le serveur :', errorData);
                setError(errorData.message || 'Erreur lors de la connexion.');
                return;
            }

            // Vérifiez si le contenu existe avant de l'analyser
            const textResponse = await response.text(); // Récupère le texte brut de la réponse
            const responseData = textResponse ? JSON.parse(textResponse) : null;

            console.log('Données retournées par l\'API :', responseData);


            if (responseData === null) {
                // réponse est nulle
                // afficher un message d'erreur 
                setError('Aucune donnée reçue du serveur.');
            } else {
                // Traitement normal des données
                const user = {
                    id: responseData.id,
                    nom: responseData.nom,
                    prenom: responseData.prenom,
                    adresse: responseData.adresse,
                    cp: responseData.cp,
                    ville: responseData.ville,
                };

                setUser(user);
                navigate('/home');
            }
        } catch (err) {
            console.error('Erreur lors de la connexion :', err);
            setError('Une erreur est survenue. Veuillez vérifier votre connexion réseau.');
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <img src="https://i.ibb.co/wyFG2qJ/logo.png" alt="GSB Logo" className="logo" />
            </div>
            <input
                type="text"
                value={login} // Champ pour l'identifiant
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Identifiant"
            />
            <input
                type="password"
                value={mdp} // Champ pour le mot de passe
                onChange={(e) => setMdp(e.target.value)}
                placeholder="Mot de passe"
            />
            <button
                onClick={handleLogin}
            >
                Se connecter
            </button>
        </div>
    );
};

export default LoginPage;
