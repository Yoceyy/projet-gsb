import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Login.css';

function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false); // Pour afficher les erreurs d'authentification
    const navigate = useNavigate();

    // La fonction qui teste le login et le mot de passe
    const getUser = async (login, password) => {
        try {
            // Envoyer une requête GET avec les paramètres login et mdp
            const response = await axios.get(`http://172.16.61.61/restGSB/connexion`, {
                params: {
                    login: login,
                    mdp: password
                }
            });

            // Retourner la réponse de l'API (l'utilisateur)
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la requête GET:', error);
            return null; // En cas d'échec, retourner null
        }
    };

    // Gérer la connexion au clic sur le bouton de login
    const handleLogin = async (e) => {
        e.preventDefault();

        // Appeler la fonction getUser pour tester les identifiants
        const user = await getUser(login, password);

        // Si un utilisateur est retourné, la connexion est réussie
        if (user) {
            // Stocker l'utilisateur dans localStorage
            localStorage.setItem('user', JSON.stringify(user));

            // Rediriger vers la page d'accueil
            navigate('/home');
        } else {
            // En cas d'erreur (login ou mot de passe incorrect), afficher un message
            setError(true);
        }
    };
            //Le HTML DE LA PAGE
    return (
        <div className="login-container">
            <div className="login-box">
                <img src="https://image.noelshack.com/fichiers/2024/42/3/1729096806-image-gsb-1.png" alt="GSB Logo" className="logo" />
                <h2>Galaxy Swiss Bourdin</h2>
                <form onSubmit={handleLogin}>
                    <label>Identifiez-vous</label>
                    {error && <p className="error">Identifiants incorrects. Veuillez réessayer.</p>}
                    <input
                        type="text"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
