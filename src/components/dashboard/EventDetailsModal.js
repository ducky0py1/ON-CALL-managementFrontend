import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Users, Building2 } from 'lucide-react';
import { formatFullDateTime } from '../../utils/formatters';

// --- Unified Event Type Colors ---
const EVENT_TYPE_COLORS = {
  hebdomadaire: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', name: 'Hebdomadaire' },
  weekend: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', name: 'Weekend' },
  ferie: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', name: 'Férié' },
  nuit: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300', name: 'Nuit' },
};

export function EventDetailsModal({ event, onClose }) {
  if (!event) return null;

  const colors =
    EVENT_TYPE_COLORS[event.type_periode] ||
    EVENT_TYPE_COLORS.hebdomadaire;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100"
      >
        {/* Header */}
        <div className={`px-6 py-4 ${colors.bg} border-b-2 ${colors.border}`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-bold ${colors.text}`}>
              Détails de l’Astreinte
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-white/30 transition-colors"
            >
              <X className={`h-5 w-5 ${colors.text}`} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                Service
              </p>
              <p className="font-semibold text-gray-900">
                {event.service?.nom || 'Non spécifié'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${colors.bg} ${colors.text}`}
              >
                {colors.name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Début
              </p>
              <p className="font-medium text-gray-900">
                {formatFullDateTime(event.date_debut, event.heure_debut)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-4 w-4" /> Fin
              </p>
              <p className="font-medium text-gray-900">
                {formatFullDateTime(event.date_fin, event.heure_fin)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Users className="h-4 w-4" /> Agent(s) Assigné(s)
            </p>
            <p className="font-medium text-gray-900">
              {(event.assignedAgents || []).join(', ') ||
                `${event.agent_nom || 'Aucun'} ${event.agent_prenom || ''}`}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
