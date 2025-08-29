// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Animation des fonctionnalités - changement automatique toutes les 4 secondes
  const features = [
    {
      title: "Gestion des Services",
      description: "Organisez et supervisez tous les départements OCP",
      icon: "🏢"
    },
    {
      title: "Suivi des Agents",
      description: "Personnel et collaborateurs en temps réel",
      icon: "👥"
    },
    {
      title: "Planification d'Astreinte",
      description: "Optimisez les rotations et disponibilités",
      icon: "📅"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fonction pour naviguer vers la page de connexion
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Fonction pour naviguer vers la page d'inscription (à créer plus tard)
  const handleRegisterClick = () => {
    // Pour l'instant, on redirige vers login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo OCP */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-3 shadow-lg">
                <span className="text-white font-bold text-lg">OCP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Gestion Astreinte</h1>
                <p className="text-sm text-green-600 font-medium">Office Chérifien des Phosphates</p>
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-green-700 font-semibold hover:text-green-800 transition-colors duration-200 relative group"
              >
                Accueil
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform scale-x-100 group-hover:scale-x-110 transition-transform duration-200"></div>
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-green-700 transition-colors duration-200 font-medium"
              >
                À Propos
              </Link>
              <Link 
                to="/features" 
                className="text-gray-700 hover:text-green-700 transition-colors duration-200 font-medium"
              >
                Fonctionnalités
              </Link>
              
              {/* Boutons d'authentification */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLoginClick}
                  className="text-green-700 hover:text-green-800 font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                >
                  Connexion
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  S'inscrire
                </button>
              </div>
            </div>

            {/* Menu Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`w-4 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : 'mb-1'}`}></span>
                <span className={`w-4 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
                <span className={`w-4 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Menu Mobile Dropdown */}
          <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="py-4 space-y-4 border-t border-green-100">
              <Link to="/" className="block text-green-700 font-semibold hover:text-green-800 transition-colors duration-200">
                Accueil
              </Link>
              <Link to="/about" className="block text-gray-700 hover:text-green-700 transition-colors duration-200">
                À Propos
              </Link>
              <Link to="/features" className="block text-gray-700 hover:text-green-700 transition-colors duration-200">
                Fonctionnalités
              </Link>
              <div className="pt-4 space-y-3 border-t border-green-100">
                <button
                  onClick={handleLoginClick}
                  className="w-full text-left text-green-700 hover:text-green-800 font-medium"
                >
                  Connexion
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
                >
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Section Hero - Point focal de la page */}
      <section className="relative overflow-hidden">
        {/* Motifs décoratifs d'arrière-plan OCP */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 border-2 border-green-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border-2 border-green-200 transform rotate-45 opacity-20"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-green-200 rounded-full opacity-25"></div>
          <div className="absolute bottom-40 right-1/3 w-12 h-12 border-2 border-green-200 transform rotate-45 opacity-30"></div>
          
          {/* Gradient subtil en overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenu textuel principal */}
            <div className="space-y-8">
              {/* Badge de statut */}
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Système opérationnel - OCP Group
              </div>

              {/* Titre principal */}
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Gestion
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
                  d'Astreinte
                </span>
                <span className="text-2xl lg:text-3xl text-gray-600 font-normal block mt-2">
                  Office Chérifien des Phosphates
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Solution complète pour la gestion centralisée des services, du personnel et des planifications d'astreinte. 
                Optimisez vos opérations avec une interface moderne et intuitive.
              </p>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleLoginClick}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  Accéder au Système
                </button>
                <button className="border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                  Découvrir les Fonctionnalités
                </button>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-gray-600">Surveillance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Disponibilité</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Sécurisé</div>
                  <div className="text-sm text-gray-600">Données</div>
                </div>
              </div>
            </div>

            {/* Section interactive des fonctionnalités */}
            <div className="relative">
              {/* Carte principale des fonctionnalités avec animation */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-green-100 relative overflow-hidden">
                {/* Effet de gradient animé */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-400 animate-pulse"></div>
                
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3 transform transition-transform duration-500 hover:scale-110">
                    {features[currentFeature].icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-gray-600">
                    {features[currentFeature].description}
                  </p>
                </div>

                {/* Indicateurs de progression */}
                <div className="flex justify-center space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentFeature 
                          ? 'bg-green-600 scale-125' 
                          : 'bg-green-200 hover:bg-green-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Éléments décoratifs flottants */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-200 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-green-300 rounded-full opacity-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section À Propos - Mission OCP et présentation du système */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Motifs décoratifs subtils */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 border border-green-100 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-green-100 transform rotate-45 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header de section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              À propos du système
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Une Solution Conçue pour
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
                l'Excellence Opérationnelle
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Le système de gestion d'astreinte OCP répond aux besoins spécifiques d'une organisation 
              de classe mondiale, alliant tradition d'excellence et innovation technologique.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Contenu OCP */}
            <div className="space-y-8">
              {/* OCP en bref */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-green-600 rounded-xl p-3 flex-shrink-0">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">OCP</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Office Chérifien des Phosphates</h3>
                    <p className="text-green-700 font-medium">Leader mondial des solutions phosphatées</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Depuis 1920, l'OCP Group s'impose comme le leader mondial de l'industrie des phosphates et 
                    des produits dérivés, contribuant à la sécurité alimentaire mondiale et au développement 
                    durable de l'agriculture.
                  </p>
                  
                  {/* Statistiques OCP */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                      <div className="text-lg font-bold text-green-600">100+</div>
                      <div className="text-xs text-gray-600">Ans d'expertise</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                      <div className="text-lg font-bold text-green-600">160+</div>
                      <div className="text-xs text-gray-600">Pays desservis</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission du système */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-3"></div>
                  Notre Mission
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Digitaliser et optimiser la gestion des ressources humaines, des services et des planifications 
                  pour maintenir l'excellence opérationnelle de l'OCP Group. Notre système assure une coordination 
                  parfaite entre tous les départements.
                </p>
                
                {/* Points clés */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Coordination centralisée des équipes et services</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Optimisation des plannings et rotations d'astreinte</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Suivi en temps réel des disponibilités et compétences</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panneau interactif des fonctionnalités */}
            <div className="relative">
              {/* Carte principale */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Header de la carte */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                  <h4 className="text-lg font-bold mb-2">Tableau de Bord Système</h4>
                  <p className="text-green-100 text-sm">Aperçu en temps réel</p>
                </div>
                
                {/* Contenu de la carte */}
                <div className="p-6 space-y-4">
                  {/* Simulation d'indicateurs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="text-2xl font-bold text-green-600">247</div>
                      <div className="text-sm text-gray-600">Agents actifs</div>
                      <div className="w-full bg-green-200 rounded-full h-1 mt-2">
                        <div className="bg-green-500 h-1 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">Services</div>
                      <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
                        <div className="bg-blue-500 h-1 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Simulation de planning */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h5 className="font-semibold text-gray-800 mb-3">Planification Cette Semaine</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm text-gray-600">Lundi - Service IT</span>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm text-gray-600">Mardi - Service RH</span>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm text-gray-600">Mercredi - Maintenance</span>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Status en bas */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600">Système opérationnel</span>
                    </div>
                    <span className="text-xs text-gray-400">Mis à jour il y a 2 min</span>
                  </div>
                </div>
              </div>

              {/* Éléments décoratifs */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-green-200 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-100 rounded-full opacity-40"></div>
            </div>
          </div>

          {/* Valeurs et principes */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-white text-2xl">🔒</div>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Sécurité</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Protection maximale des données avec chiffrement de bout en bout et authentification multi-facteurs
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-white text-2xl">⚡</div>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Performance</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Interface ultra-rapide et réactive, optimisée pour une utilisation intensive 24h/24
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-white text-2xl">🎯</div>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Précision</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Gestion précise des plannings avec alertes intelligentes et optimisation automatique
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;