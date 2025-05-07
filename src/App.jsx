import { Routes, Route } from "react-router-dom";
import LoginPage from "./composants/LoginPage.jsx";
import HomePage from "./composants/HomePage.jsx";
import { UserProvider } from './context/UserContext.jsx';
import Rapport from "./composants/Rapport.jsx";
import Medecins from "./composants/Medecins.jsx"
import Visiteur from "./composants/Visiteur.jsx";

export default function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />}>
                    <Route path="rapport" element={<Rapport />} />
                    <Route path="medecin" element={<Medecins />} />
                    <Route path="visiteur" element={<Visiteur />} />
                </Route>
            </Routes>
        </UserProvider>
    );
}
