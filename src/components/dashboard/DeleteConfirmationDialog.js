// Fichier: src/components/dashboard/DeleteConfirmationDialog.js
import React from 'react';
import { AlertTriangle } from 'lucide-react';

// This component is controlled by props from its parent (DashboardPage).
export function DeleteConfirmDialog({ isOpen, onClose, onConfirm, title, description }) {
  // If the dialog is not supposed to be open, render nothing.
  if (!isOpen) return null;

  return (
    // The main container: a fixed-position overlay that covers the screen.
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      {/* The dialog box itself. */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        
        {/* Dialog Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        
        {/* Dialog Footer with Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose(); // Automatically close the modal after the action is confirmed.
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}