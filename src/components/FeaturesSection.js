import React from 'react';

export default function FeaturesSection() {
  // We'll store the features in an array to make it easy to add more later.
  const features = [
    {
      title: "Tableau de Bord Centralisé",
      description: "Une vue d'ensemble en temps réel de tous les services, des agents d'astreinte et des alertes critiques. Prenez des décisions éclairées en un coup d'œil.",
      imagePlaceholder: "Dashboard Screenshot" // This is for accessibility
    },
    {
      title: "Gestion des Agents Complète",
      description: "Accédez à une base de données complète du personnel OCP. Gérez les profils, les compétences, les indisponibilités et l'historique de chaque agent.",
      imagePlaceholder: "Agent Management Screenshot"
    },
    // You can easily add a third feature here if you want.
    // {
    //   title: "Planification d'Astreinte",
    //   description: "Visualisez et ajustez les plannings sur une interface de calendrier intuitive. L'optimisation automatique garantit une couverture complète et équitable.",
    //   imagePlaceholder: "Calendar Screenshot"
    // }
  ];

  return (
    // This section has a white background to continue the flow.
    <section className="bg-white py-24">
      <div className="container mx-auto px-8">

        {/* ===== Section Title ===== */}
        {/* While not explicitly in the prototype image, a title helps structure the page. */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">Fonctionnalités Clés en Action</h2>
          <p className="text-lg text-gray-500 mt-4 max-w-3xl mx-auto">
            Découvrez comment notre système transforme les opérations quotidiennes.
          </p>
        </div>

        {/* ===== Features Grid ===== */}
        {/* We use a responsive grid that shows one column on mobile and two on larger screens. */}
        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-2">
              {/* This is the placeholder for the screenshot, like in your prototype. */}
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <p className="text-gray-400 font-semibold">{feature.imagePlaceholder}</p>
              </div>
              
              {/* This is the content area below the image. */}
              <div className="p-8">
                {/* The little green decorative bar. */}
                <div className="bg-green-600 h-1.5 w-16 mb-4 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mt-4 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Call-to-Action Link ===== */}
        <div className="text-center mt-16">
            <a href="" className="text-lg font-semibold text-green-600 hover:text-green-800 transition-colors">
                Découvrir toutes les fonctionnalités →
            </a>
        </div>
      </div>
    </section>
  );
}