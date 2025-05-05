import React, { useState, useEffect } from 'react';

const FicheMedecin = ({ medecin, onUpdate }) => {
    const [formData, setFormData] = useState({ ...medecin });
    const [successMessage, setSuccessMessage] = useState("");

    // Charger les données mises à jour après le rafraîchissement
    useEffect(() => {
        console.log("FicheMedecin useEffect");
        fetch(`http://localhost/restGSB/medecin/`+formData.id)

        
            .then((response) => {
                console.log("Response:", response);
                if (!response.ok) throw new Error("Erreur lors de la récupération des données");
                return response.json();
            })
            .then((data) => setFormData(data))
            .catch((error) => console.error("Erreur:", error));
            console.log("FormData:", formData);
    }, [medecin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("FormData:", formData);
        fetch(`http://localhost/restGSB/majMedecin/${medecin.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Erreur lors de la mise à jour");
                return response.json();
            })
            .then((updatedMedecin) => {
                setSuccessMessage("Mise à jour effectuée !");
                onUpdate(updatedMedecin);
            })
            .catch((error) => console.error("Erreur:", error));
    };

    if (!medecin) return <p>Sélectionnez un médecin pour voir ou modifier les détails.</p>;

    return (
        <div>
            <h3>Fiche Médecin</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Nom :</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Prénom :</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Adresse :</label>
                    <input
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Téléphone :</label>
                    <input
                        type="text"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Spécialité :</label>
                    <input
                        type="text"
                        name="specialite"
                        value={formData.specialite}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />
                </div>
                <button type="submit" style={{ backgroundColor: "blue", color: "white", padding: "10px", borderRadius: "5px", border: "none" }}>
                    Mettre à jour
                </button>
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </form>
        </div>
    );
};



export default FicheMedecin;
