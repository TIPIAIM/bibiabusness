import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importe Axios
import { AuthContext } from "./AuthContext";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Utilise la fonction logout du contexte
  const handleLogout = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Aucun token trouvé");
          return;
        }

      // Appelle la route de déconnexion du backend avec Axios
      const response = await axios.post(
        "http://localhost:2027/api/auth/logout",
        {}, // Corps de la requête (vide dans ce cas)
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Envoie le token actuel
          },
        }
      );

      if (response.status === 200) {
        logout(); // Appelle la fonction de déconnexion du context
        // Supprime le token du localStorage
        localStorage.removeItem("token");
        // Redirige l'utilisateur vers la page de connexion
        navigate("/connecter");
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur :", error);
      if (error.response && error.response.status === 401) {
        logout(); // Appelle la fonction logout du contexte en cas d'erreur
        navigate("/login");
      }
    }
  };

  return (
    <button className=" bg-black" onClick={handleLogout}>
      Déconnexion
    </button>
  );
};

export default LogoutButton;
