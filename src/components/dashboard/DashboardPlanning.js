// Fichier: src/components/dashboard/DashboardPlanning.js
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanningCalendar } from './PlanningCalendar';
import { EventDetailsModal } from './EventDetailsModal'; //  using the dedicated modal component

// --- Event Type Colors (matching PublicCalendar) ---
const EVENT_TYPE_COLORS = {
  hebdomadaire: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
    name: 'Hebdomadaire'
  },
  weekend: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
    name: 'Weekend'
  },
  ferie: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-300',
    name: 'Férié'
  },
  nuit: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    border: 'border-indigo-300',
    name: 'Nuit'
  }
};

export function DashboardPlanning({ periods }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleMonthChange = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center bg-white shadow-md rounded-xl p-4 border border-gray-200"
      >
        <button
          onClick={() => handleMonthChange(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 tracking-wide">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <button
          onClick={() => handleMonthChange(1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </motion.div>

      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
      >
        <PlanningCalendar
          currentDate={currentDate}
          periods={periods}
          onEventClick={(event) => setSelectedEvent(event)}
        />
      </motion.div>

      {/* Legend Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
      >
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Légende</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(EVENT_TYPE_COLORS).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded ${value.bg} border ${value.border}`}
              />
              <span className={`text-sm ${value.text} font-medium`}>
                {value.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-md p-5 border border-green-100"
      >
        <div className="flex items-center justify-center gap-3">
          <Info className="h-5 w-5 text-blue-600" />
          <p className="text-gray-700 font-medium">
            Vous consultez la planification interne du tableau de bord.
          </p>
        </div>
      </motion.div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default DashboardPlanning;
