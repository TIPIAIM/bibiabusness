import { send } from "@emailjs/browser";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Stycs.css";
import {
  faShoppingCart,
  faShirt,
  faLaptop,
  faHouse,
  faSprayCan,
  faTimes,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faPlus,
  faMinus,
  faCheckCircle,
  faHome,
  faUser,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import chemiseSoie from "../assets/com.jpg";
import produits from "../assets/produits.jpg";
import hhhhh from "../assets/hhhhh.jpeg";
import prodd from "../assets/prodd.webp";

// Configuration EmailJS - À remplacer avec vos identifiants
const EMAILJS_CONFIG = {
  serviceId: "service_7c6k91b",
  templateId: "template_14uzr1i",
  userId: "WoFCt9GjlVn-LwHrb",
};

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
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [canDownloadPDF, setCanDownloadPDF] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données produits
  const categories = [
    { id: "mode", name: "Mode", icon: faShirt },
    { id: "electronics", name: "Électronique", icon: faLaptop },
    { id: "maison", name: "Maison", icon: faHouse },
    { id: "beaute", name: "Beauté", icon: faSprayCan },
  ];

  const products = [
    {
      id: 1,
      name: "Chemise en Soie",
      price: 89.99,
      image: chemiseSoie,
      category: "mode",
    },
    {
      id: 2,
      name: "Montre Connectée",
      price: 199.99,
      image: produits,
      category: "electronics",
    },
    {
      id: 3,
      name: "Lampe Design",
      price: 129.99,
      image: prodd,
      category: "maison",
    },
    {
      id: 4,
      name: "Parfum Luxe",
      price: 79.99,
      image: hhhhh,
      category: "beaute",
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
      currency: "EUR",
    }).format(price);
  };

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

  // Calculs panier
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Filtrage produits
  const filteredProducts =
    selectedCategory === "tous"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  // Regex pour validation
  // const phoneRegex = /^(6|7)\d{8}$/; // Format: 612345678

  // Validation formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!formData.address.trim()) newErrors.address = "Adresse requise";
    if (!formData.city.trim()) newErrors.city = "Ville requise";

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setCanDownloadPDF(isValid);
    return isValid;
  };

  // Gestion formulaire
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
      alert("Votre panier est vide");
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
      <div className="flex flex-col">
        <span className="font-semibold">Traitement de votre commande</span>
        <span className="text-sm">Veuillez patienter...</span>
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
      });

      // Mise à jour vers un toast de succès
      toast.update(toastId, {
        render: (
          <div className="flex flex-col">
            <div className="flex items-start">
              <div className="toast-custom">
                <div className="toast-title ">Commande confirmée</div>
                <hr />
                <div className="toast-body">
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
        autoClose: 80000,
        closeButton: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Erreur:", error);

      // Mise à jour vers un toast d'erreur
      toast.update(toastId, {
        render: (
          <div className="flex flex-col">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-500"
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
              <div className="ml-3">
                <h3 className="font-bold text-red-800">
                  Oups, problème technique
                </h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>• Votre facture a bien été générée</p>
                  <p>• L'email n'a pas pu être envoyé</p>
                  <p>• Contactez-nous si le problème persiste</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
              >
                Réessayer
              </button>
              <button
                onClick={() => (window.location.href = "/contact")}
                className="flex-1 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100"
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
  const sendEmail = async (invoiceNumber, invoiceDate) => {
    try {
      await send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          //  phone: formData.phone,

          address: formData.address,
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
      console.error("Erreur d'envoi d'email:", error);
      throw error; // Propage l'erreur pour la gestion dans confirmOrder
    }
  };
  // Génération PDF
  const generatePDF = (invoiceNumber, invoiceDate) => {
    const doc = new jsPDF();

    // En-tête
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229);
    doc.setFont("helvetica", "bold");
    doc.text("Bibiabusiness", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Votre partenaire shopping premium", 105, 28, { align: "center" });

    // Informations de facture
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Facture N°: ${invoiceNumber}`, 20, 40);
    doc.text(`Date: ${invoiceDate}`, 160, 40, { align: "right" });

    // Informations client
    doc.setFont("helvetica", "bold");
    doc.text("Informations Client:", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`Nom: ${formData.lastName}`, 20, 70);
    doc.text(`Prénom: ${formData.firstName}`, 20, 80);
    //  doc.text(`Téléphone: ${formData.phone}`, 20, 100);
    doc.text(`Adresse: ${formData.address}`, 20, 110);
    doc.text(`Ville: ${formData.city}`, 20, 120);

    // Détails de commande
    autoTable(doc, {
      startY: 130,
      head: [["Produit", "Qté", "Prix Unitaire", "Total"]],
      body: orderDetails.items.map((item) => [
        item.name,
        item.quantity,
        formatPrice(item.price),
        formatPrice(item.price * item.quantity),
      ]),
      headStyles: {
        fillColor: [79, 70, 229],
        textColor: 255,
        fontStyle: "bold",
      },
      margin: { top: 10 },
    });

    // Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${formatPrice(orderDetails.total)}`, 160, finalY, {
      align: "right",
    });

    // Sauvegarde
    doc.save(`facture_${invoiceNumber}.pdf`);
  };
  return (
    <div className="min-h-screen bg-white">
      <ToastContainer
        position="top-center"
        autoClose="false"
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        style={{
          width: "clamp(350px, 85vw, 450px)",
          textAlign: "left", // Alignement global à droite
          fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
        }}
        toastStyle={{
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
          padding: "16px 20px",
          alignItems: "flex-start", // Alignement interne à droite
        }}
        bodyStyle={{
          margin: 0,
          width: "100%",
          textAlign: "right", // Force l'alignement à droite
        }}
      />
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-3xl font-bold text-indigo-600">
              Bibiabusiness
            </h1>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Produits
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    À propos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowCart(!showCart)}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-2xl text-gray-600 hover:text-indigo-600 transition-colors"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Connexion
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="mt-20 relative h-[600px] bg-gradient-to-r from-indigo-100 to-purple-50 overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-full"
        >
          <SwiperSlide>
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="w-full md:w-1/2 pr-0 md:pr-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Découvrez nos produits Exclusif
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Profitez de nos offres exceptionnelles avec paiement à la
                  livraison.
                </p>
                <button className="bg-indigo-600 text-white px-8 py-3 text-lg rounded-md hover:bg-indigo-700 transition-colors">
                  Explorer maintenant
                </button>
              </div>
              <div className="hidden md:block md:w-1/2">
                <img
                  src="https://public.readdy.ai/ai/img_res/6b61537e27d94cc4c96706838d127a3c.jpg"
                  alt="Shopping Experience"
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Catégories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Catégories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[{ id: "tous", name: "Tous", icon: null }, ...categories].map(
              (category) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-indigo-50 border-indigo-600"
                      : "bg-white border-gray-200"
                  } border-2 rounded-xl p-4 md:p-8 text-center cursor-pointer transition-all hover:shadow-lg flex flex-col items-center`}
                >
                  {category.icon && (
                    <FontAwesomeIcon
                      icon={category.icon}
                      className={`text-3xl md:text-4xl mb-4 ${
                        selectedCategory === category.id
                          ? "text-indigo-600"
                          : "text-gray-600"
                      }`}
                    />
                  )}
                  <h3 className="text-lg md:text-xl font-semibold">
                    {category.name}
                  </h3>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Produits */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {selectedCategory === "tous"
              ? "Nos Produits"
              : `Produits ${
                  categories.find((c) => c.id === selectedCategory)?.name
                }`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 sm:h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {formatPrice(product.price)}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bibiabusiness</h3>
            <p className="text-gray-400">
              Votre destination shopping premium avec paiement à la livraison.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {["À propos", "Produits", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Guinée conakry, boké
              </li>
              <li className="flex items-center text-gray-400">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                +661 13 25 89
              </li>
              <li className="flex items-center text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                contact@Bibiabusiness.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Paiement Sécurisé</h4>
            <div className="flex space-x-4">
              <FontAwesomeIcon
                icon={faCcVisa}
                className="text-3xl text-gray-400"
              />
              <FontAwesomeIcon
                icon={faCcMastercard}
                className="text-3xl text-gray-400"
              />
              <FontAwesomeIcon
                icon={faCcPaypal}
                className="text-3xl text-gray-400"
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Panier latéral */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  Votre Panier ({cartCount})
                </h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">Votre panier est vide</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center border-b pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4 flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-gray-600">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center mt-1">
                            <button
                              onClick={() =>
                                updateCartItem(item.id, item.quantity - 1)
                              }
                              className="text-gray-500 hover:text-indigo-600"
                            >
                              <FontAwesomeIcon icon={faMinus} size="xs" />
                            </button>
                            <span className="mx-2 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartItem(item.id, item.quantity + 1)
                              }
                              className="text-gray-500 hover:text-indigo-600"
                            >
                              <FontAwesomeIcon icon={faPlus} size="xs" />
                            </button>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-bold text-lg mb-4">
                        <span>Total:</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                      <button
                        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                        onClick={handleCheckout}
                      >
                        Valider la commande (Paiement à la livraison)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale de confirmation de commande */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-600 flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mr-3 text-green-500"
                  />
                  Finalisation de commande
                </h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors`}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors`}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse*
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors`}
                    rows={3}
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville*
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors`}
                    required
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg mb-6 mt-6">
                <div className="flex items-start">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="text-indigo-600 mt-1 mr-3"
                  />
                  <div>
                    <h5 className="font-semibold text-indigo-800">
                      Paiement à la livraison
                    </h5>
                    <p className="text-sm text-gray-700 mt-1">
                      Veuillez préparer le montant exact en espèces. Notre
                      livreur vous contactera pour confirmer la livraison.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  onClick={generatePDF}
                  disabled={!canDownloadPDF}
                  className={`flex items-center justify-center py-3 px-4 rounded-lg transition-colors ${
                    canDownloadPDF
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FontAwesomeIcon icon={faFilePdf} className="mr-3" />
                  <span>Télécharger le récapitulatif (PDF)</span>
                </button>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  {/* Modifier le bouton de confirmation pour gérer l'état de soumission */}
                  <button
                    onClick={confirmOrder}
                    disabled={isSubmitting}
                    className={`flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Traitement..." : "Confirmer la commande"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
