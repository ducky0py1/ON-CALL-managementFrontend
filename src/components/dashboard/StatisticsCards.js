// Fichier: src/components/dashboard/StatisticsCards.js
import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, Clock, Users, Calendar } from 'lucide-react';

// Animation variants for a staggered loading effect.
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 + i * 0.1, // Each card animates with a slight delay
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// The main component function. It receives 'stats' as a prop.
export function StatisticsCards({ stats }) {
  // An array defining the content and style of each card.
  // This makes the JSX below much cleaner.
  const cards = [
    { title: "Périodes Totales", value: stats.total, icon: BarChart3, color: "from-[#0B43F5] to-[#3ca7ffff]", bgColor: "bg-blue-50", iconColor: "text-[#0B43F5]" },
    { title: "Actives Aujourd'hui", value: stats.active, icon: Clock, color: "from-[#24DC61] to-[#01c542ff]", bgColor: "bg-green-50", iconColor: "text-[#24DC61]" },
    { title: "Services Couverts", value: stats.services, icon: Users, color: "from-[#F29F05] to-[#f59e0b]", bgColor: "bg-orange-50", iconColor: "text-[#F29F05]" },
    { title: "Ce Mois", value: stats.thisMonth, icon: Calendar, color: "from-[#76bffaff] to-[#3ca7ffff]", bgColor: "bg-sky-50", iconColor: "text-[#76bffaff]" }
  ];

  return (
    // The main container for the grid of cards.
    // 'motion.div' is from the motion library and enables animations.
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial="hidden" // Start in the 'hidden' state defined in cardVariants
      animate="visible" // Animate to the 'visible' state
    >
      {/* We loop through the 'cards' array to render each card. */}
      {cards.map((card, index) => {
        const Icon = card.icon; // Get the icon component from the card data
        return (
          <motion.div
            key={card.title}
            custom={index} // Pass the index to the variants for the delay effect
            variants={cardVariants}
          >
            <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${card.iconColor}`} />
                </div>
              </div>

              {/* Decorative elements for styling */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                <div className={`w-full h-full bg-gradient-to-br ${card.color} rounded-full transform translate-x-8 -translate-y-8`} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}