import React, { useState } from "react";
import {
  BookOpen,
  Bell,
  Menu,
  Calendar,
  Target,
} from "lucide-react";
import Sidebar from "../../component/Sidebar";

interface Course {
  id: number;
  title: string;
  description: string;
  status: "in-progress" | "completed";
  objectives?: string;
  completionDate?: string;
}

const MyCourses: React.FC = () => {
  const [activeView, setActiveView] =
    useState<"in-progress" | "completed">("in-progress");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const courses: Course[] = [
    {
      id: 1,
      title: "Demystifying Digital Assets",
      description:
        "Objectives - Estimated Completion: January 2025\nDigital blockchain lesson, Ethereum, and altcoins",
      status: "in-progress",
      objectives: "Estimated Completion: January 2025",
    },
    {
      id: 2,
      title: "Demystifying Digital Assets",
      description:
        "Transforming how we exchange in blockchain tokens thoughtful and understanding market crypto dynamics like why crypto won't go to zero",
      status: "completed",
      completionDate: "Completed: December 2024",
    },
    {
      id: 3,
      title: "Introduction to Blockchain Technology",
      description:
        "Objectives - Estimated Completion: February 2025\nUnderstanding the fundamentals of blockchain, distributed ledgers, and consensus mechanisms",
      status: "in-progress",
      objectives: "Estimated Completion: February 2025",
    },
    {
      id: 4,
      title: "Cryptocurrency Trading Fundamentals",
      description:
        "Master the basics of cryptocurrency trading, market analysis, and risk management strategies",
      status: "completed",
      completionDate: "Completed: November 2024",
    },
  ];



  const filteredCourses = courses.filter(
    (course) => course.status === activeView
  );

  return (
    <div className="flex h-screen font-outfit bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
        />
      )}

      {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main */}
      <main className="flex-1 overflow-auto p-6 animate-fadeIn">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
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

        {/* Toggle */}
        <div className="flex gap-4 mb-8">
          {["in-progress", "completed"].map((view) => (
            <button
              key={view}
              onClick={() =>
                setActiveView(view as "in-progress" | "completed")
              }
              className={`px-8 py-3 rounded-full font-semibold transition
              ${
                activeView === view
                  ? "bg-primary-200 text-white shadow-lg"
                  : "bg-primary-200 border-2 border-gray-200 text-white hover:border-brand-500 hover:text-brand-500"
              }`}
            >
              {view === "in-progress" ? "In Progress" : "Completed"}
            </button>
          ))}
        </div>

        {/* Courses */}
        <div className="space-y-5">
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <BookOpen className="mx-auto mb-4 text-gray-400" size={40} />
              <h3 className="text-xl font-bold mb-2">
                No {activeView} courses
              </h3>
              <p className="text-gray-500">
                {activeView === "in-progress"
                  ? "Start a new course to see it here!"
                  : "Complete a course to see it here!"}
              </p>
            </div>
          ) : (
            filteredCourses.map((course, i) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 animate-slideUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">
                      {course.title}
                    </h3>

                    {activeView === "in-progress" ? (
                      <>
                        <div className="flex gap-2 text-gray-600 mb-2">
                          <Target size={16} />
                          <span className="text-sm font-semibold">
                            Objectives:
                          </span>
                          <span className="text-sm text-gray-500">
                            {course.objectives}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">
                          {course.description.split("\n")[1]}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 max-w-2xl">
                          {course.description}
                        </p>
                        {course.completionDate && (
                          <div className="flex items-center gap-2 text-gray-500 mt-3">
                            <Calendar size={16} />
                            <span className="text-sm">
                              {course.completionDate}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <button
                    className="px-8 py-3 lg:w-64 rounded-full font-semibold text-white
                    bg-primary-900 shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    {activeView === "in-progress"
                      ? "Continue"
                      : "View Certification"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default MyCourses;
