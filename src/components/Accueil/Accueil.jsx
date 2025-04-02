import { React, lazy, useState, useEffect } from "react";
const Navigation = lazy(() => import("../Navigation"));
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faStar,
  faShoppingCart,
  faQuoteLeft,
  faFire,
  faMoon,
  faSun,
  faTruck,
  faShieldAlt,
  faGem,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import Seo from "../../SEO";
import fondbleufonce from "../../assets/fondbleufonce.avif";
import Footer from "../Footerrr";
// Palette de couleurs pour les thèmes clair et sombre
const colors = {
  light: {
    primary: "#b96f33",
    secondary: "#a07753",
    dark: "#011d23",
    light: "#f8f9fa",
    white: "#ffffff",
    accent: "#e67e22",
    success: "#27ae60",
    error: "#e74c3c",
    text: "#333333",
    background: "#ffffff",
    cardBg: "#ffffff",
    border: "#e0e0e0",
  },
  dark: {
    primary: "#d18a4a",
    secondary: "#b8916e",
    dark: "#022a33",
    light: "#121212",
    white: "#1e1e1e",
    accent: "#e67e22",
    success: "#2ecc71",
    error: "#e74c3c",
    text: "#f5f5f5",
    background: "#121212",
    cardBg: "#1e1e1e",
    border: "#333333",
  },
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const flash = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Styles globaux
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }

  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-weight: 700;
    line-height: 1.2;
    color: ${(props) => props.theme.text};
  }

  .slick-dots li button:before {
    color: ${(props) => props.theme.primary} !important;
  }

  .slick-dots li.slick-active button:before {
    color: ${(props) => props.theme.primary} !important;
    opacity: 1 !important;
  }

  .slick-prev:before, .slick-next:before {
    color: ${(props) => props.theme.primary} !important;
  }
`;

// Composants stylisés
const ThemeToggle = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary};
  color: #a07753;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.9);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const HeroSection = styled.section`
  position: relative;
  height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(rgba(1, 29, 35, 0.7), rgba(1, 29, 35, 0.7)),
    url("https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 0 2rem;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 80vh;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 3s ease-out;
  position: relative;
  z-index: 2;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.25rem;
    max-width: 600px;
    margin-bottom: 2rem;
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin: 0 auto 2rem;
    }
  }
`;

const CTAButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 4px 15px rgba(185, 111, 51, 0.4);

  &:hover {
    background-color: ${(props) => props.theme.accent};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(185, 111, 51, 0.6);
  }

  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const FlashSaleBanner = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background-color: ${(props) => props.theme.accent};
  color: white;
  padding: 0.5rem 1.5rem;

  font-weight: 600;
  display: flex;
  align-items: center;
  animation: ${flash} 2s infinite;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  svg {
    margin-right: 0.5rem;
  }
  @media (max-width: 768px) {
    top: 1rem;
    left: 50%;
    display: none; //pour msue sur les petit ecrn
    transform: translateX(-50%);
    font-size: 0.8rem;
    padding: 0.3rem 1rem;
    width: max-content;
    max-width: 90%;
  }
`;

const SalesCounter = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 0.7rem 1rem;

  color: white;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;

  span:first-child {
    font-size: 0.8rem;
    line-height: 1;
  }

  span:last-child {
    font-size: 0.6rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

const FloatingElement = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${float} ${(props) => props.duration || "15s"} linear infinite;

  &:nth-child(1) {
    width: 100px;
    height: 100px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 60%;
    left: 80%;
    animation-delay: 2s;
    animation-duration: 20s;
  }

  &:nth-child(3) {
    width: 70px;
    height: 70px;
    top: 80%;
    left: 30%;
    animation-delay: 4s;
    animation-duration: 12s;
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${(props) => props.theme.white};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${(props) => props.theme.text};
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: ${(props) => props.theme.primary};
    margin: 1rem auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${(props) => props.theme.cardBg};

  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
  animation-fill-mode: both;
  border: 1px solid ${(props) => props.theme.border};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  &:nth-child(1) {
    animation-delay: 0.2s;
  }
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  h3 {
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem;
    color: ${(props) => props.theme.text};
  }

  p {
    color: ${(props) => props.theme.text};
    opacity: 0.8;
    line-height: 1.6;
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.accent}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  box-shadow: 0 5px 15px rgba(185, 111, 51, 0.3);
`;

const ProductsSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${(props) => props.theme.light};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductCard = styled.div`
  background: ${(props) => props.theme.cardBg};

  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
  animation-fill-mode: both;
  border: 1px solid ${(props) => props.theme.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  &:nth-child(1) {
    animation-delay: 0.2s;
  }
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    animation-delay: 0.6s;
  }
  &:nth-child(4) {
    animation-delay: 0.8s;
  }
`;

const ProductImage = styled.div`
  height: 250px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.1);
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${(props) => props.theme.success};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.text};
  }

  p {
    color: ${(props) => props.theme.text};
    opacity: 0.7;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  span {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${(props) => props.theme.primary};
  }
`;

const Rating = styled.div`
  color: ${(props) => props.theme.accent};
  font-size: 0.9rem;

  svg {
    margin-right: 0.2rem;
  }
`;

const AddToCartBtn = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;

  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.accent};
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const TrendsSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${(props) => props.theme.white};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const TrendBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
`;

const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${(props) => props.theme.cardBg};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const TestimonialCard = styled.div`
  background: ${(props) => props.theme.white};
  border-radius: 10px;
  padding: 2rem;
  margin: 0 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid ${(props) => props.theme.border};
  height: 100%;

  svg {
    color: ${(props) => props.theme.primary};
    font-size: 1.5rem;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  p {
    font-style: italic;
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.text};
  }

  h4 {
    color: ${(props) => props.theme.primary};
    margin-bottom: 0.5rem;
  }

  .rating {
    color: ${(props) => props.theme.accent};
  }
`;
const createSchemaMarkup = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BIBIA-BUSNESS",
  image: fondbleufonce,
  telephone: "+224623146940",
  email: "contact@bibiabusness.com",
  url: "https://bibiabusness.vercel.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Guinée conakry kamsar",
    addressLocality: "Kamsar",
  },
});

