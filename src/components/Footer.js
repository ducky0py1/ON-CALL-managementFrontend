// src/components/Footer.js
import React from 'react';
import './styles/Footer.css';

// Import icon images (add these imports when you upload the icons)
import mapPinIcon from './images/ico/location.png';
import phoneIcon from './images/ico/telephone.png';
import mailIcon from './images/ico/mail.png';
import clockIcon from './images/ico/checked.png';
import shieldIcon from './images/ico/security.png';
import usersIcon from './images/ico/usr.png';
import linkedinIcon from './images/ico/location.png';
import externalLinkIcon from './images/ico/mail.png';
import checkCircleIcon from './images/ico/checked.png';
import alertCircleIcon from './images/ico/security.png';

const MapPin = ({ className, style }) => (
  <img 
    src={mapPinIcon} 
    alt="Map Pin" 
    className={className}
    style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', ...style }}
  />
);

const Phone = ({ className, style }) => (
  <img 
    src={phoneIcon} 
    alt="Phone" 
    className={className}
    style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', ...style }}
  />
);

const Mail = ({ className, style }) => (
  <img 
    src={mailIcon} 
    alt="Mail" 
    className={className}
    style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', ...style }}
  />
);

const Clock = ({ className, style }) => (
  <img 
    src={clockIcon} 
    alt="Clock" 
    className={className}
    style={{ width: '1rem', height: '1rem', objectFit: 'contain', ...style }}
  />
);

const Shield = ({ className, style }) => (
  <img 
    src={shieldIcon} 
    alt="Shield" 
    className={className}
    style={{ width: '1rem', height: '1rem', objectFit: 'contain', ...style }}
  />
);

const Users = ({ className, style }) => (
  <img 
    src={usersIcon} 
    alt="Users" 
    className={className}
    style={{ width: '1rem', height: '1rem', objectFit: 'contain', ...style }}
  />
);

const Linkedin = ({ className, style }) => (
  <img 
    src={linkedinIcon} 
    alt="LinkedIn" 
    className={className}
    style={{ width: '1rem', height: '1rem', objectFit: 'contain', ...style }}
  />
);

const ExternalLink = ({ className, style }) => (
  <img 
    src={externalLinkIcon} 
    alt="External Link" 
    className={className}
    style={{ width: '1rem', height: '1rem', objectFit: 'contain', ...style }}
  />
);

const CheckCircle = ({ className, style }) => (
  <img 
    src={checkCircleIcon} 
    alt="Check Circle" 
    className={className}
    style={{ width: '1rem', height: '1rem', objectFit: 'contain', ...style }}
  />
);

const AlertCircle = ({ className, style }) => (
  <img 
    src={alertCircleIcon} 
    alt="Alert Circle" 
    className={className}
    style={{ width: '1rem', height: '1rem', objectFit: 'contain', ...style }}
  />
);

