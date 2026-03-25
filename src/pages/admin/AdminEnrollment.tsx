import React, { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import Sidebar from "../../component/Sidebar";
import { useAuthStore } from "../../store/authStore";
import { getAdminEnrollments, type AdminEnrollment } from "../../services/adminService";

const AdminEnrollments: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [enrollments, setEnrollments] = useState<AdminEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAdminEnrollments();
        setEnrollments(response.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch enrollments");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <header className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu />
              </button>
              <h2 className="text-3xl font-bold text-gray-800">
                Enrollments — {currentUser?.fullname || "Admin"}
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
              Loading enrollments...
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-6 py-4">Student</th>
                      <th className="text-left px-6 py-4">Email</th>
                      <th className="text-left px-6 py-4">Course</th>
                      <th className="text-left px-6 py-4">Status</th>
                      <th className="text-left px-6 py-4">Progress</th>
                      <th className="text-left px-6 py-4">Enrolled</th>
                      <th className="text-left px-6 py-4">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((item) => (
                      <tr key={item._id} className="border-t">
                        <td className="px-6 py-4 font-medium">{item.user?.fullname}</td>
                        <td className="px-6 py-4 text-gray-600">{item.user?.email}</td>
                        <td className="px-6 py-4 text-gray-600">{item.course?.title}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : item.status === "active"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.progress}%</td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(item.enrolledAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.completedAt
                            ? new Date(item.completedAt).toLocaleDateString()
                            : "—"}
                        </td>
                      </tr>
                    ))}
                    {enrollments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                          No enrollments found.
                        </td>
                      </tr>
                    )}
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

export default AdminEnrollments;