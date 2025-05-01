// Importation de React pour utiliser JSX et les fonctionnalités de React.
import React from 'react';

// Déclaration du composant fonctionnel MedecinList avec des props destructurées.
const MedecinList = ({ medecins, selectedMedecin, onSelect, onChangeMedecin }) => (
    // Conteneur principal pour la liste des médecins.
    <div className="list-medecins">
        {/* Titre de la section pour indiquer qu'il s'agit de la liste des médecins */}
        <h3>Liste des médecins :</h3>

        {/* Vérifie si un médecin est sélectionné */}
        {selectedMedecin ? (
            // Affiche les informations du médecin sélectionné.
            <div>
                {/* Affiche le nom et le prénom du médecin sélectionné */}
                <p>Médecin sélectionné : {selectedMedecin.nom} {selectedMedecin.prenom}</p>

                {/* Bouton pour changer le médecin sélectionné, déclenche la fonction onChangeMedecin */}
                <button onClick={onChangeMedecin} className="change-button">Changer de médecin</button>
            </div>
        ) : (
            // Si aucun médecin n'est sélectionné, vérifie si la liste des médecins est non vide.
            medecins.length > 0 ? (
                // Affiche une liste des médecins.
                <ul>
                    {/* Parcourt la liste des médecins et crée un élément de liste pour chaque médecin */}
                    {medecins.map((med) => (
                        // Utilise l'ID du médecin comme clé unique pour chaque élément de liste.
                        <li key={med.id}>
                            {/* Affiche le nom et le prénom du médecin */}
                            {med.nom} {med.prenom}

                            {/* Bouton pour sélectionner un médecin, déclenche la fonction onSelect avec le médecin en paramètre */}
                            <button onClick={() => onSelect(med)} className="select-button">Sélectionner</button>
                        </li>
                    ))}
                </ul>
            ) : 
            // Si la liste des médecins est vide, affiche un message de chargement.
            <p>Chargement des médecins...</p>
        )}
    </div>
);

// Exporte le composant pour qu'il puisse être utilisé dans d'autres fichiers.
export default MedecinList;
