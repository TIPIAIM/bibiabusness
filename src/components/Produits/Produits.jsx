import { send } from "@emailjs/browser";

import { React, lazy, useState, useEffect } from "react";
const Navigation = lazy(() => import("../Navigation"));

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  faShoppingCart,
  faTimes,
  faPlus,
  faMinus,
  faCheckCircle,
  faHome,
  faSearch,
  faTshirt, // Mode - Plus stylisé que faShirt
  faMobileScreen, // Électronique - Plus moderne que faLaptop
  faCouch, // Maison - Plus élégant que faHouse
  faSprayCanSparkles, // Beauté - Version premium de faSprayCan
  faGem, // Bijoux - Nouvelle catégorie
  faUtensils, // maison - Nouvelle catégorie
  faBookOpen, // Livres - Nouvelle catégorie
  faHeartPulse,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import chemiseSoie from "../../assets/com.jpg";

import hhhhh from "../../assets/hhhhh.jpeg";

import eee from "../../assets/1.png";
import eeee from "../../assets/2.png";
import rr from "../../assets/3.png";
import rrr from "../../assets/4.png";
import rrrr from "../../assets/5.png";
import six from "../../assets/6.png";
import sep from "../../assets/7.png";
import hui from "../../assets/8.png";
import ne from "../../assets/9.png";
import dix from "../../assets/10.png";
import onz from "../../assets/11.png";

import prodd from "../../assets/prodd.webp";
import { Helmet } from "react-helmet";
import Seo from "../../SEO";
import fondbleufonce from "../../assets/fondbleufonce.avif";

const createSchemaMarkup = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: "BIBIA-BUSNESS",
  image: fondbleufonce,
  telephone: "+224623146940",
  email: "contact@bibiabusness.com",
  url: "https://bibiabusness.vercel.app/produit",
  brand: {
    "@type": "Brand",
    name: "bibiabusness",
  },
  offers: {
    "@type": "Offer",
    url: "https://bibiabusness.vercel.app/produit/",
    priceCurrency: "GNF",
    price: product.price,
    priceValidUntil: "2025-12-31",
    itemCondition: "https://schema.org/NewCondition",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "125",
  },
});

// Configuration EmailJS
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  userId: import.meta.env.VITE_EMAILJS_USER_ID,
};

// Palette de couleurs
const colors = {
  primary: "#b96f33",
  secondary: "#a07753",
  dark: "#011d23",
  light: "#f8f9fa",
  white: "#ffffff",
  error: "#ef4444",
  success: "#011d23",
};

// Styles globaux 011d23
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  }

  body {
    background-color: ${colors.light};
    color: ${colors.dark};
    line-height: 1.6;
  }

  button {
    cursor: pointer;
    transition: all 0.3s ease;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

// Composants stylisés
const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors};
`;

const Header = styled.header`
  top: 0;
  background-color: ;
  width: 100%;
  z-index: 1000;
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

const HeaderContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: ${colors.dark};
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${colors.dark};
  font-size: 1.25rem;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -0.8rem;
  right: -0.7rem;
  background-color: ${colors.primary};
  color: white;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;

const Section = styled.section`
  padding: 3rem 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: ${colors.dark};
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 140px;
    height: 4px;
    background: ${colors.primary};
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(9, 1fr);
  }
`;

const CategoryCard = styled.div`
  background: ${({ $active }) => ($active ? "#f5e9de" : colors.white)};
  border: 2px solid ${({ $active }) => ($active ? colors.primary : "#e5e7eb")};

  padding: 1rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 2px 1px #b96f33;
  }
`;

const CategoryIcon = styled.div`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: ${({ $active }) => ($active ? colors.primary : "#6b7280")};
`;

const CategoryName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.dark};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: ${colors.white};

  overflow: hidden;
  box-shadow: 0px 2px 0px #b96f33;
  transition: all 0.6s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 2px 2px 6px #b96f33;
  }
`;

const ProductImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  //   box-shadow: 2px 1px 5px  #011d23 ;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 1.05rem;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${colors.dark};
`;

const ProductPrice = styled.p`
  color: ${colors.primary};
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const AddToCartButton = styled.button`
  width: 52%;
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 0.45rem;

  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CartOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  animation: ${fadeIn} 0.3s ease;
