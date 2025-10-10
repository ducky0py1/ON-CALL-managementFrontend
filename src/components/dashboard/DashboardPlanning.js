// Fichier: src/components/dashboard/DashboardPlanning.js
import React from 'react';
import { motion } from 'motion/react';
import { CalendarClock, Calendar, Users, Clock, Plus } from 'lucide-react';

export function DashboardPlanning({
  periods,
  selectedService,
  stats,
  onCreatePeriod,
  onNavigateToSchedule
}) {
  // Filter for upcoming and active periods based on the data passed in
  const upcomingPeriods = periods.filter(p => new Date(p.startDate) > new Date()).slice(0, 5);
  const activePeriods = periods.filter(p => p.status === 'active');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Planning & Calendrier</h1>
          <p className="text-gray-600">{selectedService ? `Planning pour ${selectedService}` : "Vue d'ensemble du planning"}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={onNavigateToSchedule} className="px-4 py-2 bg-white border rounded-lg text-gray-700 font-semibold">
            <Calendar className="w-4 h-4 mr-2 inline-block" />
            Vue Calendrier
          </button>
          <button onClick={onCreatePeriod} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg">
            <Plus className="w-4 h-4 mr-2 inline-block" />
            Nouvelle Période
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-4 bg-white rounded-lg shadow"><p className="text-sm font-medium">Périodes Actives</p><p className="text-2xl font-bold">{activePeriods.length}</p></div>
        <div className="p-4 bg-white rounded-lg shadow"><p className="text-sm font-medium">À Venir</p><p className="text-2xl font-bold">{upcomingPeriods.length}</p></div>
        <div className="p-4 bg-white rounded-lg shadow"><p className="text-sm font-medium">Ce Mois</p><p className="text-2xl font-bold">{stats.thisMonth}</p></div>
        <div className="p-4 bg-white rounded-lg shadow"><p className="text-sm font-medium">Agents Impliqués</p><p className="text-2xl font-bold">{stats.agents}</p></div>
      </div>

      {/* Active and Upcoming Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Periods */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Périodes Actives</h3>
          <div className="space-y-3">
            {activePeriods.length > 0 ? activePeriods.map(p => (
              <div key={p.id} className="p-3 border rounded-lg">
                <p className="font-medium">{p.description}</p>
                <p className="text-sm text-gray-500">{p.service} | {p.startDate} - {p.endDate}</p>
              </div>
            )) : <p className="text-gray-500">Aucune période active.</p>}
          </div>
        </div>
        {/* Upcoming Periods */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Prochaines Périodes</h3>
          <div className="space-y-3">
            {upcomingPeriods.length > 0 ? upcomingPeriods.map(p => (
              <div key={p.id} className="p-3 border rounded-lg">
                <p className="font-medium">{p.description}</p>
                <p className="text-sm text-gray-500">{p.service} | Début: {p.startDate}</p>
              </div>
            )) : <p className="text-gray-500">Aucune période à venir.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}