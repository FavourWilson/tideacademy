import React, { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import Sidebar from "../../component/Sidebar";
import { useAuthStore } from "../../store/authStore";
import {
  getAdminCertificates,
  type AdminCertificate,
} from "../../services/adminService";

const AdminCertificates: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [certificates, setCertificates] = useState<AdminCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAdminCertificates();
        setCertificates(response.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
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
                Certificates — {currentUser?.fullname || "Admin"}
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
              Loading certificates...
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-6 py-4">Student</th>
                      <th className="text-left px-6 py-4">Course</th>
                      <th className="text-left px-6 py-4">Certificate No</th>
                      <th className="text-left px-6 py-4">Issued</th>
                      <th className="text-left px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((item) => (
                      <tr key={item._id} className="border-t">
                        <td className="px-6 py-4 font-medium">{item.user?.fullname}</td>
                        <td className="px-6 py-4 text-gray-600">{item.course?.title}</td>
                        <td className="px-6 py-4 text-gray-600">{item.certificateNumber}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(item.issuedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/certificate/${item._id}`)}
                            className="px-4 py-2 rounded-lg border border-green-200 text-green-600 hover:bg-green-50"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                    {certificates.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                          No certificates found.
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

export default AdminCertificates;