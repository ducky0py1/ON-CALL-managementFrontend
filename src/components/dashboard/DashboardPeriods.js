// Fichier: src/components/dashboard/DashboardPeriods.js
import React from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Search, Filter } from 'lucide-react';
import { OnCallTable } from './OnCallTable'; // We reuse the table component

export function DashboardPeriods({
  periods,
  selectedPeriods,
  selectedService,
  onSelectPeriods,
  onEditPeriod,
  onDeletePeriod,
  onBulkDelete,
  onCreatePeriod
}) {

  return (
    <div className="space-y-6">
      {/* Header for this specific view */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedService ? `Service: ${selectedService}` : "Gestion des Périodes"}
          </h1>
          <p className="text-lg text-gray-600">
            Créez, modifiez et organisez les périodes d'astreinte.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Bulk delete button, appears only when items are selected */}
          {selectedPeriods && selectedPeriods.length > 0 && (
            <button
              onClick={onBulkDelete}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-lg"
            >
              <Trash2 className="w-4 h-4 mr-2 inline-block" />
              Supprimer ({selectedPeriods.length})
            </button>
          )}
          <button
            onClick={onCreatePeriod}
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2 inline-block" />
            Nouvelle Période
          </button>
        </div>
      </motion.div>

      {/* Filters Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-lg border"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              placeholder="Rechercher par description, service ou agent..."
              className="pl-10 p-2 h-10 w-full border rounded-lg"
            />
          </div>
          {/* Other filter selects would go here */}
        </div>
      </motion.div>

      {/* The main On-Call Table component */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <OnCallTable
          periods={periods}
          selectedPeriods={selectedPeriods}
          onSelectPeriods={onSelectPeriods}
          onEditPeriod={onEditPeriod}
          onDeletePeriod={onDeletePeriod}
          onBulkDelete={onBulkDelete}
        />
      </motion.div>
    </div>
  );
}