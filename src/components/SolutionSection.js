// src/components/SolutionSection.js
import React, { useState, useEffect, useRef } from 'react';
import './styles/SolutionSection.css';


// Import icons (replace with actual icon imports if available)
import calendarIcon from './images/ico/chk.png';
import usersIcon from './images/ico/usrs.png';
import bellIcon from './images/ico/bel.png';
import chartIcon from './images/ico/sta.png';

// Import platform showcase images
import dashboardImage from './images/dash.png';
import mobileAppImage from './images/mob.jpg';
import analyticsImage from './images/sta.jpg';

const Shield = () => <span></span>;
const Smartphone = () => <span></span>;
const Database = () => <span></span>;
const Zap = () => <span></span>;
const Settings = () => <span></span>;
const Clock = () => <span></span>;
const Users = () => <span></span>;

function SolutionSection() {
  const [visibleElements, setVisibleElements] = useState({});
  const elementsRef = useRef([]);

  // Core features data
  const coreFeatures = [
    {
      id: 'planification',
      icon: calendarIcon, 
      title: "Planification Intelligente",
      description: "Algorithmes d'optimisation automatique des rotations avec contraintes métiers",
      details: ["Rotation équitable", "Gestion des congés", "Contraintes légales"],
      color: "#4A90E2"
    },
    {
      id: 'gestion',
      icon: usersIcon, 
      title: "Gestion Multi-Services",
      description: "Organisation hiérarchique flexible avec profils de compétences",
      details: ["Profils détaillés", "Compétences techniques", "Disponibilités"],
      color: "#7ED321"
    },
    {
      id: 'notifications',
      icon: bellIcon, 
      title: "Notifications Temps Réel",
      description: "Système d'alertes intelligent avec multiple canaux de communication",
      details: ["SMS & Email", "Push notifications", "Escalade automatique"],
      color: "#F5A623"
    },
    {
      id: 'analytics',
      icon: chartIcon, 
      title: "Analytics Avancées",
      description: "Tableaux de bord interactifs avec KPIs et prédictions",
      details: ["Métriques temps réel", "Rapports personnalisés", "Prédictions IA"],
      color: "#F8E71C"
    }
  ];

  // Technical specifications data
  const technicalSpecs = [
    {
      icon: Shield,
      title: "Sécurité Enterprise",
      description: "Conformité aux standards OCP avec chiffrement end-to-end"
    },
    {
      icon: Smartphone,
      title: "Multi-Plateformes",
      description: "Applications natives iOS/Android + interface web responsive"
    },
    {
      icon: Database,
      title: "Architecture Scalable",
      description: "Infrastructure cloud-native avec haute disponibilité 99.9%"
    },
    {
      icon: Zap,
      title: "Performance Optimisée",
      description: "Temps de réponse <200ms avec synchronisation instantanée"
    }
  ];

  // Platform showcase data
  const platformShowcase = [
    {
      id: 'dashboard',
      image: dashboardImage,
      title: "Dashboard Central",
      description: "Interface web complète avec tableaux de bord personnalisables et vue d'ensemble temps réel",
      gradientColor: 'from-blue-to-green'
    },
    {
      id: 'mobile',
      image: mobileAppImage,
      title: "Application Mobile",
      description: "Apps natives iOS/Android pour consultation et gestion des astreintes en mobilité",
      gradientColor: 'from-orange-to-yellow'
    },
    {
      id: 'analytics-platform',
      image: analyticsImage,
      title: "Analytics & Reporting",
      description: "Analyses prédictives et rapports automatisés pour optimisation continue",
      gradientColor: 'from-green-to-blue'
    }
  ];

  // Scroll animation setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-element-id');
            setVisibleElements(prev => ({
              ...prev,
              [elementId]: true
            }));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elementsRef.current.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section className="solution-section">
      <div className="solution-container">
        
        {/* Section Header */}
        <div 
          className={`solution-header ${visibleElements.header ? 'animate-in' : ''}`}
          data-element-id="header"
          ref={addToRefs}
        >
          <div className="solution-badge">
            Solution Technique
          </div>
          <h2 className="solution-title">
            Architecture & Fonctionnalités
            <span className="solution-subtitle">
              Une plateforme pensée pour l'excellence opérationnelle
            </span>
          </h2>
        </div>

        {/* Core Features Grid */}
        <div className="core-features-section">
          <div className="features-grid">
            {coreFeatures.map((feature, index) => (
              <div 
                key={feature.id}
                className={`feature-card ${visibleElements[feature.id] ? 'animate-in' : ''}`}
                data-element-id={feature.id}
                ref={addToRefs}
                style={{ '--feature-color': feature.color }}
              >
                <div className="feature-content">
                  <div className="feature-icon">
                    <img src={feature.icon} alt={feature.title} />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                    <ul className="feature-details">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="feature-detail-item">
                          <span className="check-icon">✓</span> 
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Showcase */}
        <div 
          className={`platform-showcase-section ${visibleElements.platformTitle ? 'animate-in' : ''}`}
          data-element-id="platformTitle"
          ref={addToRefs}
        >
          <h3 className="platform-showcase-title">Interface & Expérience Utilisateur</h3>
          
          <div className="platform-grid">
            {platformShowcase.map((platform, index) => (
              <div 
                key={platform.id}
                className={`platform-card ${visibleElements[platform.id] ? 'animate-in' : ''}`}
                data-element-id={platform.id}
                ref={addToRefs}
              >
                <div className="platform-card-inner">
                  <div className={`platform-header ${platform.gradientColor}`}></div>
                  <div className="platform-content">
                    <div className="platform-image">
                      <img src={platform.image} alt={platform.title} />
                    </div>
                    <h4 className="platform-title">{platform.title}</h4>
                    <p className="platform-description">{platform.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Interactive Map Section */}
        <div 
          className={`map-section ${visibleElements.mapSection ? 'animate-in' : ''}`}
          data-element-id="mapSection"
          ref={addToRefs}
        >
          <div className="map-container">
            <div className="map-header">
              <h3 className="map-title">OCP Ben Guerir - Centre d'Innovation</h3>
            </div>
            
            <div className="map-content">
              <p className="map-description">
                Situé au cœur du Maroc, le complexe OCP Ben Guerir combine excellence industrielle, 
                recherche universitaire et innovation technologique en un écosystème unique.
              </p>
              
              {/* Clean Google Maps Integration */}
              <div className="google-map-container">
                <div className="map-overlay">
                  <div className="map-overlay-title">OCP Ben Guerir Facility</div>
                  <div className="map-overlay-coords">64J7+XC Ben Guerir</div>
                </div>
                
                <iframe
                  className="google-map-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.234567!2d-7.9521!3d32.2312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s64J7%2BXC%20Ben%20Guerir!2sOCP%20Ben%20Guerir!5e1!3m2!1sen!2sma!4v1642345678901&q=64J7%2BXC+Ben+Guerir"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="OCP Ben Guerir Exact Location - 64J7+XC"
                ></iframe>
              </div>
              
              
            </div>
          </div>
        </div>

       

       
        

      </div>
    </section>
  );
}

export default SolutionSection;