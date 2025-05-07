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
                <Link to="/home/visiteur">Visiteur</Link>
            </ul>
            <div className="navbar-user">
                <img
                    src="https://www.programme-tv.net/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FTEL.2Enews.2F2018.2F01.2F12.2Fa619be4e-d4eb-4dc6-8c3b-a35a3d9f11ed.2Ejpeg/900x506/quality/70/crop-from/top/breaking-bad-preparation-du-spin-off-sur-saul-goodman.jpg"
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
