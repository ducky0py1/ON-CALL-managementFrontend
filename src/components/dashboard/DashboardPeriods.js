// Fichier: src/components/dashboard/DashboardPeriods.js
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Search, Filter, Edit } from "lucide-react";

/* ==========================================================
   Configuration objects for status and priority badges
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
   Main Component: DashboardPeriods
   Displays all periods with filtering, search, and bulk actions
   ========================================================== */
export function DashboardPeriods({
  periods = [],
  services = [],
  selectedService,
  onSelectPeriods = () => {},
  onEditPeriod = () => {},
  onDeletePeriod = () => {},
  onBulkDelete = () => {},
  onCreatePeriod = () => {},
}) {
  // --- Local UI State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [selectedPeriods, setSelectedPeriods] = useState([]);

  /* ==========================================================
     Filtering logic: combines search, status, and service filters
     ========================================================== */
  const filteredPeriods = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return periods.filter((period) => {
      const matchesSearch =
        period.description?.toLowerCase().includes(search) ||
        period.service?.nom?.toLowerCase().includes(search);
      const matchesStatus = statusFilter === "all" || period.statut === statusFilter;
      const matchesService = serviceFilter === "all" || period.service?.id === parseInt(serviceFilter);
      return matchesSearch && matchesStatus && matchesService;
    });
  }, [periods, searchTerm, statusFilter, serviceFilter]);

  /* ==========================================================
     Selection handlers (for bulk actions)
     ========================================================== */
  const handleSelectPeriod = (id) => {
    setSelectedPeriods((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredPeriods.map((p) => p.id);
      setSelectedPeriods(allIds);
      onSelectPeriods(allIds);
    } else {
      setSelectedPeriods([]);
      onSelectPeriods([]);
    }
  };

  /* ==========================================================
     Utility: format dates for display
     ========================================================== */
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  };

  /* ==========================================================
     Render
     ========================================================== */
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedService ? `Service : ${selectedService}` : "Gestion des Périodes"}
          </h1>
          <p className="text-lg text-gray-600">
            Créez, modifiez et organisez les périodes d'astreinte.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {selectedPeriods.length > 0 && (
            <button
              onClick={() => onBulkDelete(selectedPeriods)}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition"
            >
              <Trash2 className="w-4 h-4 mr-2 inline-block" />
              Supprimer ({selectedPeriods.length})
            </button>
          )}
          <button
            onClick={onCreatePeriod}
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg flex items-center hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Période
          </button>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white p-4 rounded-lg shadow-md border flex flex-wrap gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par description ou service..."
              className="pl-10 p-2 h-10 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Status Filter */}
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

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="p-2 h-10 border rounded-lg bg-white"
          >
            <option value="all">Tous les services</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nom}
              </option>
            ))}
          </select>

          {/* Filter icon (visual only) */}
          <button className="p-2 h-10 border rounded-lg hover:bg-gray-100">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white rounded-lg shadow-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Head */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 w-12">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedPeriods.length === filteredPeriods.length &&
                        filteredPeriods.length > 0
                      }
                    />
                  </th>
                  <th className="p-4 text-left font-semibold text-sm">Description</th>
                  <th className="p-4 text-left font-semibold text-sm">Service</th>
                  <th className="p-4 text-left font-semibold text-sm">Période</th>
                  <th className="p-4 text-left font-semibold text-sm">Horaires</th>
                  <th className="p-4 text-left font-semibold text-sm">Statut</th>
                  <th className="p-4 text-left font-semibold text-sm">Priorité</th>
                  <th className="p-4 text-right font-semibold text-sm">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {filteredPeriods.map((period) => {
                  const status = statusConfig[period.statut] || statusConfig.inactive;
                  const priority = priorityConfig[period.priority] || priorityConfig.normal;
                  return (
                    <tr key={period.id} className="hover:bg-gray-50 group">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedPeriods.includes(period.id)}
                          onChange={() => handleSelectPeriod(period.id)}
                        />
                      </td>
                      <td className="p-4 font-medium text-gray-900">{period.description}</td>
                      <td className="p-4 text-sm">
                        <span className="px-2 py-1 bg-gray-100 text-xs font-medium rounded-full">
                          {period.service?.nom || "Non assigné"}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {formatDate(period.date_debut)} - {formatDate(period.date_fin)}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {period.heure_debut} - {period.heure_fin}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full inline-block mr-1.5 ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${priority.color}`}
                        >
                          {priority.label}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                          <button
                            onClick={() => onEditPeriod(period)}
                            className="p-2 hover:bg-gray-200 rounded-full"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => onDeletePeriod(period.id)}
                            className="p-2 hover:bg-gray-200 rounded-full"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Empty state */}
                {filteredPeriods.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-500">
                      Aucune période trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
