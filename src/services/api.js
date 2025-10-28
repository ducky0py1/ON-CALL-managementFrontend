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

export const getUsers = () => {
  return apiClient.get('/users');
};

export const createUser = (userData) => {
  return apiClient.post('/users', userData);
};

// export const updateUser = (id, userData) => {
//   return apiClient.put(`/users/${id}`, userData);
// };
export const updateUser = (id, data) => apiClient.put(`/users/${id}`, data);


export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};

// This function is still useful for forms, so we keep it.
export const getAvailableSecretaries = () => {
  return apiClient.get('/users?role=secretaire&available=true');
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

// Périodes d'Astreinte
export const getCurrentUser = () => apiClient.get('/me');
export const getSecretaryService = () => apiClient.get('/secretary/service');
export const getPeriodes = () => apiClient.get('/periodes-astreinte');
export const createPeriode = (data) => apiClient.post('/periodes-astreinte', data);
export const updatePeriode = (id, data) => apiClient.put(`/periodes-astreinte/${id}`, data);
export const deletePeriode = (id) => apiClient.delete(`/periodes-astreinte/${id}`);


// --- Fonctions pour les Indisponibilités ---
export const getIndisponibilites = (params = {}) => {
  // We use the plural 'indisponibilites' to match your Laravel route
  return apiClient.get('/indisponibilites-agents', { params });
};

export const createIndisponibilite = (data) => {
  return apiClient.post('/indisponibilites-agents', data);
};

export const updateIndisponibilite = (id, data) => {
  return apiClient.put(`/indisponibilites-agents/${id}`, data);
};

export const deleteIndisponibilite = (id) => {
  return apiClient.delete(`/indisponibilites-agents/${id}`);
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


// --- Fonctions pour les Indisponibilités Secrétaires ---
export const getIndisponibilitesSecretaires = () => {
  return apiClient.get('/indisponibilites-secretaires'); // Assuming a route like this exists
};

export const createIndisponibiliteSecretaire = (data) => {
  return apiClient.post('/indisponibilites-secretaires', data);
};

export const updateIndisponibiliteSecretaire = (id, data) => {
  return apiClient.put(`/indisponibilites-secretaires/${id}`, data);
};


export default apiClient;