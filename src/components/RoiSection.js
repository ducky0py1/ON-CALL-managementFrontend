// src/components/RoiSection.js
import React, { useState, useEffect, useRef } from 'react';
import './styles/RoiSection.css';

// Import icon images
import trendingUpIcon from './images/ico/prog.png';
import clockIcon from './images/ico/setting.png';
import usersIcon from './images/ico/grop.png';
import checkIcon from './images/ico/check.png';

// Icon components using imported images
const TrendingUp = ({ style, className }) => (
  <img 
    src={trendingUpIcon} 
    alt="Trending Up" 
    style={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain', ...style }} 
    className={className}
  />
);

const Clock = ({ style, className }) => (
  <img 
    src={clockIcon} 
    alt="Clock" 
    style={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain', ...style }} 
    className={className}
  />
);

const Users = ({ style, className }) => (
  <img 
    src={usersIcon} 
    alt="Users" 
    style={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain', ...style }} 
    className={className}
  />
);

const CheckCircle = ({ style, className }) => (
  <img 
    src={checkIcon} 
    alt="Check Circle" 
    style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', ...style }} 
    className={className}
  />
);

function RoiSection() {
  const [visibleElements, setVisibleElements] = useState({});
  const elementsRef = useRef([]);

  // ROI metrics data
  const roiMetrics = [
    { 
      id: 'availability',
      icon: TrendingUp, 
      value: "99.9%", 
      label: "Disponibilité système", 
      color: "#24DC61" 
    },
    { 
      id: 'support',
      icon: Clock, 
      value: "24/7", 
      label: "Support technique", 
      color: "#F29F05" 
    },
    { 
      id: 'users',
      icon: Users, 
      value: "500+", 
      label: "Utilisateurs actifs", 
      color: "#0B43F5" 
    },
    { 
      id: 'certification',
      icon: CheckCircle, 
      value: "ISO", 
      label: "Certifié 27001", 
      color: "#099FFB" 
    }
  ];

  // ROI benefits data
  const roiBenefits = [
    "Réduction des coûts administratifs de 40%",
    "Diminution des erreurs de planification de 85%",
    "Amélioration de la productivité équipe de 30%",
    "Optimisation des ressources humaines de 25%"
  ];

  // Additional ROI statistics
  const roiStats = [
    {
      id: 'roi-percentage',
      number: "300%",
      description: "ROI moyen première année"
    },
    {
      id: 'payback-period',
      number: "6 mois",
      description: "Période de retour sur investissement"
    },
    {
      id: 'cost-reduction',
      number: "45%",
      description: "Réduction des coûts opérationnels"
    },
    {
      id: 'efficiency-gain',
      number: "60%",
      description: "Gain d'efficacité planification"
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
    <section className="roi-section">
      <div className="roi-container">
        
        {/* Section Header */}
        <div 
          className={`roi-header ${visibleElements.header ? 'animate-in' : ''}`}
          data-element-id="header"
          ref={addToRefs}
        >
          <div className="roi-badge">
            Retour sur Investissement
          </div>
          <h2 className="roi-title">
            ROI Rapide & Mesurable
          </h2>
          <p className="roi-subtitle">
            Notre solution génère des économies tangibles dès les premiers mois d'utilisation, 
            avec des bénéfices durables pour votre organisation OCP.
          </p>
        </div>

        {/* Main ROI Content Area */}
        <div 
          className={`roi-content-area ${visibleElements.content ? 'animate-in' : ''}`}
          data-element-id="content"
          ref={addToRefs}
        >
          <div className="roi-grid">
            
            {/* Left Column - ROI Details */}
            <div className="roi-details">
              <h3 className="roi-main-title">
                Retour sur Investissement de 
                <span className="roi-highlight">300%</span>
                sur la Première Année
              </h3>
              <p className="roi-description">
                Notre solution d'optimisation des astreintes transforme vos processus métier 
                avec des résultats mesurables dès le premier trimestre d'utilisation.
              </p>
              
              <div className="roi-benefits-list">
                {roiBenefits.map((benefit, index) => (
                  <div key={index} className="roi-benefit-item">
                    <CheckCircle className="roi-check-icon" />
                    <span className="roi-benefit-text">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Metrics Grid */}
            <div className="roi-metrics-container">
              <div className="roi-metrics-grid">
                {roiMetrics.map((metric) => {
                  const IconComponent = metric.icon;
                  return (
                    <div 
                      key={metric.id}
                      className={`roi-metric-card ${visibleElements[metric.id] ? 'animate-in' : ''}`}
                      data-element-id={metric.id}
                      ref={addToRefs}
                    >
                      <div 
                        className="roi-metric-icon"
                        style={{ backgroundColor: `${metric.color}15` }}
                      >
                        <IconComponent style={{ color: metric.color }} />
                      </div>
                      <div className="roi-metric-value">{metric.value}</div>
                      <p className="roi-metric-label">{metric.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Additional ROI Statistics */}
        <div 
          className={`roi-stats-section ${visibleElements.stats ? 'animate-in' : ''}`}
          data-element-id="stats"
          ref={addToRefs}
        >
          <h3 className="roi-stats-title">
            Impact Financier Détaillé
          </h3>
          
          <div className="roi-stats-grid">
            {roiStats.map((stat, index) => (
              <div 
                key={stat.id}
                className={`roi-stat-item ${visibleElements[stat.id] ? 'animate-in' : ''}`}
                data-element-id={stat.id}
                ref={addToRefs}
              >
                <div className="roi-stat-number">{stat.number}</div>
                <p className="roi-stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default RoiSection;