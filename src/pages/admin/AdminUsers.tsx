import React, { useEffect, useState } from "react";
import { Bell, Menu, Trash2 } from "lucide-react";
import Sidebar from "../../component/Sidebar";
import { useAuthStore } from "../../store/authStore";
import {
  deleteAdminUser,
  getAdminUsers,
  updateAdminUserRole,
  type AdminUser,
} from "../../services/adminService";

const AdminUsers: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");

  const currentUser = useAuthStore((state) => state.user);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAdminUsers();
      setUsers(response.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (
    userId: string,
    role: "student" | "admin" | "instructor"
  ) => {
    try {
      setActionLoadingId(userId);
      await updateAdminUserRole(userId, role);
      await fetchUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update role");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleDelete = async (userId: string) => {
    const confirmed = window.confirm("Delete this user?");
    if (!confirmed) return;

    try {
      setActionLoadingId(userId);
      await deleteAdminUser(userId);
      await fetchUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete user");
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <header className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu />
              </button>
              <h2 className="text-3xl font-bold text-gray-800">
                Manage Users — {currentUser?.fullname || "Admin"}
              </h2>
            </div>

            <button className="p-3 bg-white rounded-full shadow-lg">
              <Bell />
            </button>
          </header>

          {error && (
            <div className="mb-6 bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {loading ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-500">
              Loading users...
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-6 py-4">Name</th>
                      <th className="text-left px-6 py-4">Email</th>
                      <th className="text-left px-6 py-4">Role</th>
                      <th className="text-left px-6 py-4">Created</th>
                      <th className="text-left px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-t">
                        <td className="px-6 py-4 font-medium">{user.fullname}</td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(
                                user._id,
                                e.target.value as "student" | "admin" | "instructor"
                              )
                            }
                            disabled={actionLoadingId === user._id}
                            className="border rounded-lg px-3 py-2"
                          >
                            <option value="student">student</option>
                            <option value="instructor">instructor</option>
                            <option value="admin">admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(user._id)}
                            disabled={actionLoadingId === user._id}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;