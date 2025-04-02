import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Menu, X, Home, Box, Info, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/leblanc.avif"; // À modifier
// Palette de couleurs
const colors = {
  primary: "#b96f33",
  secondary: "#a07753",
  dark: "#011d23",
  light: "#f8f9fa",
  white: "#ffffff",
  scrollBg: "rgba(255, 255, 255, 0.95)", // Couleur quand on scroll
};

// Styles de base
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', sans-serif;
  }
`;

// Composant Navbar
const NavbarContainer = styled.nav`
  background: ${(props) => (props.$scrolled ? colors.scrollBg : colors.white)};
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => (props.$scrolled ? colors.primary : colors.primary)};
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  span {
    color: ${(props) => (props.$scrolled ? colors.dark : colors.dark)};
    font-weight: 600;
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 80px;
    left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
    width: 60%;
    height: calc(80vh - 80px);
    background: ${colors.white};
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 2rem;
    transition: all 0.5s ease;
    box-shadow: 1px 3px 1px;
  }
`;

const NavItem = styled.li`
  margin-left: 2rem;
  position: relative;

  @media (max-width: 768px) {
    margin: 1rem 0;
    width: 100%;
    text-align: left;
  }
`;

const NavLink = styled.a`
  color: ${(props) => (props.$scrolled ? colors.dark : colors.dark)};
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: ${colors.primary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    padding: 1rem;
    width: 100%;
    justify-content: center;

    &:hover::after {
      width: 50%;
      left: 25%;
    }
  }
`;

const MobileIcon = styled.div`
  display: none;
  cursor: pointer;
  color: ${(props) => (props.$scrolled ? colors.dark : colors.dark)};

  @media (max-width: 768px) {
    display: block;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const LogoImage = styled.img`
  height: 80px;
  width: auto;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: 32px;
  }
`;

const LogoText = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => (props.$scrolled ? colors.primary : colors.primary)};
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  span {
    color: ${(props) => (props.$scrolled ? colors.dark : colors.dark)};
    font-weight: 600;
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className=" mb-20">
      <GlobalStyle />
      <NavbarContainer $scrolled={scrolled}>
        <Link to="/" className=" no-underline">
        <LogoContainer>
            <LogoImage 
              src={logo} 
              alt="Logo BibiaBusiness" 
              $scrolled={scrolled}
            />
            <LogoText $scrolled={scrolled}>
              Bibia<span>Business</span>
            </LogoText>
          </LogoContainer>
        </Link>
        <MobileIcon $scrolled={scrolled} onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileIcon>

        <NavMenu $isOpen={isOpen}>
          <NavItem>
            <NavLink
              href="/"
              onClick={() => setIsOpen(false)}
              $scrolled={scrolled}
            >
              <Home size={18} />
              Accueil
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/produit"
              onClick={() => setIsOpen(false)}
              $scrolled={scrolled}
            >
              <Box size={18} />
              Produits
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/apropos"
              onClick={() => setIsOpen(false)}
              $scrolled={scrolled}
            >
              <Info size={18} />À propos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/contact"
              onClick={() => setIsOpen(false)}
              $scrolled={scrolled}
            >
              <Mail size={18} />
              Contact
            </NavLink>
          </NavItem>
        </NavMenu>
      </NavbarContainer>
    </div>
  );
};

export default Navigation;
