// Fichier: src/components/dashboard/DashboardServices.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Users, Building2, Code, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getServices, createService, deleteService, updateService, getUsers } from '../../services/api';
import Modal from '../Modal';

export default function DashboardServices() {
  const { isAdmin } = useAuth(); 
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState({ 
    id: null, 
    nom: '', 
    code_service: '', 
    description: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === Fetch data from backend ===
  const fetchData = async () => {
    try {
      setLoading(true);
      const [servicesRes, usersRes] = await Promise.all([getServices(), getUsers()]);
      setServices(servicesRes.data.data || []);
      setUsers(usersRes.data.data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les données. Vérifiez la connexion à l'API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // === Helper: find secretaries for each service ===
  const getSecretariesForService = (serviceId) =>
    users.filter(user => user.role_type === 'secretaire' && user.service_id === serviceId);

  // === Stats ===
  const stats = {
    total: services.length,
    withSecretary: services.filter(s => getSecretariesForService(s.id).length > 0).length,
    withoutSecretary: services.filter(s => getSecretariesForService(s.id).length === 0).length
  };

  // === Event handlers ===
  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setCurrentService({ id: null, nom: '', code_service: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setIsEditing(true);
    setCurrentService(service);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      nom: currentService.nom,
      code_service: currentService.code_service,
      description: currentService.description || '',
    };

    try {
      if (isEditing) {
        await updateService(currentService.id, dataToSend);
      } else {
        await createService(dataToSend);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert(`Erreur : Impossible de ${isEditing ? 'modifier' : 'créer'} le service.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.")) {
      try {
        await deleteService(serviceId);
        fetchData();
      } catch (err) {
        alert("Erreur : Impossible de supprimer le service. Il est peut-être lié à d'autres données.");
      }
    }
  };

  // === Loading Skeleton ===
  if (loading) {
    return (
      <div className="p-6 space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div>
            <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-10 bg-gradient-to-r from-[#0B43F5]/40 to-[#24DC61]/40 rounded-lg w-40"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-6 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="h-5 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-40"></div>
          </div>
          <div className="divide-y divide-gray-100">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-100 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === Error ===
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
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

  // === Normal Render ===
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestion des Services
          </h1>
          <p className="text-lg text-gray-600">Administration des services OCP</p>
        </div>
        {isAdmin && (
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#0B43F5] to-[#24DC61] hover:from-[#0934d3] hover:to-[#20c957] text-white font-medium rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un Service
          </button>
        )}
      </motion.div>

      {/* === Stats === */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {[
          { title: "Total Services", value: stats.total, icon: Building2, color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
          { title: "Avec Secrétaire", value: stats.withSecretary, icon: Users, color: "from-green-500 to-green-600", bg: "bg-green-50" },
          { title: "Sans Secrétaire", value: stats.withoutSecretary, icon: AlertCircle, color: "from-orange-500 to-orange-600", bg: "bg-orange-50" }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

     {/* === Table === */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Liste des Services ({services.length})</h3>
          <p className="text-sm text-gray-600 mt-1">Gestion centralisée des départements OCP</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du Service</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Secrétaires Assignées</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service, index) => {
                const secretaries = getSecretariesForService(service.id);
                return (
                  <motion.tr
                    key={service.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-800 text-sm font-mono">
                        <Code className="w-3 h-3 mr-1" />
                        {service.code_service}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#0B43F5] rounded-full mr-3"></div>
                        <span className="text-sm font-semibold text-gray-900">{service.nom}</span>
                      </div>
                    </td>

                  {/* Secretaries column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {secretaries.length > 0 ? (
                      <div className="space-y-1">
                        {secretaries.map(sec => (
                          <div
                            key={sec.id}
                            className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-lg shadow-sm"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold text-sm ring-2 ring-white">
                              {sec.prenom.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {sec.prenom} {sec.nom}
                              </p>
                              <p className="text-xs text-gray-500">{sec.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
                        <span className="text-gray-400 text-sm">Non assigné</span>
                      </div>
                    )}
                  </td>


                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {isAdmin && (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(service)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun service enregistré</h3>
            <p className="text-gray-500 mb-4">Commencez par ajouter votre premier service OCP.</p>
            {isAdmin && (
              <button 
                onClick={handleOpenCreateModal} 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0B43F5] to-[#24DC61] text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Service
              </button>
            )}
          </div>
        )}
      </div>

      {/* === Modal === */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditing ? 'Modifier le Service' : 'Ajouter un Nouveau Service'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="text-center pb-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0B43F5] to-[#24DC61] rounded-full flex items-center justify-center mx-auto mb-2">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <p className="text-gray-600 text-xs">Office Chérifien des Phosphates</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1.5 text-sm">
              Nom du service <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={currentService.nom} 
              onChange={(e) => setCurrentService({ ...currentService, nom: e.target.value })} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B43F5] focus:border-transparent transition-all" 
              placeholder="ex: Direction des Opérations" 
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1.5 text-sm">
              Code du service <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={currentService.code_service} 
              onChange={(e) => setCurrentService({ ...currentService, code_service: e.target.value })} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 font-mono focus:outline-none focus:ring-2 focus:ring-[#0B43F5] focus:border-transparent transition-all" 
              placeholder="ex: DOM" 
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1.5 text-sm">
              Description (Optionnel)
            </label>
            <textarea 
              value={currentService.description || ''} 
              onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B43F5] focus:border-transparent transition-all resize-none" 
              rows="2" 
              placeholder="Description détaillée du service..."
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200 space-x-2">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)} 
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all" 
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm bg-gradient-to-r from-[#0B43F5] to-[#24DC61] hover:from-[#0934d3] hover:to-[#20c957] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sauvegarde...
                </>
              ) : (
                isEditing ? 'Enregistrer' : 'Créer'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}