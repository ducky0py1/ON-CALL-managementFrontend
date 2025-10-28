import React from 'react';
import { motion } from 'framer-motion';

// --- Color Mapping for Period Types (Matching DashboardPlanning) ---
const EVENT_TYPE_COLORS = {
  hebdomadaire: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  weekend: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  ferie: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  nuit: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' },
};

export function PlanningCalendar({ currentDate, periods, onEventClick }) {
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startIndex = (firstDay.getDay() + 6) % 7; // Start on Monday

  const days = Array.from({ length: startIndex + daysInMonth }, (_, i) => {
    if (i < startIndex) return null;
    return new Date(year, month, i - startIndex + 1);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2 text-gray-700 text-sm">
        {weekDays.map((wd) => (
          <div key={wd} className="py-2 uppercase tracking-wide">
            {wd}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          const isToday = day && day.getTime() === today.getTime();

          const dayEvents = day
            ? periods.filter((ev) => {
                const start = new Date(ev.date_debut);
                const end = new Date(ev.date_fin);
                start.setHours(0, 0, 0, 0);
                end.setHours(0, 0, 0, 0);
                return day >= start && day <= end;
              })
            : [];

          return (
            <div
              key={idx}
              className={`h-24 rounded-lg border relative transition-all duration-200 p-2 text-xs ${
                isToday
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-green-50'
                  : day
                  ? 'border-gray-200 bg-white hover:shadow-md hover:bg-gray-50'
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              {day && (
                <>
                  {/* Day Number */}
                  <div
                    className={`text-right font-semibold mb-1 ${
                      isToday ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {day.getDate()}
                  </div>

                  {/* Events */}
                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev, j) => {
                      const colors =
                        EVENT_TYPE_COLORS[ev.type_periode] ||
                        EVENT_TYPE_COLORS.hebdomadaire;
                      return (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: j * 0.05 }}
                          onClick={() => onEventClick(ev)}
                          className={`cursor-pointer truncate rounded-md px-1.5 py-0.5 border ${colors.bg} ${colors.text} ${colors.border} text-xs font-medium hover:opacity-90`}
                          title={ev.service?.nom || 'Astreinte'}
                        >
                          {ev.service?.nom || 'Astreinte'}
                        </motion.div>
                      );
                    })}

                    {dayEvents.length > 2 && (
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        +{dayEvents.length - 2} autres
                      </p>
                    )}
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

export default PlanningCalendar;
