import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import naroumba from '../../assets/naroumb.avif'
import {
  faLeaf,
  faRocket,
  faHandshake,
  faUsers,
  faAward
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import { Helmet } from "react-helmet";
import Seo from "../../SEO";
import fondbleufonce from '../../assets/fondbleufonce.png'

const createSchemaMarkup = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "À propos de notre boutique",
  description: "Découvrez notre histoire et notre engagement envers nos clients",
  url: "https://www.bibiabusness.com/apropos",
  publisher: {
    "@type": "Organization",
    name: "bibiabusness",
    logo: {
      "@type": "ImageObject",
      url: "https://www.bibiabusness.com/fondbleufonce.png",
    },
  },
  foundingDate: "2017-01-01",
  founder: {
    "@type": "Person",
    name: "Fatoumata binta bah",
  },
});
// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styles
const AboutContainer = styled.section`
  padding: 6rem 2rem;
  background: ;
  color: #011d23;

  @media (max-width: 768px) {
    padding: 1rem 0rem;
  }
`;

const AboutWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  animation: ${fadeIn} 0.8s ease-out;
  text-align: left;

  @media (max-width: 768px) {
    text-align: left;
    padding: 0 1rem;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  background: #e9ecef;
  height: 600px;
  overflow: hidden;
box-shadow: 2px 2px 1px #b96f33; 
  @media (max-width: 992px) {
    width: 100%;
    order: -1; /* Image en premier sur mobile */
  }

  @media (max-width: 768px) {
    height: 300px;
    border-radius: 8px;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #011d23;
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  text-align: left;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: #b96f33;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    text-align: left;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #495057;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: left;
  }
`;

const Highlight = styled.span`
  color: #b96f33;
  font-weight: 600;
`;

const MissionSection = styled.div`
  background: ;
  padding: 3rem;
  border-radius: 1px;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin: 0 1rem 3rem;
    width: calc(100% - 2rem);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #011d23;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #b96f33;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    text-align: center;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 2rem auto 0;
  }
`;

const ValueCard = styled.div`
  background: white;
  padding: 2rem;
box-shadow: -2px 4px 2px #b96f33 ;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
   box-shadow: 4px 4px 0px #011d23 ;

  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    text-align: center;
    align-items: center;
  }
`;

const ValueIcon = styled.div`
  width: 70px;
  height: 70px;
  background: #011d23;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #b96f33;
  font-size: 1.8rem;
`;
const ValueTitle = styled.h3`
  font-size: 1.3rem;
  color: #011d23;
  margin-bottom: 1rem;
  text-align: center;
`;

const ValueDescription = styled.p`
  color: #6c757d;
  line-height: 1.6;
  text-align: center;
  max-width: 90%;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: left;
  }
`;

const TeamSection = styled.div`
  margin-top: 4rem;
  text-align: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-top: 3rem;
  }
`;

const CTAButton = styled.button`
  background: #b96f33;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: -4px 4px 0px #011d23 ;
  &:hover {
    background: #a07753;
      box-shadow: 4px 4px 0px #011d23 ;
    animation: ${pulse} 0.8s ease infinite;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
`;

const APropos = () => {
  return (
    <AboutContainer>
       <Seo
        title="À propos - Votre Boutique en ligne"
        description="Découvrez notre histoire, notre mission et notre engagement envers la qualité et le service client."
        keywords="histoire boutique, notre équipe, valeurs, mission"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(createSchemaMarkup())}
        </script>
       
      </Helmet>
      <Navigation  />
     
      <AboutWrapper>
        <HeroSection>
          <HeroContent>
            <Title>Notre Histoire</Title>
            <Subtitle>
              Fondé en <Highlight>2017</Highlight>, BibiaBusiness est né d'une
              passion pour l'aménagement intérieur, la décoration et la vente
              d'articles de maison et de vêtements de qualité. Ce qui a débuté
              comme une petite boutique locale est rapidement devenu une
              référence du e-commerce en Guinée.
            </Subtitle>
            <Subtitle>
              Notre objectif ambitieux est de devenir{" "}
              <Highlight>la plus grande plateforme de vente en ligne</Highlight>{" "}
              et grossiste de la région, tout en maintenant notre engagement
              envers l'excellence, la qualité et la satisfaction client
              inégalée.
            </Subtitle>
            <Subtitle>
              Aujourd'hui, nous combinons expertise en décoration et large
              sélection d'articles pour offrir à nos clients une expérience
              d'achat unique et personnalisée.
            </Subtitle>
            <CTAButton>
              <Link to="/produit" className="no-underline text-white">
                Découvrez nos produits
              </Link>{" "}
              <FontAwesomeIcon icon={faRocket} />
            </CTAButton>
          </HeroContent>
          <HeroImage>
            {/* Remplacez par votre image */}
            <img
              src={naroumba}
              alt="Équipe BibiaBusiness"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </HeroImage>
        </HeroSection>

        <MissionSection>
          <SectionTitle>Notre Mission</SectionTitle>
          <Subtitle
            style={{
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto 2rem",
            }}
          >
            <Highlight>Chez BibiaBusiness</Highlight>, nous nous engageons à révolutionner votre
            expérience d'achat en ligne avec :
          </Subtitle>

          <ValuesGrid>
            <ValueCard>
              <ValueIcon>
                <FontAwesomeIcon icon={faLeaf} />
              </ValueIcon>
              <ValueTitle>Qualité Premium</ValueTitle>
              <ValueDescription>
                Des produits soigneusement sélectionnés pour leur excellence et
                leur durabilité.
              </ValueDescription>
            </ValueCard>

            <ValueCard>
              <ValueIcon>
                <FontAwesomeIcon icon={faHandshake} />
              </ValueIcon>
              <ValueTitle>Service Client</ValueTitle>
              <ValueDescription>
                Une équipe dévouée disponible 7j/7 pour répondre à vos besoins.
              </ValueDescription>
            </ValueCard>

            <ValueCard>
              <ValueIcon>
                <FontAwesomeIcon icon={faUsers} />
              </ValueIcon>
              <ValueTitle>Communauté</ValueTitle>
              <ValueDescription>
                Nous bâtissons une communauté de clients satisfaits et fidèles.
              </ValueDescription>
            </ValueCard>

            <ValueCard>
              <ValueIcon>
                <FontAwesomeIcon icon={faAward} />
              </ValueIcon>
              <ValueTitle>Innovation</ValueTitle>
              <ValueDescription>
                Toujours à la pointe des dernières tendances et technologies.
              </ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </MissionSection>

        <TeamSection>
          <SectionTitle> <Highlight>Rencontrez</Highlight> Notre Équipe</SectionTitle>
          <Subtitle style={{ maxWidth: "800px", margin: "0 auto" }}>
            Une équipe passionnée et expérimentée travaille sans relâche pour
            vous offrir la meilleure expérience d'achat.
          </Subtitle>

          {/* Ici vous pouvez ajouter des cartes de membres de l'équipe */}

          <CTAButton>
            <Link to="/contact" className="no-underline text-white">
              Contactez-nous <FontAwesomeIcon icon={faHandshake} />
            </Link>
          </CTAButton>
        </TeamSection>
      </AboutWrapper>
      <div className=" mb-52"> 
          
          </div>
    </AboutContainer>
  );
};

export default APropos;
