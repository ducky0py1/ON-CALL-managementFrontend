import React from 'react';
// Importing icons that match the business benefits.
import { FaClock, FaClipboardCheck, FaHeart, FaEuroSign } from 'react-icons/fa';

export default function BenefitsSection() {
  // Storing benefits in an array to easily map over them.
  const benefits = [
    { icon: FaClock, title: "Efficacité Opérationnelle", details: "Réduction 60% temps de planification", color: "blue" },
    { icon: FaClipboardCheck, title: "Conformité & Traçabilité", details: "Respect des réglementations du travail", color: "green" },
    { icon: FaHeart, title: "Satisfaction Employés", details: "Équité dans les rotations", color: "yellow" },
    { icon: FaEuroSign, title: "Optimisation Coûts", details: "Meilleure allocation des ressources", color: "red" },
  ];

  return (
    // The section has a white background to contrast with the previous light gray one.
    <section className="bg-white py-24">
      <div className="container mx-auto px-8">

        {/* ===== Section Title ===== */}
        <div className="text-center mb-16">
          <span className="text-green-600 font-semibold">Avantages Business</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">Pourquoi Choisir Notre Solution</h2>
          <p className="text-lg text-gray-500 mt-4 max-w-3xl mx-auto">Des bénéfices mesurables et durables pour optimiser la gestion de vos équipes OCP.</p>
        </div>

        {/* ===== Benefits Grid ===== */}
        {/* 'sm:grid-cols-2 lg:grid-cols-4' creates a responsive grid. It's 1 column on mobile, 2 on small screens, and 4 on large screens. 'gap-8' defines the space between cards. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* We map over the 'benefits' array to render each card. */}
          {benefits.map(benefit => (
            <div key={benefit.title} className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-2xl transition-shadow text-center">
              {/* The icon is rendered dynamically. */}
              <benefit.icon className={`h-12 w-12 text-green-600 mx-auto mb-6`} />
              <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 mt-3">{benefit.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}