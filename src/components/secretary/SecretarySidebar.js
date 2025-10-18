// Fichier: src/components/secretary/SecretarySidebar.js
import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, UserX, Users, LogOut, RotateCcw, CalendarClock } from 'lucide-react';

// Reusable navigation button component
const NavButton = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
        <div>
          <p className="font-medium text-sm">{item.label}</p>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
      </div>
      {item.count > 0 && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{item.count}</span>}
    </motion.button>
  );
};

export function SecretarySidebar({ currentView, onViewChange, onLogout, stats }) {
  const navigationItems = [
    { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard, description: "Dashboard principal" },
    { id: "planning", label: "Planning", icon: CalendarClock, description: "Calendrier" },
    { id: "periods", label: "Périodes", icon: RotateCcw, count: stats.total, description: "Gérer les périodes" },
    { id: "agents", label: "Indisponibilité Agents", icon: UserX, description: "Gérer les absences" },
    { id: "secretaries", label: "Mes Indisponibilités", icon: Users, description: "Gérer mes absences" }
  ];

  return (
    <motion.aside
      initial={{ x: -250 }} animate={{ x: 0 }} exit={{ x: -250 }}
      className="fixed left-0 top-0 h-full w-64 bg-white border-r z-40 flex flex-col"
    >
      <div className="p-6 border-b"><h1 className="font-bold">Espace Secrétaire</h1></div>
      <nav className="flex-1 p-4 overflow-y-auto space-y-2">
        {navigationItems.map(item => (
          <NavButton key={item.id} item={item} isActive={currentView === item.id} onClick={() => onViewChange(item.id)} />
        ))}
      </nav>
      <div className="p-4 border-t">
        <button onClick={onLogout} className="w-full p-2 rounded-lg text-red-600 hover:bg-red-50 flex items-center">
          <LogOut className="w-4 h-4 mr-2" />Se déconnecter
        </button>
      </div>
    </motion.aside>
  );
}
