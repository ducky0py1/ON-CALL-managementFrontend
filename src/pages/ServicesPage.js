import React, { useState, useEffect } from 'react';
// Importer toutes les fonctions API nécessaires
import { getServices, createService, deleteService, updateService, getSecretaries } from '../services/api';
import Modal from '../components/Modal';

function ServicesPage() {
  // --- États ---
  const [services, setServices] = useState([]);
  const [secretaries, setSecretaries] = useState([]); // Pour la liste déroulante
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState({ id: null, nom: '', code_service: '', description: '', secretaire_responsable_id: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Fonctions de gestion des données ---
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getServices();
      setServices(response.data.data);
      setError('');
    } catch (err) {
      setError('Impossible de charger les services. L\'API est peut-être inaccessible.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchSecretaries = async () => {
    try {
      const response = await getSecretaries();
      setSecretaries(response.data);
    } catch (err) {
      console.error("Impossible de charger la liste des secrétaires", err);
    }
  };

  // --- Gestionnaires d'événements ---
  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setCurrentService({ id: null, nom: '', code_service: '', description: '', secretaire_responsable_id: null });
    fetchSecretaries();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setIsEditing(true);
    setCurrentService({ ...service, secretaire_responsable_id: service.secretaire_responsable?.id || null });
    fetchSecretaries();
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSend = { ...currentService, secretaire_responsable_id: currentService.secretaire_responsable_id || null };
    try {
      if (isEditing) {
        await updateService(currentService.id, dataToSend);
      } else {
        await createService(dataToSend);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      if (err.response && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join('\n');
        alert(`Erreur de validation:\n${errorMessages}`);
      } else {
        alert(`Erreur : Impossible de ${isEditing ? 'modifier' : 'créer'} le service.`);
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.")) {
      try {
        await deleteService(serviceId);
        fetchServices();
      } catch (err) {
        alert("Erreur : Impossible de supprimer le service. Il est peut-être lié à des agents ou des plannings.");
      }
    }
  };

  // --- Rendu du composant ---
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement des services...</p>
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
          onClick={fetchServices}
          className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
        <div className="absolute top-4 right-4 w-16 h-16 border-2 border-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-green-200 transform rotate-45 opacity-20"></div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-4"></div>
              Gestion des Services
            </h1>
            <p className="text-gray-600">Administration des services OCP - Office Chérifien des Phosphates</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200 shadow-lg flex items-center"
          >
            <div className="w-5 h-5 border-2 border-white rounded mr-2 flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-sm"></div></div>
            Ajouter un Service
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <h2 className="text-white font-semibold text-lg">Liste des Services</h2>
          <p className="text-green-100 text-sm">Gestion centralisée des départements OCP</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Nom du Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Secrétaire Responsable</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service, index) => (
                <tr key={service.id} className={`hover:bg-green-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div><span className="text-sm font-medium text-gray-900">#{service.id}</span></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="bg-gray-100 text-gray-800 text-sm font-mono px-3 py-1 rounded-full border">{service.code_service}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-semibold text-gray-900">{service.nom}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.secretaire_responsable ? (
                      <div className="flex items-center"><div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3"><span className="text-green-600 font-semibold text-sm">{service.secretaire_responsable.prenom.charAt(0)}</span></div><div><div className="text-sm font-medium text-gray-900">{service.secretaire_responsable.prenom} {service.secretaire_responsable.nom}</div><div className="text-xs text-green-600">Responsable assigné</div></div></div>
                    ) : (
                      <div className="flex items-center"><div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3"><div className="w-2 h-2 bg-orange-500 rounded-full"></div></div><div><span className="text-gray-400 text-sm">Non assigné</span><div className="text-xs text-orange-500">En attente</div></div></div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <button onClick={() => handleOpenEditModal(service)} className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline transition-colors duration-150">Modifier</button>
                      <button onClick={() => handleDeleteService(service.id)} className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline transition-colors duration-150">Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {services.length === 0 && (
          <div className="text-center py-12"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><div className="w-8 h-8 bg-green-600 rounded"></div></div><h3 className="text-lg font-medium text-gray-900 mb-2">Aucun service enregistré</h3><p className="text-gray-500 mb-4">Commencez par ajouter votre premier service OCP.</p><button onClick={handleOpenCreateModal} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">Ajouter un Service</button></div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditing ? 'Modifier le Service' : 'Ajouter un Nouveau Service'}>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="text-center mb-6 pb-4 border-b border-green-100"><div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2"><div className="text-lg font-bold text-green-600">OCP</div></div><p className="text-gray-600 text-sm">Office Chérifien des Phosphates</p></div>
          <div><label className="block text-gray-700 font-semibold mb-2">Nom du service</label><input type="text" value={currentService.nom} onChange={(e) => setCurrentService({ ...currentService, nom: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200" placeholder="ex: Direction des Opérations" required /></div>
          <div><label className="block text-gray-700 font-semibold mb-2">Code du service</label><input type="text" value={currentService.code_service} onChange={(e) => setCurrentService({ ...currentService, code_service: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 font-mono" placeholder="ex: DOM" required /></div>
          <div><label className="block text-gray-700 font-semibold mb-2">Description (Optionnel)</label><textarea value={currentService.description} onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 resize-none" rows="3" placeholder="Description détaillée du service..."></textarea></div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Secrétaire Responsable</label>
            <select value={currentService.secretaire_responsable_id || ''} onChange={(e) => setCurrentService({ ...currentService, secretaire_responsable_id: e.target.value })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200">
              <option value="">-- Aucune --</option>
              {secretaries.map(sec => (
                <option 
                  key={sec.id} 
                  value={sec.id}
                  disabled={!sec.is_available_for_assignment && sec.id !== currentService.secretaire_responsable_id}
                  className={!sec.is_available_for_assignment && sec.id !== currentService.secretaire_responsable_id ? 'text-gray-400 bg-gray-100' : ''}
                >
                  {sec.prenom} {sec.nom}
                  {!sec.is_available_for_assignment && sec.id !== currentService.secretaire_responsable_id ? ' (Déjà affectée)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-6 border-t space-x-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-all duration-200" disabled={isSubmitting}>Annuler</button>
            <button type="submit" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center" disabled={isSubmitting}>
              {isSubmitting ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Sauvegarde...</>) : (isEditing ? 'Enregistrer les modifications' : 'Créer le service')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ServicesPage;