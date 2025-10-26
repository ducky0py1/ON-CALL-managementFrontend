// Fichier: src/components/secretary/UnavailabilityModal.js
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar } from 'lucide-react';

export function UnavailabilityModal({
  isOpen,
  onClose,
  unavailability,
  onSave,
  agents = [],
  isSecretary = false,
}) {
  // --- Local state ---
  const [formData, setFormData] = useState({
    agent_id: '',
    type_indisponibilite: 'conge',
    date_debut: '',
    date_fin: '',
    motif: '',
  });

  // --- Initialize form when modal opens ---
  useEffect(() => {
    if (isOpen) {
      setFormData(
        unavailability || {
          agent_id: '',
          type_indisponibilite: 'conge',
          date_debut: '',
          date_fin: '',
          motif: '',
        }
      );
    }
  }, [isOpen, unavailability]);

  // --- Handle changes dynamically ---
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- Handle form submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* --- Header --- */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            {unavailability ? "Modifier l'indisponibilité" : 'Nouvelle indisponibilité'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- Form Body --- */}
        <form
          id="unavailability-form"
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto"
        >
          {/* Section 1: Agent */}
          <div className="border p-4 rounded-lg bg-gray-50">
            <label className="font-medium block mb-1">
              {isSecretary ? 'Secrétaire *' : 'Agent *'}
            </label>
            <select
              value={formData.agent_id || ''}
              onChange={(e) => updateFormData('agent_id', e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Sélectionner...
              </option>
              {/*  FIX: Show agent’s full name */}
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.prenom} {agent.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Section 2: Type */}
          <div className="border p-4 rounded-lg bg-gray-50">
            <label htmlFor="type_indisponibilite" className="font-medium block mb-1">
              Type *
            </label>
            <select
              id="type_indisponibilite"
              value={formData.type_indisponibilite || 'conge'}
              onChange={(e) =>
                updateFormData('type_indisponibilite', e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="conge">Congé</option>
              <option value="maladie">Maladie</option>
              <option value="formation">Formation</option>
              <option value="mission">Mission</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          {/* Section 3: Dates */}
          <div className="border p-4 rounded-lg bg-gray-50 grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date_debut" className="font-medium block mb-1">
                Date de début *
              </label>
              <input
                type="date"
                id="date_debut"
                value={formData.date_debut || ''}
                onChange={(e) => updateFormData('date_debut', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="date_fin" className="font-medium block mb-1">
                Date de fin *
              </label>
              <input
                type="date"
                id="date_fin"
                value={formData.date_fin || ''}
                onChange={(e) => updateFormData('date_fin', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Section 4: Motif */}
          <div className="border p-4 rounded-lg bg-gray-50">
            <label htmlFor="motif" className="font-medium block mb-1">
              Motif *
            </label>
            <textarea
              id="motif"
              rows="3"
              value={formData.motif || ''}
              onChange={(e) => updateFormData('motif', e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Décrivez le motif..."
              required
            />
          </div>
        </form>

        {/* --- Footer --- */}
        <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            form="unavailability-form"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {unavailability ? 'Mettre à jour' : 'Enregistrer'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
