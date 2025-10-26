// Fichier: src/components/dashboard/DashboardAnalytics.js
import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp } from 'lucide-react';

export function DashboardAnalytics({ periods, periodsByService, stats }) {
  
  // Prepare data for charts using the REAL data from props
  const serviceData = periodsByService ? Object.entries(periodsByService).map(([service, servicePeriods]) => ({
    name: service.replace('Service ', ''),
    active: servicePeriods.filter(p => p.status === 'active').length,
    pending: servicePeriods.filter(p => p.status === 'pending').length,
  })) : [];

  const statusData = periods ? [
    { name: 'Active', value: periods.filter(p => p.status === 'active').length, color: '#24DC61' },
    { name: 'En attente', value: periods.filter(p => p.status === 'pending').length, color: '#F29F05' },
    { name: 'Inactive', value: periods.filter(p => p.status === 'inactive').length, color: '#6B7280' }
  ] : [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Analyses et Rapports</h1>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-4">Répartition par Service</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#24DC61" name="Actives" />
                <Bar dataKey="pending" fill="#F29F05" name="En attente" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-4">Distribution des Statuts</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}