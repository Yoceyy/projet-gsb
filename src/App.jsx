import {Routes, Route} from "react-router-dom";
import LoginPage from "./composants/LoginPage.jsx";
import HomePage from "./composants/HomePage.jsx";
import CalendarPage from './composants/CalendarPage.jsx';
import { UserProvider } from './context/UserContext.jsx';



export default function App() {
    return (
        <Routes>
        <UserProvider>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/caladrier" element={<CalendarPage />} />

        </UserProvider>

        </Routes>
    );
}

