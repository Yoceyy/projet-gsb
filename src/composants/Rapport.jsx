import React, { useState, useEffect } from 'react';
import { useUser } from "../context/UserContext.jsx";
import MenuTabs from './Rapport/MenuTabs.jsx';
import MedecinList from './Rapport/MedecinList.jsx';
import RapportList from './Rapport/RapportList.jsx';
import RapportForm from './Rapport/RapportForm.jsx';
import "../css/ajouterRapport.css";

const Rapport = () => {
    const { user } = useUser();

    const [medecins, setMedecins] = useState([]);
    const [selectedMedecin, setSelectedMedecin] = useState(null);
    const [rapports, setRapports] = useState([]);
    const [activeTab, setActiveTab] = useState('ajouter');

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchMedecins = async () => {
            try {
                const response = await fetch(`http://localhost/restGSB/medecins?nom=V`);
                if (!response.ok) throw new Error('Erreur lors du chargement des médecins');
                const data = await response.json();
                setMedecins(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchMedecins();
    }, []);

    const handleSelectMedecin = async (medecin) => {
        setSelectedMedecin(medecin);
        try {
            const response = await fetch(`http://localhost/restGSB/rapports/${medecin.id}`);
            if (!response.ok) throw new Error('Erreur lors du chargement des rapports');
            const data = await response.json();
            setRapports(data);
        } catch (err) {
            setError(err.message);
            setRapports([]);
        }
    };

    const handleAddRapport = (newRapport) => {
        setRapports((prev) => [...prev, newRapport]);
        setSuccess(true);
    };

    const handleChangeMedecin = () => {
        setSelectedMedecin(null);
        setRapports([]);
    };

    if (!user) return <div>Chargement des informations...</div>;

    return (
        <div className="info-user">
            <MenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <MedecinList
                medecins={medecins}
                selectedMedecin={selectedMedecin}
                onSelect={handleSelectMedecin}
                onChangeMedecin={handleChangeMedecin}
            />
            {selectedMedecin && <RapportList rapports={rapports} medecin={selectedMedecin} />}
            {activeTab === 'ajouter' && selectedMedecin && (
                <RapportForm
                    selectedMedecin={selectedMedecin}
                    user={user}
                    onSuccess={handleAddRapport}
                    setError={setError}
                    success={success}
                    setSuccess={setSuccess}
                    error={error}
                />
            )}
        </div>
    );
};

export default Rapport;
