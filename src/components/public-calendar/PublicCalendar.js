// Fichier: src/components/public-calendar/PublicCalendar.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPublicPeriodes, getCurrentWeekAstreintes } from '../../services/api';
import ocpLogo from '../images/ocp_logo.png';

// --- Event Type Color Configuration ---
const EVENT_TYPE_COLORS = {
  hebdomadaire: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', name: 'Hebdomadaire' },
  weekend: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', name: 'Weekend' },
  ferie: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', name: 'Férié' },
  nuit: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300', name: 'Nuit' },
};

// --- Header Section ---
function PublicHeader() {
  return (
    <div className="bg-gradient-to-r from-[#0B43F5] to-[#24DC61] text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
          <span className="logo-circle"><img src={ocpLogo} alt="OCP Logo" className="logo-image" /></span>

          </div>
          <div>
            <h1 className="text-2xl font-bold">Calendrier des Astreintes</h1>
            <p className="text-white/90 text-sm mt-0.5">Consultez les périodes d'astreinte par service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Current Week Astreintes Dashboard ---
function CurrentWeekDashboard({ astreintes, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center text-gray-500">Chargement des agents de garde...</div>
      </div>
    );
  }

  if (!astreintes?.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center text-gray-500">Aucune astreinte cette semaine.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="h-5 w-5 text-[#0B43F5]" />
          Agents de garde cette semaine
        </h2>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {astreintes.map((astreinte, i) => {
            const colors = EVENT_TYPE_COLORS[astreinte.type_periode] || EVENT_TYPE_COLORS.hebdomadaire;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-lg border-2 ${colors.border} ${colors.bg} hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-semibold ${colors.text} text-sm`}>
                    {astreinte.service?.nom || 'Service inconnu'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-white ${colors.text} font-medium`}>
                    {colors.name}
                  </span>
                </div>
                <p className="font-medium text-gray-800 text-sm mb-1">
                  {astreinte.agent_nom} {astreinte.agent_prenom}
                </p>
                <p className="text-xs text-gray-600 flex items-center">
                  <Calendar className="inline-block h-3 w-3 mr-1" />
                  {new Date(astreinte.date_debut).toLocaleDateString('fr-FR')} → {new Date(astreinte.date_fin).toLocaleDateString('fr-FR')}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Calendar Grid (month view) ---
function PublicCalendarGrid({ currentDate, events, onEventClick }) {
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startIndex = (firstDay.getDay() + 6) % 7; // Monday start

  const days = Array.from({ length: startIndex + daysInMonth }, (_, i) => {
    if (i < startIndex) return null;
    return new Date(year, month, i - startIndex + 1);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div>
      <div className="grid grid-cols-7 text-center font-semibold mb-2 text-gray-700 text-sm">
        {weekDays.map((wd) => (
          <div key={wd} className="py-2">
            {wd}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          const isToday = day && day.getTime() === today.getTime();
          return (
            <div
              key={idx}
              className={`h-20 border rounded-lg p-2 text-xs relative hover:shadow-md transition-all ${
                isToday ? 'border-[#0B43F5] border-2 bg-blue-50' : 'border-gray-200'
              } ${!day ? 'bg-gray-50' : 'bg-white'}`}
            >
              {day && (
                <>
                  <div className={`text-right font-semibold mb-1 ${isToday ? 'text-[#0B43F5]' : 'text-gray-700'}`}>
                    {day.getDate()}
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    {events
                      .filter((ev) => {
                        const start = new Date(ev.date_debut);
                        const end = new Date(ev.date_fin);
                        start.setHours(0, 0, 0, 0);
                        end.setHours(0, 0, 0, 0);
                        return day >= start && day <= end;
                      })
                      .slice(0, 2)
                      .map((ev, j) => {
                        const colors = EVENT_TYPE_COLORS[ev.type_periode] || EVENT_TYPE_COLORS.hebdomadaire;
                        return (
                          <div
                            key={j}
                            onClick={() => onEventClick(ev)}
                            className={`cursor-pointer text-xs truncate rounded px-1.5 py-0.5 ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity font-medium`}
                            title={`${ev.service?.nom || 'Astreinte'} - ${colors.name}`}
                          >
                            {ev.service?.nom || 'Astreinte'}
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Modal for event details ---
function EventDetailsModal({ event, onClose }) {
  if (!event) return null;
  const colors = EVENT_TYPE_COLORS[event.type_periode] || EVENT_TYPE_COLORS.hebdomadaire;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className={`${colors.bg} ${colors.text} p-5 border-b-2 ${colors.border}`}>
          <h2 className="text-xl font-bold">{event.service?.nom || 'Astreinte'}</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Type</p>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
              {colors.name}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Agent</p>
            <p className="text-base font-semibold text-gray-900">
              {event.agent_nom} {event.agent_prenom}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Période</p>
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              {new Date(event.date_debut).toLocaleDateString('fr-FR')} → {new Date(event.date_fin).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
        <div className="p-5 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-[#0B43F5] to-[#24DC61] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// --- Main Public Calendar Component ---
export function PublicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [currentWeekAstreintes, setCurrentWeekAstreintes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekLoading, setWeekLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events & weekly astreintes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setWeekLoading(true);
      try {
        const [periodesRes, weekRes] = await Promise.all([
          getPublicPeriodes(),
          getCurrentWeekAstreintes()
        ]);
        setEvents(periodesRes?.data?.data || []);
        setCurrentWeekAstreintes(weekRes?.data?.data || []);
      } catch (err) {
        console.error('Erreur lors du chargement du calendrier public :', err);
      } finally {
        setLoading(false);
        setWeekLoading(false);
      }
    }
    fetchData();
  }, [currentDate]);

  const handleMonthChange = (dir) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + dir);
      return newDate;
    });
  };

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  return (
    <div>
      <PublicHeader />
      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Current Week Dashboard */}
        <CurrentWeekDashboard astreintes={currentWeekAstreintes} loading={weekLoading} />

        {/* Calendar */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => handleMonthChange(1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="p-5">
            {loading ? (
              <div className="text-center py-12 text-gray-500">Chargement du calendrier...</div>
            ) : (
              <PublicCalendarGrid
                currentDate={currentDate}
                events={events}
                onEventClick={setSelectedEvent}
              />
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Légende</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(EVENT_TYPE_COLORS).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded ${v.bg} border ${v.border}`} />
                <span className={`text-sm ${v.text} font-medium`}>{v.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-md p-5">
          <div className="flex items-center justify-center gap-3">
            <Info className="h-5 w-5 text-[#0B43F5]" />
            <p className="text-gray-700 font-medium">
              Pour gérer les astreintes, veuillez vous connecter au système
            </p>
          </div>
        </div>
      </main>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default PublicCalendar;