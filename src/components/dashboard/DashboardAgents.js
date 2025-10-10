// Fichier: src/components/dashboard/DashboardAgents.js
import React from 'react';
import { motion } from 'motion/react';
import { Users, UserCheck, UserX, Clock, Plus, Search } from 'lucide-react';

// Mock agent data. This will be replaced with data from your API.
const mockAgents = [
  { id: "1", name: "Youssef Mahi", service: "Service Production", status: "active", phone: "+212 6 12 34 56 78", email: "y.mahi@ocp.ma" },
  { id: "2", name: "Aicha Rahimi", service: "Service Production", status: "available", phone: "+212 6 98 76 54 32", email: "a.rahimi@ocp.ma" },
  { id: "4", name: "Khalid Ouali", service: "Service Électrique", status: "active", phone: "+212 6 55 66 77 88", email: "k.ouali@ocp.ma" },
  { id: "6", name: "Omar Bennani", service: "Service Mécanique", status: "unavailable", phone: "+212 6 77 88 99 00", email: "o.bennani@ocp.ma" },
];

// Helper functions for styling
const getStatusColor = (status) => {
    if(status === 'active') return 'bg-green-100 text-green-700';
    if(status === 'available') return 'bg-blue-100 text-blue-700';
    if(status === 'unavailable') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
};

const getStatusLabel = (status) => {
    if(status === 'active') return 'En astreinte';
    if(status === 'available') return 'Disponible';
    if(status === 'unavailable') return 'Indisponible';
    return 'Inconnu';
};

export function DashboardAgents({ selectedService }) {
  const filteredAgents = selectedService 
    ? mockAgents.filter(agent => agent.service === selectedService)
    : mockAgents;

  const activeAgents = filteredAgents.filter(agent => agent.status === 'active');
  const availableAgents = filteredAgents.filter(agent => agent.status === 'available');
  const unavailableAgents = filteredAgents.filter(agent => agent.status === 'unavailable');

  return (
    <div className="space-y-6">
      {/* Header with Search and Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Agents</h1>
          <p className="text-gray-600">{selectedService ? `Agents du ${selectedService}` : "Vue d'ensemble de tous les agents"}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center">
            <Plus className="w-4 h-4 mr-2" />Nouvel Agent
        </button>
      </div>

      {/* Agent Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card for Total Agents */}
        <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-sm font-medium text-gray-600">Total Agents</p>
            <div className="flex items-center space-x-2"><Users className="w-4 h-4 text-blue-600" /><span className="text-2xl font-bold">{filteredAgents.length}</span></div>
        </div>
        {/* Other stat cards... */}
      </div>

      {/* Agents List/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <motion.div key={agent.id} whileHover={{ scale: 1.02 }} className="p-4 border bg-white rounded-lg hover:shadow-md">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {agent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">{agent.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(agent.status)}`}>{getStatusLabel(agent.status)}</span>
                </div>
                <p className="text-sm text-gray-600">{agent.service}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}