// Fichier: src/pages/SecretaryDashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import {
  getAgents,
  getPeriodes,
  getIndisponibilites,
  createIndisponibilite,
  updateIndisponibilite
} from '../services/api';


import { SecretarySidebar } from '../components/secretary/SecretarySidebar';

import { DashboardPlanning } from '../components/dashboard/DashboardPlanning';
import { SecretaryPeriods } from '../components/secretary/SecretaryPeriods';
import SecretaryOverview from '../components/secretary/SecretaryOverview';
import { AgentUnavailability } from '../components/secretary/AgentUnavailability';
import { SecretaryUnavailability } from '../components/secretary/SecretaryUnavailability';
import { UnavailabilityModal } from '../components/secretary/UnavailabilityModal';
import { ReplacementModal } from '../components/secretary/ReplacementModal';


export function SecretaryDashboardPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [currentView, setCurrentView] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isUnavailabilityModalOpen, setIsUnavailabilityModalOpen] = useState(false);
  const [isReplacementModalOpen, setIsReplacementModalOpen] = useState(false);
  const [selectedUnavailability, setSelectedUnavailability] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingPeriod, setEditingPeriod] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // const handleCreatePeriod = () => {
  //   setEditingPeriod(null);
  //   setIsModalOpen(true);
  // };

  //  Real-time updates every 30 seconds
  const fetchData = async () => {
    try {
      const [agentsRes, periodsRes, unavailRes] = await Promise.all([
        getAgents(),
        getPeriodes(),
        getIndisponibilites()
      ]);

      setAgents(agentsRes.data.data || []);
      setPeriods(periodsRes.data.data || []);
      setUnavailabilities(unavailRes.data.data || []);
    } catch (error) {
      console.error(" Failed to load secretary dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleCreateNew = () => {
    setSelectedUnavailability(null);
    setIsUnavailabilityModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedUnavailability(item);
    setIsUnavailabilityModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedUnavailability) {
        await updateIndisponibilite(selectedUnavailability.id, formData);
      } else {
        await createIndisponibilite(formData);
      }
      setIsUnavailabilityModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Erreur lors de la sauvegarde de l'indisponibilité.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateIndisponibilite(id, { statut: newStatus });
      fetchData();
    } catch (error) {
      alert("Erreur lors du changement de statut.");
    }
  };

  const handleAssignReplacement = (item) => {
    setSelectedUnavailability(item);
    setIsReplacementModalOpen(true);
  };

  const handleReplacementAssigned = async (unavailabilityId, replacementId, replacementName) => {
    try {
      await updateIndisponibilite(unavailabilityId, {
        replacement_id: replacementId,
        replacementName: replacementName
      });
      fetchData();
    } catch (error) {
      alert("Erreur lors de l'assignation du remplaçant.");
    }
    setIsReplacementModalOpen(false);
  };

  //  Stats
  const stats = {
    activePeriods: periods.filter(p => p.status === 'active').length,
    pendingRequests: unavailabilities.filter(u => u.statut === 'pending').length,
    agentsUnavailable: unavailabilities.filter(u => u.statut !== 'approved' && new Date(u.date_fin) >= new Date()).length,
    secretariesUnavailable: 0,
    unreadNotifications: 0,
    agents: agents.length,
  };

  // Internal navigation
  const renderContent = () => {
    switch (currentView) {
      case "agent-unavailability":
      case "agents":
        return (
          <AgentUnavailability
            unavailabilities={unavailabilities}
            agents={agents}
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
            onAssignReplacement={handleAssignReplacement}
            onCreateNew={handleCreateNew}
          />
        );

      case "my-unavailability":
      // case "secretaries":
        return <SecretaryUnavailability />;

      case "planning":
        return (
          <DashboardPlanning
            periods={periods}
            stats={stats}
            onCreatePeriod={handleCreatePeriod}
          />
        );

      case "periods":
        // return <PeriodsPlaceholder />;
        return <SecretaryPeriods />;

      case "overview":
      default:
        return (
          <SecretaryOverview
            stats={stats}
            onNavigate={setCurrentView}
            secretaryService={user?.services?.[0]?.nom}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/*  Mobile Header */}
      <div className="lg:hidden p-4 border-b bg-white fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">Espace Secrétaire</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
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

      {/* Main Content */}
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
              {loading ? <p>Chargement des données...</p> : renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <UnavailabilityModal
        isOpen={isUnavailabilityModalOpen}
        onClose={() => setIsUnavailabilityModalOpen(false)}
        unavailability={selectedUnavailability}
        onSave={handleSave}
        agents={agents}
      />

      {selectedUnavailability && (
        <ReplacementModal
          isOpen={isReplacementModalOpen}
          onClose={() => setIsReplacementModalOpen(false)}
          unavailability={selectedUnavailability}
          availableReplacements={agents.filter(a => a.id !== selectedUnavailability.agent_id)}
          onAssignReplacement={handleReplacementAssigned}
        />
      )}
    </div>
  );
}
