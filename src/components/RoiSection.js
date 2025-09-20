//This section combines key performance indicators with business results to create a powerful message
import React from 'react';
// We import icons that represent data, security, and certification.
import { FaChartLine, FaCheckDouble } from 'react-icons/fa';

export default function RoiSection() {
  // An array for the key stats makes the code clean.
  const stats = [
    { value: "99.9%", label: "Disponibilité système" },
    { value: "500+", label: "Utilisateurs actifs" },
    { value: "24/7", label: "Support technique" },
    { value: "ISO", label: "Certifié 27001" },
  ];

  return (
    // A light gray background helps this section stand out.
    <section className="bg-gray-50 py-24">
      {/* 'lg:grid-cols-2' creates the two-column layout only on large screens. 'items-center' vertically aligns the content of the two columns. */}
      <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* --- Left Column: Textual Content --- */}
        <div>
          <span className="text-green-600 font-semibold">Performances</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">Retour sur Investissement Rapide</h2>
          <p className="text-lg text-gray-600 mt-4">Notre solution génère des économies mesurables dès les premiers mois d'utilisation, avec un ROI moyen de 300% sur la première année.</p>
          {/* A simple list to highlight key results. */}
          <ul className="mt-6 space-y-3">
            <li className="flex items-center text-gray-700">
              <FaChartLine className="h-5 w-5 text-green-500 mr-3 flex-shrink-0"/>
              Réduction des coûts administratifs de 40%
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckDouble className="h-5 w-5 text-green-500 mr-3 flex-shrink-0"/>
              Diminution des erreurs de planification de 85%
            </li>
          </ul>
        </div>

        {/* --- Right Column: Stats Cards --- */}
        {/* 'grid grid-cols-2 gap-6' creates a mini 2x2 grid inside the main grid's right column. */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white p-8 rounded-lg shadow-lg text-center transition-transform transform hover:-translate-y-2">
              <p className="text-4xl font-extrabold text-green-600">{stat.value}</p>
              <p className="text-gray-500 font-semibold mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}