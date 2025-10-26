// Fichier: src/components/dashboard/DashboardUsers.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, UserCog, Mail, Briefcase } from "lucide-react";
import { getUsers, createUser, updateUser, deleteUser, getServices } from "../../services/api";
import { SkeletonDashboard } from "../styles/SkeletonLoader";
import Modal from "../Modal";

export default function DashboardUsers() {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role_type: "secretaire",
    service_id: null,
  });

  // === Fetch users + services ===
  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, servicesRes] = await Promise.all([getUsers(), getServices()]);
      setUsers(usersRes.data.data || []);
      setServices(servicesRes.data.data || []);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // === Handlers ===
  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentUser({
      id: null,
      nom: "",
      prenom: "",
      email: "",
      password: "",
      role_type: "secretaire",
      service_id: null,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setIsEditing(true);
    setCurrentUser({
      id: user.id,
      nom: user.nom || "",
      prenom: user.prenom || "",
      email: user.email || "",
      password: "",
      role_type: user.role_type || "secretaire",
      service_id: user.service_id ?? user.service?.id ?? null, 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      fetchData();
    } catch (err) {
      alert("Erreur lors de la suppression de l'utilisateur.");
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      nom: currentUser.nom,
      prenom: currentUser.prenom,
      email: currentUser.email,
      password: currentUser.password || undefined, // keep undefined if empty
      role_type: currentUser.role_type,
      service_id:
        currentUser.role_type === "admin" ? null : Number(currentUser.service_id) || null, // ✅ ensures number or null
    };

    try {
      if (isEditing) {
        await updateUser(currentUser.id, dataToSend);
      } else {
        await createUser(dataToSend);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde de l'utilisateur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <SkeletonDashboard />;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-600 text-lg">
            Créez, modifiez ou supprimez les utilisateurs et assignez-les aux services.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#0B43F5] to-[#24DC61] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5 mr-2" /> Nouvel Utilisateur
        </button>
      </motion.div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.nom} {user.prenom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.role_type === "admin" ? (
                    <span className="text-blue-600 font-semibold">Admin</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Secrétaire</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {/* {user.service_id
                    ? services.find((s) => s.id === user.service_id)?.nom || "—"
                    : "N/A"} */}
                    {user.service?.nom ||
                    services.find((s) => s.id === user.service_id)?.nom ||
                    "—"}

                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button
                    onClick={() => handleOpenEdit(user)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Supprimer
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Modal === */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Modifier l’Utilisateur" : "Créer un Nouvel Utilisateur"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              value={currentUser.nom}
              onChange={(e) => setCurrentUser({ ...currentUser, nom: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0B43F5]"
            />
          </div>

          {/* Prénom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <input
              type="text"
              value={currentUser.prenom}
              onChange={(e) => setCurrentUser({ ...currentUser, prenom: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0B43F5]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={currentUser.email}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0B43F5]"
            />
          </div>

          {/* Password */}
          {!isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={currentUser.password}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, password: e.target.value })
                }
                required={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0B43F5]"
              />
            </div>
          )}

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              value={currentUser.role_type}
              onChange={(e) =>
                setCurrentUser({
                  ...currentUser,
                  role_type: e.target.value,
                  service_id: e.target.value === "admin" ? null : currentUser.service_id,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0B43F5]"
            >
              <option value="secretaire">Secrétaire</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Service (only for secrétaire) */}
          {currentUser.role_type === "secretaire" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigner au Service
              </label>
              <select
                value={currentUser.service_id || ""}
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    service_id: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0B43F5]"
              >
                <option value="">— Aucun —</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.nom}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm bg-gradient-to-r from-[#0B43F5] to-[#24DC61] text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-60"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
