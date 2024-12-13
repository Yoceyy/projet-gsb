import React from "react";
import "../css/NavBar.css";
import {useUser} from "../context/UserContext"; // Assure that this is the correct context path
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
    const {setUser} = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate("/"); // Redirect to the login page
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img
                    src="GSB"
                    alt="GSB Logo"
                    className="logo"
                />
            </div>
            <ul className="navbar-links">
                <Link to="/home">Dashboard</Link>
                <Link to="/home/rapport">Rapport</Link>
                <Link to="/home/medecin">Medecins</Link>
            </ul>
            <div className="navbar-user">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="User Icon"
                    className="user-icon"
                />
                <button className="logout-button" onClick={handleLogout}>
                    Déconnexion
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
