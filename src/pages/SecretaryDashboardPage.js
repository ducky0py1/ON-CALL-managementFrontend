// Fichier: src/pages/SecretaryDashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// --- API Services ---
import { 
  getAgents, getPeriodes, getIndisponibilites, getIndisponibilitesSecretaires,
  createPeriode, updatePeriode, deletePeriode, getServices
} from '../services/api';

// --- Components ---
import { SecretarySidebar } from '../components/secretary/SecretarySidebar';
import SecretaryOverview from '../components/secretary/SecretaryOverview';
import { AgentUnavailability } from '../components/secretary/AgentUnavailability';
import { SecretaryUnavailability } from '../components/secretary/SecretaryUnavailability';
import { SecretaryPeriods } from '../components/secretary/SecretaryPeriods';
import { DashboardPlanning } from '../components/dashboard/DashboardPlanning';
import { OnCallModal } from '../components/dashboard/OnCallModal';
import { DeleteConfirmDialog } from '../components/dashboard/DeleteConfirmationDialog';
import { EventDetailsModal } from '../components/dashboard/EventDetailsModal';
import { SkeletonDashboard } from "../components/styles/SkeletonLoader";

export function SecretaryDashboardPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // --- State Management ---
  const [currentView, setCurrentView] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [agents, setAgents] = useState([]);
  const [services, setServices] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [agentUnavailabilities, setAgentUnavailabilities] = useState([]);
  const [secretaryUnavailabilities, setSecretaryUnavailabilities] = useState([]);

  // --- Period Modals ---
  const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [periodToDelete, setPeriodToDelete] = useState(null);

  // --- Event Details Modal ---
  const [selectedEvent, setSelectedEvent] = useState(null);

  // --- Fetch Data ---
  // --- Fetch Data ---
const fetchData = async () => {
  try {
    setLoading(true);
    const [agentsRes, servicesRes, periodsRes, agentUnavailRes, secUnavailRes] = await Promise.all([
      getAgents(),
      getServices(),
      getPeriodes(),
      getIndisponibilites(),
      getIndisponibilitesSecretaires()
    ]);

    setAgents(agentsRes.data.data || []);
    setServices(servicesRes.data.data || []);
    setPeriods(periodsRes.data.data || []);
    setAgentUnavailabilities(agentUnavailRes.data.data || []);
    setSecretaryUnavailabilities(secUnavailRes.data.data || []);
  } catch (error) {
    console.error(" Failed to load data:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();

  //  Only start auto-refresh when no modal is open
  let interval = null;
  if (!isPeriodModalOpen) {
    interval = setInterval(fetchData, 9000000);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [isPeriodModalOpen]); //  Now dependent on modal state


  // --- Handlers ---
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreatePeriod = () => {
    setEditingPeriod(null);
    setIsPeriodModalOpen(true);
  };

  const handleEditPeriod = (period) => {
    setEditingPeriod(period);
    setIsPeriodModalOpen(true);
  };

  const handleDeletePeriod = (id) => {
    setPeriodToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleSavePeriod = async (formData) => {
    try {
      if (editingPeriod) {
        await updatePeriode(editingPeriod.id, formData);
      } else {
        await createPeriode(formData);
      }
      setIsPeriodModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Erreur lors de la sauvegarde de la période.");
    }
  };

  const confirmDelete = async () => {
    if (periodToDelete) {
      try {
        await deletePeriode(periodToDelete);
        fetchData();
      } catch (error) {
        alert("Erreur lors de la suppression de la période.");
      }
    }
    setIsDeleteModalOpen(false);
  };

  // --- Stats ---
  const stats = {
    totalAgents: agents.length,
    totalServices: services.length,
    totalPeriods: periods.length,
    totalUnavailabilities: agentUnavailabilities.length + secretaryUnavailabilities.length
  };

  // --- Render Content ---
  const renderContent = () => {
    switch (currentView) {
      case "planning":
        return (
          <DashboardPlanning
            periods={periods}
            onCreatePeriod={handleCreatePeriod}
            onEventClick={(event) => setSelectedEvent(event)}
          />
        );

      case "periods":
        return (
          <SecretaryPeriods
            periods={periods}
            services={services}
            agents={agents}
            onEditPeriod={handleEditPeriod}
            onDeletePeriod={handleDeletePeriod}
            onCreatePeriod={handleCreatePeriod}
          />
        );

      case "agent-unavailability":
        return <AgentUnavailability />;

      case "my-unavailability":
        return <SecretaryUnavailability />;

      case "overview":
      default:
        return (
          <SecretaryOverview
            stats={stats}
            onViewChange={setCurrentView}
            secretaryService={user?.services?.[0]?.nom}
            secretaryServiceId ={user?.services?.[0]?.id}

          />
        );
    }
  };

  // --- UI ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Mobile Header --- */}
      <div className="lg:hidden p-4 border-b bg-white fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">Espace Secrétaire</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* --- Sidebar --- */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SecretarySidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          onLogout={handleLogout}
          stats={stats}
        />
      </div>

      {/* --- Main Content --- */}
      <main className="transition-all duration-300 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? <SkeletonDashboard /> : renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* --- Modals --- */}
      <OnCallModal
        isOpen={isPeriodModalOpen}
        onClose={() => setIsPeriodModalOpen(false)}
        period={editingPeriod}
        onSave={handleSavePeriod}
        services={services}
        agents={agents}
        isSecretary={true}
         secretaryServiceId={user?.service_id}
        //  secretaryServiceId={user.service_id}
        // secretaryServiceId={user?.services?.[0]?.id}

      />

      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer la Période"
        description="Êtes-vous sûr de vouloir supprimer cette période ?"
      />

      {/* Event Details Modal (like public calendar) */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
