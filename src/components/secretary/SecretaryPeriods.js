// Fichier: src/components/secretary/SecretaryPeriods.js
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Search, Filter, Edit } from "lucide-react";
import {
  getPeriodes,
  createPeriode,
  updatePeriode,
  deletePeriode,
  getAgents,
  getSecretaryService,
} from "../../services/api";
import { OnCallModal } from "../dashboard/OnCallModal";
import { DeleteConfirmDialog } from "../dashboard/DeleteConfirmationDialog";
import { SkeletonDashboard } from "../styles/SkeletonLoader";

/* ==========================================================
   Configuration: Status and Priority badges
   ========================================================== */
const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-800", dot: "bg-green-500" },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800", dot: "bg-gray-500" },
  pending: { label: "En attente", color: "bg-orange-100 text-orange-800", dot: "bg-orange-500" },
  planifie: { label: "Planifié", color: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
};

const priorityConfig = {
  normal: { label: "Normale", color: "bg-blue-100 text-blue-800" },
  high: { label: "Élevée", color: "bg-orange-100 text-orange-800" },
  critical: { label: "Critique", color: "bg-red-100 text-red-800" },
};

/* ==========================================================
   Component: SecretaryPeriods
   ========================================================== */
export function SecretaryPeriods() {
  // --- State Management ---
  const [periods, setPeriods] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPeriods, setSelectedPeriods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [periodToDelete, setPeriodToDelete] = useState(null);
  const [secretaryService, setSecretaryService] = useState(null);

  // --- Fetch data from backend ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const [periodsRes, agentsRes, serviceRes] = await Promise.all([
        getPeriodes(),
        getAgents(),
        getSecretaryService(),
      ]);

      const service = serviceRes?.data?.data;
      const allPeriods = periodsRes?.data?.data || [];
      const filtered = service
        ? allPeriods.filter((p) => p.service?.id === service.id)
        : allPeriods;

      setSecretaryService(service);
      setPeriods(filtered);
      setAgents(agentsRes?.data?.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- CRUD Handlers ---
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
      console.error("Erreur lors de la sauvegarde:", error);
      alert("Erreur lors de la sauvegarde de la période.");
    }
  };

  const handleDelete = async () => {
    try {
      if (periodToDelete) await deletePeriode(periodToDelete);
      setIsDeleteModalOpen(false);
      fetchData();
    } catch {
      alert("Erreur lors de la suppression de la période.");
    }
  };

  // --- Filters & Search ---
  const filteredPeriods = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return periods.filter((p) => {
      const matchesSearch =
        p.description?.toLowerCase().includes(s) ||
        p.service?.nom?.toLowerCase().includes(s);
      const matchesStatus = statusFilter === "all" || p.statut === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [periods, searchTerm, statusFilter]);

  // --- Render ---
  if (loading) return <SkeletonDashboard />;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {secretaryService?.nom
              ? `Service : ${secretaryService.nom}`
              : "Périodes d’Astreinte"}
          </h1>
          <p className="text-lg text-gray-600">
            Gérez les périodes d'astreinte de votre service.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setEditingPeriod(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg flex items-center hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Nouvelle Période
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md border flex flex-wrap gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une période..."
            className="pl-10 p-2 h-10 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 h-10 border rounded-lg bg-white"
        >
          <option value="all">Tous les statuts</option>
          {Object.keys(statusConfig).map((key) => (
            <option key={key} value={key}>
              {statusConfig[key].label}
            </option>
          ))}
        </select>

        <button className="p-2 h-10 border rounded-lg hover:bg-gray-100">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-sm">Description</th>
                <th className="p-4 text-left font-semibold text-sm">Période</th>
                <th className="p-4 text-left font-semibold text-sm">Horaires</th>
                <th className="p-4 text-left font-semibold text-sm">Statut</th>
                <th className="p-4 text-left font-semibold text-sm">Priorité</th>
                <th className="p-4 text-right font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPeriods.length > 0 ? (
                filteredPeriods.map((p) => {
                  const status = statusConfig[p.statut] || statusConfig.inactive;
                  const priority = priorityConfig[p.priorite] || priorityConfig.normal;
                  return (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">{p.description}</td>
                      <td className="p-4 text-sm text-gray-600">
                        {p.date_debut} → {p.date_fin}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {p.heure_debut} - {p.heure_fin}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priority.color}`}>
                          {priority.label}
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingPeriod(p);
                            setIsModalOpen(true);
                          }}
                          className="p-2 hover:bg-gray-200 rounded-full"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            setPeriodToDelete(p.id);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-2 hover:bg-gray-200 rounded-full"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Aucune période trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <OnCallModal
        // isOpen={isModalOpen}
        // onClose={() => setIsModalOpen(false)}
        // period={editingPeriod}
        // onSave={handleSave}
        // agents={agents}
        // services={secretaryService ? [secretaryService] : []}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        period={editingPeriod}
        onSave={handleSave}
        agents={agents}
        services={secretaryService ? [secretaryService] : []}
        isSecretary={true}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirmer la Suppression"
        description="Êtes-vous sûr de vouloir supprimer cette période d'astreinte ?"
      />
    </div>
  );
}
