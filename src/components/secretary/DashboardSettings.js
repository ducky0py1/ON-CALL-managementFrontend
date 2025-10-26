// Fichier: src/components/dashboard/DashboardSettings.js
import React from 'react';
import { motion } from 'motion/react';
import { Settings, Bell, Users, Shield } from 'lucide-react';

export function DashboardSettings() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings Card */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-blue-600" />Paramètres Généraux</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><label>Mode Sombre</label><div className="w-10 h-6 bg-gray-300 rounded-full"></div></div>
              <div className="flex justify-between items-center"><label>Langue</label><span>Français</span></div>
            </div>
          </div>
        </motion.div>
        {/* Notifications Card */}
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-green-600" />Notifications</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><label>Alertes Email</label><div className="w-10 h-6 bg-green-500 rounded-full"></div></div>
              <div className="flex justify-between items-center"><label>Alertes SMS</label><div className="w-10 h-6 bg-gray-300 rounded-full"></div></div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700">
          Sauvegarder les Paramètres
        </button>
      </div>
    </div>
  );
}