// Fichier: src/components/dashboard/DashboardSettings.js
import React from 'react';
import { Settings } from 'lucide-react';

export function DashboardSettings() {
  return (
    <div className="text-center py-20 bg-gray-100 rounded-lg">
      <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Section Paramètres</h1>
      <p className="text-gray-600 mt-2">Cette section est en cours de construction.</p>
    </div>
  );
}