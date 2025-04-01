import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import logoAODnoir from "../assets/tiptamcode.avif";

// Couleurs de la marque
const colors = {
  primary: "#011d23",
  secondary: "#a07753",
  accent: "#b96f33",
  light: "#f4f5f1",
  dark: "#0a272f",
};

// Styles réutilisables
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  background: linear-gradient(rgba(1, 29, 35, 0.9), rgba(1, 29, 35, 0.9)),
    url(${logoAODnoir}) center/cover fixed;
  padding: 2rem;
  text-align: center;
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: ${colors.accent};
  text-shadow: 0 4px 20px rgba(185, 111, 51, 0.3);

  line-height: 1;

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  color: ${colors.light};
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: ${colors.secondary};
  color: ${colors.light};
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: ${colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(185, 111, 51, 0.3);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(-3px);
  }
`;

const BrandSignature = styled.div`
  position: absolute;
  bottom: 2rem;
  color: ${colors.light};
  opacity: 0.7;
  font-size: 0.9rem;
  letter-spacing: 2px;
`;

const AnimatedText = styled.div`
  font-size: 1.25rem;
  color: ${colors.secondary};
  margin: 1.5rem 0;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

export default function Erreurr() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return (
    <Container>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9951347176780036"
        crossorigin="anonymous"
      ></script>
      <Content>
        <ErrorCode data-aos="zoom-in">404</ErrorCode>

        <ErrorMessage data-aos="fade-up" data-aos-delay="200">
          Oups ! La page que vous cherchez semble introuvable ou en maintenance.
        </ErrorMessage>

        <AnimatedText data-aos="fade-up" data-aos-delay="300">
          Excellence • Intégrité • Professionnalisme
        </AnimatedText>

        <ActionContainer>
          <ActionButton to="/" data-aos="fade-right" data-aos-delay="400">
            <FaArrowLeft />
            Retour à l'accueil
          </ActionButton>

          <ActionButton to="/contact" data-aos="fade-left" data-aos-delay="400">
            <FaEnvelope />
            Nous contacter
          </ActionButton>
        </ActionContainer>
      </Content>
    </Container>
  );
}
