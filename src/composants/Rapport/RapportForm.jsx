import React, { useState } from 'react';

const RapportForm = ({ selectedMedecin, user, onSuccess, setError, success, setSuccess, error }) => {
    const [dateVisite, setDateVisite] = useState('');
    const [motif, setMotif] = useState('');
    const [bilan, setBilan] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!dateVisite || !motif || !bilan || !selectedMedecin) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        const newRapport = {
            idMedecin: selectedMedecin.id,
            idVisiteur: user.id,
            date: dateVisite,
            motif: motif,
            bilan: bilan,
            medicaments: null
        };

        fetch("http://localhost/restGSB/ajouterRapport", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRapport),
        })
            .then(res => {
                if (!res.ok) throw new Error("Erreur lors de l'ajout");
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
                {success && <div className="success-message">Rapport ajouté avec succès !</div>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </>
    );
};

export default RapportForm;
