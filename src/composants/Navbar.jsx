import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import avatar from '../assets/Profile-Pic1670336376-2376224861.png';
import "../css/NavBar.css";
import Calendar from 'react-calendar';

function Navbar() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const navigate = useNavigate(); // Pour rediriger après déconnexion

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleLogout = () => {
        // Actions pour la déconnexion
        localStorage.removeItem('authToken'); // supprimer le token du stockage local
        navigate('/'); // Rediriger vers la page de connexion
    };

    return (
        <nav className="navbar">
            <div className="logo">GSB</div>
            <ul className="nav-links">
                <li><a href="#dashboard" className="active">Dashboard</a></li>
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#calendrier" onClick={toggleCalendar}>Calendar</a></li>
                <li> <button onClick={handleLogout} className="logout-button"> Se déconnecter </button>
                </li>
            </ul>

            {isCalendarOpen && (
                <Calendar
                    onClickDay={(date) => console.log(date)}
                />
            )}
            <div className="user-section">
                <i className="notification-icon"></i>
                <img src={avatar} alt="Avatar" className="user-avatar"/>
            </div>
        </nav>
    );
}

export default Navbar;
