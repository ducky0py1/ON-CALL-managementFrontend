// src/components/Header.js
import React, { useState } from 'react';
import './styles/Header.css'; // Import the CSS file
import ocpLogo from './images/ocp_logo.png';
import graphImage from './images/graph.png';
import empIcon from './images/ico/emp.png';
import serIcon from './images/ico/ser.png';
import disIcon from './images/ico/dis.png';

/**
 * HEADER COMPONENT - Matching exact screenshot design
 * 
 * File location: src/components/Header.js
 * CSS file: src/components/Header.css
 * 
 * Features:
 * - OCP logo with proper sizing
 * - Navigation menu with active state
 * - Auth buttons with gradients
 * - Hero section with gradient text
 * - Background image with overlay
 * - Stats section with icons
 * - Clickable graph image with modal popup
 * - Responsive design
 * 
 * Color Palette:
 * - Green: #24DC61, #01c542ff
 * - Blue: #0B43F5, #3ca7ffff, #76bffaff  
 * - Orange: #F29F05
 */

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <div className="page-wrapper">
      
      {/* HEADER NAVIGATION */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            
            {/* Logo section */}
            <div className="logo-section">
              <div className="logo-circle">
                <img src={ocpLogo} alt="OCP Logo" className="logo-image" />
              </div>
              <div className="brand-text">
                <h1 className="brand-title">Gestion Astreinte</h1>
              </div>
            </div>

            {/* Navigation menu */}
            <nav className="nav-menu">
              <a href="../HomePage.js" className="nav-link nav-link-active">Accueil</a>
              <a href="#../AboutSection.js" className="nav-link">À Propos</a>
              <a href="#fonctionnalites" className="nav-link">Fonctionnalités</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>

            {/* Auth buttons */}
            <div className="auth-buttons">
              <button className="btn-connexion">Connexion</button>
              <button className="btn-primary">Accéder au Système</button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        
        {/* Background with overlay */}
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>

        <div className="container">
          
          {/* System status badge */}
          <div className="status-badge">
            <div className="status-dot"></div>
            Système opérationnel - 99.9% uptime
          </div>

          <div className="hero-content">
            
            {/* Left side - Text content */}
            <div className="hero-text">
              
              {/* Main headline */}
              <h1 className="hero-title">
                Optimisez la<br />
                Gestion de Vos<br />
                <span className="gradient-text">Équipes OCP</span>
              </h1>
              
              {/* Subtitle */}
              <p className="hero-subtitle">
                Solution complète de planification d'astreinte, gestion des services et coordination du personnel pour l'Office Chérifien des Phosphates
              </p>

              {/* Feature bullet points */}
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot feature-dot-light-blue"></div>
                  <span>Gestion centralisée des agents et départements</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot feature-dot-green"></div>
                  <span>Organisation optimisée des services</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot feature-dot-blue-sky"></div>
                  <span>Suivi en temps réel des disponibilités et compétences</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot feature-dot-yellow"></div>
                  <span>Planification automatisée des rotations d'astreinte</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot feature-dot-dark-green"></div>
                  <span>Notifications et alertes instantanées</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="cta-buttons">
                <button className="btn-primary-large">Démarrer Maintenant</button>
                <button className="btn-secondary-large">Connexion</button>
              </div>
            </div>

            {/* Right side - Image container with modal functionality */}
            <div className="hero-image">
              <div 
                className="image-container"
                onClick={() => setIsImageModalOpen(true)}
              >
                {/* <div className="ocp-badge">OCP</div> */}
                <div className="graph-placeholder">
                  <div className="graph-content">
                    <img src={graphImage} alt="Graph visualization" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="stats-section">
            <div className="stat-item">
              <span className="ico">
                <img src={empIcon} alt="Employees icon" />
              </span>
              <div className="stat-number stat-number-A">245</div>
              <div className="stat-label">Agents actifs</div>
            </div>
            <div className="stat-item">
              <span className="ico">
                <img src={serIcon} alt="Services icon" />
              </span>
              <div className="stat-number stat-number-S">18</div>
              <div className="stat-label">Services gérés</div>
            </div>
            <div className="stat-item">
              <span className="ico">
                <img src={disIcon} alt="Availability icon" />
              </span>
              <div className="stat-number stat-number-D">99.9%</div>
              <div className="stat-label">Disponibilité</div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE MODAL POPUP */}
      {isImageModalOpen && (
        <div 
          className="image-modal-overlay"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsImageModalOpen(false)}
            >
              ×
            </button>
            <img 
              src={graphImage} 
              alt="Graph visualization - Full size" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;