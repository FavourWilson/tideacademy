import React, { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import Sidebar from "../../component/Sidebar";
import { useAuthStore } from "../../store/authStore";
import { getAdminStats, type AdminStats } from "../../services/adminService";

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getAdminStats();
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = stats
    ? [
        { label: "Total Users", value: stats.totalUsers },
        { label: "Students", value: stats.totalStudents },
        { label: "Instructors", value: stats.totalInstructors },
        { label: "Admins", value: stats.totalAdmins },
        { label: "Courses", value: stats.totalCourses },
        { label: "Enrollments", value: stats.totalEnrollments },
        { label: "Completed", value: stats.totalCompletedEnrollments },
        { label: "Certificates", value: stats.totalCertificates },
      ]
    : [];

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
                Admin Panel — {user?.fullname || "Admin"}
              </h2>
            </div>

            <button className="p-3 bg-white rounded-full shadow-lg">
              <Bell />
            </button>
          </header>

          {loading ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-500">
              Loading stats...
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;