const Homepage = () => {
  const [theme, setTheme] = useState("light");
  const [salesCount, setSalesCount] = useState(12458);

  // Données des produits
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 1,
      name: "Chemise en Soie Premium",
      description: "Chemise en soie 100% naturelle, confort exceptionnel",
      price: 897799,
      image:
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      isNew: true,
    },
    {
      id: 2,
      name: "Montre Connectée Elite",
      description: "Suivi d'activité et notifications intelligentes",
      price: 199799,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      isNew: false,
    },
    {
      id: 3,
      name: "Parfum Signature",
      description: "Fragrance unique et durable pour toutes les occasions",
      price: 790099,
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      isNew: true,
    },
    {
      id: 4,
      name: "Casque Audio Pro",
      description: "Son haute fidélité et réduction de bruit active",
      price: 249099,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      isNew: false,
    },
  ]);

  const [trendingProducts, setTrendingProducts] = useState([
    {
      id: 5,
      name: "Basket Urbaine",
      description:
        "Style moderne avec un confort optimal pour toute la journée",
      price: 129599,
      image:
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      isNew: true,
    },
    {
      id: 6,
      name: "Sac à Dos Élégant",
      description: "Capacité spacieuse avec un design professionnel",
      price: 189099,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      isNew: false,
    },
    {
      id: 7,
      name: "Lunettes de Soleil",
      description: "Protection UV400 avec un style intemporel",
      price: 149299,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      isNew: true,
    },
    {
      id: 8,
      name: "Smartphone Haut de Gamme",
      description:
        "Performances exceptionnelles et appareil photo professionnel",
      price: 150000,
      image:
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      isNew: false,
    },
  ]);

  // Témoignages clients
  const testimonials = [
    {
      id: 1,
      quote:
        "Les produits sont d'une qualité exceptionnelle et la livraison a été ultra rapide. Je recommande vivement!",
      author: "Abdoulaye",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Service client au top ! J'ai eu un problème avec ma commande qui a été résolu en moins de 24h. Très professionnel.",
      author: "Boutou sow",
      rating: 4,
    },
    {
      id: 3,
      quote:
        "J'adore les nouvelles tendances proposées chaque semaine. Je suis devenue une cliente fidèle!",
      author: "Mamata camara",
      rating: 5,
    },
    {
      id: 4,
      quote:
        "Le rapport qualité-prix est excellent. Bien mieux que ce que je trouve dans les boutiques physiques.",
      author: "Alpha ousmane.",
      rating: 5,
    },
  ];

  // Configuration du carrousel de témoignages
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Simuler un compteur de ventes
  useEffect(() => {
    const interval = setInterval(() => {
      setSalesCount((prev) => prev + Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Gestion du thème
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Vérifier le thème sauvegardé au chargement
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  return (
    <>
      <Seo
        title="Boutique en ligne - Votre destination shopping préférée"
        description="Découvrez notre large sélection de produits de qualité. Livraison rapide et paiement sécurisé a la livraison."
        keywords="boutique en ligne, shopping, produits tendance, livraison rapide"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(createSchemaMarkup())}
        </script>
      </Helmet>
      <Navigation />

      <GlobalStyle theme={colors[theme]} />

      <ThemeToggle onClick={toggleTheme}>
        <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
      </ThemeToggle>

      <HeroSection>
        <FlashSaleBanner theme={colors[theme]}>
          <FontAwesomeIcon icon={faFire} />
          SOLDES -35%
        </FlashSaleBanner>

        <SalesCounter>
          <span>{salesCount.toLocaleString()}+</span>
          <span>produits vendus</span>
        </SalesCounter>

        <FloatingElements>
          <FloatingElement />
          <FloatingElement />
          <FloatingElement />
        </FloatingElements>

        <HeroContent>
          <h1>Découvrez l'Excellence dans Chaque Détail</h1>
          <p>
            Notre collection exclusive réunit qualité et élégance pour une
            expérience shopping inégalée. Livraison rapide et service client
            exceptionnel.
          </p>
          <CTAButton theme={colors[theme]}>
            <Link to="/produit" className="no-underline text-white">
              Explorer la collection <FontAwesomeIcon icon={faArrowRight} />{" "}
            </Link>
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection theme={colors[theme]}>
        <SectionTitle theme={colors[theme]}>Pourquoi Nous Choisir</SectionTitle>
        <FeaturesGrid>
          <FeatureCard theme={colors[theme]}>
            <FeatureIcon theme={colors[theme]}>
              <FontAwesomeIcon icon={faGem} />
            </FeatureIcon>
            <h3>Qualité Premium</h3>
            <p>
              Tous nos produits sont sélectionnés avec soin pour leur qualité
              exceptionnelle et leur durabilité.
            </p>
          </FeatureCard>
          <FeatureCard theme={colors[theme]}>
            <FeatureIcon theme={colors[theme]}>
              <FontAwesomeIcon icon={faTruck} />
            </FeatureIcon>
            <h3>Livraison Rapide</h3>
            <p>
              Recevez vos commandes en 24-48 heures avec notre service de
              livraison express.
            </p>
          </FeatureCard>
          <FeatureCard theme={colors[theme]}>
            <FeatureIcon theme={colors[theme]}>
              <FontAwesomeIcon icon={faShieldAlt} />
            </FeatureIcon>
            <h3>Satisfaction Garantie</h3>
            <p>
              Notre politique de retour de 30 jours vous offre une tranquillité
              d'esprit totale.
            </p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <ProductsSection theme={colors[theme]}>
        <SectionTitle theme={colors[theme]}>Nos Produits Phares</SectionTitle>
        <ProductGrid>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} theme={colors[theme]}>
              <ProductImage>
                <img src={product.image} alt={product.name} />
                {product.isNew && (
                  <ProductBadge theme={colors[theme]}>Nouveau</ProductBadge>
                )}
              </ProductImage>
              <ProductInfo theme={colors[theme]}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <ProductPrice theme={colors[theme]}>
                  <span>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "GNF",
                    }).format(product.price)}
                  </span>
                  <Rating theme={colors[theme]}>
                    <FontAwesomeIcon icon={faStar} />
                    {product.rating}
                  </Rating>
                </ProductPrice>
                <AddToCartBtn theme={colors[theme]}>
                  <Link to="/produit" className="no-underline text-white">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Est ce qu'il reste en stock ?{" "}
                  </Link>
                </AddToCartBtn>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </ProductsSection>

      <TrendsSection theme={colors[theme]}>
        <SectionTitle theme={colors[theme]}>Dernières Tendances</SectionTitle>
        <ProductGrid>
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} theme={colors[theme]}>
              <ProductImage>
                <img src={product.image} alt={product.name} />
                <TrendBadge theme={colors[theme]}>Tendance</TrendBadge>
                {product.isNew && (
                  <ProductBadge theme={colors[theme]}>Nouveau</ProductBadge>
                )}
              </ProductImage>
              <ProductInfo theme={colors[theme]}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <ProductPrice theme={colors[theme]}>
                  <span>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "GNF",
                    }).format(product.price)}
                  </span>
                  <Rating theme={colors[theme]}>
                    <FontAwesomeIcon icon={faStar} />
                    {product.rating}
                  </Rating>
                </ProductPrice>
                <AddToCartBtn theme={colors[theme]}>
                  <Link to="/produit" className="no-underline text-white">
                    {" "}
                    <FontAwesomeIcon icon={faReceipt} /> Est ce qu'il reste en
                    stock ?
                  </Link>
                </AddToCartBtn>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </TrendsSection>

      <TestimonialsSection theme={colors[theme]}>
        <SectionTitle theme={colors[theme]}>
          Ce Que Disent Nos Clients
        </SectionTitle>
        <Slider {...testimonialSettings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id}>
              <TestimonialCard theme={colors[theme]}>
                <FontAwesomeIcon icon={faQuoteLeft} />
                <p>{testimonial.quote}</p>
                <h4>{testimonial.author}</h4>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      color={
                        i < testimonial.rating ? colors[theme].accent : "#ddd"
                      }
                    />
                  ))}
                </div>
              </TestimonialCard>
            </div>
          ))}
        </Slider>
      </TestimonialsSection>
      <div className=" mb-52">
      
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Homepage;
