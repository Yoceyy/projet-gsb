import React, { useState } from 'react';
import "../App.css";
import avatar from '../assets/Profile-Pic1670336376-2376224861.png';
import "../Css/NavBar.css";
import Calendar from 'react-calendar';

function Navbar() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">GSB</div>
            <ul className="nav-links">
                <li><a href="#dashboard" className="active">Dashboard</a></li>
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#caladrier" onClick={toggleCalendar}>Calendar</a></li>
            </ul>
            {isCalendarOpen && (
                <Calendar
                    onClickDay={(date) => console.log(date)} // Handle date selection (optional)
                />
            )}
            <div className="user-section">
                <i className="notification-icon"></i>
                <img src={avatar} alt="User Avatar" className="user-avatar" />
            </div>
        </nav>
    );
}

export default Navbar;