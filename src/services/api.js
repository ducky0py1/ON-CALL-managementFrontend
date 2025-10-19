// Fichier: src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api',
   baseURL: process.env.REACT_APP_API_URL,
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
export const getServices = () => apiClient.get('/services');
export const createService = (data) => apiClient.post('/services', data);
export const updateService = (id, data) => apiClient.put(`/services/${id}`, data);
export const deleteService = (id) => apiClient.delete(`/services/${id}`);

// Agents
export const getAgents = () => apiClient.get('/agents');
export const createAgent = (data) => apiClient.post('/agents', data);
export const updateAgent = (id, data) => apiClient.put(`/agents/${id}`, data);
export const deleteAgent = (id) => apiClient.delete(`/agents/${id}`);

// Périodes d'Astreinte (NOUVEAU)
export const getPeriodes = () => apiClient.get('/periodes-astreinte');
export const createPeriode = (data) => apiClient.post('/periodes-astreinte', data);
export const updatePeriode = (id, data) => apiClient.put(`/periodes-astreinte/${id}`, data);
export const deletePeriode = (id) => apiClient.delete(`/periodes-astreinte/${id}`);

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