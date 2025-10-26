// Fichier: src/components/secretary/ReplacementModal.js
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Search, CheckCircle, User } from 'lucide-react';

export function ReplacementModal({
  isOpen,
  onClose,
  unavailability,
  availableReplacements,
  onAssignReplacement
}) {
  // State to track the user's search query and their selection
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReplacementId, setSelectedReplacementId] = useState("");

  // Filter the list of available agents based on the search input
  const filteredReplacements = availableReplacements.filter(agent =>
    (agent.nom + ' ' + agent.prenom).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // This function is called when the "Assigner" button is clicked
  const handleAssign = () => {
    if (selectedReplacementId) {
      const replacement = availableReplacements.find(a => a.id === selectedReplacementId);
      if (replacement) {
        // We call the function passed down from the parent page
        onAssignReplacement(unavailability.id, replacement.id, `${replacement.prenom} ${replacement.nom}`);
        onClose(); // Close the modal after assigning
      }
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Users className="w-5 h-5 text-blue-600" />Assigner un Remplaçant</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">&times;</button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Information about the agent who needs a replacement */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-medium">Remplacement pour: <span className="font-bold">{unavailability.agent.nom} {unavailability.agent.prenom}</span></p>
            <p className="text-sm text-gray-600">Période: {unavailability.date_debut} au {unavailability.date_fin}</p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un remplaçant par nom..."
              className="pl-10 p-2 w-full border rounded-lg"
            />
          </div>

          {/* List of available agents to choose from */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {filteredReplacements.length > 0 ? (
              filteredReplacements.map(agent => (
                <motion.div
                  key={agent.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedReplacementId(agent.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${
                    selectedReplacementId === agent.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{agent.nom} {agent.prenom}</h4>
                      <p className="text-sm text-gray-500">{agent.service?.nom || 'Service non défini'}</p>
                    </div>
                  </div>
                  {selectedReplacementId === agent.id && <CheckCircle className="w-5 h-5 text-blue-600" />}
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">Aucun agent disponible trouvé.</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Annuler</button>
          <button onClick={handleAssign} disabled={!selectedReplacementId} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">
            Assigner le Remplaçant
          </button>
        </div>
      </motion.div>
    </div>
  );
}