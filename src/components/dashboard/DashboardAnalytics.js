// Fichier: src/components/dashboard/DashboardAnalytics.js
import React from 'react';
import { BarChart3 } from 'lucide-react';

export function DashboardAnalytics() {
  return (
    <div className="text-center py-20 bg-gray-100 rounded-lg">
      <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Section Analyses</h1>
      <p className="text-gray-600 mt-2">Cette section est en cours de construction.</p>
    </div>
  );
}