// src/pages/DashboardPage.jsx
function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header avec branding OCP */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo et titre */}
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 shadow-md mr-4">
                <div className="text-lg font-bold text-green-600">OCP</div>
              </div>
              <div className="text-white">
                <h1 className="text-xl font-semibold">Office Chérifien des Phosphates</h1>
                <p className="text-green-100 text-sm">Système de Gestion</p>
              </div>
            </div>
            
            {/* Indicateurs de statut */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-100 text-sm">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></div>
                <span>Système opérationnel</span>
              </div>
              <div className="text-green-100 text-sm">
                {new Date().toLocaleDateString('fr-MA')}
              </div>
            </div>
          </div>
        </div>
      </div>

    
        {/* Footer informatif */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <div className="text-white font-bold text-sm">OCP</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Office Chérifien des Phosphates</h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              Leader mondial dans l'industrie des phosphates et des fertilisants
            </p>
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span>Production: Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                <span>Export: Opérationnel</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                <span>Système: En ligne</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}

export default DashboardPage;