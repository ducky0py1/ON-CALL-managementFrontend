// Fichier: src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import all the child components that make up the dashboard
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardMainContent } from '../components/dashboard/DashboardMainContent';
import { OnCallModal } from '../components/dashboard/OnCallModal';
import { DeleteConfirmDialog } from '../components/dashboard/DeleteConfirmationDialog';

// Mock data organized by service, as you provided.
// This data will be used to power the entire dashboard.
const mockDataByService = {
  "Service Production": [
    { id: "prod-1", description: "Astreinte Production - Semaine 43", service: "Service Production", startDate: "2024-10-21", endDate: "2024-10-25", startTime: "06:00", endTime: "18:00", status: "active", priority: "critical", assignedAgents: ["Youssef Mahi", "Aicha Rahimi"], type: "maintenance" },
    { id: "prod-2", description: "Maintenance Préventive", service: "Service Production", startDate: "2024-10-28", endDate: "2024-11-01", startTime: "08:00", endTime: "17:00", status: "pending", priority: "normal", assignedAgents: ["Mohamed Alami"], type: "maintenance" }
  ],
  "Service Électrique": [
    { id: "elec-1", description: "Urgence Électrique", service: "Service Électrique", startDate: "2024-10-22", endDate: "2024-10-28", startTime: "00:00", endTime: "23:59", status: "active", priority: "critical", assignedAgents: ["Khalid Ouali"], type: "emergency" }
  ],
};
const mockData = Object.values(mockDataByService).flat();

// This is the main "smart" component for the entire authenticated application.
export function DashboardPage() {
  const navigate = useNavigate();

  // --- State Management ---
  const [periods, setPeriods] = useState(mockData);
  const [currentView, setCurrentView] = useState("overview"); // Default view is 'overview'
  const [selectedService, setSelectedService] = useState(null);
  
  // State for the Create/Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  
  // State for the Delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [periodToDelete, setPeriodToDelete] = useState(null);

  // --- Data Fetching (to be connected to the API later) ---
  // useEffect(() => {
  //   getPeriodes().then(response => setPeriods(response.data));
  // }, []);

  // --- Handlers (The functions that control the application) ---
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  
  const handleCreatePeriod = () => {
    setEditingPeriod(null);
    setIsModalOpen(true);
  };

  const handleEditPeriod = (period) => {
    setEditingPeriod(period);
    setIsModalOpen(true);
  };
  
  const handleDeletePeriod = (periodId) => {
    setPeriodToDelete(periodId);
    setIsDeleteModalOpen(true);
  };

  const handleSavePeriod = (formData) => {
    if (editingPeriod) { // Editing existing period
      setPeriods(periods.map(p => p.id === editingPeriod.id ? { ...p, ...formData } : p));
      // You would call updatePeriode(editingPeriod.id, formData) here
    } else { // Creating new period
      const newPeriod = { id: Date.now().toString(), status: 'pending', ...formData };
      setPeriods([newPeriod, ...periods]);
      // You would call createPeriode(formData) here
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    setPeriods(periods.filter(p => p.id !== periodToDelete));
    // You would call deletePeriode(periodToDelete) here
    setIsDeleteModalOpen(false);
    setPeriodToDelete(null);
  };
  
  // --- Derived Data (Calculations based on state) ---
  const stats = {
    total: periods.length,
    active: periods.filter(p => p.status === 'active').length,
    services: new Set(periods.map(p => p.service)).size,
    thisMonth: periods.filter(p => new Date(p.startDate).getMonth() === new Date().getMonth()).length,
    critical: periods.filter(p => p.priority === 'critical').length,
    agents: new Set(periods.flatMap(p => p.assignedAgents)).size
  };
  
  // Filter periods based on the selected service in the sidebar
  const displayedPeriods = selectedService ? mockDataByService[selectedService] || [] : periods;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/20">
      <div className="flex">
        
        {/* The Sidebar receives the current state and the functions to change it */}
        <DashboardSidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          onLogout={handleLogout}
          stats={stats}
          selectedService={selectedService}
          onServiceChange={setSelectedService}
          periodsByService={mockDataByService}
        />

        {/* The Main Content area receives the data and functions it needs to display the current view */}
        <div className="flex-1 ml-64">
          <DashboardMainContent
            currentView={currentView}
            periods={displayedPeriods} // Pass the correctly filtered periods
            stats={stats}
            onCreatePeriod={handleCreatePeriod}
            onEditPeriod={handleEditPeriod}
            onDeletePeriod={handleDeletePeriod}
            // Pass other props for other views
            periodsByService={mockDataByService}
            selectedService={selectedService}
          />
        </div>
      </div>

      {/* Modals are rendered here at the top level so they can appear over everything */}
      <OnCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        period={editingPeriod}
        onSave={handleSavePeriod}
      />
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer la période d'astreinte"
        description="Cette action est irréversible et supprimera définitivement la période."
      />
    </div>
  );
}

export default DashboardPage;