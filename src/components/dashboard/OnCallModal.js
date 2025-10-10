// Fichier: src/components/dashboard/OnCallModal.js
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, Users, AlertCircle, Settings, Repeat } from 'lucide-react';

// Hardcoded data for the dropdowns. In a real app, this would come from the API.
const services = ["Service Technique", "Service Sécurité", "Service Production", "Service Électrique"];
const agents = ["Ahmed Bennani", "Fatima Zahra", "Omar Alami", "Salma Idrissi"];
const periodTypes = [
  { value: "maintenance", label: "Maintenance", icon: Settings },
  { value: "emergency", label: "Urgence", icon: AlertCircle },
  { value: "weekend", label: "Weekend", icon: Calendar },
  { value: "holiday", label: "Congés", icon: Calendar }
];

// This is the main modal component. It receives props to control it from the parent page.
export function OnCallModal({ isOpen, onClose, period, onSave }) {
  // 'formData' holds all the values from the form inputs.
  const [formData, setFormData] = useState({});
  // 'errors' holds any validation error messages.
  const [errors, setErrors] = useState({});
  // 'selectedAgents' specifically tracks the list of agents chosen.
  const [selectedAgents, setSelectedAgents] = useState([]);

  // This 'useEffect' hook runs every time the modal is opened.
  // Its job is to pre-fill the form with data if we are editing, or reset it if we are creating.
  useEffect(() => {
    if (isOpen) {
      if (period) { // If a 'period' object is passed, we are in edit mode.
        setFormData(period);
        setSelectedAgents(period.assignedAgents || []);
      } else { // If 'period' is null, we are in create mode.
        setFormData({
          description: "", service: "", type: "maintenance",
          startDate: "", endDate: "", startTime: "08:00", endTime: "17:00"
        });
        setSelectedAgents([]);
      }
      setErrors({}); // Always clear old errors when the modal opens.
    }
  }, [period, isOpen]); // This effect re-runs if 'period' or 'isOpen' changes.

  // A simple validation function to check the form before saving.
  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = "La description est requise.";
    if (!formData.service) newErrors.service = "Le service est requis.";
    if (!formData.startDate) newErrors.startDate = "La date de début est requise.";
    if (!formData.endDate) newErrors.endDate = "La date de fin est requise.";
    if (formData.startDate > formData.endDate) {
      newErrors.endDate = "La date de fin doit être après la date de début.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors.
  };

  // This function is called when the user clicks the "Enregistrer" button.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default browser form submission.
    if (validateForm()) {
      onSave({ ...formData, assignedAgents: selectedAgents });
    }
  };
  
  // A helper function to update a field in our formData state.
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) { // If there was an error on this field, clear it as the user types.
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Toggles an agent's selection in the 'selectedAgents' array.
  const handleAgentToggle = (agent) => {
    setSelectedAgents(prev => prev.includes(agent) ? prev.filter(a => a !== agent) : [...prev, agent]);
  };

  // If the modal is not open, render nothing.
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            {period ? "Modifier la Période" : "Nouvelle Période d'Astreinte"}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X className="w-5 h-5" /></button>
        </div>

        {/* Form Body with scrolling */}
        <div className="p-6 overflow-y-auto">
          <form id="on-call-form" onSubmit={handleSubmit} className="space-y-6">
            {/* General Info Card */}
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Informations Générales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="description">Description *</label>
                  <input id="description" value={formData.description || ""} onChange={e => updateFormData("description", e.target.value)} className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`} />
                  {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                </div>
                <div>
                  <label htmlFor="service">Service *</label>
                  <select id="service" value={formData.service || ""} onChange={e => updateFormData("service", e.target.value)} className={`w-full p-2 border rounded ${errors.service ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="" disabled>Sélectionner...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                   {errors.service && <p className="text-sm text-red-600 mt-1">{errors.service}</p>}
                </div>
                <div>
                  <label htmlFor="type">Type</label>
                  <select id="type" value={formData.type || ""} onChange={e => updateFormData("type", e.target.value)} className="w-full p-2 border rounded border-gray-300">
                    {periodTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
            {/* Other cards for Temporal Planning, Advanced Config, would go here... */}
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-lg">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Annuler</button>
          {/* This button is outside the <form> but is linked to it with the 'form' attribute */}
          <button type="submit" form="on-call-form" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            {period ? "Mettre à jour" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}