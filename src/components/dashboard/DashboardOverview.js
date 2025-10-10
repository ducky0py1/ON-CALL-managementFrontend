// Fichier: src/components/dashboard/DashboardOverview.js
import React from 'react';
import { motion } from 'motion/react';
import { Plus, Calendar, TrendingUp, Clock, Users, Shield, Zap, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function DashboardOverview({ periods, periodsByService, stats, onCreatePeriod, onNavigateToSchedule }) {
  
  // Data-proofing: If the required props are not ready, use empty arrays to prevent crashes.
  const upcomingPeriods = periods ? periods
    .filter(p => new Date(p.startDate) >= new Date())
    .slice(0, 4) : [];

  const serviceChartData = periodsByService ? Object.entries(periodsByService).map(([service, servicePeriods]) => ({
    name: service.replace('Service ', ''),
    active: servicePeriods.filter(p => p.status === 'active').length,
    pending: servicePeriods.filter(p => p.status === 'pending').length,
  })) : [];

  const pieData = (stats && periods) ? [
    { name: 'Active', value: stats.active, color: '#24DC61' },
    { name: 'En attente', value: periods.filter(p => p.status === 'pending').length, color: '#F29F05' },
    { name: 'Inactive', value: periods.filter(p => p.status === 'inactive').length, color: '#CBD5E1' }
  ] : [];

  const performanceMetrics = stats ? [
    { title: "Taux d'activité", value: Math.round((stats.active / (stats.total || 1)) * 100), unit: "%", icon: Target, color: "from-blue-500 to-blue-600" },
    { title: "Couverture Services", value: stats.services, unit: "", icon: Shield, color: "from-green-500 to-green-600" },
    { title: "Agents Mobilisés", value: stats.agents, unit: "", icon: Users, color: "from-sky-500 to-sky-600" },
    { title: "Réactivité", value: 94, unit: "%", icon: Zap, color: "from-orange-500 to-orange-600" }
  ] : [];

  // --- RENDER ---
  // If stats is not loaded, we can show a loading state or nothing
  if (!stats) {
      return <div>Chargement des données...</div>;
  }
  
  return (
    <div className="space-y-6">
      {/* Hero Header */}
      {/* ... (Your Hero Header JSX is correct) ... */}
      
      {/* Performance Metrics */}
      {/* ... (Your Performance Metrics JSX is correct) ... */}

      {/* Charts Section */}
      {/* ... (Your Charts Section JSX is correct) ... */}

      {/* --- THIS IS THE NEW/FIXED SECTION --- */}
      {/* Upcoming Periods & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Periods Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="bg-white p-6 rounded-lg shadow-lg h-full">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Prochaines Périodes
            </h3>
            <div className="space-y-3">
              {upcomingPeriods.length > 0 ? (
                upcomingPeriods.map(period => (
                  <div key={period.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-sm">{period.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                      <span>{period.service}</span>
                      <span>{period.startDate}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">Aucune période à venir.</p>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Recent Activity Card (Placeholder) */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
           <div className="bg-white p-6 rounded-lg shadow-lg h-full">
             <h3 className="font-semibold mb-4">Activité Récente</h3>
             <p className="text-gray-400 text-center py-8">Le journal d'activité sera affiché ici.</p>
           </div>
        </motion.div>
      </div>
      {/* --- END OF NEW SECTION --- */}
    </div>
  );
}