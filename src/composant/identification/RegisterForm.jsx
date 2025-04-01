import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Importez useNavigate

//
// Styles avec styled-components (inchangés)
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7fafc;
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
  color: #2d3748;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }

  ${({ error }) =>
    error &&
    `
    border-color: #e53e3e;
  `}
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
  }
`;

export default function RegisterForm() {
  // Composant de formulaire d'inscription
  const [values, setValues] = useState({
    // État des valeurs du formulaire
    name: "",
    email: "",
    password: "",
    age: "",

    role: "visiteur", // Ajout du champ role avec une valeur par défaut
  });
  const [errors, setErrors] = useState({}); // État des erreurs du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false); // État de soumission du formulaire
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

  // Fonction pour nettoyer les entrées utilisateur
  const sanitizeInput = (input) => {
    return input
      .replace(/<[^>]*>?/gm, "") // Supprime les balises HTML
      .replace(/["'`;|\\]/g, "") // Supprime les caractères spéciaux dangereux
      .replace(/\s+/g, " "); // Remplace les espaces multiples par un seul espace
  };

  // Fonction pour valider les champs du formulaire
  const validateFields = () => {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Le nom est obligatoire.";
    } else if (values.name.length < 5) {
      newErrors.name = "Le nom doit contenir au moins 5 caractères.";
    }

    if (!values.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      newErrors.email = "Veuillez entrer un email valide.";
    }

    if (!values.password.trim()) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (values.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (!values.age) {
      newErrors.age = "L'âge est requis.";
    } else if (values.age < 18) {
      newErrors.age = "Vous devez avoir au moins 18 ans.";
    }

    setErrors(newErrors); // Définir les erreurs dans l'état
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    // Fonction pour gérer la soumission du formulaire
    e.preventDefault(); // Empêcher le rechargement de la page par défaut

    if (!validateFields()) return; // Arrête la soumission si la validation échoue

    setIsSubmitting(true); // Définir l'état de soumission sur true

    const sanitizedValues = {
      // Nettoyer les valeurs avant de les envoyer au serveur
      name: sanitizeInput(values.name), // Nettoyer les valeurs avant de les envoyer au serveur
      email: sanitizeInput(values.email),
      password: sanitizeInput(values.password),
      age: sanitizeInput(values.age),
      role: values.role,
    };
    console.log("Données envoyées :", sanitizedValues); // Ajout du log

    try {
      const result = await axios.post(
        // Envoi de la requête POST à l'API
        "http://localhost:2027/api/auth/register", // Endpoint d'inscription
        sanitizedValues, // Valeurs nettoyées à envoyer au serveur
        { timeout: 5000 } // Définir un délai d'attente de 5 secondes
      );
      console.log("Réponse serveur : ", result.data); // Affiche la réponse du serveur
      alert("Inscription réussie !"); // Message de succès
      navigate("/connecter"); // Rediriger vers la page de connexion
    } catch (err) {
      // Gestion des erreurs
      console.error("Erreur lors de l'inscription :", err);
      alert("Une erreur est survenue lors de l'inscription.");
    } finally {
      // Réinitialisation de l'état de soumission
      setIsSubmitting(false); // Réinitialisation de l'état de soumission
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Inscription</Title>
        <form onSubmit={handleSubmit} noValidate>
          {/* Champ Nom */}
          <div>
            <Input
              type="text"
              id="name"
              placeholder="Nom"
              value={values.name}
              onChange={(e) =>
                setValues({ ...values, name: sanitizeInput(e.target.value) })
              }
              error={!!errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </div>

          {/* Champ Email */}
          <div>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, email: sanitizeInput(e.target.value) })
              }
              error={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </div>

          {/* Champ Mot de passe */}
          <div>
            <Input
              type="password"
              id="password"
              placeholder="Mot de passe"
              value={values.password}
              onChange={(e) =>
                setValues({
                  ...values,
                  password: sanitizeInput(e.target.value),
                })
              }
              error={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </div>

          {/* Champ Âge */}
          <div>
            <Input
              type="number"
              id="age"
              placeholder="Âge"
              value={values.age}
              onChange={(e) =>
                setValues({ ...values, age: sanitizeInput(e.target.value) })
              }
              error={!!errors.age}
            />
            {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
          </div>

          {/* Champ Rôle */}
          <div>
            <Select
              id="role"
              value={values.role}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
            >
              <option value="visiteur">Visiteur</option>
              <option value="utilisateur">Utilisateur</option>
              <option value="administrateur">Administrateur</option>
            </Select>
          </div>

          {/* Bouton de soumission */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "En cours..." : "S'inscrire"}
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
}
