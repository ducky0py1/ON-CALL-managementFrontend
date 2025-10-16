// src/components/public-calendar/PublicCalendar.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, Info } from 'lucide-react';
import { getPublicPeriodes, getCurrentWeekAstreintes } from '../../services/api';

// --- Color & Style Configuration ---
const EVENT_TYPE_COLORS = {
  hebdomadaire: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', name: 'Hebdomadaire' },
  weekend: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', name: 'Weekend' },
  ferie: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', name: 'Férié' },
  nuit: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300', name: 'Nuit' },
};

// ===== Sub-Component: Header =====
function PublicHeader() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-green-600 font-bold text-2xl">OCP</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Calendrier des Astreintes</h1>
            <p className="text-green-100 mt-1">Consultez les périodes d'astreinte de tous les services</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Sub-Component: Current Week Dashboard =====
function CurrentWeekDashboard({ astreintes, loading }) {
  if (loading) {
    return <p className="text-gray-500">Chargement des agents de garde...</p>;
  }
  if (!astreintes || astreintes.length === 0) {
    return <p className="text-gray-500">Aucune astreinte cette semaine.</p>;
  }
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Users className="h-6 w-6 text-green-600" />
        Agents de garde cette semaine
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {astreintes.map((astreinte, index) => {
          const colors = EVENT_TYPE_COLORS[astreinte.type_periode] || EVENT_TYPE_COLORS.hebdomadaire;
          return (
            <div key={index} className={`p-4 rounded-lg border-2 ${colors.border} ${colors.bg}`}>
              <div className="flex justify-between items-start mb-3">
                <span className={`font-bold ${colors.text}`}>{astreinte.service}</span>
                <span className={`text-xs px-2 py-1 rounded-full bg-white ${colors.text}`}>
                  {colors.name}
                </span>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-gray-700 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {astreinte.agent_nom} {astreinte.agent_prenom}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {astreinte.date_debut} au {astreinte.date_fin}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== Sub-Component: Calendar Grid =====
function PublicCalendarGrid({ currentDate, events, onEventClick }) {
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // In JavaScript, Sunday is 0, Monday is 1, etc.
    // We want Monday = 0, ... Sunday = 6
    return (firstDay.getDay() + 6) % 7;
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayIndex = getFirstDayOfMonth(currentDate);

  const totalCells = firstDayIndex + daysInMonth;
  const cells = Array.from({ length: totalCells }, (_, i) => {
    if (i < firstDayIndex) return null;
    const dayNumber = i - firstDayIndex + 1;
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
  });

  return (
    <div>
      <div className="grid grid-cols-7 text-center font-semibold mb-2 text-gray-600">
        {weekDays.map((wd) => (
          <div key={wd}>{wd}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => (
          <div
            key={idx}
            className="h-24 border rounded-lg p-1 text-sm relative"
          >
            {day && (
              <>
                <div className="text-right font-medium text-gray-700">
                  {day.getDate()}
                </div>
                <div className="space-y-1 mt-1">
                  {events
                    .filter((ev) => {
                      const start = new Date(ev.date_debut);
                      const end = new Date(ev.date_fin);
                      // include the event if this day is between start and end (inclusive)
                      return day >= start && day <= end;
                    })
                    .map((ev, idx2) => {
                      const colors = EVENT_TYPE_COLORS[ev.type_periode] || EVENT_TYPE_COLORS.hebdomadaire;
                      return (
                        <div
                          key={idx2}
                          onClick={() => onEventClick(ev)}
                          className={`cursor-pointer text-xs truncate rounded px-1 ${colors.bg} ${colors.text}`}
                          title={`${ev.service} — ${ev.date_debut} à ${ev.date_fin}`}
                        >
                          {ev.service}
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Sub-Component: Legend =====
function CalendarLegend() {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      {Object.entries(EVENT_TYPE_COLORS).map(([key, styles]) => (
        <div key={key} className="flex items-center gap-2">
          <span className={`w-4 h-4 rounded ${styles.bg} border ${styles.border}`}></span>
          <span className={`text-sm ${styles.text}`}>{styles.name}</span>
        </div>
      ))}
    </div>
  );
}

// ===== Sub-Component: Event Details Modal =====
function EventDetailsModal({ event, onClose }) {
  const colors = EVENT_TYPE_COLORS[event.type_periode] || EVENT_TYPE_COLORS.hebdomadaire;
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className={`text-2xl font-bold mb-4 ${colors.text}`}>{event.service}</h2>
        <p><strong>Type :</strong> {colors.name}</p>
        <p><strong>Agent :</strong> {event.agent_nom} {event.agent_prenom}</p>
        <p><strong>Période :</strong> {event.date_debut} → {event.date_fin}</p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

// ===== THE MAIN Component =====
export function PublicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [currentWeekAstreintes, setCurrentWeekAstreintes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekLoading, setWeekLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setWeekLoading(true);
      try {
        const [periodesRes, weekRes] = await Promise.all([
          getPublicPeriodes(),
          getCurrentWeekAstreintes(),
        ]);
        setEvents(periodesRes.data?.data || []);
        setCurrentWeekAstreintes(weekRes.data?.data || []);
      } catch (error) {
        console.error('Failed to load public calendar data:', error);
      } finally {
        setLoading(false);
        setWeekLoading(false);
      }
    }
    loadData();
  }, []); // only once on mount; remove currentDate as dependency unless APIs are month-scoped

  const handleEventClick = (ev) => {
    setSelectedEvent(ev);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleMonthChange = (direction) => {
    setCurrentDate((cur) => {
      const newDate = new Date(cur);
      newDate.setMonth(cur.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <div>
      <PublicHeader />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <CurrentWeekDashboard astreintes={currentWeekAstreintes} loading={weekLoading} />

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
            <h2 className="text-3xl font-bold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => handleMonthChange(1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>

          {loading ? (
            <p>Chargement du calendrier...</p>
          ) : (
            <PublicCalendarGrid
              currentDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
            />
          )}
        </div>

        <CalendarLegend />

        <div className="bg-green-50 text-center p-6 rounded-xl">
          <Info className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <p className="text-green-800 font-medium">
            Pour gérer les astreintes, veuillez vous connecter.
          </p>
        </div>
      </main>

      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default PublicCalendar;
