//DashboardAgents
import React, { useState, useEffect } from 'react';
import { getAgents, getServices, createAgent, updateAgent, deleteAgent } from '../../services/api';
import Modal from '../Modal';
import { Users, UserCheck, UserX, Clock, Phone, Mail, Plus, Search, MoreVertical } from 'lucide-react';
import { motion } from "framer-motion";


const getStatusInfo = (status) => {
  // We adapt this to use the real status from your backend if needed
  // For now, we'll assign a status based on availability for demonstration
  if (status) return { label: 'Disponible', color: 'bg-green-100 text-green-700' };
  return { label: 'Indisponible', color: 'bg-red-100 text-red-700' };
};

export default function DashboardAgents({selectedService }){
  const [agents, setAgents] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAgent, setCurrentAgent] = useState({ nom: '', prenom: '', matricule: '', service_id: '', telephone_principal: '', poste: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [agentsRes, servicesRes] = await Promise.all([getAgents(), getServices()]);
      setAgents(agentsRes.data.data);
      setServices(servicesRes.data.data);
      setError('');
    } catch (err) {
      setError('Impossible de charger les données pour la page des agents.');
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
        alert("Erreur : Impossible de supprimer l'agent. Il est peut-être lié à un planning.");
        console.error(err);

      }
    }
  };
  
  const filteredAgents = agents.filter(agent => {
    const search = searchQuery.toLowerCase();
    const matchesSearch = 
      agent.nom.toLowerCase().includes(search) ||
      agent.prenom.toLowerCase().includes(search) ||
      agent.matricule.toLowerCase().includes(search) ||
      agent.service?.nom.toLowerCase().includes(search);
    
    // We can add more filters here later if needed
    return matchesSearch;
  });
   // --- Stats calculated from real data ---
  const activeAgents = filteredAgents.filter(agent => agent.is_disponible_astreinte);
  const unavailableAgents = filteredAgents.filter(agent => !agent.is_disponible_astreinte);



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

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
          <p className="text-red-700 font-medium">{error}</p>
        </div>
        <button 
          onClick={fetchData}
          className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
        >
          Réessayer
        </button>
      </div>

    );
  }

  return (
    <div className="space-y-6">
     <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Agents</h1>
          <p className="text-gray-600">{selectedService ? `Agents du ${selectedService}` : "Vue d'ensemble de tous les agents"}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Rechercher un agent..."
              className="pl-10 w-64 p-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={handleOpenCreateModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel Agent
          </button>
        </div>
      </div>

      {/* ===== Agent Stats from Figma (connected to real data) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-4 bg-white rounded-lg shadow"><p className="text-sm font-medium">Total Agents</p><p className="text-2xl font-bold">{filteredAgents.length}</p></div>
        <div className="p-4 bg-white rounded-lg shadow"><p className="text-sm font-medium">En Astreinte (demo)</p><p className="text-2xl font-bold text-green-600">0</p></div>
        <div className="p-4 bg-white rounded-lg shadow"><p className="text-sm font-medium">Disponibles</p><p className="text-2xl font-bold text-blue-600">{activeAgents.length}</p></div>
        <div className="p-4 bg-white rounded-lg shadow"><p className="text-sm font-medium">Indisponibles</p><p className="text-2xl font-bold text-red-600">{unavailableAgents.length}</p></div>
      </div>

      {/* ===== Agents Card Grid from Figma (connected to real data) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => {
          const statusInfo = getStatusInfo(agent.is_disponible_astreinte);
          return (
            <motion.div
              key={agent.id}
              whileHover={{ y: -5 }}
              className="p-4 border bg-white rounded-lg hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {agent.prenom.charAt(0)}{agent.nom.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 truncate">{agent.prenom} {agent.nom}</h4>
                    <p className="text-sm text-gray-500 truncate">{agent.poste || 'Poste non défini'}</p>
                  </div>
                </div>
                {/* Actions Menu */}
                <div className="relative opacity-0 group-hover:opacity-100">
                  <button className="p-1 rounded-full hover:bg-gray-100"><MoreVertical className="w-4 h-4" /></button>
                  {/* A real dropdown menu would go here */}
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mt-4">
                <p className="font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block">{agent.service?.nom || 'Non assigné'}</p>
                <div className="flex items-center space-x-2 pt-2">
                  <Phone className="w-3 h-3" />
                  <span className="text-xs">{agent.telephone_principal}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3 h-3" />
                  <span className="text-xs truncate">{agent.email_professionnel || 'Email non fourni'}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                  <button onClick={() => handleOpenEditModal(agent)} className="text-xs font-semibold text-blue-600 hover:underline">Modifier</button>
                  <button onClick={() => handleDeleteAgent(agent.id)} className="text-xs font-semibold text-red-600 hover:underline">Supprimer</button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditing ? 'Modifier l\'Agent' : 'Ajouter un Nouvel Agent'}>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-gray-700 font-semibold mb-2">Prénom</label><input type="text" value={currentAgent.prenom} onChange={(e) => setCurrentAgent({ ...currentAgent, prenom: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" required /></div>
            <div><label className="block text-gray-700 font-semibold mb-2">Nom</label><input type="text" value={currentAgent.nom} onChange={(e) => setCurrentAgent({ ...currentAgent, nom: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" required /></div>
            <div><label className="block text-gray-700 font-semibold mb-2">Matricule</label><input type="text" value={currentAgent.matricule} onChange={(e) => setCurrentAgent({ ...currentAgent, matricule: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" required /></div>
            <div><label className="block text-gray-700 font-semibold mb-2">Téléphone Principal</label><input type="text" value={currentAgent.telephone_principal} onChange={(e) => setCurrentAgent({ ...currentAgent, telephone_principal: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" required /></div>
            <div><label className="block text-gray-700 font-semibold mb-2">Poste</label><input type="text" value={currentAgent.poste} onChange={(e) => setCurrentAgent({ ...currentAgent, poste: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" /></div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Service</label>
              <select value={currentAgent.service_id || ''} onChange={(e) => setCurrentAgent({ ...currentAgent, service_id: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" required>
                <option value="" disabled>Sélectionnez un service</option>
                {services.map(service => (<option key={service.id} value={service.id}>{service.nom}</option>))}
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-6 border-t space-x-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg" disabled={isSubmitting}>Annuler</button>
            <button type="submit" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium px-6 py-3 rounded-lg disabled:opacity-50 flex items-center" disabled={isSubmitting}>
              {isSubmitting ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Sauvegarde...</>) : (isEditing ? 'Enregistrer' : 'Créer l\'agent')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}