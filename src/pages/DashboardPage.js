// Fichier: src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPeriodes, createPeriode, updatePeriode, deletePeriode, getServices, getAgents }  from '../services/api';
// Import all the components that make up the dashboard
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardMainContent } from '../components/dashboard/DashboardMainContent';
import { OnCallModal } from '../components/dashboard/OnCallModal';
import { DeleteConfirmDialog } from '../components/dashboard/DeleteConfirmationDialog';

export function DashboardPage() {
  const navigate = useNavigate();
  // --- State Management ---
  // On initialise les états avec des tableaux VIDES. Ils seront remplis par l'API.
   const [periods, setPeriods] = useState([]);
  const [agents, setAgents] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState("overview");
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [periodToDelete, setPeriodToDelete] = useState(null);
  
 // --- 2. DATA FETCHING avec useEffect ---
  // Cette fonction s'exécute une seule fois, après le premier rendu du composant.
   const fetchData = async () => {
    try {
      const [periodesRes, agentsRes, servicesRes] = await Promise.all([
        getPeriodes(), getAgents(), getServices()
      ]);
      setPeriods(periodesRes.data.data || []);
      setAgents(agentsRes.data.data || []);
      setServices(servicesRes.data.data || []);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setError("Impossible de charger les données. L'API est peut-être inaccessible.");
      if (err.response && err.response.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); //runs only once on initial mount
  // --- Handlers (Fully functional and connected) ---
  const handleLogout = () => { localStorage.clear(); navigate('/'); };
  const handleCreatePeriod = () => { setEditingPeriod(null); setIsModalOpen(true); };
  const handleEditPeriod = (period) => { setEditingPeriod(period); setIsModalOpen(true); };
  const handleDeletePeriod = (periodId) => { setPeriodToDelete(periodId); setIsDeleteModalOpen(true); };

  const handleSavePeriod = async (formData) => {
    try {
      if (editingPeriod) {
        await updatePeriode(editingPeriod.id, formData);
      } else {
        await createPeriode(formData);
      }
      setIsModalOpen(false);
      fetchData(); // Refresh all data from the server!
    } catch (err) {
      console.error(err);
      //get the specific validation errors from the response
      console.error("Erreur lors de la sauvegarde:", err);
      const errorMsg = err.response?.data?.errors 
        ? Object.values(err.response.data.errors).flat().join('\n')
        : "Une erreur est survenue lors de la sauvegarde.";
      alert("Erreur de validation:\n" + errorMsg);
    }
  };

  const confirmDelete = async () => {
    if (periodToDelete) {
      try {
        await deletePeriode(periodToDelete);
        fetchData(); // Refresh all data from the server!
      } catch (err) {
        alert("Erreur : Impossible de supprimer la période.");
        console.error(err);
      }
    }
    setIsDeleteModalOpen(false);
    setPeriodToDelete(null);
  };
  
  // --- Derived Data ---
  const stats = {
    total: periods.length,
    active: periods.filter(p => p.status === 'active').length,
    services: new Set(periods.map(p => p.service)).size,
    thisMonth: periods.filter(p => new Date(p.startDate).getMonth() === new Date().getMonth()).length,
    critical: periods.filter(p => p.priority === 'critical').length,
    agents: new Set(periods.flatMap(p => p.assignedAgents)).size
  };
   // On regroupe les périodes par service pour la sidebar
  const periodsByService = periods.reduce((acc, period) => {
    const serviceName = period.service || 'Non assigné';
    if (!acc[serviceName]) acc[serviceName] = [];
      acc[serviceName].push(period);
    return acc;
  }, {});

  const displayedPeriods = selectedService ? periodsByService[selectedService] || [] : periods;

  if (loading) return <div className="flex h-screen items-center justify-center">Chargement des données...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/20">
      <div className="flex">
        <DashboardSidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          onLogout={handleLogout}
          stats={stats}
          selectedService={selectedService}
          onServiceChange={setSelectedService}
          periodsByService={periodsByService}
        />
        <main className="flex-1 ml-64">
          <DashboardMainContent
            currentView={currentView}
            periods={displayedPeriods}
            agents={agents}
            services={services}
            stats={stats}
            onCreatePeriod={handleCreatePeriod}
            onEditPeriod={handleEditPeriod}
            onDeletePeriod={handleDeletePeriod}
            periodsByService={periodsByService}
            selectedService={selectedService}
          />
        </main>
      </div>

      {/* Modals */}
      <OnCallModal
       isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        period={editingPeriod}
        onSave={handleSavePeriod}
        services={services}
        agents={agents}
      />
      <DeleteConfirmDialog
       isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer la période"
        description="Cette action est irréversible."
      />
    </div>
  );
}

export default DashboardPage;