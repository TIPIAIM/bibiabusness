import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Vérifie si un token est présent dans le localStorage
  const token = localStorage.getItem("token");

  // Si aucun token n'est trouvé, redirige vers la page de connexion
  if (!token) {
    return <Navigate to="/connecter" />;
  }

  // Si l'utilisateur est authentifié, affiche le composant enfant
  return children;
};

export default ProtectedRoute;