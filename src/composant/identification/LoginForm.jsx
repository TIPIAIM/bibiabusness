import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Importez useNavigate
//import jwt_decode from "jwt-decode"; // Pour décoder le token JWT

// Styles avec styled-components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7fafc; /* Fond clair */
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748; /* Texte foncé */
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0; /* Bordure grise */
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4299e1; /* Bordure bleue au focus */
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2); /* Effet de focus */
  }

  ${({ error }) =>
    error &&
    `
    border-color: #e53e3e; /* Bordure rouge en cas d'erreur */
  `}
`;

const ErrorMessage = styled.p`
  color: #e53e3e; /* Texte rouge */
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4299e1; /* Bouton bleu */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce; /* Bouton bleu foncé au survol */
  }

  &:disabled {
    background-color: #cbd5e0; /* Bouton gris désactivé */
    cursor: not-allowed;
  }
`;

export default function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Effacer l'erreur lorsque l'utilisateur commence à taper
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Fonction pour valider les champs du formulaire
  const validateFields = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return; // Arrête la soumission si la validation échoue

    setIsSubmitting(true);

    try {
      console.log("Données envoyées :", formData); // Afficher les données envoyées
      const response = await axios.post(
        "http://localhost:2027/api/auth/login", // Endpoint de connexion
        formData,
        {
          headers: { "Content-Type": "application/json" }, // Définir l'en-tête
          timeout: 2000,
        }
      );

      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token); // Stocker le token dans le localStorage
        if (typeof onLogin === "function") {
          onLogin(); // Callback pour mettre à jour l'état d'authentification
        }
        alert("Connexion réussie !");
        navigate("/adminfils"); // Rediriger vers la page du tableau de bord
      } else {
        alert(data.message || "Erreur de connexion");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      alert("Une erreur est survenue lors de la connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Connexion</Title>
        <form onSubmit={handleSubmit} noValidate>
          {/* Champ Email */}
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </div>

          {/* Champ Mot de passe */}
          <div>
            <Input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </div>

          {/* Bouton de soumission */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
}
