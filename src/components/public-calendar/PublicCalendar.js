// Fichier: src/components/public-calendar/PublicCalendar.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
// Import the API functions
import { getPublicPeriodes, getCurrentWeekAstreintes } from '../../services/api';
// Import the child components we will create
import { PublicHeader } from './PublicHeader';
import { CurrentWeekDashboard } from './CurrentWeekDashboard';
import { PublicCalendarGrid } from './PublicCalendarGrid';
import { CalendarLegend } from './CalendarLegend';
import { EventDetailsModal } from './EventDetailsModal';

export function PublicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [currentWeekAstreintes, setCurrentWeekAstreintes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekLoading, setWeekLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // useEffect to load all data when the component mounts or date changes
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setWeekLoading(true);
      try {
        const [periodesRes, weekRes] = await Promise.all([
          getPublicPeriodes(),
          getCurrentWeekAstreintes()
        ]);
        setEvents(periodesRes.data.data || []);
        setCurrentWeekAstreintes(weekRes.data.data || []);
      } catch (error) {
        console.error('Failed to load public calendar data:', error);
        setEvents([]);
        setCurrentWeekAstreintes([]);
      } finally {
        setLoading(false);
        setWeekLoading(false);
      }
    }
    loadData();
  }, [currentDate]);

  const handleEventClick = (event) => setSelectedEvent(event);
  const handleCloseModal = () => setSelectedEvent(null);
  
  const handleMonthChange = (direction) => {
    setCurrentDate(current => {
      const newDate = new Date(current);
      newDate.setMonth(current.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  return (
    <div>
      <PublicHeader />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <CurrentWeekDashboard astreintes={currentWeekAstreintes} loading={weekLoading} />
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => handleMonthChange(-1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft /></button>
            <h2 className="text-3xl font-bold text-gray-800">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <button onClick={() => handleMonthChange(1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight /></button>
          </div>
          {loading ? (
            <p>Chargement du calendrier...</p>
          ) : (
            <PublicCalendarGrid currentDate={currentDate} events={events} onEventClick={handleEventClick} />
          )}
        </div>
        <CalendarLegend />
        <div className="bg-green-50 text-center p-6 rounded-xl">
          <Info className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <p className="text-green-800 font-medium">Pour gérer les astreintes, veuillez vous connecter.</p>
        </div>
      </main>
      {selectedEvent && <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />}
    </div>
  );
}

export default PublicCalendar;