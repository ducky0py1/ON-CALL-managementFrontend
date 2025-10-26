// Fichier: src/components/dashboard/DashboardReports.js
import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Calendar, Users, TrendingUp } from 'lucide-react';

export function DashboardReports({ stats, selectedService }) {
  const availableReports = [
    { title: "Rapport Mensuel", description: "Synthèse des activités du mois", icon: FileText, count: stats.thisMonth, unit: "éléments" },
    { title: "Analyse des Incidents", description: "Périodes critiques et leur résolution", icon: TrendingUp, count: stats.critical, unit: "critiques" },
    { title: "Performance des Équipes", description: "Évaluation des performances des agents", icon: Users, count: stats.agents, unit: "agents" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Rapports & Analyses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableReports.map((report, index) => {
          const Icon = report.icon;
          return (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>
                <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">{report.count} {report.unit}</span>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg">Générer</button>
                <button className="p-2 border rounded-lg"><Download className="w-4 h-4" /></button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}