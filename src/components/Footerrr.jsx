import { motion } from "framer-motion";
import styled from "styled-components";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUp,
  HelpCircle,
  FileText,
  Lock,
  Hand,
  X,
} from "lucide-react";
import { useState } from "react";
// Palette de couleurs
const colors = {
  primary: "#b96f33",
  secondary: "#a07753",
  dark: "#011d23",
  light: "#f8f9fa",
  white: "#ffffff",
};

// Animations
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};
const FullWidthFooter = styled.footer`
  width: 99vw; //ocupe les largeur en plain
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: ${colors.dark};
  border-top: 1px solid rgba(${colors.primary}, 0.3);
`;

// Styles
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled(motion.div)`
  background: ${colors.white};
  padding: 2rem;
  border-radius: 1px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  color: ${colors.dark};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.dark};
`;

const ModalTitle = styled.h3`
  color: ${colors.primary};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-right: 2rem;
`;

const ModalText = styled.div`
  line-height: 1.6;
  margin-bottom: 1rem;
  text-align: left;

  h4 {
    color: ${colors.primary};
    margin: 1.5rem 0 0.5rem;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;
const FooterContainer = styled.footer`
  background: ${colors.dark};
  border-top: 1px solid rgba(${colors.primary}, 0.3);
  width: 100%;
`;

const InnerContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SectionTitle = styled(motion.h3)`
  color: ${colors.primary};
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${colors.primary};
  }
`;

const ContactSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const ContactItem = styled(motion.div).attrs(() => ({
  whileHover: { x: 5 },
}))`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${colors.light};
  font-size: 0.95rem;

  svg {
    color: ${colors.primary};
    flex-shrink: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.primary};
    }
  }
`;

const ServicesSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ServiceItem = styled(motion.div).attrs(() => ({
  whileHover: { x: 5 },
}))`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${colors.light};
  font-size: 0.95rem;

  svg {
    color: ${colors.primary};
    flex-shrink: 0;
  }
`;

const SocialSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a).attrs(() => ({
  whileHover: { y: -3, scale: 1.1 },
  whileTap: { scale: 0.9 },
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  background: rgba(${colors.primary}, 0.1);
  color: ${colors.light};
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.primary};
    color: ${colors.white};
  }
`;

const NewsletterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsletterButton = styled(motion.button).attrs(() => ({
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
}))`
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 0.8rem;

  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${colors.secondary};
  }
`;

const LegalSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-column: 1 / -1;
  border-top: 1px solid rgba(${colors.primary}, 0.2);
  padding-top: 2rem;
  margin-top: 1rem;
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: left;
`;

const LegalLink = styled(motion.a).attrs(() => ({
  whileHover: { scale: 1.05 },
}))`
  color: ${colors.light};
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
  @media (max-width: 480px) {
    align-items: left;
  }
`;

const CopyrightSection = styled(motion.div)`
  text-align: center;
  color: ${colors.secondary};
  font-size: 0.9rem;
  margin-top: 2rem;
`;

const BackToTop = styled(motion.button).attrs(() => ({
  whileHover: { y: -5 },
  whileTap: { scale: 0.9 },
}))`
  background: none;
  border: none;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem auto 0;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.white};
  }
