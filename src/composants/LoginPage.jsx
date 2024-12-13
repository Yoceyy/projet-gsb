import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../css/Login.css';

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [mdp, setMdp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async () => {
        setError('');
        try {
            const apiUrl = `http://172.16.61.61/restGSB/connexion?`;

            const params = new URLSearchParams({
                login: login,
                mdp: mdp,
            });

            const response = await fetch(apiUrl + params);

            if (!response.ok) {
                const errorData = response.headers.get('Content-Length') > 0 ? await response.json() : {};
                setError(errorData.message || 'Erreur lors de la connexion.');
                return;
            }

            const textResponse = await response.text();
            const responseData = textResponse ? JSON.parse(textResponse) : null;

            if (responseData === null) {
                setError('Aucune donnée reçue du serveur.');
            } else {
                const user = {
                    id: responseData.id,
                    nom: responseData.nom,
                    prenom: responseData.prenom,
                    adresse: responseData.adresse,
                    cp: responseData.cp,
                    ville: responseData.ville,
                };

                setUser(user); // Enregistrer l'utilisateur dans le contexte
                navigate('/home'); // Rediriger vers la page d'accueil
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
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Identifiant"
            />
            <input
                type="password"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                placeholder="Mot de passe"
            />
            {error && <p className="error">{error}</p>}
            <button onClick={handleLogin}>
                Se connecter
            </button>
        </div>
    );
};

export default LoginPage;
