// Fichier: src/components/dashboard/DashboardOverview.js
import React from 'react';
import { motion } from 'motion/react';
import { Plus, Calendar, TrendingUp, Clock, Users, Shield, Zap, Target, Activity, Sparkles, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// This is the main component for the 'overview' view.
export function DashboardOverview({ periods, periodsByService, stats, onCreatePeriod, onNavigateToSchedule }) {
  
  // --- Data-Proofing: If props are not ready, use default/empty values to prevent crashes ---
  const safeStats = stats || { total: 0, active: 0, services: 0, thisMonth: 0, critical: 0, agents: 0 };
  const safePeriods = periods || [];
  const safePeriodsByService = periodsByService || {};

  // --- Data Preparation for Charts and Lists ---
  const upcomingPeriods = safePeriods.filter(p => new Date(p.startDate) >= new Date()).slice(0, 4);
  const recentActivities = safePeriods.slice(0, 6).map(p => ({
      id: p.id, title: p.description, service: p.service?.nom || 'N/A', status: p.status, time: p.startDate, agents: p.assignedAgents?.length || 0, priority: p.priority
  }));
  const serviceChartData = Object.entries(safePeriodsByService).map(([service, pds]) => ({
      name: service.replace('Service ', ''), total: pds.length, active: pds.filter(p => p.status === 'active').length, pending: pds.filter(p => p.status === 'pending').length
  }));
  const pieData = [
    { name: 'Active', value: safeStats.active, color: '#24DC61' },
    { name: 'En attente', value: safePeriods.filter(p => p.status === 'pending').length, color: '#F29F05' },
  ];
  const performanceMetrics = [
    { title: "Taux d'activité", value: Math.round((safeStats.active / (safeStats.total || 1)) * 100), unit: "%", icon: Target, color: "from-blue-500 to-blue-600" },
    { title: "Couverture Services", value: safeStats.services, unit: "", icon: Shield, color: "from-green-500 to-green-600" },
    { title: "Agents Mobilisés", value: safeStats.agents, unit: "", icon: Users, color: "from-sky-500 to-sky-600" },
    { title: "Réactivité", value: 94, unit: "%", icon: Zap, color: "from-orange-500 to-orange-600" }
  ];
  const weeklyTrendData = [
    { day: 'Lun', periodes: 12 }, { day: 'Mar', periodes: 15 }, { day: 'Mer', periodes: 18 }, { day: 'Jeu', periodes: 14 },
    { day: 'Ven', periodes: 16 }, { day: 'Sam', periodes: 8 }, { day: 'Dim', periodes: 6 }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header with Gradient Background */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-green-500 p-8 shadow-2xl">
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white">Tableau de Bord OCP</h1>
            <p className="text-lg text-white/90">Vue d'ensemble en temps réel</p>
          </div>
          <button onClick={onCreatePeriod} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-xl hover:bg-gray-100">
            <Plus className="w-4 h-4 mr-2 inline-block" />
            Nouvelle Période
          </button>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div key={metric.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} className="bg-white p-6 rounded-lg shadow-lg">
              <Icon className={`w-8 h-8 mb-4 bg-gradient-to-br ${metric.color} p-1.5 rounded-lg text-white`} />
              <p className="text-3xl font-bold text-gray-900">{metric.value}{metric.unit}</p>
              <p className="text-sm text-gray-600 font-medium">{metric.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-4">Distribution par Service</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceChartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Legend /><Bar dataKey="active" fill="#24DC61" name="Actives" /><Bar dataKey="pending" fill="#F29F05" name="En attente" /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-4">Répartition des Statuts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart><Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>{pieData.map((e, i) => <Cell key={`cell-${i}`} fill={e.color} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-4">Tendance Hebdomadaire</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weeklyTrendData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Line type="monotone" dataKey="periodes" stroke="#0B43F5" strokeWidth={2} /></LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-4">Prochaines Périodes</h3>
          <div className="space-y-3">
            {upcomingPeriods.length > 0 ? upcomingPeriods.map(period => (
              <div key={period.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">{period.description}</p>
                <p className="text-xs text-gray-500 mt-1">{period.service?.nom} • {period.date_debut}</p>
              </div>
            )) : <p className="text-gray-400 text-center py-8">Aucune période à venir.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}