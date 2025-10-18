// Fichier: src/components/secretary/AgentUnavailability.js
import React, { useState, useEffect } from 'react';
import { UserX, Plus, Search } from 'lucide-react';

export function AgentUnavailability({ agents: initialAgents }) {
  // We use the 'agents' prop passed from the parent page
  const [agents, setAgents] = useState(initialAgents);
  const [unavailabilities, setUnavailabilities] = useState([]); // This will hold the unavailability data from API
  const [loading, setLoading] = useState(true);
  
  // Later, we'll fetch the real unavailabilities
  // useEffect(() => {
  //   getUnavailabilities().then(res => setUnavailabilities(res.data));
  //   setLoading(false);
  // }, []);
  
  // For now, let's finish loading
  useEffect(() => { setLoading(false) }, []);

  if (loading) return <p>Chargement des indisponibilités...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Indisponibilités Agents</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          <Plus className="w-4 h-4 mr-2 inline" />
          Ajouter une Indisponibilité
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Liste des Agents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <div key={agent.id} className="p-4 border rounded-lg hover:bg-gray-50">
              <p className="font-semibold">{agent.prenom} {agent.nom}</p>
              <p className="text-sm text-gray-500">{agent.service?.nom || 'Service non défini'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}