`;

const Footer = () => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // Contenus des modales
  const legalContents = {
    mentions: {
      title: "Mentions Légales",
      content: (
        <ModalText>
          <h4>Éditeur du site</h4>
          <p>
            BibiaBusiness SARL
            <br />
            Capital social : 50 000 000 GNF
            <br />
            RCS Conakry: 123 456 789
            <br />
            Siège social: Kamsar, Conakry, Guinée
          </p>

          <h4>Directeur de publication</h4>
          <p>Mme Bibia Diallo, Gérante</p>

          <h4>Hébergement</h4>
          <p>
            Amazon Web Services
            <br />
            Route 53, CloudFront, S3
          </p>

          <h4>Protection des données</h4>
          <p>
            Conformément à la loi, vous disposez d'un droit d'accès, de
            modification et de suppression des données vous concernant.
          </p>
        </ModalText>
      ),
    },
    privacy: {
      title: "Politique de Confidentialité",
      content: (
        <ModalText>
          <h4>Collecte des données</h4>
          <p>Nous collectons les informations suivantes :</p>
          <ul>
            <li>Nom, prénom</li>
            <li>Adresse email</li>
            <li>Adresse postale</li>
            <li>Numéro de téléphone</li>
            <li>Historique des commandes</li>
          </ul>

          <h4>Utilisation des données</h4>
          <p>Vos données sont utilisées pour :</p>
          <ul>
            <li>Traiter vos commandes</li>
            <li>Vous informer sur l'état de vos commandes</li>
            <li>Améliorer nos services</li>
            <li>
              Vous envoyer des offres promotionnelles (si vous y avez consenti)
            </li>
          </ul>

          <h4>Sécurité</h4>
          <p>
            Nous mettons en œuvre toutes les mesures techniques et
            organisationnelles pour protéger vos données.
          </p>
        </ModalText>
      ),
    },
    faq: {
      title: "Foire Aux Questions",
      content: (
        <ModalText>
          <h4>Commandes et Paiements</h4>
          <ul>
            <li>
              <strong>Quels moyens de paiement acceptez-vous ?</strong>
              <br />
              Nous acceptons les cartes bancaires (Visa), Orange Money, MTN
              Mobile Money et les virements bancaires.
            </li>

            <li>
              <strong>Est-ce que le paiement est sécurisé ?</strong>
              <br />
              Tous les paiements sont cryptés via notre partenaire de paiement
              sécurisé.
            </li>
          </ul>

          <h4>Livraisons</h4>
          <ul>
            <li>
              <strong>Quels sont les délais de livraison ?</strong>
              <br />
              En zone urbaine : dans 24h
              <br />
              En zone rurale : 2-5 jours ouvrés
            </li>

            <li>
              <strong>Quels sont les frais de livraison ?</strong>
              <br />
              Livraison gratuite à partir de 1 000 000 GNF d'achat. Sinon 50 000
              GNF en zone urbaine.
            </li>
          </ul>

          <h4>Retours et Remboursements</h4>
          <ul>
            <li>
              <strong>Puis-je retourner un produit ?</strong>
              <br />
              Oui, dans un délai de 4 jours après réception, sous emballage
              d'origine.
            </li>
          </ul>
        </ModalText>
      ),
    },
    cgu: {
      title: "Conditions Générales d'Utilisation",
      content: (
        <ModalText>
          <h4>Article 1 - Objet</h4>
          <p>
            Les présentes CGU régissent l'utilisation du site BibiaBusiness.com
            et l'ensemble des transactions effectuées sur la plateforme.
          </p>

          <h4>Article 2 - Prix</h4>
          <p>
            Les prix sont indiqués en francs guinéens (GNF) toutes taxes
            comprises. BibiaBusiness se réserve le droit de modifier ses prix à
            tout moment.
          </p>

          <h4>Article 3 - Commandes</h4>
          <p>
            La validation de la commande vaut acceptation des prix, descriptions
            et conditions de vente. Un email de confirmation est envoyé dès
            réception du paiement.
          </p>

          <h4>Article 4 - Disponibilité</h4>
          <p>
            En cas d'indisponibilité d'un produit après commande, le client sera
            informé et pourra choisir entre un remboursement ou un produit
            équivalent.
          </p>

          <h4>Article 5 - Garanties</h4>
          <p>
            Tous nos produits bénéficient de la garantie légale de conformité de
            12 mois.
          </p>
        </ModalText>
      ),
    },
  };

  return (
    <FullWidthFooter>
      <FooterContainer>
        <InnerContainer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={footerVariants}
        >
          <GridContainer>
            {/* Section Contact */}
            <ContactSection variants={itemVariants}>
              <SectionTitle>Contactez-nous</SectionTitle>
              <ContactItem>
                <MapPin size={18} />
                <span>Guinée Conakry, Kamsar</span>
              </ContactItem>
              <ContactItem>
                <Phone size={18} />
                <a href="tel:+224623146940">+224 623 146 940</a>
              </ContactItem>
              <ContactItem>
                <Mail size={18} />
                <a href="mailto:contact@bibiabusiness.com">
                  contact@bibiabusiness.com
                </a>
              </ContactItem>
            </ContactSection>

            {/* Section Services */}
            <ServicesSection variants={itemVariants}>
              <SectionTitle>Nos Services</SectionTitle>
              <ServiceItem>
                <ShoppingBag size={18} />
                <span>Vente en gros & détail</span>
              </ServiceItem>
              <ServiceItem>
                <Truck size={18} />
                <span>Livraison rapide</span>
              </ServiceItem>
              <ServiceItem>
                <ShieldCheck size={18} />
                <span>Paiements sécurisés</span>
              </ServiceItem>
              <ServiceItem></ServiceItem>
            </ServicesSection>

            {/* Section Réseaux sociaux */}
            <SocialSection variants={itemVariants}>
              <SectionTitle>Suivez-nous</SectionTitle>
              <SocialLinks>
                <SocialLink href="#" aria-label="Facebook">
                  <Facebook size={20} />
                </SocialLink>
                <SocialLink href="#" aria-label="Instagram">
                  <Instagram size={20} />
                </SocialLink>
                <SocialLink href="#" aria-label="Twitter">
                  <Twitter size={20} />
                </SocialLink>
              </SocialLinks>
            </SocialSection>

            {/* Section Newsletter */}
            <NewsletterSection variants={itemVariants}>
              <SectionTitle>Pour nous</SectionTitle>
              <p style={{ color: colors.light, fontSize: "0.95rem" }}>
                Votre satisfaction est notre mission
              </p>
              <NewsletterForm>
                <NewsletterButton>
                  Nous vous remercions
                  <Hand size={18} />
                </NewsletterButton>
              </NewsletterForm>
            </NewsletterSection>
          </GridContainer>

          {/* Section Légal avec modales */}
          <LegalSection variants={itemVariants}>
            <LegalLinks>
              <LegalLink
                as="button"
                onClick={() => openModal(legalContents.mentions)}
              >
                <FileText size={16} />
                Mentions légales
              </LegalLink>
              <LegalLink
                as="button"
                onClick={() => openModal(legalContents.privacy)}
              >
                <Lock size={16} />
                Politique de confidentialité
              </LegalLink>
              <LegalLink
                as="button"
                onClick={() => openModal(legalContents.faq)}
              >
                <HelpCircle size={16} />
                FAQ
              </LegalLink>
              <LegalLink
                as="button"
                onClick={() => openModal(legalContents.cgu)}
              >
                <FileText size={16} />
                Conditions générales
              </LegalLink>
            </LegalLinks>
          </LegalSection>

          {/* Copyright et retour en haut */}
          <CopyrightSection variants={itemVariants}>
            <p>
              © {new Date().getFullYear()} BibiaBusiness - Tous droits réservés
            </p>
            <BackToTop onClick={scrollToTop}>
              <ArrowUp size={18} />
              Retour en haut
            </BackToTop>
          </CopyrightSection>
        </InnerContainer>
        {/* Modal */}
        {isModalOpen && (
          <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>
                <X size={24} />
              </CloseButton>
              <ModalTitle>{modalContent.title}</ModalTitle>
              {modalContent.content}
            </ModalContent>
          </ModalBackdrop>
        )}
      </FooterContainer>
    </FullWidthFooter>
  );
};

export default Footer;