`;

const CartBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;

const CartContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 98%;
  background-color: ${colors.white};

  animation: ${slideIn} 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #b96f33;
`;

const CartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.dark};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1.25rem;

  &:hover {
    color: ${colors.dark};
  }
`;

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
`;

const EmptyCart = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b7280;
`;

const CartItem = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #b96f33;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.3rem;
`;

const CartItemDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const CartItemName = styled.h4`
  font-size: 0.875rem;
  font-weight: 900;
  margin-bottom: 0.15rem;
  color: ${colors.dark};
`;

const CartItemPrice = styled.p`
  font-size: 0.975rem;
  color: #b96f33;
  margin-bottom: 0.5rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border: none;
  border-radius: 0.95rem;
  color: #011d23;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const Quantity = styled.span`
  margin: 0 0.5rem;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background-color: ${colors.light};

  border: none;
  color: ${colors.error};
  font-size: 0.75rem;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CartFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  color: ${colors.dark};
`;

const CheckoutButton = styled.button`
  width: 100%;
  background-color: ${colors.success};
  color: white;
  border: none;
  padding: 1rem;

  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #b96f33;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #011d23;
  animation: ${fadeIn} 0.8s ease;
`;

const ModalContainer = styled.div`
  background-color: ${colors.white};

  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: -3px 3px 1px #b96f33;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.white};

  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid ${colors.success};
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 0.8rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.dark};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ $error }) => ($error ? colors.error : "#d1d5db")};

  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0px 3px 0px #b96f33;
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(185, 111, 51, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.15rem;
  border: 1px solid ${({ $error }) => ($error ? colors.error : "#d1d5db")};

  font-size: 0.875rem;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 0px;
  box-shadow: 0px 3px 0px #b96f33;
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(185, 111, 51, 0.1);
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const PaymentInfo = styled.div`
  background-color: #f5e9de;
  padding: 1rem;

  margin: 1.5rem 0;
  display: flex;
  gap: 0.75rem;
`;

const PaymentIcon = styled.div`
  color: ${colors.primary};
  font-size: 1.45rem;
`;

const PaymentContent = styled.div``;

const PaymentTitle = styled.h5`
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 0.25rem;
`;

const PaymentText = styled.p`
  font-size: 0.875rem;
  color: ${colors.dark};
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;

  background-color: #a07753;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.success};
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;

  background-color: ${colors.success};
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a07753;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;
const ProductDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.text};
  margin-bottom: 2rem;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
  margin: 0 1rem;

  @media (max-width: 768px) {
    display: ;
    margin-right: 2rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  box-shadow: 0.1px 0.1px 4px #011d23;

  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;

    box-shadow: 0 0 0 1px rgba(185, 111, 51, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #011d23;
`;

const Navbar = () => {
  // États
  const [cart, setCart] = useState(() => {
    const savedCart =
      typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("tous");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    address: "",
    city: "",
    // email: "",
  });
  const [errors, setErrors] = useState({});
  const [canDownloadPDF, setCanDownloadPDF] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Données produits

  const categories = [
    {
      id: "mode",
      name: "Mode",
      icon: faTshirt,
      color: "#FF6B6B", // Rouge pastel
    },
    {
      id: "electronique",
      name: "Électronique",
      icon: faMobileScreen,
      color: "#4ECDC4", // Turquoise
    },
    {
      id: "maison",
      name: "Maison",
      icon: faCouch,
      color: "#FFD166", // Jaune doré
    },
    {
      id: "beaute",
      name: "Beauté",
      icon: faSprayCanSparkles,
      color: "#A78BFA", // Violet pastel
    },
    {
      id: "bijoux",
      name: "Bijoux",
      icon: faGem,
      color: "#06D6A0", // Émeraude
    },
    {
      id: "maison",
      name: "Maison",
      icon: faUtensils,
      color: "#EF476F", // Rose vif
    },
    {
      id: "livres",
      name: "Livres",
      icon: faBookOpen,
      color: "#118AB2", // Bleu océan
    },
    {
      id: "habillement",
      name: "Santé",
      icon: faHeartPulse,
      color: "#FF9A5A", // Orange doux
    },
  ];

  const products = [
    // Catégorie Mode
    {
      id: 1,
      name: "Chemise en Soie",
      price: 89199,
      image: chemiseSoie,
      category: "mode",
      description:
        "Chemise élégante en soie 100% naturelle, confortable et respirante pour toutes les occasions.",
    },
    {
      id: 2,
      name: "Jean Slim Noir",
      price: 59099,
      image: prodd,
      category: "mode",
      description:
        "Jean slim noir stretch, coupe moderne et confortable pour un look urbain.",
    },

    // Catégorie Électronique
    {
      id: 3,
      name: "Montre Connectée",
      price: 200000,
      image: onz,
      category: "electronique",
      description:
        "Montre intelligente avec suivi d'activité, notifications et autonomie de 7 jours.",
    },
    {
      id: 4,
      name: "Écouteurs Sans Fil",
      price: 129099,
      image: prodd,
      category: "electronique",
      description:
        "Écouteurs Bluetooth avec réduction de bruit active et son haute fidélité.",
    },

    // Catégorie Maison
    {
      id: 5,
      name: "Lampe Design",
      price: 129099,
      image: prodd,
      category: "maison",
      description:
        "Lampe moderne à LED avec design minimaliste et intensité lumineuse réglable.",
    },
    {
      id: 6,
      name: "Confort",
      price: 40000,
      image: hui,
      category: "maison",
      description: "Naturel, idéal pour la douche.",
    },

    // Catégorie Beauté
    {
      id: 7,
      name: "Parfum Luxe",
      price: 79099,
      image: hhhhh,
      category: "beaute",
      description:
        "Parfum élégant aux notes boisées et florales, flacon de 100ml avec vaporisateur.",
    },
    {
      id: 8,
      name: "Couverture",
      price: 490000,
      image: ne,
      category: "maison",
      description: "Tres resistant contre le froid",
    },

    // Catégorie Bijoux
    {
      id: 9,
      name: "Sac Argent",
      price: 200000,
      image: eee,
      category: "bijoux",
      description: "Sac avec fermoir sécurisé, design intemporel.",
    },
    {
      id: 10,
      name: "Sac a main",
      price: 119099,
      image: eeee,
      category: "bijoux",
      description: "Sac avec fermoir sécurisé, design intemporel.",
    },

    // Catégorie maison
    {
      id: 11,
      name: "Le lit",
      price: 500000,
      image: sep,
      category: "maison",
      description: "Inoxydable haute résistance, manche ergonomique.",
    },
    {
      id: 12,
      name: "Mixage",
      price: 400000,
      image: rr,
      category: "electronique",
      description: "Pour vos mixages de menage",
    },

    // Catégorie Livres
    {
      id: 13,
      name: "T-shirt",
      price: 80000,
      image: six,
      category: "mode",
      description: "Il y'a des differentes couleurs disponible",
    },
    {
      id: 14,
      name: "Machine menage",
      price: 240099,
      image: dix,
      category: "electronique",
      description: "Pour le menage de votre maison",
    },

    // Catégorie Santé
    {
      id: 15,
      name: "Habillement",
      price: 150000,
      image: rrr,
      category: "mode",
      description: "Habillement confortable avec style",
    },
    {
      id: 16,
      name: "Huile Essentielle Lavande",
      price: 148099,
      image: rrrr,
      category: "mode",
      description: "Habillement confortable avec style",
    },
  ];
  // Effets
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonctions utilitaires
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "GNF",
    }).format(price);
  };
  //pri
  const sanitizeInput = (input) => {
    return input
      .replace(/<[^>]*>?/gm, "")
      .replace(/[^\w\sàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ'-]/gi, "");
  };

  // Gestion du panier
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Animation de notification
    toast.success(`${product.name} ajouté au panier`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const updateCartItem = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  const validatePhoneNumber = (phone) => {
    // Supprime tous les caractères non numériques
    const cleanedPhone = phone.replace(/\D/g, "");

    // Valide que c'est exactement 9 chiffres
    return cleanedPhone.length === 9 && /^[0-9]{9}$/.test(cleanedPhone);
  };
  // Calculs panier
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Filtrage produits
  const filteredProducts =
    selectedCategory === "tous"
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products.filter(
          (product) =>
            product.category === selectedCategory &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Validation formulaire pr
  const validateForm = () => {
    const newErrors = {};

    if (!formData.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!formData.address.trim()) newErrors.address = "Adresse requise";
    if (!formData.city.trim()) newErrors.city = "Ville requise";
    if (!formData.phone.trim()) {
      newErrors.phone = "Téléphone requis";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Format invalide (ex: +224 622 878 589)";
    }
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setCanDownloadPDF(isValid);
    return isValid;
  };
  // Gestion du changement de numéro de téléphone avec formatage
  const handlePhoneChange = (e) => {
    // Garde seulement les chiffres et limite à 9 caractères
    let value = e.target.value.replace(/\D/g, "").slice(0, 9);

    // Ajoute des espaces pour la lisibilité (XXX XXX XXX)
    let formattedValue = value;
    if (value.length > 3) {
      formattedValue = value.substring(0, 3) + " " + value.substring(3);
    }
    if (value.length > 6) {
      formattedValue =
        formattedValue.substring(0, 7) + " " + formattedValue.substring(7);
    }

    setFormData((prev) => ({
      ...prev,
      phone: formattedValue,
    }));

    // Re-valider le formulaire
    setTimeout(() => {
      validateForm();
    }, 100);
  };
  // Gestion formulaire pr
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
    // Re-valider le formulaire après chaque changement
    setTimeout(() => {
      validateForm();
    }, 100);
  };

  // Fonction pour générer un numéro de facture unique
  const generateInvoiceNumber = () => {
    const now = new Date();
    const year = now.getFullYear();

    // Récupère ou initialise le compteur depuis localStorage
    const storageKey = `bibiabusiness_invoice_counter_${year}`;
    let lastNumber = localStorage.getItem(storageKey);

    // Si pas de valeur stockée ou nouvelle année, initialise à 1
    if (!lastNumber || !lastNumber.startsWith(year)) {
      lastNumber = `${year}001`;
    }

    // Incrémente le numéro
    const prefix = lastNumber.substring(0, 4); // Les 4 premiers chiffres (année)
    const sequence = parseInt(lastNumber.substring(4), 10) + 1;
    const newNumber = `${prefix}${sequence.toString().padStart(3, "0")}`;

    // Stocke le nouveau numéro
    localStorage.setItem(storageKey, newNumber);
    return `FACT-${newNumber}`;
  };

  // Gestion commande
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Votre panier est vide", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    setOrderDetails({
      items: [...cart],
      total: cartTotal,
      date: new Date().toLocaleString("fr-FR"),
      paymentMethod: "Paiement à la livraison",
    });

    setShowOrderModal(true);
  };

  const confirmOrder = async () => {
    if (!validateForm()) return;

    // Notification de chargement
    const toastId = toast.loading(
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: 600 }}>Traitement de votre commande</span>
        <span style={{ fontSize: "0.875rem" }}>Veuillez patienter...</span>
      </div>,
      {
        position: "top-center",
        theme: "light",
      }
    );

    setIsSubmitting(true);

    try {
      const invoiceNumber = generateInvoiceNumber();
      const invoiceDate = new Date().toLocaleDateString("fr-FR");
      generatePDF(invoiceNumber, invoiceDate);
      await sendEmail(invoiceNumber, invoiceDate);

      setCart([]);
      setShowOrderModal(false);
      setFormData({
        lastName: "",
        firstName: "",
        address: "",
        city: "",
        phone: "",
      });

      // Mise à jour vers un toast de succès
      toast.update(toastId, {
        render: (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div
                style={{
                  boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: colors.success,
                    marginBottom: "8px",
                  }}
                >
                  Commande confirmée
                </div>
                <hr
                  style={{
                    border: "none",
                    height: "1px",
                    backgroundColor: "#E5E7EB",
                    margin: "8px 0",
                  }}
                />
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: colors.dark,
                    lineHeight: "1.5",
                  }}
                >
                  Notre équipe vous contactera sous 24h
                  <br />
                  Livraison prévue sous 24h <br />
                  Facture téléchargée dans la machine
                </div>
              </div>
            </div>
          </div>
        ),
        type: "success",
        isLoading: false,
        autoClose: 8000,
        closeButton: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Erreur:", error);

      // Mise à jour vers un toast d'erreur
      toast.update(toastId, {
        render: (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0 }}>
                <svg
                  style={{ width: "24px", height: "24px", color: colors.error }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div style={{ marginLeft: "12px" }}>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: colors.error,
                  }}
                >
                  Oups, problème technique
                </h3>
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "0.875rem",
                    color: colors.error,
                  }}
                >
                  <p>• Votre facture a bien été générée</p>
                  <p>• L'email n'a pas pu être envoyé</p>
                  <p>• Contactez-nous si le problème persiste</p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "12px",
              }}
            >
              <button
                onClick={() => window.location.reload()}
                style={{
                  flex: 1,
                  borderRadius: "6px",
                  backgroundColor: "#FEE2E2",
                  padding: "6px 12px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: colors.error,
                  border: "none",
                }}
              >
                Réessayer
              </button>
              <button
                onClick={() => (window.location.href = "/contact")}
                style={{
                  flex: 1,
                  borderRadius: "6px",
                  backgroundColor: "#F3F4F6",
                  padding: "6px 12px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: colors.dark,
                  border: "none",
                }}
              >
                Nous contacter
              </button>
            </div>
          </div>
        ),
        type: "error",
        isLoading: false,
        autoClose: 10000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  //pr
  const sendEmail = async (invoiceNumber, invoiceDate) => {
    try {
      await send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
          phone: formData.phone,
          city: formData.city,
          invoice_number: invoiceNumber,
          total_amount: formatPrice(cartTotal),
          current_date: invoiceDate,
          order_details: orderDetails.items
            .map(
              (item) =>
                `${item.name} (${item.quantity}x ${formatPrice(item.price)})`
            )
            .join("\n"),
        },
        EMAILJS_CONFIG.userId
      );
    } catch (error) {
      console.error("Erreur d'envoi :", error);
      throw error;
    }
  };

  const generatePDF = (invoiceNumber, invoiceDate) => {
    const doc = new jsPDF();

    // Couleurs personnalisées
    const primaryColor = [185, 111, 51]; // #b96f33
    const secondaryColor = [1, 29, 35]; // #011d23
    const lightColor = [248, 249, 250]; // #f8f9fa

    // En-tête avec logo et informations
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 30, "F");

    // Logo et nom de l'entreprise
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("ETABLISSEMENT BIBIA BUSINESS", 105, 20, { align: "center" });

    // Ligne de séparation
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Informations de facture
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Facture N°: ${invoiceNumber}`, 20, 45);
    doc.text(`Date: ${invoiceDate}`, 190, 45, { align: "right" });

    // Section client
    doc.setFontSize(12);
    doc.setTextColor(...secondaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("INFORMATIONS CLIENT", 20, 60);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom: ${formData.lastName}`, 20, 70);
    doc.text(`Prénom: ${formData.firstName}`, 20, 80);
    doc.text(`Adresse: ${formData.address}`, 20, 90);
    doc.text(`Ville: ${formData.city}`, 20, 100);
    doc.text(`Téléphone: ${formData.phone}`, 20, 110);

    // Détails de commande
    doc.setFontSize(12);
    doc.setTextColor(...secondaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("DÉTAILS DE LA COMMANDE", 20, 130);

    // Tableau des produits
    autoTable(doc, {
      startY: 140,
      head: [
        [
          {
            content: "Produit",
            styles: {
              fillColor: secondaryColor,
              textColor: 255,
              fontStyle: "bold",
            },
          },
          {
            content: "Qté",
            styles: {
              fillColor: secondaryColor,
              textColor: 255,
              fontStyle: "bold",
              halign: "center",
            },
          },
          {
            content: "Prix Unitaire",
            styles: {
              fillColor: secondaryColor,
              textColor: 255,
              fontStyle: "bold",
              halign: "right",
            },
          },
          {
            content: "Total",
            styles: {
              fillColor: secondaryColor,
              textColor: 255,
              fontStyle: "bold",
              halign: "right",
            },
          },
        ],
      ],
      body: orderDetails.items.map((item) => [
        {
          content: item.name,
          styles: { fontStyle: "bold" },
        },
        {
          content: item.quantity,
          styles: { halign: "center" },
        },
        {
          content: formatPrice(item.price),
          styles: { halign: "right" },
        },
        {
          content: formatPrice(item.price * item.quantity),
          styles: { halign: "right" },
        },
      ]),
      headStyles: {
        fillColor: secondaryColor,
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: lightColor,
      },
      margin: { top: 10 },
      styles: {
        cellPadding: 5,
        fontSize: 10,
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: 20 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
      },
    });

    // Section totale
    const finalY = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(12);
    doc.setTextColor(...secondaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("Méthode de paiement:", 20, finalY);
    doc.setFont("helvetica", "normal");
    doc.text("Paiement à la livraison (espèces)", 65, finalY);

    // Ligne de séparation
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, finalY + 10, 190, finalY + 10);

    // Total
    doc.setFontSize(14);
    doc.setTextColor(...secondaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("Total à payer:", 110, finalY + 25);
    doc.text(formatPrice(orderDetails.total), 190, finalY + 25, {
      align: "right",
    });

    // Pied de page
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Merci pour votre confiance !", 105, 280, { align: "center" });
    doc.text("Bibiabusiness - Votre partenaire shopping premium", 105, 285, {
      align: "center",
    });
    doc.text(
      "Contact: contact@bibiabusiness.com - +224 624 456 789",
      105,
      290,
      { align: "center" }
    );

    // Sauvegarde
    doc.save(`facture_${invoiceNumber}.pdf`);
  };

  return (
    <>
      <Seo
        title="Achetez les meilleurs produits en ligne - Boutique Officielle"
        description="Découvrez une large sélection de vêtements, équipements ménagers et produits alimentaires à des prix imbattables. Livraison rapide et paiement sécurisé."
        keywords="achat en ligne, boutique e-commerce, vêtements, équipements ménagers, alimentation, prix abordables, livraison rapide, paiement sécurisé"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(createSchemaMarkup)}
        </script>
      </Helmet>
      <Navigation />
      <GlobalStyle />
      <Container>
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

        {/* Catégories */}
        <Section style={{ marginTop: "80px" }}>
          <SectionTitle>Nos Catégories</SectionTitle> {/* Header */}
          <Header $scrolled={isScrolled}>
            <HeaderContainer>
              <Logo>
                <IconButton onClick={() => setShowCart(!showCart)}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {cartCount > 0 && <Badge>{cartCount}</Badge>}
                </IconButton>
              </Logo>

              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon>
                  <FontAwesomeIcon icon={faSearch} />
                </SearchIcon>
              </SearchContainer>
            </HeaderContainer>
          </Header>
          <CategoryGrid>
            {[{ id: "tous", name: "Tous", icon: null }, ...categories].map(
              (category) => (
                <CategoryCard
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  $active={selectedCategory === category.id}
                >
                  {category.icon && (
                    <CategoryIcon $active={selectedCategory === category.id}>
                      <FontAwesomeIcon icon={category.icon} />
                    </CategoryIcon>
                  )}
                  <CategoryName>{category.name}</CategoryName>
                </CategoryCard>
              )
            )}
          </CategoryGrid>
        </Section>

        {/* Produits */}
        <Section style={{ backgroundColor: colors.light }}>
          <SectionTitle>
            {selectedCategory === "tous"
              ? "Nos Produits"
              : `Produits ${
                  categories.find((c) => c.id === selectedCategory)?.name
                }`}
          </SectionTitle>
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImageContainer>
                  <ProductImage src={product.image} alt={product.name} />
                </ProductImageContainer>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{formatPrice(product.price)}</ProductPrice>
                  <ProductDescription>{product.description}</ProductDescription>
                  <AddToCartButton onClick={() => addToCart(product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Ajouter
                  </AddToCartButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        </Section>

        {/* Panier latéral */}
        {showCart && (
          <CartOverlay>
            <CartBackdrop onClick={() => setShowCart(false)} />
            <CartContainer>
              <CartHeader>
                <CartTitle>Votre Panier ({cartCount})</CartTitle>
                <CloseButton onClick={() => setShowCart(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </CloseButton>
              </CartHeader>
              <CartContent>
                {cart.length === 0 ? (
                  <EmptyCart>
                    <p>Votre panier est vide</p>
                  </EmptyCart>
                ) : (
                  <>
                    {cart.map((item) => (
                      <CartItem key={item.id}>
                        <CartItemImage src={item.image} alt={item.name} />
                        <CartItemDetails>
                          <CartItemName>{item.name}</CartItemName>
                          <CartItemPrice>
                            {formatPrice(item.price)}
                          </CartItemPrice>
                          <QuantityControl>
                            <QuantityButton
                              onClick={() =>
                                updateCartItem(item.id, item.quantity - 1)
                              }
                            >
                              <FontAwesomeIcon icon={faMinus} size="xs" />
                            </QuantityButton>
                            <Quantity>{item.quantity}</Quantity>
                            <QuantityButton
                              onClick={() =>
                                updateCartItem(item.id, item.quantity + 1)
                              }
                            >
                              <FontAwesomeIcon icon={faPlus} size="xs" />
                            </QuantityButton>
                          </QuantityControl>
                          <RemoveButton onClick={() => removeFromCart(item.id)}>
                            Supprimer
                          </RemoveButton>
                        </CartItemDetails>
                      </CartItem>
                    ))}
                  </>
                )}
              </CartContent>
              {cart.length > 0 && (
                <CartFooter>
                  <CartTotal>
                    <span>Total:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </CartTotal>
                  <CheckoutButton onClick={handleCheckout}>
                    Valider la commande
                  </CheckoutButton>
                </CartFooter>
              )}
            </CartContainer>
          </CartOverlay>
        )}

        {/* Modale de confirmation de commande */}
        {showOrderModal && (
          <ModalOverlay>
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: colors.success }}
                  />
                  Finalisation de commande
                </ModalTitle>
                <CloseButton onClick={() => setShowOrderModal(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <FormGroup>
                    <FormLabel>Nom*</FormLabel>
                    <FormInput
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      $error={errors.lastName}
                    />
                    {errors.lastName && (
                      <ErrorMessage>{errors.lastName}</ErrorMessage>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Prénom*</FormLabel>
                    <FormInput
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      $error={errors.firstName}
                    />
                    {errors.firstName && (
                      <ErrorMessage>{errors.firstName}</ErrorMessage>
                    )}
                  </FormGroup>
                </div>
                <FormGroup>
                  <FormLabel>Téléphone* (+224)</FormLabel>
                  <div style={{ position: "relative" }}>
                    <FormInput
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="123 456 789"
                      $error={errors.phone}
                      maxLength={11} // 9 chiffres + 2 espaces
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: colors.primary,
                      }}
                    >
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                  </div>
                  {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Adresse*</FormLabel>
                  <FormTextarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    $error={errors.address}
                  />

                  {errors.address && (
                    <ErrorMessage>{errors.address}</ErrorMessage>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Ville*</FormLabel>
                  <FormInput
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    $error={errors.city}
                  />
                  {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                </FormGroup>

                <PaymentInfo>
                  <PaymentIcon>
                    <FontAwesomeIcon icon={faHome} />
                  </PaymentIcon>
                  <PaymentContent>
                    <PaymentTitle>Paiement à la livraison</PaymentTitle>
                    <PaymentText>
                      Veuillez préparer le montant exact en espèces. Notre
                      livreur vous contactera pour confirmer la livraison.
                    </PaymentText>
                  </PaymentContent>
                </PaymentInfo>
              </ModalBody>
              <ModalFooter>
                <CancelButton onClick={() => setShowOrderModal(false)}>
                  Annuler
                </CancelButton>
                <ConfirmButton
                  onClick={confirmOrder}
                  disabled={isSubmitting || !canDownloadPDF}
                >
                  {isSubmitting ? "Traitement..." : "Confirmer la commande"}
                </ConfirmButton>
              </ModalFooter>
            </ModalContainer>
          </ModalOverlay>
        )}
        <div className=" mb-52"></div>
      </Container>
    </>
  );
};

export default Navbar;
