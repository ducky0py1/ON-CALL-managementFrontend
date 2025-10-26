// Fichier: src/components/dashboard/DashboardSidebar.js
import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

import { 
  LayoutDashboard, RotateCcw, BarChart3, LogOut, Bell,
  UserCheck, FileText, Clock, Users, Shield
} from 'lucide-react';

export function DashboardSidebar({ currentView, onViewChange, onLogout, stats }) {
  // const { user } = useAuth();
  // const isAdmin = user?.role === 'admin';
   const { isAdmin } = useAuth();

  const mainNavigationItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "planning", label: "Planning", icon: Clock },
    { id: "users", label: "Utilisateurs", icon: Shield, adminOnly: true },
    { id: "agents", label: "Agents", icon: UserCheck, count: stats.agents },
    { id: "periods", label: "Périodes d'astreinte", icon: RotateCcw, count: stats.total },
    { id: "services", label: "Services", icon: Users, count: stats.services, adminOnly: true },
  ];

  const analysisNavigationItems = [
    { id: "reports", label: "Rapports", icon: FileText },
    { id: "analytics", label: "Analyses", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell, count: stats.critical }
  ];

  const NavButton = ({ item }) => {
    const Icon = item.icon;
    const isActive = currentView === item.id;

    return (
      <motion.button
        key={item.id}
        onClick={() => onViewChange(item.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-left transition-all duration-200 text-sm ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border border-blue-100 shadow-sm"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center space-x-1.5">
          <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
          <span className="font-medium text-xs">{item.label}</span>
        </div>
        {item.count !== null && item.count > 0 && (
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
              isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {item.count}
          </span>
        )}
      </motion.button>
    );
  };

  return (
    <motion.aside
      initial={{ x: -220, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-200 shadow-md z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0B43F5] to-[#24DC61] flex items-center justify-center shadow">
            <span className="text-white font-bold text-sm">OCP</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm">Gestion Astreinte</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
        <nav className="p-3 space-y-3">
          <div className="space-y-1">
            <h3 className="px-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Fonctionnalités</h3>
            {mainNavigationItems.map(
              (item) => (!item.adminOnly || isAdmin) && <NavButton key={item.id} item={item} />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="px-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Analyses</h3>
            {analysisNavigationItems.map((item) => (
              <NavButton key={item.id} item={item} />
            ))}
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-start px-2 py-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors text-xs"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="font-medium">Se déconnecter</span>
        </button>
      </div>
    </motion.aside>
  );
}
