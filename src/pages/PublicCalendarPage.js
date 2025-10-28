// Fichier: src/pages/PublicCalendarPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogIn } from 'lucide-react';
import PublicCalendar from '../components/public-calendar/PublicCalendar';
import ocpLogo from '../components/images/green.png';

export default function PublicCalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Back to Home */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <div className="p-1.5 rounded-lg group-hover:bg-gray-100 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm">Retour</span>
            </Link>

            {/* Center: Logo */}
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-[#0B43F5] to-[#24DC61] rounded-lg flex items-center justify-center shadow-md">
                {/* <span className="text-white font-bold text-sm">OCP</span> */}
                  <span className="logo-circle"><img src={ocpLogo} alt="OCP Logo" className="logo-image" /></span>

              </div>
              <span className="text-lg font-bold text-gray-800">Calendrier Public</span>
            </div>

            {/* Right: Login Button */}
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0B43F5] to-[#24DC61] hover:from-[#0934d3] hover:to-[#20c957] text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all hover:shadow-lg text-sm"
            >
              <LogIn className="h-4 w-4" />
              <span>Connexion</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Calendar Content */}
      <PublicCalendar />
    </div>
  );
}