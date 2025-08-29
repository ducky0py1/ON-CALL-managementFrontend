import React, { useState, useEffect } from 'react';
import { getAgents, getServices, createAgent, updateAgent, deleteAgent } from '../services/api';
import Modal from '../components/Modal';

function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAgent, setCurrentAgent] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    service_id: '',
    telephone_principal: '',
    poste: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [agentsRes, servicesRes] = await Promise.all([getAgents(), getServices()]);
      setAgents(agentsRes.data.data);
      setServices(servicesRes.data.data);
      setError('');
    } catch (err) {
      setError('Impossible de charger les données.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setCurrentAgent({ nom: '', prenom: '', matricule: '', service_id: '', telephone_principal: '', poste: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (agent) => {
    setIsEditing(true);
    setCurrentAgent(agent);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!currentAgent.service_id) {
        alert('Veuillez sélectionner un service.');
        return;
    }
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateAgent(currentAgent.id, currentAgent);
      } else {
        await createAgent(currentAgent);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(`Erreur : Impossible de ${isEditing ? 'modifier' : 'créer'} l'agent.`);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteAgent = async (agentId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet agent ?")) {
      try {
        await deleteAgent(agentId);
        fetchData();
      } catch (err) {
        alert("Erreur : Impossible de supprimer l'agent.");
        console.error(err);
      }
    }
  };
  
  if (loading) {
    return <p>Chargement des données...</p>;
  }
  
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Agents</h1>
        <button onClick={handleOpenCreateModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          + Ajouter un Agent
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Matricule</th>
              <th className="px-4 py-2 text-left">Nom Complet</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Téléphone</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.length > 0 ? (
              agents.map((agent) => (
                <tr key={agent.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{agent.matricule}</td>
                  <td className="px-4 py-2">{`${agent.prenom} ${agent.nom}`}</td>
                  <td className="px-4 py-2">{agent.service ? agent.service.nom : 'N/A'}</td>
                  <td className="px-4 py-2">{agent.telephone_principal}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleOpenEditModal(agent)} className="text-blue-500 hover:underline mr-4">Modifier</button>
                    <button onClick={() => handleDeleteAgent(agent.id)} className="text-red-500 hover:underline">Supprimer</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">Aucun agent trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditing ? 'Modifier l\'Agent' : 'Ajouter un Agent'}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              value={currentAgent.prenom}
              onChange={(e) => setCurrentAgent({ ...currentAgent, prenom: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              value={currentAgent.nom}
              onChange={(e) => setCurrentAgent({ ...currentAgent, nom: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Matricule</label>
            <input
              type="text"
              value={currentAgent.matricule}
              onChange={(e) => setCurrentAgent({ ...currentAgent, matricule: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Téléphone Principal</label>
            <input
              type="text"
              value={currentAgent.telephone_principal}
              onChange={(e) => setCurrentAgent({ ...currentAgent, telephone_principal: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Poste</label>
            <input
              type="text"
              value={currentAgent.poste}
              onChange={(e) => setCurrentAgent({ ...currentAgent, poste: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Service</label>
            <select
              value={currentAgent.service_id || ''}
              onChange={(e) => setCurrentAgent({ ...currentAgent, service_id: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>Sélectionnez un service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.nom}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end pt-4 border-t">
            <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded mr-2">Annuler</button>
            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300">
              {isSubmitting ? 'Sauvegarde...' : (isEditing ? 'Enregistrer les modifications' : 'Créer l\'agent')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AgentsPage;