// Fichier: src/components/secretary/SecretaryOverview.js
import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, LayoutDashboard, CalendarClock, UserX, RotateCcw } from 'lucide-react';
export function SecretaryOverview({ stats, onViewChange }) {
  const quickStats = [
    { title: "Périodes Actives", value: stats.active, icon: Calendar, color: "from-blue-500" },
    { title: "Services Gérés", value: stats.services, icon: LayoutDashboard, color: "from-green-500" },
    { title: "Agents Mobilisés", value: stats.agents, icon: Users, color: "from-purple-500" },
  ];
  
  const quickAccess = [
    { id: "planning", label: "Planning", icon: CalendarClock, description: "Calendrier de planification" },
    { id: "periods", label: "Périodes d'astreinte", icon: RotateCcw, description: "Gérer les périodes" },
    { id: "agents", label: "Indisponibilité Agents", icon: UserX, description: "Gérer les absences agents" },
    { id: "secretaries", label: "Mes Indisponibilités", icon: Users, description: "Gérer mes absences" }
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl text-white">
        <h1 className="text-4xl font-bold">Tableau de Bord Secrétariat</h1>
        <p className="text-lg text-white/90">Gérer les plannings, périodes et indisponibilités.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickAccess.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.id} onClick={() => onViewChange(item.id)} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:border-blue-600 border-2 border-transparent">
              <Icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">{item.label}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}