/* eslint-disable react/prop-types */
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
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
    );
};

export default SearchBar;
