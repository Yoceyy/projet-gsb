import React, { useState, useEffect } from 'react';

const Medecins = () => {
    const [medecins, setMedecins] = useState([]); // Stocke la liste complète des médecins
    const [searchTerm, setSearchTerm] = useState(''); // Stocke le texte entré dans la barre de recherche
    const [loading, setLoading] = useState(true); // Indique le chargement des données
    const [error, setError] = useState(null); // Stocke les erreurs API

    // Appel à l'API pour récupérer la liste des médecins
    useEffect(() => {
        fetch('http://172.16.61.61/restGSB/medecins?nom=V')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des données');
                }
                return response.json();
            })
            .then((data) => {
                setMedecins(data); // Stocke les données dans l'état
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Filtrage des médecins en fonction du texte de recherche
    const filteredMedecins = medecins.filter((medecin) =>
        `${medecin.nom} ${medecin.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h2>Recherchez un médecin</h2>

            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Entrez le nom ou prénom du médecin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    margin: '20px 0',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />

            {/* Affichage des données */}
            {loading && <p>Chargement des médecins...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredMedecins.length > 0 ? (
                    filteredMedecins.map((medecin) => (
                        <li
                            key={medecin.id}
                            style={{
                                padding: '10px',
                                borderBottom: '1px solid #eee',
                            }}
                        >
                            {medecin.nom} {medecin.prenom}
                        </li>
                    ))
                ) : (
                    <p>Aucun médecin trouvé.</p>
                )}
            </ul>
        </div>
    );
};

export default Medecins;
