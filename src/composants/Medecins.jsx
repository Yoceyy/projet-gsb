import React, { useState, useEffect } from 'react';

// Composant pour afficher ou éditer la fiche d'un médecin
const FicheMedecin = ({ medecin, onUpdate }) => {
    const [formData, setFormData] = useState({ ...medecin });
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        setFormData({ ...medecin });
    }, [medecin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        fetch(`http://localhost/restGSB/medecins/${medecin.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Erreur lors de la mise à jour");
                return response.json();
            })
            .then((updatedMedecin) => {
                setSuccessMessage("Mise à jour effectuée");
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
                    <label>Tel :</label>
                    <input
                        type="text"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Spécialité complémentaire :</label>
                    <input
                        type="text"
                        name="specialiteComplementaire"
                        value={formData.specialiteComplementaire || ''}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Département :</label>
                    <input
                        type="text"
                        name="departement"
                        value={formData.departement || ''}
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

// Composant pour afficher les rapports d'un médecin
const RapportsMedecin = ({ medecin }) => {
    if (!medecin) return <p>Sélectionnez un médecin pour voir les rapports.</p>;

    return (
        <div>
            <h3>Rapports du Médecin</h3>
            <p>Liste des rapports pour le médecin : {medecin.nom} {medecin.prenom}</p>
            {/* Ajoutez ici des données ou une liste simulée de rapports */}
        </div>
    );
};

// Composant principal
const Medecins = () => {
    const [medecins, setMedecins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMedecin, setSelectedMedecin] = useState(null);
    const [activeTab, setActiveTab] = useState('fiche');

    useEffect(() => {
        fetch('http://localhost/restGSB/medecins?nom=V')
            .then((response) => {
                if (!response.ok) throw new Error('Erreur du au chargement des données');
                return response.json();
            })
            .then((data) => {
                setMedecins(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const filteredMedecins = medecins.filter((medecin) =>
        `${medecin.nom} ${medecin.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdate = (updatedMedecin) => {
        setMedecins((prev) =>
            prev.map((m) => (m.id === updatedMedecin.id ? updatedMedecin : m))
        );
        setSelectedMedecin(updatedMedecin);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Recherchez un médecin</h2>
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
            {loading && <p>Chargement des médecins...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {!selectedMedecin &&
                    (filteredMedecins.length > 0 ? (
                        filteredMedecins.map((medecin) => (
                            <li
                                key={medecin.id}
                                onClick={() => setSelectedMedecin(medecin)}
                                style={{
                                    padding: '10px',
                                    borderBottom: '1px solid #eee',
                                    cursor: 'pointer',
                                }}
                            >
                                {medecin.nom} {medecin.prenom}
                            </li>
                        ))
                    ) : (
                        <p>Aucun médecin trouvé.</p>
                    ))}
            </ul>
            {selectedMedecin && (
                <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <button onClick={() => setActiveTab('fiche')} style={{ padding: '10px', borderRadius: '5px', backgroundColor: activeTab === 'fiche' ? '#007BFF' : '#f0f0f0', color: activeTab === 'fiche' ? 'white' : 'black' }}>
                            Fiche Médecin
                        </button>
                        <button onClick={() => setActiveTab('rapports')} style={{ padding: '10px', borderRadius: '5px', backgroundColor: activeTab === 'rapports' ? '#007BFF' : '#f0f0f0', color: activeTab === 'rapports' ? 'white' : 'black' }}>
                            Rapports Médecin
                        </button>
                    </div>
                    {activeTab === 'fiche' && <FicheMedecin medecin={selectedMedecin} onUpdate={handleUpdate} />}
                    {activeTab === 'rapports' && <RapportsMedecin medecin={selectedMedecin} />}
                    <button onClick={() => setSelectedMedecin(null)} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Retour à la liste
                    </button>
                </div>
            )}
        </div>
    );
};

export default Medecins;
