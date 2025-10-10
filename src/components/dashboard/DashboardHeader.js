// Fichier: src/components/dashboard/DashboardHeader.js
import React from 'react';
import { motion } from 'motion/react';
import { Plus, RotateCcw, Calendar, Users, BarChart3, Settings, Home, FileText, UserCheck } from 'lucide-react';

// This component receives props to control its content and actions.
export function DashboardHeader({ currentView, onCreatePeriod }) {
  
  // This object stores the title, icon, and description for each possible view.
  // It makes the component dynamic and easy to update.
  const viewDetails = {
    overview: { icon: Home, title: "Vue d'ensemble", description: "Tableau de bord général et statistiques clés." },
    periods: { icon: RotateCcw, title: "Périodes d'Astreinte", description: "Gérez toutes les périodes planifiées." },
    planning: { icon: Calendar, title: "Planning Général", description: "Visualisez le calendrier complet des astreintes." },
    agents: { icon: UserCheck, title: "Gestion des Agents", description: "Consultez et gérez la liste du personnel." },
    reports: { icon: FileText, title: "Rapports & Analyses", description: "Générez et consultez les rapports d'activité." },
    analytics: { icon: BarChart3, title: "Analyses Détaillées", description: "Explorez les données de performance." },
    notifications: { icon: Bell, title: "Notifications", description: "Consultez les alertes et messages du système." },
    settings: { icon: Settings, title: "Paramètres", description: "Configurez les paramètres du système." },
    default: { icon: Home, title: "Dashboard", description: "Bienvenue sur votre espace de gestion." }
  };

  // We select the correct details based on the 'currentView' prop, with a fallback.
  const activeViewDetails = viewDetails[currentView] || viewDetails.default;
  const Icon = activeViewDetails.icon;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      {/* Page Title Section - Dynamically changes content */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            {/* The icon changes based on the selected view */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center shadow-lg">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {activeViewDetails.title}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mt-1">
                {activeViewDetails.description}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons - These are shown conditionally based on the view */}
        <div className="flex items-center space-x-3">
          {/* We only show the "Nouvelle Période" button if the user is on a relevant view */}
          {(currentView === 'periods' || currentView === 'overview' || currentView === 'planning') && (
            <button
              onClick={onCreatePeriod}
              className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle Période
            </button>
          )}
          {/* You could add a "Nouvel Agent" button for the 'agents' view here */}
        </div>
      </div>
    </motion.div>
  );
}