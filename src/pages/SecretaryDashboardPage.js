// Fichier: src/pages/SecretaryDashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
// Import all the necessary components we will be creating
import { SecretarySidebar } from '../components/secretary/SecretarySidebar';
import { SecretaryOverview } from '../components/secretary/SecretaryOverview';
import { AgentUnavailability } from '../components/secretary/AgentUnavailability';
// Import the API functions
import { getAgents, getPeriodes } from '../services/api';

// This is the main "smart" component for the Secretary Dashboard
export function SecretaryDashboardPage() {
  const navigate = useNavigate();

  // --- State Management ---
  const [currentView, setCurrentView] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For mobile responsiveness
  
  // State to hold data from the API
  const [agents, setAgents] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Data Fetching ---
  useEffect(() => {
    // Fetch all necessary data when the component loads
    async function loadData() {
      try {
        setLoading(true);
        // A secrétaire only sees agents and periods for their service,
        // so our backend Policies will handle the filtering automatically.
        const [agentsRes, periodsRes] = await Promise.all([getAgents(), getPeriodes()]);
        setAgents(agentsRes.data.data || []);
        setPeriods(periodsRes.data.data || []);
      } catch (error) {
        console.error("Failed to load secretary dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // --- Handlers ---
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // --- Derived Data (Stats) ---
  const stats = {
    total: periods.length,
    active: periods.filter(p => p.status === 'active').length,
    agents: agents.length,
    // Add other stats as needed
  };

  // This is the "internal router" that decides which view to show
  const renderContent = () => {
    switch (currentView) {
      case "agents":
        return <AgentUnavailability agents={agents} />;
      // Add cases for 'planning', 'periods', 'secretaries' later
      case "overview":
      default:
        return <SecretaryOverview stats={stats} onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header (only visible on small screens) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Espace Secrétaire</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && ( // Conditionally render the sidebar for mobile
          <SecretarySidebar
            currentView={currentView}
            onViewChange={setCurrentView}
            onLogout={handleLogout}
            stats={stats}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} pt-20 lg:pt-0`}>
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? <p>Chargement des données...</p> : renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default SecretaryDashboardPage;