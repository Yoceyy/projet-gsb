import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const Visiteur = () => {
    // Récupère l'utilisateur connecté depuis le contexte
    const { user, setUser } = useUser();

    // États locaux pour gérer le formulaire
    console.log("Visiteur :", user);
    const [visiteur, setVisiteur] = useState({
        // Initialise les champs du formulaire
        id: '',
        nom: '',
        prenom: '',
        adresse: '',
        cp: '',
        ville: ''

        // entre "" le chanmps est vide pour pas cree une erreur avec l'affichage deja prét remplis
    });

    // États pour gérer les messages de succès et d'erreur

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Remplir le formulaire avec les données de l'utilisateur au chargement
    useEffect(() => {
        if (user) {
            setVisiteur({
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                adresse: user.adresse,
                cp: user.cp,
                ville: user.ville
            });
        }
    }, [user]);

    // Gère le changement dans les champs du formulaire
    const handleChange = (e) => { // Met à jour l'état du formulaire
        const { name, value } = e.target;// Récupère le nom et la valeur du champ
        setVisiteur(prev => ({ ...prev, [name]: value }));// Met à jour l'état du visiteur
    };

    // Gère la soumission du formulaire
    const handleSubmit = async (e) => {
        // Vérifie si tous les champs sont remplis
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {

            console.log("Visiteur avant l'envoi :", visiteur);
            // Vérifie si tous les champs sont remplis
            // Envoie une requête PUT à l'API pour mettre à jour les informations du visiteur
            const response = await fetch("http://localhost/restGSB/majVisiteur", {
                // Envoie une requête PUT à l'API pour mettre à jour les informations du visiteur
                method: "PUT",
                // Définit le type de contenu de la requête
                headers: { "Content-Type": "application/json" },
                // Envoie les données du visiteur au format JSON
                body: JSON.stringify(visiteur)
            });

            // Vérifie si la réponse est correcte

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la mise à jour.");
            }

            // Vérifie si la réponse est correcte

            const data = await response.json();
            setSuccess(true);
            setError('');
            // Met à jour le contexte utilisateur avec les nouvelles données
            setUser(visiteur);


            // Réinitialise le formulaire

        } catch (err) {
            console.error("Erreur de la Mise à Jour :", err);
            setError(err.message || "Erreur.");
        }
    };


    // Vérifie si l'utilisateur est connecté
    

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Modifier mes informations</h2>

            {/* Messages de retour */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Modifié avec succès !</p>}

            <form onSubmit={handleSubmit}>
                 {/*Nom*/}
                <label>Nom</label>
                <input name="nom" value={visiteur.nom} onChange={handleChange} required />


                {/*Prénom*/}

                <label>Prénom</label>
                <input name="prenom" value={visiteur.prenom} onChange={handleChange} required />

                <label>Adresse</label>
                <input name="adresse" value={visiteur.adresse} onChange={handleChange} required />

                <label>Code postal</label>
                <input name="cp" value={visiteur.cp} onChange={handleChange} required />

                <label>Ville</label>
                <input name="ville" value={visiteur.ville} onChange={handleChange} required />

                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default Visiteur;
