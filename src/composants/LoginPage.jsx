import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Login.css';

function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const getUser = async (login, password) => {
        try {
            const response = await axios.get(`http://172.16.61.61/restGSB/connexion`, {
                params: { login, mdp: password }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la requête GET:', error);
            return null;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const user = await getUser(login, password);

        if (user) {
            // Stocker l'utilisateur dans localStorage
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/home');
        } else {
            setError(true);
        }
    };

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
