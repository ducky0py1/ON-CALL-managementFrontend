// Fichier: src/components/dashboard/DashboardSidebar.js
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, RotateCcw, BarChart3, Settings, LogOut, Bell,
  UserCheck, FileText, Plus, Search, Activity, Clock, AlertTriangle, Users
} from 'lucide-react';

// This is the main sidebar component.
export function DashboardSidebar({ 
  currentView, 
  onViewChange, 
  onLogout, 
  stats 
}) {

  // An array defining all the main navigation items for cleaner code.
  const mainNavigationItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard, description: "Vue d'ensemble générale" },
    { id: "planning", label: "Planning", icon: Clock, description: "Calendrier et planification" },
    { id: "agents", label: "Agents", icon: UserCheck, count: stats.agents, description: "Gestion du personnel" },
    { id: "periods", label: "Périodes d'astreinte", icon: RotateCcw, count: stats.total, description: "Gérer les périodes" }
  ];

  // An array for the analysis section navigation.
  const analysisNavigationItems = [
    { id: "reports", label: "Rapports", icon: FileText, description: "Rapports détaillés" },
    { id: "analytics", label: "Analyses", icon: BarChart3, description: "Statistiques avancées" },
    { id: "notifications", label: "Notifications", icon: Bell, count: stats.critical, description: "Alertes et notifications" }
  ];

  // A reusable button component for the navigation items to avoid repeating code.
  const NavButton = ({ item }) => {
    const Icon = item.icon;
    const isActive = currentView === item.id;
    
    return (
      <motion.button
        key={item.id}
        onClick={() => onViewChange(item.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border border-blue-100 shadow-sm"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
          <div>
            <p className="font-medium text-sm">{item.label}</p>
          </div>
        </div>
        {item.count !== null && item.count > 0 && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            {item.count}
          </span>
        )}
      </motion.button>
    );
  };

  return (
    // The main sidebar container. It's fixed to the left of the screen.
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 flex flex-col"
    >
      {/* Sidebar Header with OCP Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B43F5] to-[#24DC61] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">OCP</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Gestion Astreinte</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Main Content Area of the Sidebar */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navigation Section */}
        <nav className="p-4 space-y-6">
          {/* Main Features */}
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Fonctionnalités</h3>
            {mainNavigationItems.map((item) => <NavButton key={item.id} item={item} />)}
          </div>
          {/* Analysis & Reports */}
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Analyses</h3>
            {analysisNavigationItems.map((item) => <NavButton key={item.id} item={item} />)}
          </div>
        </nav>
      </div>

      {/* Footer of the Sidebar */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-start p-3 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Se déconnecter</span>
        </button>
      </div>
    </motion.aside>
  );
}