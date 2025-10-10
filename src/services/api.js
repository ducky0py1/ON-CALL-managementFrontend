// Fichier: src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});


// On ajoute un intercepteur pour chaque requête
apiClient.interceptors.request.use(
  (config) => {
    // On récupère le token du localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Si le token existe, on l'ajoute dans les en-têtes de la requête
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);


export const login = (credentials) => {
  return apiClient.post('/login', credentials);
};

// --- AJOUTER LA FONCTION POUR LES SERVICES ---
export const getServices = () => {
  return apiClient.get('/services');
};
export const getAgents = () => {
  return apiClient.get('/agents'); // C'est l'endpoint que nous avons créé dans Laravel
};
export const createService = (serviceData) => {
  return apiClient.post('/services', serviceData);
};
export const deleteService = (id) => {
  return apiClient.delete(`/services/${id}`);
};
export const updateService = (id, serviceData) => {
  return apiClient.put(`/services/${id}`, serviceData);
};
export const createAgent = (agentData) => {
  return apiClient.post('/agents', agentData);
};

export const updateAgent = (id, agentData) => {
  return apiClient.put(`/agents/${id}`, agentData);
};

export const deleteAgent = (id) => {
  return apiClient.delete(`/agents/${id}`);
};
export const getSecretaries = () => {
  return apiClient.get('/users/secretaries');
};


export const getPublicPeriodes = () => {
  // We use the base apiClient, which is fine since these routes are public
  return apiClient.get('/public/periodes-astreinte');
};

export const getCurrentWeekAstreintes = () => {
  return apiClient.get('/public/astreintes-semaine');
};

export default apiClient;