// Fichier: src/components/secretary/SecretaryOverview.js
import React from 'react';
import {
  Calendar,
  Users,
  UserX,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Building2
} from 'lucide-react';

export default function SecretaryOverview({ stats, onViewChange, secretaryService, recentActivities = [] }) {
  const quickStats = [
    {
      title: "Périodes Actives",
      value: stats.activePeriods || 0,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+12%",
      trend: "up",
      view: "periods"
    },
    {
      title: "Demandes en Attente",
      value: stats.pendingRequests || 0,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
      change: "-5%",
      trend: "down",
      view: "planning"
    },
    {
      title: "Agents Indisponibles",
      value: stats.agentsUnavailable || 0,
      icon: UserX,
      color: "from-red-500 to-red-600",
      bg: "bg-red-50",
      iconColor: "text-red-600",
      change: "+3",
      trend: "up",
      view: "agent-unavailability"
    },
    {
      title: "Approuvées Aujourd'hui",
      value: stats.approvedToday || 0,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bg: "bg-green-50",
      iconColor: "text-green-600",
      change: "+8",
      trend: "up",
      view: "agent-unavailability"
    }
  ];

  const quickActions = [
    {
      title: "Gérer les Absences Agents",
      description: "Approuver et assigner des remplaçants",
      icon: UserX,
      color: "from-[#0B43F5] to-[#099FFB]",
      bgColor: "bg-blue-600",
      action: () => onViewChange('agent-unavailability'),
      count: stats.agentsUnavailable || 0
    },
    {
      title: "Gérer les Absences Secrétaires",
      description: "Organiser les remplacements",
      icon: Users,
      color: "from-[#24DC61] to-[#20c957]",
      bgColor: "bg-green-600",
      action: () => onViewChange('my-unavailability'),
      count: stats.secretariesUnavailable || 0
    },
    {
      title: "Planning Général",
      description: "Vue calendrier complète",
      icon: Calendar,
      color: "from-[#F29F05] to-[#e89405]",
      bgColor: "bg-orange-500",
      action: () => onViewChange('planning'),
      count: null
    },
    {
      title: "Périodes d'Astreinte",
      description: "Consulter et gérer les périodes",
      icon: Activity,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-600",
      action: () => onViewChange('periods'),
      count: stats.activePeriods || 0
    }
  ];

  // Helper function to get icon based on activity type
  const getActivityIcon = (activity) => {
    if (activity.type === 'approval' || activity.type?.includes('approuvée')) {
      return { Icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' };
    }
    if (activity.type === 'replacement' || activity.type?.includes('remplaçant')) {
      return { Icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' };
    }
    if (activity.type === 'pending' || activity.type?.includes('demande')) {
      return { Icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' };
    }
    if (activity.type === 'period' || activity.type?.includes('période')) {
      return { Icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' };
    }
    return { Icon: Activity, color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B43F5] via-[#0B43F5]/90 to-[#24DC61] p-8 shadow-2xl">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              Espace Secrétariat
            </span>
            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Tableau de Bord Secrétariat
          </h1>
          <p className="text-lg text-white/90 mb-3">
            Gérer les plannings, périodes d'astreinte et indisponibilités
          </p>
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-lg text-base font-medium bg-white text-[#0B43F5] shadow-lg">
              <Building2 className="w-4 h-4 mr-2" />
              {secretaryService || 'Service Production'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Système opérationnel</span>
            </div>
            <div className="text-white/80 text-sm">
              Gestion de votre service
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => onViewChange(stat.view)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.trend === "up" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.title}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-[#0B43F5]"
                  onClick={action.action}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {action.count !== null && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {action.count}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Activité Récente</h2>
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities && recentActivities.length > 0 ? (
                  recentActivities.slice(0, 4).map((activity) => {
                    const { Icon, color, bg } = getActivityIcon(activity);
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3"
                      >
                        <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.message || activity.description || 'Activité'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time || activity.timestamp || new Date(activity.created_at).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Aucune activité récente</p>
                  </div>
                )}
              </div>
              {recentActivities && recentActivities.length > 0 && (
                <button 
                  className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                  onClick={() => onViewChange("notifications")}
                >
                  Voir toutes les activités
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance de la Semaine</h3>
            <p className="text-sm text-gray-600">Statistiques de traitement des demandes pour {secretaryService || 'Service Production'}</p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Demandes traitées</span>
                <span className="text-sm text-gray-600">
                  {stats.processedPercentage || 85}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#0B43F5] to-[#24DC61] h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${stats.processedPercentage || 85}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Remplacements assignés</span>
                <span className="text-sm text-gray-600">
                  {stats.replacementsPercentage || 92}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#0B43F5] to-[#24DC61] h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${stats.replacementsPercentage || 92}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Périodes planifiées</span>
                <span className="text-sm text-gray-600">
                  {stats.periodsPercentage || 78}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#0B43F5] to-[#24DC61] h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${stats.periodsPercentage || 78}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}