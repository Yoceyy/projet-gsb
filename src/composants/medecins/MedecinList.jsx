/* eslint-disable react/prop-types */

const MedecinList = ({ medecins, onSelectMedecin }) => {
    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {medecins.length > 0 ? (
                medecins.map((medecin) => (
                    <li
                        key={medecin.id}
                        onClick={() => onSelectMedecin(medecin)}
                        style={{
                            padding: '10px',
                            borderBottom: '1px solid #eee',
                            cursor: 'pointer',
                            backgroundColor: '#f8f9fa',
                            marginBottom: '5px',
                            borderRadius: '5px',
                        }}
                    >
                        {medecin.nom} {medecin.prenom}
                    </li>
                ))
            ) : (
                <p>Aucun médecin trouvé.</p>
            )}
        </ul>
    );
};

export default MedecinList;
