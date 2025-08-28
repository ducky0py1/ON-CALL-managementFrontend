// Fichier: src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// --- NOUVEAU CODE ---
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
// --- FIN DU NOUVEAU CODE ---

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


export default apiClient;