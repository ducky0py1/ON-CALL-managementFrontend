// Fichier: src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the Provider component

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));

  // Create a simple boolean to easily check if the user is an admin.
  const isAdmin = user?.role === 'admin';
const isSecretary = user?.role === 'secretaire';

  // The login function now also updates our global state
  const login = (userData, authToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', authToken);
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  const value = { user, token, login, logout, isAdmin, isSecretary };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to easily access the context
export const useAuth = () => {
  return useContext(AuthContext);
};