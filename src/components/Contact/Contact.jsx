import { send } from "@emailjs/browser";
import { React, lazy, useState } from "react";
const Navigation = lazy(() => import("../Navigation"));
import { styled, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCheckCircle,
  faUser,
  faEnvelope,
  faComment,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import Seo from "../../SEO";

// Configuration EmailJS
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_IDC,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_IDC,
  userId: import.meta.env.VITE_EMAILJS_USER_IDC,
};

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Styles avec votre palette de couleurs
const Container = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: #011d23;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", sans-serif;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
  @media (max-width: 480px) {
    margin: 0rem auto;
    padding: 2rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #b96f33;
  margin-bottom: 2rem;
  font-weight: 800;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 3px;
    background: #b96f33;
    border-radius: 6px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.8rem;
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a07753;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #b96f33;
    box-shadow: 0 0 0 3px rgba(185, 111, 51, 0.2);
  }

  &::placeholder {
    color: #a0a0a0;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  background-color: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #b96f33;
    box-shadow: 0 0 0 3px rgba(185, 111, 51, 0.2);
  }

  &::placeholder {
    color: #a0a0a0;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #b96f33;
  color: white;
  border: none;
  padding: 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #a07753;
    animation: ${pulse} 0.8s ease infinite;
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: #f0f7f4;
  border: 1px solid #d4edda;
  color: #011d23;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const SuccessIcon = styled.div`
  color: #b96f33;
  font-size: 2.5rem;
`;

const ContactInfo = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #eaeaea;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #b96f33;
`;

const InfoIcon = styled.div`
  color: #b96f33;
  font-size: 1.2rem;
`;
const createSchemaMarkup = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contactez-nous",
  description: "Formulaire de contact pour votre boutique en ligne",
  url: "https://bibiabusness.vercel.app/contact",
  telephone: "+224 623 146 940",
  email: "contact@bibiabusness.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Conakry-kamsar",
    addressLocality: "Conakry",
    addressRegion: "Kamsar",
    addressCountry: "GN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["L", "M", "M", "J", "V", "S", "D"],
    opens: "08:00",
    closes: "18:00",
  },
});
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  const sanitizeInput = (input) => {
    return input
      .replace(/<[^>]*>?/gm, "") // Supprime les balises HTML
      .replace(/[^a-zA-Z0-9\sàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ@.]/gi, "");
  };

  // Validation formulaire
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Nom est obligatoire";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.message.trim()) newErrors.message = "Le message est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setIsSending(true);

    try {
      await send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          date: new Date().toLocaleString("fr-FR"),
        },
        EMAILJS_CONFIG.userId
      );

      setIsSubmitted(true);
      toast.success("envoyé !");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      toast.error("Une erreur est survenue lors de l'envoi du message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <Seo
        title="Contact - Votre Boutique en ligne"
        description="Contactez notre équipe pour toute question. Formulaire de contact sécurisé et réponse rapide garantie."
        keywords="contact boutique, service client, questions produits, assistance"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(createSchemaMarkup())}
        </script>
      </Helmet>
      <Navigation />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="mb-40"></div>

      <Container>
        <Title>Contactez-nous</Title>

        {isSubmitted ? (
          <SuccessMessage>
            <SuccessIcon>
              <FontAwesomeIcon icon={faCheckCircle} />
            </SuccessIcon>
            <h3>Message envoyé avec succès !</h3>
            <p>
              Nous avons bien reçu votre message et vous répondrons dans les
              plus brefs délais.
            </p>
          </SuccessMessage>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <InputContainer>
                <InputIcon>
                  <FontAwesomeIcon icon={faUser} />
                </InputIcon>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Entrez votre nom complet"
                  required
                />
              </InputContainer>
              {errors.name && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.name}
                </p>
              )}
            </FormGroup>

            <FormGroup>
              <InputContainer>
                <InputIcon>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputIcon>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Entrez votre adresse email"
                  required
                />
              </InputContainer>
              {errors.email && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.email}
                </p>
              )}
            </FormGroup>

            <FormGroup>
              <InputContainer>
                <InputIcon
                  style={{ alignSelf: "flex-start", marginTop: "1rem" }}
                >
                  <FontAwesomeIcon icon={faComment} />
                </InputIcon>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande en détail..."
                  required
                />
              </InputContainer>
              {errors.message && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.message}
                </p>
              )}
            </FormGroup>

            <SubmitButton type="submit" disabled={isSending}>
              <FontAwesomeIcon icon={faPaperPlane} />
              {isSending ? "Envoi en cours..." : "Envoyer le message"}
            </SubmitButton>
          </form>
        )}

        <ContactInfo>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faEnvelope} />
            </InfoIcon>
            <span>contact@bibiabusiness.com</span>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faPhone} />
            </InfoIcon>
            <span>+224 623 146 940</span>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </InfoIcon>
            <span>Conakry, Guinée, kamsar</span>
          </InfoItem>
        </ContactInfo>
      </Container>
      <div className="mb-52"></div>
    </div>
  );
};

export default Contact;
