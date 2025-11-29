// Fichier : src/components/dashboard/OnCallModal.js
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function OnCallModal({
  isOpen,
  onClose,
  period,
  onSave,
  agents = [],
  services = [],
  isSecretary = false,
  secretaryServiceId = null,
}) {
  // --- Form state: contains all fields used for creation/edit ---
  const [formData, setFormData] = useState({
    description: "",
    date_debut: "",
    date_fin: "",
    heure_debut: "08:00",
    heure_fin: "17:00",
    agent_id: "",
    service_id: "",
    statut: "planifie",
    priorite: "normal",
  });

  // --- Error and agent selection states (for extensibility) ---
  const [errors, setErrors] = useState({});
  const [selectedAgents, setSelectedAgents] = useState([]); // in case of multi-agent logic later

  // --- Initialize or reset form when modal opens ---
  useEffect(() => {
    if (isOpen) {
      if (period) {
        // Editing an existing period
        setFormData({
          description: period.description || "",
          date_debut: period.date_debut || "",
          date_fin: period.date_fin || "",
          heure_debut: period.heure_debut || "08:00",
          heure_fin: period.heure_fin || "17:00",
          agent_id: period.agent?.id || "",
          service_id:
            period.service?.id ||
            (isSecretary ? secretaryServiceId : ""),
          statut: period.statut || "planifie",
          priorite: period.priorite || "normal",
        });
        setSelectedAgents(period.assignedAgents?.map((a) => a.id) || []);
      } else {
        // Creating a new period
        setFormData({
          description: "",
          date_debut: "",
          date_fin: "",
          heure_debut: "08:00",
          heure_fin: "17:00",
          agent_id: "",
          service_id:
            isSecretary && secretaryServiceId ? secretaryServiceId : "",
          statut: "planifie",
          priorite: "normal",
        });
        setSelectedAgents([]);
      }
      setErrors({});
    }
  }, [period, isOpen, isSecretary, secretaryServiceId]);

  // --- Filter agents dynamically based on selected service ---
  const agentsForSelectedService = useMemo(() => {
    if (!formData.service_id || !agents) return [];
    // Keep only agents whose service matches the selected one
    return agents.filter(
      (agent) =>
        agent.service?.id === parseInt(formData.service_id) ||
        agent.services?.some((s) => s.id === parseInt(formData.service_id))
    );
  }, [formData.service_id, agents]);

  // --- Handle form field changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Handle form submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add selected agents if needed and send to parent (DashboardPage)
    onSave({ ...formData, assigned_agents: selectedAgents });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal content */}
        <motion.div
          className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Close button (top right) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {period ? "Modifier la Période" : "Nouvelle Période"}
          </h2>

          {/* --- FORM SECTION --- */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Ex: Astreinte semaine 45"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Début
                </label>
                <input
                  type="date"
                  name="date_debut"
                  value={formData.date_debut}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Fin
                </label>
                <input
                  type="date"
                  name="date_fin"
                  value={formData.date_fin}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure Début
                </label>
                <input
                  type="time"
                  name="heure_debut"
                  value={formData.heure_debut}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure Fin
                </label>
                <input
                  type="time"
                  name="heure_fin"
                  value={formData.heure_fin}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Agent */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agent Assigné
              </label>
              <select
                name="agent_id"
                value={formData.agent_id}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Sélectionner un agent --</option>
                {agentsForSelectedService.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nom} {a.prenom}
                  </option>
                ))}
              </select>
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
                disabled={isSecretary}
                required
                className={`w-full border rounded-lg p-2 ${
                  isSecretary
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "focus:ring-2 focus:ring-blue-400"
                }`}
              >
                <option value="">-- Sélectionner un service --</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Statut & Priorité */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="planifie">Planifié</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priorité
                </label>
                <select
                  name="priorite"
                  value={formData.priorite}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="normal">Normale</option>
                  <option value="high">Élevée</option>
                  <option value="critical">Critique</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
