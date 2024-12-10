import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Gestion des cookies
import { useUser } from '../context/UserContext'; // Contexte utilisateur

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async () => {
        setError(''); // Réinitialiser les erreurs
        try {
            // Construire l'URL avec URLSearchParams pour inclure les paramètres
            const params = new URLSearchParams({
                'email' : email,
                'password' : password,
            });

            const apiUrl = `http://172.16.61.61/restGSB/connexion?${params}`;

            // Appel à l'API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            // Vérifier le statut de la réponse
            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    // Enregistrer l'utilisateur dans le contexte et les cookies
                    setUser(data.user);
                    Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
                    // Redirection vers la page d'accueil
                    navigate('/home');
                } else {
                    setError('Réponse inattendue du serveur.');
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login ou mot de passe incorrect.');
            }
        } catch (err) {
            console.error('Erreur lors de la connexion :', err);
            setError('Une erreur est survenue. Veuillez vérifier votre connexion réseau.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Connexion</h1>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0' }}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0' }}
            />
            <button
                onClick={handleLogin}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Se connecter
            </button>
        </div>
    );
};

export default LoginPage;
