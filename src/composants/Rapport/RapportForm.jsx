// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

// Composant pour ajouter un rapport

// eslint-disable-next-line react/prop-types
const RapportForm = ({ selectedMedecin, user, onSuccess, setError, success, setSuccess, error }) => {
    // etat pour gérer les champs du formulaire
    const [dateVisite, setDateVisite] = useState('');
    const [motif, setMotif] = useState('');
    const [bilan, setBilan] = useState('');

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        // Vérifie si tous les champs sont remplis
        e.preventDefault();
        if (!dateVisite || !motif || !bilan || !selectedMedecin) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        // Crée un nouvel objet rapport avec les données du formulaire
        const newRapport = {
            // eslint-disable-next-line react/prop-types
            idMedecin: selectedMedecin.id,
            // eslint-disable-next-line react/prop-types
            idVisiteur: user.id,
            date: dateVisite,
            motif: motif,
            bilan: bilan,
            medicaments: null
        };

        //Envoie une requête PUT à l'API pour ajouter un rapport

        console.log("Envoi de la requête PUT avec le rapport :", newRapport);

        fetch("http://localhost/restGSB/ajouterRapport", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRapport),
        })
        

        //Envoi une requête PUT à l'API pour ajouter un rapport
            .then(res => {
                //Si la réponse n'est pas ok, on lance une erreur
                if (!res.ok) throw new Error("Erreur lors de l'ajout");
                //Renvoie la réponse au format JSON
                return res.json();
            })
            .then(data => {
                onSuccess(data);
                setDateVisite('');
                setMotif('');
                setBilan('');
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError("Une erreur est survenue.");
                setSuccess(false);
            });
    };

    // Vérifie si un médecin est sélectionné

    return (
        <>
            
            <h3>Ajouter un rapport pour : {selectedMedecin.nom} {selectedMedecin.prenom}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date de visite</label>
                    <input type="date" value={dateVisite} onChange={e => setDateVisite(e.target.value)} />
                </div>
                <div>
                    <label>Motif</label>
                    <input type="text" value={motif} onChange={e => setMotif(e.target.value)} />
                </div>
                <div>
                    
                    <label>Bilan</label>
                    <textarea value={bilan} onChange={e => setBilan(e.target.value)} />
                </div>
                {!success && <button type="submit" className="submit-button">Ajouter</button>}
                {success && <div className="success-message-ajout-rapport">Rapport ajouté avec succès !</div>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </>
    );
};

export default RapportForm;
