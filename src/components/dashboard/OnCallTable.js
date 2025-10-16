// Fichier: src/components/dashboard/OnCallTable.js
import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Settings, Edit, Trash2, Calendar, AlertCircle } from 'lucide-react';

// Configuration objects to map data values to styles and labels.
const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-800", dot: "bg-green-500" },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800", dot: "bg-gray-500" },
  pending: { label: "En attente", color: "bg-orange-100 text-orange-800", dot: "bg-orange-500" }
};

const typeConfig = {
  maintenance: { label: "Maintenance", icon: Settings },
  emergency: { label: "Urgence", icon: AlertCircle },
  weekend: { label: "Weekend", icon: Calendar },
  holiday: { label: "Congés", icon: Calendar }
};

export function OnCallTable({
  periods,
  onEditPeriod,
  onDeletePeriod,
  // These props can be added later for bulk actions
  selectedPeriods,
  onSelectPeriods,
  onBulkDelete
}) {
  // State for managing user input (search and filters)
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

  // useMemo is a performance optimization. It recalculates the list of services
  // only when the main 'periods' list changes.
  const services = useMemo(() => {
    const serviceMap = new Map();
    periods.forEach(period => {
      if (period.service) {
        serviceMap.set(period.service.id, period.service);
      }
    });
    return Array.from(serviceMap.values()).sort((a, b) => a.nom.localeCompare(b.nom));
  }, [periods]);
  
  // This is the core filtering logic. It recalculates the displayed periods
  // whenever the data or any filter changes.
  const filteredPeriods = useMemo(() => {
    return periods.filter(period => {
      const search = searchTerm.toLowerCase();
      const searchInDescription = period.description?.toLowerCase().includes(search) || false;
      const searchInService = period.service?.nom.toLowerCase().includes(search) || false;
      // const searchInAgents = period.assignedAgents?.some(agent => agent.toLowerCase().includes(search)) || false;

      const matchesSearch = searchInDescription || searchInService;
      // Filter by the service ID (which is a number)
      const matchesService = serviceFilter === "all" || period.service?.id === parseInt(serviceFilter);
      return matchesSearch && matchesService;
    });
  }, [periods, searchTerm, serviceFilter]);

  // A helper function to format dates nicely.
  const formatDateRange = (startDate, endDate) => {
    // This could be expanded with a date library like date-fns for more complex formatting
    if (startDate === endDate) return startDate;
    return `${startDate} - ${endDate}`;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white border-0 shadow-lg rounded-lg"
    >
      {/* Table Header with Title and Filters */}
      <div className="p-4 border-b bg-gray-50/50 rounded-t-lg flex justify-between items-center">
        <h3 className="flex items-center gap-2 font-semibold">
          <Calendar className="w-5 h-5 text-[#0B43F5]" />
          Périodes d'Astreinte <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{filteredPeriods.length}</span>
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 p-2 border rounded-lg"
            />
          </div>
          <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} className="p-2 border rounded-lg">
            <option value="all">Tous les services</option>
            {services.map(service => (
            <option key={service.id} value={service.id}>{service.nom}</option>
          ))}
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="p-4 text-left font-semibold">Description</th>
              <th className="p-4 text-left font-semibold">Service</th>
              <th className="p-4 text-left font-semibold">Période</th>
              <th className="p-4 text-left font-semibold">Statut</th>
              <th className="p-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeriods.map((period) => {
              const status = statusConfig[period.status] || statusConfig.inactive;
              const TypeIcon = typeConfig[period.type_periode]?.icon || Settings; //use type_periode from API
              return (
                <tr key={period.id} className="border-t hover:bg-gray-50/50 group">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{period.description}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    {period.service ? period.service.nom : 'N/A'}
                    </span>
                    </td>
                  <td className="p-4">{formatDateRange(period.startDate, period.endDate)}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {/* The action buttons are hidden by default and appear on hover of the row (group-hover) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                       <button 
                        onClick={() => onEditPeriod(period)} 
                        className="p-2 rounded-md hover:bg-gray-200"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => onDeletePeriod(period.id)} 
                        className="p-2 rounded-md hover:bg-gray-200"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State message if no periods are found */}
      {filteredPeriods.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune période trouvée avec les filtres actuels.</p>
        </div>
      )}
    </motion.div>
  );
}