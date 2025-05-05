import React from "react";

// Définition du composant fonctionnel RapportList
// Il reçoit deux props : "rapports" (liste des rapports) et "medecin" (le médecin sélectionné)
const RapportList = ({ rapports, medecin, activeTab, onEditRapport }) => (
  <div className="selected-medecin">
    {/* Affiche le nom et prénom du médecin sélectionné */}
    <h3>
      Médecin sélectionné : {medecin.nom} {medecin.prenom}
    </h3>

    {/* Vérifie s’il y a au moins un rapport */}
    {rapports.length > 0 ? (
      <div className="rapport-list">
        <h4>Anciens rapports :</h4>

        {/* Affichage des rapports dans un tableau HTML */}
        <table
          border="1"
          cellPadding="6"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "30px",
          }}
        >
          {/* En-tête du tableau */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Motif</th>
              <th>Bilan</th>
              <th>Médecin</th>
              {activeTab === "modifier" && <th>Actions</th>}
            </tr>
          </thead>

          {/* Corps du tableau : une ligne par rapport map genere une liste */}
          <tbody>
            {rapports.map((r, index) => (
              <tr key={r.id || `${r.date}-${r.motif}-${index}`}>
                <td>{r.id}</td>
                <td>{r.date}</td>
                <td>{r.motif}</td>
                <td>{r.bilan}</td>
                <td>
                  {medecin.nom} {medecin.prenom}
                </td>

                {/* Affiche un bouton "Modifier" uniquement si on est dans l'onglet "modifier" */}
                {activeTab === "modifier" && (
                  <td>
                    <button
                      onClick={() => onEditRapport(r)}
                      className="edit-button"
                    >
                      Modifier
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      // Si aucun rapport trouvé, message d’information
      <p>Aucun rapport trouvé pour ce médecin.</p>
    )}
  </div>
);

// Exportation du composant pour pouvoir l'utiliser dans d'autres fichiers
export default RapportList;
