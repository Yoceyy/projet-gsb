import { useState } from "react";
import Menu from "../composants/Menu.jsx";

const Page1 = () => {
    // Déclare une variable d'état pour stocker la saisie actuelle et une liste de mots ajoutés
    const [searchTerm, setSearchTerm] = useState("");
    const [words, setWords] = useState([]);

    // Fonction pour ajouter le mot à la liste
    const addWord = () => {
        if (searchTerm.trim()) {
            setWords([...words, searchTerm]);  // Ajoute le mot à la liste
            setSearchTerm("");  // Réinitialise la barre de recherche
        }
    };

    return (
        <div>
            <Menu />
            <h1>Bienvenue sur le site Web</h1>
            <h2>VOICI LA BARRE DE RECHERCHE</h2>

            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: '8px',
                    fontSize: '16px',
                    width: '200px',
                    marginBottom: '20px',
                }}
            />

            {/* Bouton pour ajouter le mot */}
            <button onClick={addWord} style={{ marginLeft: '10px', padding: '8px', fontSize: '16px' }}>
                Ajouter
            </button>

            {/* Affiche la liste des mots sauvegardés */}
            <h3>Mots ajoutés :</h3>
            <ul>
                {words.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </div>
    );
};

export default Page1;
