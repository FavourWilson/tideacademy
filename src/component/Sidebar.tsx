import { Award, BookOpen, Home, Layers, User, LogOut, X } from "lucide-react";
import { Link } from "react-router";

type SideBarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SideBarProps) => {

    const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: BookOpen, label: "My Courses", link: "/my-course" },
    { icon: Award, label: "Certification", link: "/certificate" },
    { icon: Layers, label: "Courses", link: "/courses" },
    { icon: User, label: "Profile", link: "/profile" },
  ];

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

        {/* Nav */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, i) => (
            <Link 
            to={item.link || "#"}             
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
              ${
                item.active
                  ? "bg-white/15 shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-white/70 hover:bg-white/10 hover:text-white">
            <LogOut size={18} />
            Logout
          </div>
        </div>
      </aside>
  )
}

export default Sidebar
