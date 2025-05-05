// Medecins.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from './medecins/SearchBar';
import MedecinList from './medecins/MedecinList';
import FicheMedecin from './medecins/FicheMedecin';
import RapportsMedecin from './medecins/RapportsMedecin';

const Medecins = () => {
    const [medecins, setMedecins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMedecin, setSelectedMedecin] = useState(null);
    const [activeTab, setActiveTab] = useState('fiche');

    useEffect(() => {
        //recherche L'api
        fetch('http://localhost/restGSB/medecins?nom=V')
            .then((response) => {
                if (!response.ok) throw new Error('Erreur lors du chargement des médecins');
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
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {loading && <p>Chargement des médecins...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!selectedMedecin ? (
                <MedecinList medecins={filteredMedecins} onSelectMedecin={setSelectedMedecin} />
            ) : (
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
                    {console.log('selectedMedecin', selectedMedecin)}
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