function Footer() {
  // Get current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Navigation links data
  const navigationLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#apropos", label: "À Propos du Système" },
    { href: "#fonctionnalites", label: "Fonctionnalités" },
    { href: "#contact", label: "Support Technique" }
  ];

  // Resource links data
  const resourceLinks = [
    { href: "#", label: "Documentation API" },
    { href: "#", label: "Tutoriels vidéo" },
    { href: "#", label: "FAQ" },
    { href: "#", label: "Politique de confidentialité" }
  ];

  // Training resources data
  const trainingResources = [
    "Guide de démarrage",
    "Sessions de formation",
    "Webinaires mensuels"
  ];

  // Security certifications data
  const securityCertifications = [
    { icon: Shield, text: "Certification ISO 27001" },
    { icon: Shield, text: "Conformité RGPD" },
    { icon: AlertCircle, text: "Audit sécurité mensuel" }
  ];

  return (
    <footer className="footer">
      
      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Column 1: À Propos OCP */}
          <div className="footer-column">
            <h3 className="footer-column-title">À Propos OCP</h3>
            
            <p className="footer-about">
              Office Chérifien des Phosphates, leader mondial des solutions phosphatées 
              depuis 1920 au service de l'agriculture mondiale.
            </p>
            
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div className="contact-text">
                  <div>OCP Group Ben Geurir</div>
                  <div>Maroc</div>
                </div>
              </div>
              
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div className="contact-text">+212 532 24 34 00</div>
              </div>
              
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div className="contact-text">contact@ocpgroup.ma</div>
              </div>
            </div>
          </div>

          {/* Column 2: Liens Rapides */}
          <div className="footer-column">
            <h3 className="footer-column-title">Liens Rapides</h3>
            
            <div className="links-section">
              <div className="link-group">
                <h4 className="link-group-title nav-links">Navigation</h4>
                <ul className="link-list">
                  {navigationLinks.map((link, index) => (
                    <li key={index} className="link-item">
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-group">
                <h4 className="link-group-title resources-links">Ressources</h4>
                <ul className="link-list">
                  {resourceLinks.map((link, index) => (
                    <li key={index} className="link-item">
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Support & Contact */}
          <div className="footer-column">
            <h3 className="footer-column-title">Support & Contact</h3>
            
            <div className="support-section">
              <div className="support-group">
                <h4 className="support-group-title technical-support">Support Technique</h4>
                <div className="support-details">
                  <div className="support-detail-item">
                    <Mail className="support-icon" />
                    <span>support.astreinte@ocpgroup.ma</span>
                  </div>
                  <div className="support-detail-item">
                    <Phone className="support-icon" />
                    <span>+212 533 44 34 00</span>
                    <span className="support-badge">24h/7j</span>
                  </div>
                  <div className="support-detail-item">
                    <Clock className="support-icon" />
                    <span>Heures bureau: 8h00 - 18h00</span>
                  </div>
                </div>
              </div>

              <div className="support-group">
                <h4 className="support-group-title training-support">Formation</h4>
                <ul className="training-list">
                  {trainingResources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 4: Informations Système */}
          <div className="footer-column">
            <h3 className="footer-column-title">Informations Système</h3>
            
            <div className="system-section">
              <div className="status-group">
                <h4 className="status-group-title">Status en Temps Réel</h4>
                
                <div className="status-card">
                  <div className="status-left">
                    <CheckCircle className="status-icon" />
                    <span className="status-text">Statut serveur</span>
                  </div>
                </div>
                
                <div className="status-details">
                  <div className="status-detail-row">
                    <span>Dernière mise à jour:</span>
                    <span className="status-value">{formattedDate}</span>
                  </div>
                  <div className="status-detail-row">
                    <span>Prochaine maintenance:</span>
                    <span className="maintenance-value">15/01/2025</span>
                  </div>
                </div>
              </div>

              <div className="status-group">
                <h4 className="support-group-title training-support">Sécurité</h4>
                <div className="security-group">
                  {securityCertifications.map((cert, index) => {
                    const IconComponent = cert.icon;
                    return (
                      <div key={index} className="security-item">
                        <IconComponent className="security-icon" />
                        <span>{cert.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Separator */}
      <div className="footer-separator"></div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          
          {/* Left Side */}
          <div className="footer-left">
            <p className="footer-copyright">
              © 2025 Office Chérifien des Phosphates
            </p>
            <p className="footer-tagline">
              Leader mondial des solutions phosphatées
            </p>
          </div>

          {/* Right Side */}
          <div className="footer-right">
            <div className="footer-meta">
              <span className="footer-version">Version système: v2.1.4</span>
              
              <div className="footer-links">
                <a href="#">Conditions d'utilisation</a>
                <span className="footer-divider">|</span>
                <a href="#">Politique de confidentialité</a>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="footer-social">
              <a href="#" className="social-link linkedin-link">
                <Linkedin className="social-icon" />
                <span className="social-text">LinkedIn OCP</span>
              </a>
              <a href="#" className="social-link website-link">
                <ExternalLink className="social-icon" />
                <span className="social-text">Site officiel</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;