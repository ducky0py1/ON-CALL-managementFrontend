// Fichier: src/components/dashboard/OnCallModal.js
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, Users, AlertCircle, Settings, Repeat } from 'lucide-react';

// This is the main modal component. It receives props to control it.
export function OnCallModal({ isOpen, onClose, period, onSave, services, agents }) {
  // 'formData' holds all the values from the form inputs.
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedAgents, setSelectedAgents] = useState([]);

  // This effect runs when the modal opens to pre-fill the form.
  useEffect(() => {
    if (isOpen) {
      if (period) {
        setFormData({
          description: period.description || '',
          service_id: period.service?.id || '', // Use service_id
          type_periode: period.type_periode || 'hebdomadaire', // Use type_periode
          date_debut: period.date_debut || '', // Use snake_case from API
          date_fin: period.date_fin || '',
          heure_debut: period.heure_debut || '08:00',
          heure_fin: period.heure_fin || '17:00',
        });
      }else { // Creating a new period
        setFormData({
          description: '', service_id: '', type_periode: 'hebdomadaire',
          date_debut: '', date_fin: '', heure_debut: '08:00', heure_fin: '17:00',
        });
        // setSelectedAgents([]);
      }
      // setErrors({});
    }
  }, [period, isOpen]);


  // Validation function
  const validateForm = () => {
     const newErrors = {};
    if (!formData.description) newErrors.description = "La description est requise.";
    if (!formData.service_id) newErrors.service_id = "Le service est requis."; // Use service_id
    if (!formData.date_debut) newErrors.date_debut = "La date de début est requise.";
    if (!formData.date_fin) newErrors.date_fin = "La date de fin est requise.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //     // We send the ID of the service, not the name
  //     // const dataToSave = { ...formData, service_id: formData.service, assignedAgents: selectedAgents };
  //     // delete dataToSave.service; // Clean up the object
  //     console.log("Submitting form data:", formData);
  //     onSave(formData);
    
  // };

  const handleSubmit = (e) => {
  e.preventDefault();

  const convertTo24Hour = (timeStr) => {
    if (!timeStr) return "";
    // Handle values like "09:00" or "09:00 AM"
    let [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);

    if (modifier) {
      // Convert from 12-hour to 24-hour format
      if (modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
      if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
  };

  const dataToSave = {
    ...formData,
    heure_debut: convertTo24Hour(formData.heure_debut),
    heure_fin: convertTo24Hour(formData.heure_fin),
  };

  console.log("Submitting formatted data:", dataToSave);
  onSave(dataToSave);
};


  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };
  const handleAgentToggle = (agentName) => {
    setSelectedAgents(prev => 
      prev.includes(agentName)
        ? prev.filter(a => a !== agentName)
        : [...prev, agentName]
    );
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-600" />{period ? "Modifier la Période" : "Nouvelle Période d'Astreinte"}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X className="w-5 h-5" /></button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          {/* Section 1: Informations Générales */}
          <div className="border p-4 rounded-lg bg-gray-50/50">
            <h3 className="font-semibold mb-4 text-gray-800 flex items-center gap-2"><Settings className="w-5 h-5 text-blue-600" />Informations Générales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label>Description *</label>
                <input value={formData.description || ''} onChange={e => updateFormData('description', e.target.value)} className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              </div>
              <div>
                <label>Service *</label>
                <select value={formData.service_id || ''} onChange={e => updateFormData('service_id', e.target.value)} className={`w-full p-2 border rounded ${errors.service ? 'border-red-500' : 'border-gray-300'}`}>
                  <option value="" disabled>Sélectionner un service</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.nom}</option>)}
                </select>
                {errors.service && <p className="text-sm text-red-600 mt-1">{errors.service}</p>}
              </div>
              <div>
                <label>Type de Période</label>
                <select value={formData.type_periode || 'hebdomadaire'} onChange={e => updateFormData('type_periode', e.target.value)} className="w-full p-2 border rounded border-gray-300">
                  <option value="hebdomadaire">Hebdomadaire</option>
                  <option value="weekend">Weekend</option>
                  <option value="ferie">Férié</option>
                  <option value="nuit">Nuit</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Planification Temporelle */}
          <div className="border p-4 rounded-lg bg-gray-50/50">
            <h3 className="font-semibold mb-4 text-gray-800 flex items-center gap-2"><Clock className="w-5 h-5 text-green-600" />Planification Temporelle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Date de Début *</label>
                <input type="date" value={formData.date_debut || ''} onChange={e => updateFormData('date_debut', e.target.value)} className={`w-full p-2 border rounded ${errors.date_debut ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.date_debut && <p className="text-sm text-red-600 mt-1">{errors.date_debut}</p>}
              </div>
              <div>
                <label>Date de Fin *</label>
                <input type="date" value={formData.date_fin || ''} onChange={e => updateFormData("date_fin", e.target.value)} className={`w-full p-2 border rounded ${errors.date_fin ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.date_fin && <p className="text-sm text-red-600 mt-1">{errors.date_fin}</p>}
              </div>
              <div>
                <label>Heure de Début</label>
                <input type="time" value={formData.heure_debut || ''} onChange={e => updateFormData("heure_debut", e.target.value)} className="w-full p-2 border rounded border-gray-300" />
              </div>
              <div>
                <label>Heure de Fin</label>
                <input type="time" value={formData.heure_fin || ''} onChange={e => updateFormData("heure_fin", e.target.value)} className="w-full p-2 border rounded border-gray-300" />
              </div>
            </div>
          </div>

          {/* Section 3: Configuration Avancée */}
          <div className="border p-4 rounded-lg bg-gray-50/50">
            <h3 className="font-semibold mb-4 text-gray-800 flex items-center gap-2"><Users className="w-5 h-5 text-orange-500" />Agents Assignés</h3>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {agents.map(agent => (
                <div key={agent.id} onClick={() => handleAgentToggle(agent.nom)} className={`p-3 rounded-lg border-2 cursor-pointer ${selectedAgents.includes(agent.nom) ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <span className="text-sm font-medium">{agent.nom} {agent.prenom}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Annuler</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              {period ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}