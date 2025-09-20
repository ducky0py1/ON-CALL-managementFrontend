import React from 'react';

export default function Footer() {
  return (
    // The main footer container with a dark background and light text.
    <footer className="bg-gray-800 text-gray-300">
      {/* This is the main content area of the footer. */}
      <div className="container mx-auto px-8 py-16">
        {/* A responsive grid: 2 columns on mobile, 4 on medium screens. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Column 1: A Propos OCP */}
          {/* 'col-span-2 md:col-span-1' makes this column take the full width on mobile (in the 2-col grid) and 1/4 width on medium screens. */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-white text-lg mb-4 tracking-wider">À Propos OCP</h3>
            <p className="text-sm">Office Chérifien des Phosphates, leader mondial depuis 1920 au service de l'agriculture.</p>
            <p className="text-sm mt-4">contact@ocpgroup.ma</p>
          </div>
          
          {/* Column 2: Liens Rapides */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4 tracking-wider">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Documentation API</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Support Technique</a></li>
            </ul>
          </div>
          
          {/* Column 3: Support */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4 tracking-wider">Support & Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">support.astreinte@ocpgroup.ma</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Guide de démarrage</a></li>
            </ul>
          </div>
          
          {/* Column 4: Informations */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4 tracking-wider">Informations Système</h3>
            <p className="text-sm">Statut serveur: <span className="text-green-400">Opérationnel</span></p>
          </div>

        </div>
      </div>
      
      {/* This is the bottom bar of the footer. */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-8 text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; 2025 Office Chérifien des Phosphates</p>
          <p className="mt-2 sm:mt-0">Version système: v2.1.4</p>
        </div>
      </div>
    </footer>
  );
}