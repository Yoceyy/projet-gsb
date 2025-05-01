import React from "react";

          //key= r.id || ... : pour éviter l’avertissement si r.id est parfois undefined
            //on utilise une combinaison de date, motif et index pour générer une clé unique
            

const RapportList = ({ rapports, medecin }) => (
  <div className="selected-medecin">
    <h3>
      Médecin sélectionné : {medecin.nom} {medecin.prenom}
    </h3>
    {rapports.length > 0 ? (
      <div className="rapport-list">
        <h4>Anciens rapports :</h4>
        <table
          border="1"
          cellPadding="6"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "30px",
          }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Motif</th>
              <th>Bilan</th>
              <th>Visiteur</th>
            </tr>
          </thead>

          <tbody>
            {rapports.map((r, index) => (
              <tr key={r.id || `${r.date}-${r.motif}-${index}`}>
                <td>{r.date}</td>
                <td>{r.motif}</td>
                <td>{r.bilan}</td>
                <td>
                  {r.nom} {r.prenom}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>Aucun rapport trouvé pour ce médecin.</p>
    )}
  </div>
);

export default RapportList;
