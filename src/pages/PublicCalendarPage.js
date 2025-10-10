// src/pages/PublicCalendarPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PublicCalendar from '../components/public-calendar/PublicCalendar';

export default function PublicCalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back to Home */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Retour à l'accueil</span>
            </Link>

            {/* Center: OCP Branding */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">OCP</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Calendrier Public</span>
            </div>

            {/* Right: Login Button */}
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all transform hover:scale-105"
            >
              Accéder au Système
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Calendar Content */}
      <PublicCalendar />
    </div>
  );
}