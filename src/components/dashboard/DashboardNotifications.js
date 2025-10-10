// Fichier: src/components/dashboard/DashboardNotifications.js
import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

// Mock data, as provided in your file.
const mockNotifications = [
  { id: "1", type: "critical", title: "Période critique", message: "Urgence Électrique nécessite attention.", service: "Service Électrique", time: "Il y a 5m", read: false },
  { id: "2", type: "warning", title: "Agent non assigné", message: "Maintenance Équipements Lourds n'a pas de backup.", service: "Service Mécanique", time: "Il y a 15m", read: false },
  { id: "3", type: "info", title: "Nouvelle période", message: "Astreinte Production - Semaine 44 a été créée.", service: "Service Production", time: "Il y a 1h", read: true },
];

export function DashboardNotifications({ selectedService }) {
  const filteredNotifications = selectedService 
    ? mockNotifications.filter(n => n.service === selectedService)
    : mockNotifications;

  const getIcon = (type) => {
    if (type === 'critical') return <AlertTriangle className="w-5 h-5 text-red-600" />;
    if (type === 'warning') return <Bell className="w-5 h-5 text-orange-600" />;
    if (type === 'info') return <Info className="w-5 h-5 text-blue-600" />;
    return <CheckCircle className="w-5 h-5 text-green-600" />;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications & Alertes</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold mb-4">Notifications Récentes</h3>
        <div className="space-y-3">
          {filteredNotifications.map(notification => (
            <div key={notification.id} className={`p-4 rounded-lg flex items-start gap-4 ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div>
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.service} • {notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}