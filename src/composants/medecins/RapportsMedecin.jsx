/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

const RapportsMedecin = ({ medecin }) => {
    const [rapports, setRapports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!medecin || !medecin.id) return;
            // recherche L'api
        fetch(`http://localhost/restGSB/rapports/${medecin.id}`)
        //Envoi une requête GET à l'API pour récupérer les rapports du médecin
            .then((response) => {
                //Si la réponse n'est pas ok, on lance une erreur
                if (!response.ok) {
                    //Lance une erreur avec un message personnalisé
                    throw new Error("Erreur lors de la récupération des rapports");
                }
                //Renvoie la réponse au format JSON
                return response.json();
            })
            .then((data) => {
                setRapports(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [medecin]);

    if (!medecin) {
        return <p>Sélectionnez un médecin pour voir les rapports.</p>;
    }

    if (loading) {
        return <p>Chargement des rapports...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>Erreur : {error}</p>;
    }

    return (
        <div>
            <h3>Rapports du Médecin</h3>
            <p>Liste des rapports pour le médecin : {medecin.nom} {medecin.prenom}</p>
            <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                    <tr style={{ background: "#007bff", color: "white" }}>
                        <th>Date</th>
                        <th>Motif</th>
                        <th>Bilan</th>
                        <th>Visiteur</th>
                    </tr>
                </thead>
                <tbody>
                    {rapports.length > 0 ? (
                        rapports.map((rapport) => (
                            <tr key={rapport.id}>
                                <td>{rapport.date}</td>
                                <td>{rapport.motif}</td>
                                <td>{rapport.bilan}</td>
                                <td>{rapport.nom} {rapport.prenom}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Aucun rapport trouvé pour ce médecin.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RapportsMedecin;
