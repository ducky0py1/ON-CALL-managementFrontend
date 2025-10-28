// Fichier: src/components/agent/AgentUnavailability.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { SkeletonDashboard } from "../styles/SkeletonLoader";

import {
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Edit2,
  UserX,
  FileText,
} from "lucide-react";

import {
  getIndisponibilites,
  createIndisponibilite,
  updateIndisponibilite,
  getAgents,
} from "../../services/api";

import { UnavailabilityModal } from "./UnavailabilityModal";
import { ReplacementModal } from "./ReplacementModal";

export function AgentUnavailability() {
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplacementModalOpen, setIsReplacementModalOpen] = useState(false);
  const [selectedUnavailability, setSelectedUnavailability] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Data Fetching
  const fetchData = async () => {
    try {
      setLoading(true);
      const [unavailRes, agentsRes] = await Promise.all([
        getIndisponibilites(),
        getAgents(),
      ]);
      setUnavailabilities(unavailRes.data.data || []);
      setAgents(agentsRes.data.data || []);
    } catch (error) {
      console.error("Error fetching data for AgentUnavailability:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateNew = () => {
    setSelectedUnavailability(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedUnavailability(item);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      const dataToSend = { ...formData, agent_id: parseInt(formData.agent_id) };
      if (selectedUnavailability) {
        await updateIndisponibilite(selectedUnavailability.id, dataToSend);
      } else {
        await createIndisponibilite(dataToSend);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Erreur lors de la sauvegarde.");
      console.error(error.response?.data);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateIndisponibilite(id, { statut: newStatus });
      fetchData();
    } catch (error) {
      alert("Erreur lors du changement de statut.");
    }
  };

  const handleAssignReplacement = (item) => {
    setSelectedUnavailability(item);
    setIsReplacementModalOpen(true);
  };

  const handleReplacementAssigned = async (
    unavailabilityId,
    replacementId,
    replacementName
  ) => {
    try {
      await updateIndisponibilite(unavailabilityId, {
        replacement_id: replacementId,
        replacementName,
      });
      fetchData();
    } catch (error) {
      alert("Erreur lors de l'assignation du remplaçant.");
    }
    setIsReplacementModalOpen(false);
  };

  const filteredUnavailabilities = unavailabilities.filter((u) => {
    const searchMatch =
      u.agent?.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.motif?.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter === "all" || u.statut === statusFilter;
    const typeMatch = typeFilter === "all" || u.type_indisponibilite === typeFilter;
    return searchMatch && statusMatch && typeMatch;
  });

  const stats = {
    total: unavailabilities.length,
    pending: unavailabilities.filter((u) => u.statut === "pending").length,
    approved: unavailabilities.filter((u) => u.statut === "approved").length,
    needsReplacement: unavailabilities.filter(
      (u) => u.statut === "approved" && !u.replacement_id
    ).length,
  };

  const getStatusBadge = (statut) => {
    const badges = {
      approved: "px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 border-0",
      rejected: "px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 border-0",
      pending: "px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700 border-0"
    };
    
    const labels = {
      approved: "Approuvée",
      rejected: "Rejetée",
      pending: "En attente"
    };

    return <span className={badges[statut] || badges.pending}>{labels[statut] || labels.pending}</span>;
  };

  const getTypeBadge = (type) => {
    const types = {
      maladie: { label: "Maladie", color: "bg-red-100 text-red-800" },
      conge: { label: "Congé", color: "bg-blue-100 text-blue-800" },
      formation: { label: "Formation", color: "bg-green-100 text-green-800" },
      mission: { label: "Mission", color: "bg-purple-100 text-purple-800" },
      autre: { label: "Autre", color: "bg-gray-100 text-gray-800" },
    };
    const typeInfo = types[type] || types.autre;
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${typeInfo.color} border-0`}>
        {typeInfo.label}
      </span>
    );
  };

  if (loading) return <SkeletonDashboard />;

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
            Indisponibilité des Agents
          </h1>
          <p className="text-lg text-gray-600">
            Gérer les absences et assigner les remplaçants
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#0B43F5] to-[#24DC61] hover:from-[#0934d3] hover:to-[#20c957] text-white font-medium rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Indisponibilité
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {[
          { 
            title: "Total", 
            value: stats.total, 
            icon: UserX, 
            color: "from-blue-500 to-blue-600", 
            bg: "bg-blue-50" 
          },
          { 
            title: "En attente", 
            value: stats.pending, 
            icon: Clock, 
            color: "from-orange-500 to-orange-600", 
            bg: "bg-orange-50" 
          },
          { 
            title: "Approuvées", 
            value: stats.approved, 
            icon: CheckCircle, 
            color: "from-green-500 to-green-600", 
            bg: "bg-green-50" 
          },
          { 
            title: "Sans remplaçant", 
            value: stats.needsReplacement, 
            icon: Users, 
            color: "from-red-500 to-red-600", 
            bg: "bg-red-50" 
          }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
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

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#0B43F5]" />
            Filtres et Recherche
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, service ou motif..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B43F5] focus:border-transparent outline-none transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B43F5] focus:border-transparent outline-none transition-all"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvées</option>
              <option value="rejected">Rejetées</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B43F5] focus:border-transparent outline-none transition-all"
            >
              <option value="all">Tous les types</option>
              <option value="maladie">Maladie</option>
              <option value="conge">Congé</option>
              <option value="formation">Formation</option>
              <option value="mission">Mission</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Liste des Indisponibilités ({filteredUnavailabilities.length})
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Gérer et approuver les demandes d'indisponibilité
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motif
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remplaçant
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUnavailabilities.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.agent?.nom} {item.agent?.prenom}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(item.type_indisponibilite)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(item.date_debut).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-xs text-gray-500">
                      au {new Date(item.date_fin).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={item.motif}>
                      {item.motif}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.document_justificatif ? (
                      <button className="inline-flex items-center text-sm text-[#0B43F5] hover:text-[#0934d3]">
                        <FileText className="w-4 h-4 mr-1" />
                        Voir
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.replacementName ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                        {item.replacementName}
                      </span>
                    ) : item.statut === "approved" ? (
                      <button
                        onClick={() => handleAssignReplacement(item)}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-[#0B43F5] border border-[#0B43F5] rounded-lg hover:bg-[#0B43F5] hover:text-white transition-colors"
                      >
                        <Users className="w-3 h-3 mr-1" />
                        Assigner
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.statut)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {item.statut === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(item.id, "approved")}
                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approuver"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(item.id, "rejected")}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Rejeter"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <UnavailabilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        unavailability={selectedUnavailability}
        onSave={handleSave}
        agents={agents}
        isSecretary={false}
      />

      {selectedUnavailability && (
        <ReplacementModal
          isOpen={isReplacementModalOpen}
          onClose={() => setIsReplacementModalOpen(false)}
          unavailability={selectedUnavailability}
          availableReplacements={agents.filter(
            (a) => a.id !== selectedUnavailability.agent_id
          )}
          onAssignReplacement={handleReplacementAssigned}
        />
      )}
    </div>
  );
}