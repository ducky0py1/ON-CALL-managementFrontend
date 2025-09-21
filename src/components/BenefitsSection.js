// src/components/BenefitsSection.js
import React, { useState, useEffect, useRef } from 'react';
import './styles/BenefitsSection.css';

import ZapIcon from './images/ico/fla.png';
import ShieldIcon from './images/ico/shi.png';
import HeartIcon from './images/ico/sati.png';
import DollarSignIcon from './images/ico/cos.png';

const Zap = ({ style, className }) => (
  <img 
    src={ZapIcon} 
    alt="Zap" 
    style={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain', ...style }} 
    className={className}
  />
);

const Shield = ({ style, className }) => (
  <img 
    src={ShieldIcon} 
    alt="Shield" 
    style={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain', ...style }} 
    className={className}
  />
);

const Heart = ({ style, className }) => (
  <img 
    src={HeartIcon} 
    alt="Hea" 
    style={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain', ...style }} 
    className={className}
  />
);

const DollarSign = ({ style, className }) => (
  <img 
    src={DollarSignIcon} 
    alt="Dollar Sign" 
    style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', ...style }} 
    className={className}
  />
);


function BenefitsSection() {
  const [visibleElements, setVisibleElements] = useState({});
  const elementsRef = useRef([]);

  // Main benefits data
  const benefits = [
    {
      id: 'efficiency',
      icon: Zap,
      title: "Efficacité Opérationnelle",
      description: "Réduction 60% temps de planification",
      details: "Automatisation des tâches répétitives",
      color: "#F29F05",
      stats: "60% de gain de temps"
    },
    {
      id: 'compliance',
      icon: Shield,
      title: "Conformité & Traçabilité", 
      description: "Respect des réglementations du travail",
      details: "Historique complet des assignments",
      color: "#0B43F5",
      stats: "100% de conformité"
    },
    {
      id: 'satisfaction',
      icon: Heart,
      title: "Satisfaction Employés",
      description: "Équité dans les rotations",
      details: "Visibilité sur les plannings futurs",
      color: "#24DC61",
      stats: "+25% satisfaction"
    },
    {
      id: 'cost',
      icon: DollarSign,
      title: "Optimisation Coûts",
      description: "Réduction des heures supplémentaires",
      details: "Meilleure allocation des ressources",
      color: "#099FFB",
      stats: "15% économies"
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
    <section className="benefits-section">
      <div className="benefits-container">
        
        {/* Section Header */}
        <div 
          className={`benefits-header ${visibleElements.header ? 'animate-in' : ''}`}
          data-element-id="header"
          ref={addToRefs}
        >
          
          <h2 className="benefits-title">
            Pourquoi Choisir Notre Solution
          </h2>
          <p className="benefits-description">
            Des bénéfices mesurables et durables pour optimiser la gestion de vos équipes OCP
          </p>
        </div>

        {/* Main Benefits Grid */}
        <div className="benefits-grid">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={benefit.id}
                className={`benefit-card ${visibleElements[benefit.id] ? 'animate-in' : ''}`}
                data-element-id={benefit.id}
                ref={addToRefs}
              >
                <div className="benefit-card-header">
                  <div className="benefit-header-top">
                    <div 
                      className="benefit-icon"
                      style={{ backgroundColor: `${benefit.color}15` }}
                    >
                      <IconComponent style={{ color: benefit.color }} />
                    </div>
                    <div 
                      className="benefit-stats"
                      style={{ 
                        backgroundColor: `${benefit.color}15`,
                        color: benefit.color,
                        border: `1px solid ${benefit.color}30`
                      }}
                    >
                      {benefit.stats}
                    </div>
                  </div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                </div>
                <div className="benefit-card-content">
                  <p className="benefit-main-description">{benefit.description}</p>
                  <p className="benefit-details">{benefit.details}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default BenefitsSection;