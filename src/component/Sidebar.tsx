import {
  Award,
  BookOpen,
  Home,
  Layers,
  User,
  LogOut,
  X,
  LayoutDashboard,
  Users,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { getAdminStats, type AdminStats } from "../services/adminService";

type SideBarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SideBarProps) => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";
  const [stats, setStats] = useState<AdminStats | null>(null);

  const menuItems = [
    { icon: Home, label: "Dashboard", link: '/dashboard', active: true },
    { icon: BookOpen, label: "My Courses", link: "/my-course" },
    { icon: Award, label: "Certification", link: "/certificate" },
    { icon: Layers, label: "Courses", link: "/courses" },
    { icon: User, label: "Profile", link: "/profile" },
    ...(isAdmin
      ? [
        {
          label: "Admin Dashboard",
          path: "/admin",
          icon: LayoutDashboard,
        },
        {
          label: "Manage Users",
          path: "/admin/users",
          icon: Users,
          badge: stats?.totalUsers,
        },
        {
          label: "Manage Courses",
          path: "/admin/courses",
          icon: BookOpen,
          badge: stats?.totalCourses,
        },
        {
          label: "Enrollments",
          path: "/admin/enrollments",
          icon: GraduationCap,
          badge: stats?.totalEnrollments,
        },
        {
          label: "Certificates",
          path: "/admin/certificates",
          icon: Award,
          badge: stats?.totalCertificates,
        },
      ]
      : []),
  ];

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      if (!isAdmin) return;

      try {
        const response = await getAdminStats();
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      }
    };

    fetchStats();
  }, [isAdmin]);

  const handleLogout = () => {
    logout(); // clears token + user
    navigate("/sign-in"); // redirect
  };
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 text-white
        bg-primary-900 border-r border-white/20 rounded-tr-lg rounded-br-lg
        shadow-2xl transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        animate-slideLeft`}
    >
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="lg:hidden absolute top-4 right-4"
      >
        <X />
      </button>

      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            ⚡
          </div>
          <div>
            <h1 className="font-mono font-bold text-xl">TIDE</h1>
            <p className="font-mono text-xs text-white/70">ACADEMY</p>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div
          onClick={() => navigate("/admin")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
        >
          Admin Dashboard
        </div>
      )}

      {/* Nav */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, i) => (
          <Link
            to={item.link || "#"}
            key={i}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
              ${item.active
                ? "bg-white/15 shadow-lg"
                : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
          >
            <item.icon size={18} />
            {item.badge && item.badge > 0 && (
              <span
                className={`min-w-[22px] h-6 px-2 flex items-center justify-center rounded-full text-xs font-semibold ${item.label === "Certificates"
                    ? "bg-yellow-500/20 text-yellow-200"
                    : item.label === "Enrollments"
                      ? "bg-blue-500/20 text-blue-200"
                      : "bg-white/20 text-white"
                  }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <div onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-white/70 hover:bg-white/10 hover:text-white">
          <LogOut size={18} />
          Logout
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
