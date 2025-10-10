// src/components/Header.js
import React, { useState } from 'react';
// 1. We only need to import Link for navigation. useNavigate is not needed here.
import { Link, useNavigate } from 'react-router-dom';

// Import your custom styles and images
import './styles/Header.css';
import ocpLogo from './images/ocp_logo.png';
import graphImage from './images/graph.png';
import empIcon from './images/ico/emp.png';
import serIcon from './images/ico/ser.png';
import disIcon from './images/ico/dis.png';

/**
 * Header Component: The main header and hero section for the public homepage.
 */
export function Header() {
  // State for managing the mobile menu and the image popup
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const navigate = useNavigate();
  // A small sub-component for the image modal to keep the main JSX clean.
  const ImageModal = () => (
    <div className="image-modal-overlay" onClick={() => setIsImageModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setIsImageModalOpen(false)}>×</button>
        <img src={graphImage} alt="Graph visualization - Full size" />
      </div>
    </div>
  );

  return (
    <div>
      {/* ===== HEADER NAVIGATION ===== */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo and Brand */}
            <div className="logo-section">
              <div className="logo-circle"><img src={ocpLogo} alt="OCP Logo" className="logo-image" /></div>
              <h1 className="brand-title">Gestion Astreinte</h1>
            </div>

            {/* Main Navigation Links */}
            <nav className="nav-menu">
              <a href="#hero" className="nav-link nav-link-active">Accueil</a>
              <a href="#about" className="nav-link">À Propos</a>
              <a href="#solution" className="nav-link">Solutions</a>
              <a href="#benefits" className="nav-link">Avantages</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>

            {/* Authentication Buttons */}
            <div className="auth-buttons">
              {/* Use the <Link> component for direct navigation */}
              <Link to="/login" className="btn-connexion">
                Connexion
              </Link>
              {/* This link takes the user to the protected part of the app */}
              <Link to="/app" className="btn-primary">
                Accéder au Système
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="status-badge"><div className="status-dot"></div>Système opérationnel - 99.9% uptime</div>
          
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Optimisez la<br />Gestion de Vos<br /><span className="gradient-text">Équipes OCP</span>
              </h1>
              <p className="hero-subtitle">
                Solution complète de planification d'astreinte, gestion des services et coordination du personnel pour l'Office Chérifien des Phosphates.
              </p>
              
              {/* Feature Bullet Points */}
              <div className="feature-list">
                <div className="feature-item"><div className="feature-dot feature-dot-light-blue"></div><span>Gestion centralisée des agents et départements</span></div>
                <div className="feature-item"><div className="feature-dot feature-dot-green"></div><span>Organisation optimisée des services</span></div>
                <div className="feature-item"><div className="feature-dot feature-dot-blue-sky"></div><span>Suivi en temps réel des disponibilités et compétences</span></div>
                <div className="feature-item"><div className="feature-dot feature-dot-yellow"></div><span>Planification automatisée des rotations d'astreinte</span></div>
                <div className="feature-item"><div className="feature-dot feature-dot-dark-green"></div><span>Notifications et alertes instantanées</span></div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="cta-buttons">
                <Link to="/calendar" className="btn-primary-large">Démarrer Maintenant</Link>
                <Link to="/login" className="btn-secondary-large">Connexion</Link>
              </div>
            </div>

            <div className="hero-image">
              <div className="image-container" onClick={() => setIsImageModalOpen(true)}>
                <div className="graph-placeholder">
                  <div className="graph-content"><img src={graphImage} alt="Graph visualization" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-item">
              <span className="ico"><img src={empIcon} alt="Employees icon" /></span>
              <div className="stat-number stat-number-A">245</div>
              <div className="stat-label">Agents actifs</div>
            </div>
            <div className="stat-item">
              <span className="ico"><img src={serIcon} alt="Services icon" /></span>
              <div className="stat-number stat-number-S">18</div>
              <div className="stat-label">Services gérés</div>
            </div>
            <div className="stat-item">
              <span className="ico"><img src={disIcon} alt="Availability icon" /></span>
              <div className="stat-number stat-number-D">99.9%</div>
              <div className="stat-label">Disponibilité</div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditionally render the image modal */}
      {isImageModalOpen && <ImageModal />}
    </div>
  );
}

// Default export is preferred for components that are pages or major sections.
export default Header;