# 💊 Projet GSB - BTS SIO 2ème année

Ce dépôt contient l'application **GSB (Galaxy Swiss Bourdin)** développée en **React + Vite**, dans le cadre du BTS SIO (Services Informatiques aux Organisations) – option SLAM, 2ème année.

L'application permet aux visiteurs médicaux de gérer leurs **rapports de visite**, consulter les **praticiens**, les **médicaments**, et plus encore. Le front-end interagit avec une **API REST** conteneurisée via **Portainer** et intégrée avec `fetch`.

---

## 🖥️ Tech Stack

### Front-end
- ⚛️ React (avec Vite)
- ⚡ Vite pour le bundling rapide
- 🎨 Tailwind CSS 
- 🔗 `fetch` pour interroger l'API REST

### Back-end (API)
- 🌐 API REST PHP
- 🐳 Conteneurisée avec **Docker** / déployée via **Portainer**
- 🗃️ Base de données : MySQL avec **phpmyadmin**

--------------------------------------------------------------------

## ⚙️ Installation & Lancement

### 🧩 Prérequis
- Node.js ≥ 18
- Docker & Portainer (pour l'API)
- Navigateur récent

### 🔧 Étapes

1. **Cloner le dépôt**
   ```bash
   
   git clone https://github.com/Yoceyy/projet-gsb
   cd projet-gsb

2. **Installer les dépendances**
   ```bash
   npm install

3. **Lancer l’application**
  ```bash
    npm run dev

   -----

## 📚 Objectifs pédagogiques


Authentification sécurisée (JWT / sessions)

Consommation d’une API REST via fetch

Gestion des états (useState, useEffect)

Manipulation de données : affichage, modification, suppression

Mise en production simulée avec Portainer (conteneurisation)


![image](https://github.com/user-attachments/assets/abfa301f-f664-4a6c-aaf0-81c00f9b69f1)
![image](https://github.com/user-attachments/assets/e16dbf57-118f-462e-8417-e1b60f9be907)






