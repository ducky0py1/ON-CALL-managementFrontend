// Fichier: src/components/secretary/SecretaryPeriods.js
import React, { useState, useEffect } from 'react';
import { SkeletonDashboard } from "../styles/SkeletonLoader";

import { Plus, Filter, Search, Edit, Trash2 } from 'lucide-react';
import { getPeriodes, createPeriode, updatePeriode, deletePeriode, getServices, getAgents } from '../../services/api';
import { OnCallModal } from '../dashboard/OnCallModal';
import { DeleteConfirmDialog } from '../dashboard/DeleteConfirmationDialog';
import { OnCallTable } from '../dashboard/OnCallTable';


export function SecretaryPeriods() {
  // --- State Management ---
  const [periods, setPeriods] = useState([]);
  const [services, setServices] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [periodToDelete, setPeriodToDelete] = useState(null);

  // Get secretary service (assuming first service in user's services)
  const secretaryService = services.length > 0 ? services[0].nom : 'Service Production';

  // --- Data Fetching ---
  const fetchData = async () => {
    try {
      const [periodsRes, servicesRes, agentsRes] = await Promise.all([
        getPeriodes(),
        getServices(),
        getAgents()
      ]);
      setPeriods(periodsRes.data.data || []);
      setServices(servicesRes.data.data || []);
      setAgents(agentsRes.data.data || []);
    } catch (error) {
      console.error("Failed to load periods data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Handlers for CRUD Actions ---
  const handleCreate = () => {
    setEditingPeriod(null);
    setIsModalOpen(true);
  };

  const handleEdit = (period) => {
    setEditingPeriod(period);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setPeriodToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingPeriod) {
        await updatePeriode(editingPeriod.id, formData);
      } else {
        await createPeriode(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Erreur lors de la sauvegarde de la période.");
      console.error(error.response?.data);
    }
  };

  const confirmDelete = async () => {
    if (periodToDelete) {
      try {
        await deletePeriode(periodToDelete);
        fetchData();
      } catch (error) {
        alert("Erreur : Impossible de supprimer la période.");
      }
    }
    setIsDeleteModalOpen(false);
  };

  // --- Filtering Logic ---
  const filteredPeriods = periods.filter((period) => {
    const matchesSearch = searchQuery === '' ||
      period.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      period.service?.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      period.agents?.some((agent) =>
        agent.nom?.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus = statusFilter === 'all' || period.statut === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) return <SkeletonDashboard />;


  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {secretaryService} - Périodes d'Astreinte
          </h1>
          <p className="text-lg text-gray-600">
            Gérez les périodes d'astreinte de votre service
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
              {filteredPeriods.length} période{filteredPeriods.length > 1 ? 's' : ''} dans ce service
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#0B43F5] to-[#24DC61] text-white">
              Votre Service
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0B43F5] to-[#24DC61] hover:from-[#0934d3] hover:to-[#20c957] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Période
          </button>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        <div className="bg-white rounded-lg shadow-lg border-0 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher par description, service ou agent..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[160px]"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Active</option>
                <option value="pending">En attente</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="px-4 py-2 bg-gradient-to-r from-[#0B43F5]/10 to-[#24DC61]/10 text-[#0B43F5] rounded-lg border border-[#0B43F5]/20 font-medium text-sm">
                {secretaryService}
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Table */}
      <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Période
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horaires
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priorité
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPeriods.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      Aucune période trouvée
                    </td>
                  </tr>
                ) : (
                  filteredPeriods.map((period) => (
                    <tr key={period.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{period.description}</div>
                        {period.agents && period.agents.length > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            {period.agents.map(a => a.nom).join(', ')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {period.service?.nom || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {period.date_debut} - {period.date_fin}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {period.heure_debut} - {period.heure_fin}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${period.statut === 'active'
                            ? 'bg-green-100 text-green-800'
                            : period.statut === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                          {period.statut === 'active' ? 'Active' : period.statut === 'pending' ? 'En attente' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${period.priorite === 'haute'
                            ? 'bg-red-100 text-red-800'
                            : period.priorite === 'normale'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                          {period.priorite || 'Normale'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(period)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(period.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals for Create/Edit and Delete Confirmation */}
      <OnCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        period={editingPeriod}
        onSave={handleSave}
        services={services}
        agents={agents}
      />
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmer la Suppression"
        description="Êtes-vous sûr de vouloir supprimer cette période d'astreinte ?"
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}