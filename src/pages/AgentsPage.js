// Fichier: src/pages/AgentsPage.js
import React, { useState, useEffect } from 'react';
import { getAgents } from '../services/api'; // On importe la fonction pour récupérer les agents

function AgentsPage() {
  // États pour stocker la liste des agents, le chargement et les erreurs
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect se déclenche au chargement de la page pour aller chercher les données
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAgents();
        console.log("Agents reçus:", response.data.data);
        setAgents(response.data.data); // On met à jour l'état avec la liste des agents
      } catch (err) {
        setError('Impossible de charger les agents.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement des agents...</p>
          <p className="text-sm text-gray-500 mt-1">Office Chérifien des Phosphates</p>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
          <p className="text-red-700 font-medium">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Affichage du tableau de données
  return (
    <div className="space-y-6">
      {/* Header de la page */}
      <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
        {/* Motifs décoratifs OCP */}
        <div className="absolute top-4 right-4 w-16 h-16 border-2 border-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-green-200 transform rotate-45 opacity-20"></div>
        
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-4"></div>
              Gestion des Agents
            </h1>
            <p className="text-gray-600">
              Personnel OCP - Office Chérifien des Phosphates
            </p>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200 shadow-lg flex items-center">
            <div className="w-5 h-5 border-2 border-white rounded mr-2 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            Ajouter un Agent
          </button>
        </div>
      </div>
      
      {/* Tableau des agents avec style OCP */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <h2 className="text-white font-semibold text-lg">Liste des Agents</h2>
          <p className="text-green-100 text-sm">Personnel et collaborateurs OCP</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Matricule</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Nom Complet</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Téléphone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agents.length > 0 ? (
                agents.map((agent, index) => (
                  <tr key={agent.id} className={`hover:bg-green-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-gray-100 text-gray-800 text-sm font-mono px-3 py-1 rounded-full border">
                        {agent.matricule}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-green-600 font-semibold text-sm">
                            {agent.prenom.charAt(0)}{agent.nom.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {`${agent.prenom} ${agent.nom}`}
                          </div>
                          <div className="text-xs text-gray-500">Agent OCP</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {agent.service ? (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm text-gray-900">{agent.service.nom}</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          <span className="text-gray-400 text-sm">Non assigné</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">
                        {agent.telephone_principal}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline transition-colors duration-150">
                          Modifier
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline transition-colors duration-150">
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun agent trouvé</h3>
                    <p className="text-gray-500">La liste des agents est vide.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AgentsPage;