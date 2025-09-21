// src/components/TestimonialsSection.js
import React, { useState, useEffect, useRef } from 'react';
import './styles/TestimonialsSection.css';

// Icon components (replace with actual imported icons if available)
const Star = () => <span>⭐</span>;
const Quote = () => <span>💬</span>;
const ArrowRight = () => <span>→</span>;

function TestimonialsSection() {
  const [visibleElements, setVisibleElements] = useState({});
  const elementsRef = useRef([]);

  // Testimonials data
  const testimonials = [
    {
      id: 'hr-testimonial',
      quote: "La solution a révolutionné notre approche de la gestion du personnel. La planification qui nous prenait des heures se fait maintenant en quelques clics. L'automatisation des rotations a considérablement amélioré l'équité et la transparence dans nos équipes.",
      author: {
        name: "Aicha Benali",
        role: "Responsable RH",
        department: "Division Mining",
        initials: "A.B",
        color: "#F29F05"
      },
      rating: 5
    },
    {
      id: 'it-testimonial',
      quote: "L'interface est remarquablement intuitive. Nos équipes ont adopté la solution sans formation complexe, ce qui est rare avec ce type d'outil. L'intégration avec nos systèmes existants s'est faite en douceur et la performance est excellente.",
      author: {
        name: "Mohamed El Khattabi",
        role: "Chef de Service IT",
        department: "Direction Centrale",
        initials: "M.E",
        color: "#0B43F5"
      },
      rating: 5
    },
    {
      id: 'agent-testimonial',
      quote: "Enfin de la transparence dans les plannings ! Je peux anticiper mes astreintes et mieux organiser ma vie personnelle. Le système de notifications est très pratique et les échanges avec mes collègues se font maintenant de manière fluide.",
      author: {
        name: "Youssef Hajji",
        role: "Technicien Senior",
        department: "Site de Khouribga",
        initials: "Y.H",
        color: "#24DC61"
      },
      rating: 5
    }
  ];

  // Testimonial statistics
  const testimonialStats = [
    {
      id: 'satisfaction',
      number: "96%",
      label: "Taux de satisfaction utilisateurs"
    },
    {
      id: 'adoption',
      number: "8 jours",
      label: "Temps d'adoption moyen"
    },
    {
      id: 'feedback',
      number: "4.8/5",
      label: "Note moyenne utilisateurs"
    },
    {
      id: 'recommendation',
      number: "92%",
      label: "Recommandent la solution"
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

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} style={{ 
        color: index < rating ? '#F59E0B' : '#E5E7EB',
        fontSize: '1rem'
      }} />
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        {/* Section Header */}
        <div 
          className={`testimonials-header ${visibleElements.header ? 'animate-in' : ''}`}
          data-element-id="header"
          ref={addToRefs}
        >
          <div className="testimonials-badge">
            Témoignages Clients
          </div>
          <h2 className="testimonials-title">
            Ce Que Disent Nos Utilisateurs
          </h2>
          <p className="testimonials-subtitle">
            Découvrez les retours d'expérience de nos utilisateurs OCP qui ont transformé 
            leur gestion des astreintes avec notre solution.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className={`testimonial-card ${visibleElements[testimonial.id] ? 'animate-in' : ''}`}
              data-element-id={testimonial.id}
              ref={addToRefs}
            >
              <div className="testimonial-content">
                
                {/* Rating */}
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                
                {/* Quote */}
                <p className="testimonial-quote">
                  {testimonial.quote}
                </p>
                
                {/* Author */}
                <div className="testimonial-author">
                  <div 
                    className="author-avatar"
                    style={{ backgroundColor: testimonial.author.color }}
                  >
                    {testimonial.author.initials}
                  </div>
                  <div className="author-info">
                    <p className="author-name">{testimonial.author.name}</p>
                    <p className="author-role">{testimonial.author.role}</p>
                    <p className="author-department">{testimonial.author.department}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Statistics */}
        <div 
          className={`testimonials-stats ${visibleElements.stats ? 'animate-in' : ''}`}
          data-element-id="stats"
          ref={addToRefs}
        >
          {testimonialStats.map((stat) => (
            <div 
              key={stat.id}
              className="testimonial-stat"
            >
              <div className="stat-number">{stat.number}</div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          className={`testimonials-cta ${visibleElements.cta ? 'animate-in' : ''}`}
          data-element-id="cta"
          ref={addToRefs}
        >
          <p className="cta-text">
            Rejoignez les centaines d'utilisateurs OCP qui ont déjà optimisé leur gestion des astreintes.
          </p>
          <button className="cta-button">
            Demander une Démonstration
            <ArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;