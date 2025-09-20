// src/components/AboutSection.js
import React, { useState, useEffect, useRef } from 'react';
// import React from 'react';
import './styles/AboutSection.css';
import buildingIcon from './images/green.png';

import facilityImage1 from './images/mines.jpg';
import facilityImage2 from './images/um6p.jpeg';
import facilityImage3 from './images/photovoltaic.jpg';

import sustainabilityImage from './images/sus.jpg';
import innovationImage from './images/park.jpg';
import educationImage from './images/13.jpg';
// import mainFacilityImage from './images/ocp-benguerir-facility.jpg';
// import sustainabilityImage from './images/sustainability.jpg';
// import innovationImage from './images/innovation.jpg';
// import educationImage from './images/education.jpg';


// Array of images for the carousel
const carouselImages = [
  {
    src: facilityImage1,
    alt: "OCP Benguerir Mining Facility",
  },
  {
    src: facilityImage2,
    alt: "UM6P University Campus",
  },
  {
    src: facilityImage3,
    alt: "Green Energy Innovation Park",
  }
];


function AboutSection() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState({});
  const cardRefs = useRef([]);
  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardIndex = entry.target.getAttribute('data-card-index');
          setVisibleCards(prev => ({
            ...prev,
            [cardIndex]: true
          }));
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  cardRefs.current.forEach((card) => {
    if (card) observer.observe(card);
  });

  return () => {
    cardRefs.current.forEach((card) => {
      if (card) observer.unobserve(card);
    });
  };
}, []);

const addToCardRefs = (el) => {
  if (el && !cardRefs.current.includes(el)) {
    cardRefs.current.push(el);
  }
};

  return (
    <section id="apropos" className="about-section">
      <div className="about-container">

        {/* Header Block */}
        <div className="about-header">
          {/* Logo Placeholder */}
          <div className="about-logo">
            <img src={buildingIcon} alt="OCP logo" />
          </div>

          {/* Title */}
          <h2 className="about-title">
            OCP Benguerir
          </h2>

          {/* Subtitle */}
          <p className="about-subtitle">
            Plus qu'une mine, un centre d'innovation, de recherche et de durabilité.
          </p>
        </div>

        {/* Two-Column Introduction Section */}
        <div className="about-intro-section">

          {/* Left Column - Text */}
          <div className="about-intro-text">
            <p className="intro-paragraph">
              Depuis 1980, le site minier de Benguerir est un pilier du système Gantour de l'OCP.
              Situé au cœur du Maroc, ce complexe industriel s'est transformé en un véritable écosystème
              d'innovation et de développement durable.
            </p>
            <p className="intro-paragraph">
              Benguerir incarne aujourd'hui la vision moderne de l'OCP : allier excellence opérationnelle,
              recherche de pointe et responsabilité environnementale pour construire l'avenir de l'industrie
              phosphatière mondiale.
            </p>
            <p className="intro-paragraph">
              Le site accueille désormais l'Université Mohammed VI Polytechnique (UM6P) et l'école 1337,
              créant une synergie unique entre industrie, formation et innovation technologique.
            </p>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="about-intro-image">
            <div className="image-carousel">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${index === currentImageIndex ? 'active' : ''}`}
                >
                  <img src={image.src} alt={image.alt} />
                  {/* <div className="main-image-placeholder"> */}
                   
                  {/* </div> */}
                </div>
              ))}

              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Block */}
        <div className="about-engagement-section">
          <h3 className="engagement-title">Notre Engagement</h3>

          <div className="engagement-cards">

  {/* Sustainability Card */}
  <div 
    className={`engagement-card ${visibleCards['0'] ? 'animate-in' : ''}`}
    data-card-index="0"
    ref={addToCardRefs}
  >
    <div className="engagement-image sustainability">
      <img src={sustainabilityImage} alt="Water recycling and sustainability technology" />
      {/* Remove the placeholder div */}
    </div>
    <h4 className="engagement-card-title">Durabilité</h4>
    <p className="engagement-card-description">
      Recyclage des eaux et gestion responsable des ressources naturelles pour préserver l'environnement.
    </p>
  </div>

  {/* Innovation Card */}
  <div 
    className={`engagement-card ${visibleCards['1'] ? 'animate-in' : ''}`}
    data-card-index="1"
    ref={addToCardRefs}
  >
    <div className="engagement-image innovation">
      <img src={innovationImage} alt="Renewable energy and solar panel innovation" />
      {/* Remove the placeholder div */}
    </div>
    <h4 className="engagement-card-title">Innovation</h4>
    <p className="engagement-card-description">
      Green Energy Park et centres de R&D pour développer les technologies de demain.
    </p>
  </div>

  {/* Education Card */}
  <div 
    className={`engagement-card ${visibleCards['2'] ? 'animate-in' : ''}`}
    data-card-index="2"
    ref={addToCardRefs}
  >
    <div className="engagement-image education">
      <img src={educationImage} alt="Modern university campus and education" />
      {/* Remove the placeholder div */}
    </div>
    <h4 className="engagement-card-title">Formation</h4>
    <p className="engagement-card-description">
      Université Mohammed VI Polytechnique et campus 1337 pour former les talents de demain.
    </p>
  </div>
</div>
        </div>

        {/* Key Stats Block */}
        <div className="about-stats-section">

          {/* Blue Card - 40+ ans */}
          <div className="stat-card blue-card">
            <div className="stat-number">40+</div>
            <p className="stat-label">ans d'exploitation</p>
          </div>

          {/* Green Card - 2,6M m³/an */}
          <div className="stat-card green-card">
            <div className="stat-number">2,6M</div>
            <p className="stat-label">m³/an d'eaux recyclées</p>
          </div>

          {/* Yellow Card - 160+ pays */}
          <div className="stat-card yellow-card">
            <div className="stat-number">160+</div>
            <p className="stat-label">pays desservis</p>
          </div>

          {/* Orange Card - UM6P */}
          <div className="stat-card orange-card">
            <div className="stat-number">UM6P</div>
            <p className="stat-label">& 1337 implantés à Benguerir</p>
          </div>
        </div>

      </div>
    </section>
  );
}


export default AboutSection ;