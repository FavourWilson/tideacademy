import React, { useState } from "react";
import {
 
  Bell,
  Clock,
  Menu,
} from "lucide-react";
import Sidebar from "../../component/Sidebar";

interface Course {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Courses");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const courses: Course[] = [
    {
      id: 1,
      title: "Digital Assets",
      subtitle: "Foundations of Digital Assets",
      duration: "3hrs",
      category: "Digital Assets",
    },
    {
      id: 2,
      title: "Trading & Investing",
      subtitle: "Foundations of Crypto Markets",
      duration: "5hrs",
      category: "Trading",
    },
    {
      id: 3,
      title: "Cybersecurity",
      subtitle: "Financial Digital Security",
      duration: "3hrs",
      category: "Cybersecurity",
    },
  ];

  const tabs = ["All Courses", "Digital Assets", "Trading", "Cybersecurity"];



  const filteredCourses =
    activeTab === "All Courses"
      ? courses
      : courses.filter((c) => c.category === activeTab);

  return (
    <div className="flex h-screen font-outfit bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
        />
      )}

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main */}
      <main className="flex-1 overflow-auto p-6 animate-fadeIn">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu />
            </button>
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome John,
            </h2>
          </div>

          <button className="p-3 bg-white rounded-full shadow animate-swing">
            <Bell />
          </button>
        </header>

        {/* Stats */}
        <section className="grid sm:grid-cols-2 gap-6 mb-10">
          {["My Courses", "Completed Courses"].map((label, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 text-white shadow-xl
              bg-linear-to-br from-brand-500 to-brand-600 animate-slideUp"
            >
              <p className="text-sm text-white/80">{label}</p>
              <p className="text-5xl font-bold">2</p>
            </div>
          ))}
        </section>

        {/* Courses */}
        <section className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between mb-6">
            <h3 className="text-2xl font-bold">List of Courses</h3>
            <button className="text-brand-500 font-semibold">
              View All
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold whitespace-nowrap
                ${
                  activeTab === tab
                    ? "text-brand-500 border-b-2 border-brand-500"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col sm:flex-row justify-between gap-4
                p-6 border rounded-xl hover:shadow-brand transition animate-slideUp"
              >
                <div>
                  <h4 className="font-bold text-lg">{course.title}</h4>
                  <p className="text-sm text-gray-500">
                    {course.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    {course.duration}
                  </div>
                  <button className="px-8 py-3 rounded-full text-white font-semibold
                    bg-gradient-to-r from-brand-500 to-brand-600 shadow-lg">
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
