// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";
import MenuTabs from "./Rapport/MenuTabs.jsx";
import MedecinList from "./Rapport/MedecinList.jsx";
import RapportList from "./Rapport/RapportList.jsx";
import RapportForm from "./Rapport/RapportForm.jsx";
import "../css/ajouterRapport.css";

const Rapport = () => {
  const { user } = useUser();

  const [medecins, setMedecins] = useState([]);
  const [selectedMedecin, setSelectedMedecin] = useState(null);
  const [rapports, setRapports] = useState([]);
  const [activeTab, setActiveTab] = useState("ajouter");
  const [rapportEdit, setRapportEdit] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const response = await fetch(`http://localhost/restGSB/medecins?nom=V`);
        if (!response.ok)
          throw new Error("Erreur lors du chargement des médecins");
        const data = await response.json();
        setMedecins(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMedecins();
  }, []);

  // Fonction pour gérer la sélection d'un médecin
  const handleSelectMedecin = async (medecin) => {
    setSelectedMedecin(medecin);
    // Réinitialiser les rapports
    try {
      // Envoie une requête GET à l'API pour récupérer les rapports du médecin sélectionné
      const response = await fetch(
        `http://localhost/restGSB/rapports/${medecin.id}`
      );
      if (!response.ok)
        throw new Error("Erreur lors du chargement des rapports");
      const data = await response.json();
      // Vérifie si la réponse contient des rapports
      setRapports(data);
    } catch (err) {
      // Si une erreur se produit, on l'affiche
      setError(err.message);
      setRapports([]);
    }
  };

  // Fonction pour gérer l'ajout d'un rapport
  const handleAddRapport = (newRapport) => {
    setRapports((prev) => [...prev, newRapport]);
    setSuccess(true);
  };

  // Fonction pour gérer le changement de médecin
  const handleChangeMedecin = () => {
    setSelectedMedecin(null);
    setRapports([]);
  };

  if (!user) return <div>Chargement des informations...</div>;

  // Affichage du composant
  // Affichage du nom et prénom de l'utilisateu

  return (
    <div className="info-user-ajoutrapport">
      <MenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <MedecinList
        medecins={medecins}
        selectedMedecin={selectedMedecin}
        onSelect={handleSelectMedecin}
        onChangeMedecin={handleChangeMedecin}
      />

      {selectedMedecin && (
        <RapportList
          rapports={rapports}
          medecin={selectedMedecin}
          activeTab={activeTab}
          onEditRapport={setRapportEdit}
        />
      )}

      {rapportEdit!== null && (
        <div className="edit-rapport">
          <h3>Modifier le rapport {rapportEdit.id}</h3>
          <button
            onClick={() => {
              setRapportEdit(null);
              setSuccess(false);
            }}
          >
            Annuler
          </button>
        </div>
      )}

      {/* Affichage du formulaire d'ajout de rapport */}

      {rapportEdit===null && activeTab === "ajouter" && selectedMedecin && (
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

      {activeTab === "modifier" && selectedMedecin && rapportEdit && (
        <RapportForm
          selectedMedecin={selectedMedecin}
          user={user}
          rapportEdit={rapportEdit}
          setError={setError}
          onSuccess={() => {
            setRapportEdit(null);
            setSuccess(true);
            handleSelectMedecin(selectedMedecin); // recharge les rapports
          }}
          success={success}
          setSuccess={setSuccess}
          error={error}
        />
      )}
    </div>
  );
};

export default Rapport;
